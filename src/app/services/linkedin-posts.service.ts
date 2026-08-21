// linkedin-posts.service.ts — reads LinkedIn posts from the Payload CMS REST API.
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

/** Canonical shape the UI renders, independent of how Payload names its fields. */
export interface LinkedInPost {
  id: string;
  title: string;
  excerpt: string;
  /** Full body text, shown when a card is expanded. */
  fullText: string;
  linkedInUrl: string | null;
  embedHeight?: number;
  imageUrl: string | null;
  imageAlt: string;
  publishedAt: Date | null;
}

interface PayloadListResponse {
  docs?: unknown[];
  totalDocs?: number;
  totalPages?: number;
  page?: number;
  hasNextPage?: boolean;
}

/** Known official heights for LinkedIn share URNs to eliminate empty white space */
const LINKEDIN_URN_HEIGHTS: Record<string, number> = {
  '7493596549793619968': 1622,
  '7490751661246967808': 1447,
  '7489916838970032128': 1475,
  '7488811725824126976': 1958,
  '7487380516975878144': 1531,
  '7485674528317042689': 1538,
  '7484828621908611073': 1475,
  '7483128793541541888': 2077,
};

/** Returns the first candidate key that holds a non-empty value. */
function pick(doc: Record<string, any>, keys: string[]): any {
  for (const key of keys) {
    const value = doc[key];
    if (value !== null && value !== undefined && value !== '') return value;
  }
  return null;
}

function toPlainText(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;

  let out = '';
  const walk = (node: any): void => {
    if (!node) return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node.text === 'string') out += node.text;
    if (node.children) walk(node.children);
    if (node.root) walk(node.root);
    if (node.type === 'paragraph' || node.type === 'heading') out += ' ';
  };
  walk(value);
  return out.replace(/\s+/g, ' ').trim();
}

function toPlainTextPreservingBreaks(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();

  const paragraphs: string[] = [];
  const walk = (node: any): void => {
    if (!node) return;
    if (Array.isArray(node)) return node.forEach(walk);
    if (node.root) return walk(node.root);
    if (node.type === 'paragraph' || node.type === 'heading') {
      const text = toPlainText(node);
      if (text) paragraphs.push(text);
      return;
    }
    if (node.children) walk(node.children);
    else if (typeof node.text === 'string' && node.text.trim()) paragraphs.push(node.text.trim());
  };
  walk(value);
  return paragraphs.join('\n\n').trim();
}

function resolveImage(value: any): { url: string | null; alt: string } {
  if (!value || typeof value === 'string') return { url: null, alt: '' };

  const media = value.image ?? value.media ?? value;
  const raw: string | null =
    media?.url ?? media?.sizes?.card?.url ?? media?.sizes?.thumbnail?.url ?? null;
  if (!raw) return { url: null, alt: '' };

  const url = raw.startsWith('http') ? raw : `${environment.payloadBaseUrl}${raw}`;
  return { url, alt: media?.alt ?? '' };
}

/** Maps one raw Payload document onto the canonical LinkedInPost shape. */
export function normalizePost(doc: Record<string, any>): LinkedInPost {
  const title = toPlainText(pick(doc, ['title', 'heading', 'name', 'headline'])) || 'Untitled post';

  const rawBody = pick(doc, ['excerpt', 'summary', 'description', 'content', 'body', 'text']);
  const fullText = toPlainTextPreservingBreaks(rawBody);
  const excerpt = fullText || toPlainText(rawBody);

  const linkedInUrl = pick(doc, [
    'linkedinShareUrl',
    'linkedInUrl',
    'linkedinUrl',
    'linkedinLink',
    'postUrl',
    'url',
    'link',
  ]);

  let embedHeight = 1500;
  if (typeof linkedInUrl === 'string') {
    for (const [urn, h] of Object.entries(LINKEDIN_URN_HEIGHTS)) {
      if (linkedInUrl.includes(urn)) {
        embedHeight = h;
        break;
      }
    }
  }

  const attachments = doc['attachments'];
  const firstAttachment = Array.isArray(attachments) ? attachments[0] : attachments;
  const { url: imageUrl, alt } = resolveImage(
    firstAttachment ?? pick(doc, ['image', 'media', 'thumbnail', 'coverImage', 'featuredImage']),
  );

  const rawDate = pick(doc, [
    'scheduledDate',
    'publishedAt',
    'publishedDate',
    'postedAt',
    'date',
    'createdAt',
  ]);
  const parsed = rawDate ? new Date(rawDate) : null;

  return {
    id: String(doc['id'] ?? doc['_id'] ?? crypto.randomUUID()),
    title,
    excerpt,
    fullText,
    linkedInUrl: typeof linkedInUrl === 'string' ? linkedInUrl : null,
    embedHeight,
    imageUrl,
    imageAlt: alt || title,
    publishedAt: parsed && !isNaN(parsed.getTime()) ? parsed : null,
  };
}

@Injectable({ providedIn: 'root' })
export class LinkedInPostsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.payloadBaseUrl}/api/${environment.payloadPostsCollection}`;

  readonly loadFailed = signal(false);

  private latestCache?: Observable<LinkedInPost[]>;

  getLatest(limit = 3): Observable<LinkedInPost[]> {
    if (!this.latestCache) {
      this.latestCache = this.fetch(limit, 1).pipe(
        map((result) => result.posts),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.latestCache;
  }

  getPage(page: number, limit = 4): Observable<{ posts: LinkedInPost[]; hasMore: boolean }> {
    return this.fetch(limit, page);
  }

  private fetch(limit: number, page: number): Observable<{ posts: LinkedInPost[]; hasMore: boolean }> {
    const query = [
      `limit=${limit}`,
      `page=${page}`,
      'sort=-createdAt',
      'depth=1',
      `where[status][equals]=${environment.payloadPublishedStatus}`,
    ].join('&');
    const url = `${this.endpoint}?${query}`;

    return this.http.get<PayloadListResponse>(url).pipe(
      map((response) => {
        this.loadFailed.set(false);
        const docs = Array.isArray(response?.docs) ? response.docs : [];
        return {
          posts: docs.map((doc) => normalizePost(doc as Record<string, any>)),
          hasMore: Boolean(response?.hasNextPage),
        };
      }),
      catchError(() => {
        this.loadFailed.set(true);
        return of({ posts: [], hasMore: false });
      }),
    );
  }

  getById(id: string): Observable<LinkedInPost | null> {
    const url = `${this.endpoint}/${id}`;
    return this.http.get<any>(url).pipe(
      map((doc) => normalizePost(doc)),
      catchError(() => of(null))
    );
  }
}

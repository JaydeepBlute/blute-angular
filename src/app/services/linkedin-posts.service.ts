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

/** Returns the first candidate key that holds a non-empty value. */
function pick(doc: Record<string, any>, keys: string[]): any {
  for (const key of keys) {
    const value = doc[key];
    if (value !== null && value !== undefined && value !== '') return value;
  }
  return null;
}

/**
 * Payload rich-text (Lexical) stores content as a nested node tree rather than a
 * string, so walk it and collect the leaf text. Plain strings pass straight through.
 */
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
    // Keep block-level nodes from running together.
    if (node.type === 'paragraph' || node.type === 'heading') out += ' ';
  };
  walk(value);
  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Same as toPlainText but keeps paragraph breaks, so an expanded card reads the
 * way the post was written rather than as one run-on block.
 */
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

function truncate(text: string, max = 220): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(' ', max) || max).trimEnd() + '…';
}

/** Payload upload relations may be an object, an ID string, or already-populated media. */
function resolveImage(value: any): { url: string | null; alt: string } {
  if (!value || typeof value === 'string') return { url: null, alt: '' };

  const media = value.image ?? value.media ?? value;
  const raw: string | null =
    media?.url ?? media?.sizes?.card?.url ?? media?.sizes?.thumbnail?.url ?? null;
  if (!raw) return { url: null, alt: '' };

  // Payload returns media paths relative to its own host.
  const url = raw.startsWith('http') ? raw : `${environment.payloadBaseUrl}${raw}`;
  return { url, alt: media?.alt ?? '' };
}

/** Maps one raw Payload document onto the canonical LinkedInPost shape. */
export function normalizePost(doc: Record<string, any>): LinkedInPost {
  const title = toPlainText(pick(doc, ['title', 'heading', 'name', 'headline'])) || 'Untitled post';

  const rawBody = pick(doc, ['excerpt', 'summary', 'description', 'content', 'body', 'text']);
  const fullText = toPlainTextPreservingBreaks(rawBody);
  const excerpt = truncate(toPlainText(rawBody));

  const linkedInUrl = pick(doc, [
    'linkedInUrl',
    'linkedinUrl',
    'linkedinLink',
    'postUrl',
    'url',
    'link',
  ]);

  const { url: imageUrl, alt } = resolveImage(
    pick(doc, ['image', 'media', 'thumbnail', 'coverImage', 'featuredImage']),
  );

  const rawDate = pick(doc, ['publishedAt', 'publishedDate', 'postedAt', 'date', 'createdAt']);
  const parsed = rawDate ? new Date(rawDate) : null;

  return {
    id: String(doc['id'] ?? doc['_id'] ?? crypto.randomUUID()),
    title,
    excerpt,
    fullText,
    linkedInUrl: typeof linkedInUrl === 'string' ? linkedInUrl : null,
    imageUrl,
    imageAlt: alt || title,
    publishedAt: parsed && !isNaN(parsed.getTime()) ? parsed : null,
  };
}

@Injectable({ providedIn: 'root' })
export class LinkedInPostsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.payloadBaseUrl}/api/${environment.payloadPostsCollection}`;

  /** Set when a request fails, so the UI can show a graceful fallback instead of an empty void. */
  readonly loadFailed = signal(false);

  private latestCache?: Observable<LinkedInPost[]>;

  /**
   * Newest posts for the home-page strip. Cached for the lifetime of the app so
   * navigating home repeatedly does not re-hit the API.
   */
  getLatest(limit = 3): Observable<LinkedInPost[]> {
    if (!this.latestCache) {
      this.latestCache = this.fetch(limit, 1).pipe(
        map((result) => result.posts),
        shareReplay({ bufferSize: 1, refCount: false }),
      );
    }
    return this.latestCache;
  }

  /** One page of posts for the /insights listing. */
  getPage(page: number, limit = 9): Observable<{ posts: LinkedInPost[]; hasMore: boolean }> {
    return this.fetch(limit, page);
  }

  private fetch(limit: number, page: number): Observable<{ posts: LinkedInPost[]; hasMore: boolean }> {
    // Sort by createdAt: the collection has no publishedAt field, and Payload
    // errors on an unknown sort key rather than falling back to a default.
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
}

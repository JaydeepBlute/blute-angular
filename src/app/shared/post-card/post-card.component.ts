// post-card.component.ts — single LinkedIn post card, shared by the home strip and /insights.
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedInPost } from '../../services/linkedin-posts.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article
      class="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1"
      style="border: 1px solid var(--color-border); box-shadow: 0 1px 2px rgba(10,37,64,0.04);"
    >
      <!-- Cover image, or a branded gradient placeholder when the post has none -->
      <div class="relative overflow-hidden aspect-[16/9]" style="background-color: var(--color-bg-surface);">
        <img
          *ngIf="post.imageUrl; else gradientFallback"
          [src]="post.imageUrl"
          [alt]="post.imageAlt"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <ng-template #gradientFallback>
          <div
            class="w-full h-full flex items-center justify-center"
            style="background: linear-gradient(135deg, #0A2540 0%, #1B3A5C 55%, #533AFD 100%);"
            aria-hidden="true"
          >
            <svg class="w-10 h-10 text-white/30" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
              />
            </svg>
          </div>
        </ng-template>
      </div>

      <div class="flex flex-col flex-1 p-6">
        <time
          *ngIf="post.publishedAt"
          [attr.datetime]="post.publishedAt.toISOString()"
          class="text-xs font-medium tracking-wide uppercase mb-3"
          style="color: var(--color-text-tertiary);"
        >
          {{ post.publishedAt | date: 'mediumDate' }}
        </time>

        <h3
          class="text-lg leading-snug font-semibold mb-3 transition-colors duration-200"
          style="font-family: var(--font-display); color: var(--color-text-primary);"
        >
          {{ post.title }}
        </h3>

        <p
          *ngIf="post.excerpt"
          class="text-sm leading-relaxed flex-1 whitespace-pre-line"
          style="color: var(--color-text-secondary);"
        >
          {{ expanded ? post.fullText : post.excerpt }}
        </p>

        <!--
          No permalink stored in the CMS, so instead of a dead card we let the
          post be read in place. Sits above the stretched link via z-index.
        -->
        <button
          *ngIf="!post.linkedInUrl && canExpand"
          type="button"
          (click)="expanded = !expanded"
          [attr.aria-expanded]="expanded"
          class="relative z-10 self-start inline-flex items-center gap-2 mt-6 text-sm font-semibold rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
          style="color: var(--color-accent); outline-color: var(--color-accent);"
        >
          {{ expanded ? 'Show less' : 'Read full post' }}
          <svg
            class="w-4 h-4 transition-transform duration-200"
            [class.rotate-180]="expanded"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <a
          *ngIf="post.linkedInUrl"
          [href]="post.linkedInUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-6 text-sm font-semibold rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
          style="color: var(--color-accent); outline-color: var(--color-accent);"
          [attr.aria-label]="'Read \\'' + post.title + '\\' on LinkedIn (opens in a new tab)'"
        >
          <!-- Stretched link: makes the whole card clickable without nesting anchors -->
          <span class="absolute inset-0" aria-hidden="true"></span>
          Read on LinkedIn
          <svg
            class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      article:hover {
        border-color: var(--color-accent) !important;
        box-shadow: 0 12px 32px rgba(10, 37, 64, 0.1) !important;
      }

      article:hover h3 {
        color: var(--color-accent);
      }

      @media (prefers-reduced-motion: reduce) {
        article,
        article img,
        article svg {
          transition: none !important;
          transform: none !important;
        }
      }
    `,
  ],
})
export class PostCardComponent {
  @Input({ required: true }) post!: LinkedInPost;

  expanded = false;

  /** Only offer the toggle when there is genuinely more text than the excerpt shows. */
  get canExpand(): boolean {
    return this.post.fullText.length > this.post.excerpt.length;
  }
}

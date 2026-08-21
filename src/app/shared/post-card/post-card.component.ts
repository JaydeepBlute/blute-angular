// post-card.component.ts — compact fixed-size post preview card for Home Page strip
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinkedInPost } from '../../services/linkedin-posts.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article
      class="group relative flex flex-col h-[460px] rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-400"
      style="box-shadow: 0 4px 16px rgba(10,37,64,0.05);"
    >
      <!-- Fixed aspect ratio cover image or brand gradient header -->
      <div class="relative overflow-hidden aspect-[16/9] bg-slate-900 flex-shrink-0">
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
            class="w-full h-full flex items-center justify-center p-6 text-center"
            style="background: linear-gradient(135deg, #0A2540 0%, #1B3A5C 55%, #0077B5 100%);"
          >
            <svg class="w-10 h-10 text-white/40" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
              />
            </svg>
          </div>
        </ng-template>
      </div>

      <div class="flex flex-col flex-1 p-6 overflow-hidden">
        <time
          *ngIf="post.publishedAt"
          [attr.datetime]="post.publishedAt.toISOString()"
          class="text-[11px] font-bold tracking-wider uppercase text-blue-600 mb-2 block"
        >
          {{ post.publishedAt | date: 'mediumDate' }}
        </time>

        <h3
          class="text-base leading-snug font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 mb-2"
          style="font-family: var(--font-display);"
        >
          {{ post.title }}
        </h3>

        <p
          class="text-xs leading-relaxed text-slate-600 line-clamp-3 flex-1 font-normal"
        >
          {{ post.excerpt || post.fullText }}
        </p>

        <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <a
            routerLink="/insights"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read on Insights
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
})
export class PostCardComponent {
  @Input({ required: true }) post!: LinkedInPost;
}

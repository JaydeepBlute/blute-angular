import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LinkedInPost, LinkedInPostsService } from '../services/linkedin-posts.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen" style="background-color: var(--color-bg-page); font-family: var(--font-body);">
      <!-- HERO / HEADER -->
      <header class="relative w-full overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-24" style="background-color: #0a2540;">
        <div class="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div
            class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
            style="background: radial-gradient(ellipse at center, rgba(83, 58, 253, 0.22) 0%, transparent 70%);"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
            style="background: radial-gradient(ellipse at center, rgba(247, 45, 243, 0.08) 0%, transparent 70%);"
          ></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto px-6">
          <a
            routerLink="/insights"
            class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-5 text-white/60 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Insights
          </a>

          <h1
            *ngIf="post(); else titlePlaceholder"
            class="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-semibold tracking-tight text-white"
            style="font-family: var(--font-display);"
          >
            {{ post()?.title }}
          </h1>
          <ng-template #titlePlaceholder>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-semibold tracking-tight text-white"
              style="font-family: var(--font-display);"
            >
              Loading insight...
            </h1>
          </ng-template>

          <p *ngIf="post()?.publishedAt" class="mt-4 text-sm text-white/60">
            Published on {{ post()?.publishedAt | date: 'longDate' }}
          </p>
        </div>
      </header>

      <!-- MAIN CONTENT -->
      <main class="w-full py-12 lg:py-16">
        <div class="max-w-4xl mx-auto px-6">
          
          <!-- Loading skeletons -->
          <div *ngIf="loading()" class="space-y-6 animate-pulse">
            <div class="w-full aspect-[16/9] bg-gray-200 rounded-2xl"></div>
            <div class="h-6 bg-gray-200 rounded w-1/3"></div>
            <div class="space-y-3">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>

          <!-- Error/Not Found State -->
          <div
            *ngIf="!loading() && !post()"
            class="max-w-xl mx-auto text-center py-16 px-6 rounded-2xl"
            style="border: 1px solid var(--color-border); background-color: var(--color-bg-surface);"
          >
            <h3
              class="text-xl font-semibold mb-3"
              style="font-family: var(--font-display); color: var(--color-text-primary);"
            >
              Insight not found
            </h3>
            <p class="text-base leading-relaxed mb-8" style="color: var(--color-text-secondary);">
              We could not find the post you are looking for. It may have been updated or removed.
            </p>
            <a
              routerLink="/insights"
              class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
              style="background-color: var(--color-accent);"
            >
              Back to Insights
            </a>
          </div>

          <!-- Post Content -->
          <article *ngIf="!loading() && post()" class="bg-white rounded-2xl p-6 md:p-10" style="border: 1px solid var(--color-border); box-shadow: 0 1px 3px rgba(10,37,64,0.05);">
            <!-- Image if available -->
            <div *ngIf="post()?.imageUrl" class="w-full rounded-2xl overflow-hidden mb-8 aspect-[16/9] relative bg-gray-50">
              <img
                [src]="post()?.imageUrl"
                [alt]="post()?.imageAlt"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Content Body -->
            <div
              class="text-base sm:text-lg leading-relaxed whitespace-pre-line text-gray-700 font-normal"
              style="color: var(--color-text-secondary);"
            >
              {{ post()?.fullText }}
            </div>

            <!-- Action Buttons / Links -->
            <div *ngIf="post()?.linkedInUrl" class="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
              <span class="text-sm text-gray-500">
                This note was originally shared on LinkedIn.
              </span>
              <a
                [href]="post()?.linkedInUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4"
                style="background-color: #0077b5; outline-color: #0077b5;"
              >
                View on LinkedIn
                <svg
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </article>

        </div>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class PostDetailComponent implements OnInit {
  @Input() id!: string;

  readonly post = signal<LinkedInPost | null>(null);
  readonly loading = signal(true);

  private readonly postsService = inject(LinkedInPostsService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.id) {
      this.loading.set(false);
      return;
    }

    this.postsService.getById(this.id).subscribe((post) => {
      this.loading.set(false);
      if (post) {
        this.post.set(post);
        this.updateMetaTags(post);
      }
    });
  }

  private updateMetaTags(post: LinkedInPost): void {
    this.title.setTitle(`${post.title} | Blute Technologies`);
    this.meta.updateTag({
      name: 'description',
      content: post.excerpt,
    });
    this.meta.updateTag({ property: 'og:title', content: post.title });
    this.meta.updateTag({
      property: 'og:description',
      content: post.excerpt,
    });
    if (post.imageUrl) {
      this.meta.updateTag({ property: 'og:image', content: post.imageUrl });
    }
  }
}

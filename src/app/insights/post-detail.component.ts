import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LinkedInPost, LinkedInPostsService } from '../services/linkedin-posts.service';
import { SafeUrlPipe } from '../shared/safe-url.pipe';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  template: `
    <div class="min-h-screen" style="background-color: var(--color-bg-page); font-family: var(--font-body);">
      <!-- HERO / HEADER -->
      <header class="relative w-full overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20" style="background-color: #0a2540;">
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
          <div class="flex items-center justify-between gap-4 mb-5">
            <a
              routerLink="/insights"
              class="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Insights
            </a>
          </div>

          <h1
            *ngIf="post(); else titlePlaceholder"
            class="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-semibold tracking-tight text-white mb-4"
            style="font-family: var(--font-display);"
          >
            {{ post()?.title }}
          </h1>
          <ng-template #titlePlaceholder>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl leading-[1.1] font-semibold tracking-tight text-white mb-4"
              style="font-family: var(--font-display);"
            >
              Loading insight...
            </h1>
          </ng-template>

          <div *ngIf="post()?.publishedAt" class="text-sm text-white/70">
            Published on {{ post()?.publishedAt | date: 'longDate' }}
          </div>
        </div>
      </header>

      <!-- MAIN CONTENT -->
      <main class="w-full py-12 lg:py-16">
        <div class="max-w-4xl mx-auto px-6">
          
          <!-- Loading Skeletons -->
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

          <!-- NATIVE POST CARD WITH FULL UNTRUNCATED TEXT AND EMBED -->
          <article *ngIf="!loading() && post()" class="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xl space-y-8">
            
            <!-- Clean Full-Width Embedded LinkedIn Card (Natural rendering without fixed height) -->
            <div *ngIf="post()?.linkedInUrl | safeUrl as embedUrl" class="w-full bg-white rounded-2xl overflow-hidden p-0 flex flex-col items-center">
              <iframe
                [src]="embedUrl"
                loading="lazy"
                class="w-full block bg-white border-0"
                frameborder="0"
                title="LinkedIn Post Widget"
              ></iframe>
            </div>

            <!-- Standard Image (If no embedded iframe) -->
            <div *ngIf="post()?.imageUrl && !(post()?.linkedInUrl | safeUrl)" class="w-full rounded-2xl overflow-hidden aspect-[16/9] relative bg-slate-100 border border-slate-200 shadow-inner">
              <img
                [src]="post()?.imageUrl"
                [alt]="post()?.imageAlt"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Full Body Text -->
            <div
              *ngIf="shouldShowBodyText(post())"
              class="text-base sm:text-lg leading-relaxed whitespace-pre-line text-slate-700 font-normal space-y-4 pt-4 border-t border-slate-100"
            >
              {{ post()?.fullText }}
            </div>

            <!-- Direct Link to LinkedIn Company Page -->
            <div *ngIf="post()?.linkedInUrl" class="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div class="text-xs text-slate-500 font-medium">
                Verified update from Blute Technologies
              </div>
              <a
                [href]="post()?.linkedInUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg"
              >
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                View Original Post on LinkedIn
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

  shouldShowBodyText(post: LinkedInPost | null): boolean {
    if (!post || !post.fullText) return false;
    if (post.linkedInUrl && post.fullText.toLowerCase().includes('official linkedin post')) {
      return false;
    }
    return true;
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

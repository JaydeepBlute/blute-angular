// insights.component.ts — single-page continuous stream feed of LinkedIn posts with dynamic height auto-resizing.
import { Component, OnInit, OnDestroy, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LinkedInPost, LinkedInPostsService } from '../services/linkedin-posts.service';
import { SafeUrlPipe } from '../shared/safe-url.pipe';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent implements OnInit, OnDestroy {
  private readonly postsService = inject(LinkedInPostsService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  readonly posts = signal<LinkedInPost[]>([]);
  readonly loading = signal(true);
  readonly loadingMore = signal(false);
  readonly hasMore = signal(false);
  readonly failed = this.postsService.loadFailed;

  readonly linkedInProfile = 'https://www.linkedin.com/company/blute-technologies-pvt-ltd/';

  private page = 1;
  private readonly pageSize = 6;

  ngOnInit(): void {
    this.title.setTitle('Insights & Updates | Blute Technologies');
    this.meta.updateTag({
      name: 'description',
      content:
        'Engineering notes, product updates, and official LinkedIn posts from the Blute Technologies team.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Insights & Updates | Blute Technologies' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Engineering notes, product updates, and perspectives from the Blute Technologies team.',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    this.loadPage();
  }

  ngOnDestroy(): void {}

  /** Automatically listens for LinkedIn embed postMessage height events to dynamically adjust iframe height with zero scrollbars */
  @HostListener('window:message', ['$event'])
  onWindowMessage(event: MessageEvent): void {
    if (!event.origin || !event.origin.includes('linkedin.com')) return;
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      if (data && (data.height || data.bodyHeight)) {
        const height = data.height || data.bodyHeight;
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
          if (iframe.src === event.origin || event.source === iframe.contentWindow) {
            iframe.style.height = `${height}px`;
          }
        });
      }
    } catch {
      // Ignore non-json postMessages from other browser extensions
    }
  }

  loadMore(): void {
    if (this.loadingMore() || !this.hasMore()) return;
    this.page += 1;
    this.loadingMore.set(true);
    this.loadPage();
  }

  private loadPage(): void {
    this.postsService.getPage(this.page, this.pageSize).subscribe(({ posts, hasMore }) => {
      this.posts.update((existing) => [...existing, ...posts]);
      this.hasMore.set(hasMore);
      this.loading.set(false);
      this.loadingMore.set(false);
    });
  }
}

// insights.component.ts — full listing of LinkedIn posts published through Payload CMS.
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LinkedInPost, LinkedInPostsService } from '../services/linkedin-posts.service';
import { PostCardComponent } from '../shared/post-card/post-card.component';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent],
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent implements OnInit {
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
  private readonly pageSize = 9;

  ngOnInit(): void {
    this.title.setTitle('Insights & Updates | Blute Technologies');
    this.meta.updateTag({
      name: 'description',
      content:
        'Engineering notes, product updates, and industry perspectives from the Blute Technologies team — covering cloud, AI, DevSecOps, and enterprise software delivery.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Insights & Updates | Blute Technologies' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Engineering notes, product updates, and industry perspectives from the Blute Technologies team.',
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    this.loadPage();
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

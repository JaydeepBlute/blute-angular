// latest-posts.component.ts — "Latest from LinkedIn" section for the home page.
// Shows first post as full embedded LinkedIn card, rest as compact preview cards.
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinkedInPost, LinkedInPostsService } from '../services/linkedin-posts.service';
import { PostCardComponent } from '../shared/post-card/post-card.component';
import { SafeUrlPipe } from '../shared/safe-url.pipe';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent, SafeUrlPipe],
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
})
export class LatestPostsComponent implements OnInit {
  private readonly postsService = inject(LinkedInPostsService);

  readonly posts = signal<LinkedInPost[]>([]);
  readonly loading = signal(true);

  readonly featuredPost = computed(() => this.posts()[0] ?? null);
  readonly previewPosts = computed(() => this.posts().slice(1, 4));

  ngOnInit(): void {
    this.postsService.getLatest(4).subscribe((posts) => {
      this.posts.set(posts);
      this.loading.set(false);
    });
  }
}

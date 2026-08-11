// latest-posts.component.ts — "Latest from LinkedIn" strip for the home page.
// Renders nothing at all when there are no posts, so the home page never shows an empty shell.
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinkedInPost, LinkedInPostsService } from '../services/linkedin-posts.service';
import { PostCardComponent } from '../shared/post-card/post-card.component';

@Component({
  selector: 'app-latest-posts',
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent],
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
})
export class LatestPostsComponent implements OnInit {
  private readonly postsService = inject(LinkedInPostsService);

  readonly posts = signal<LinkedInPost[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.postsService.getLatest(3).subscribe((posts) => {
      this.posts.set(posts);
      this.loading.set(false);
    });
  }
}

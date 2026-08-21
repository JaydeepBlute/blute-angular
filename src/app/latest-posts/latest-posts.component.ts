// latest-posts.component.ts — Horizontal scrolling carousel for LinkedIn posts on home page.
import { Component, OnInit, inject, signal, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  private readonly postsService = inject(LinkedInPostsService);

  readonly posts = signal<LinkedInPost[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.postsService.getLatest(8).subscribe((posts) => {
      this.posts.set(posts);
      this.loading.set(false);
    });
  }

  scrollLeft(): void {
    if (!this.scrollContainer) return;
    this.scrollContainer.nativeElement.scrollBy({ left: -380, behavior: 'smooth' });
  }

  scrollRight(): void {
    if (!this.scrollContainer) return;
    this.scrollContainer.nativeElement.scrollBy({ left: 380, behavior: 'smooth' });
  }
}

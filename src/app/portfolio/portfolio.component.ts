import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';

export interface PortfolioImage {
  src: string;
  alt: string;
  quote: string;
  category: string;
}

export interface HeroQuote {
  text: string;
  author: string;
}

export interface HeroParticle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    trigger('staggerGrid', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
            stagger(60, [
              animate(
                '550ms cubic-bezier(0.16,1,0.3,1)',
                style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('lightboxAnim', [
      transition(':enter', [style({ opacity: 0 }), animate('250ms ease', style({ opacity: 1 }))]),
      transition(':leave', [animate('200ms ease', style({ opacity: 0 }))]),
    ]),
    trigger('lightboxContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' }),
        animate(
          '350ms cubic-bezier(0.16,1,0.3,1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  constructor(private titleService: Title, private metaService: Meta) {}

  // Fallback: if .jpeg fails, try .jpg
  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith('.jpeg')) {
      img.src = img.src.replace('.jpeg', '.jpg');
    }
  }

  // ── Filter ──────────────────────────────
  activeFilter = 'All';
  filters = [];

  // ── Lightbox ────────────────────────────
  selectedImage: PortfolioImage | null = null;
  selectedIndex = 0;

  // ── Hero quotes rotation ─────────────────
  activeQuoteIndex = 0;
  exitQuoteIndex = -1;
  private quoteTimer: ReturnType<typeof setInterval> | null = null;

  // ── Hero quotes ─────────────────────────
  heroQuotes: HeroQuote[] = [
    {
      text: 'Empowering businesses through cutting-edge technology — one innovation at a time.',
      author: 'Blute Technologies',
    },
    {
      text: "We don't just build software. We craft digital experiences that transform the future.",
      author: 'Blute Technologies',
    },

    {
      text: 'More than 28+ customers trust us to turn their boldest ideas into world-class technology solutions.',
      author: 'Blute Technologies',
    },
    {
      text: 'Innovation is our culture. Excellence is our standard. Your success is our mission.',
      author: 'Blute Technologies',
    },
  ];

  // ── Background particles ─────────────────
  heroParticles: HeroParticle[] = Array.from({ length: 25 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 5,
  }));

  // ── Gallery images ───────────────────────
  images: PortfolioImage[] = [];

  private readonly quotes: string[] = [
    'Innovation is seeing what everybody has seen and thinking what nobody has thought.',
    "Great things in business are never done by one person — they're done by a team.",
    'Coming together is a beginning, staying together is progress, working together is success.',
    'The strength of the team is each individual member. The strength of each member is the team.',
    'Alone we can do so little; together we can do so much.',
    'Talent wins games, but teamwork and intelligence win championships.',
    "Success is best when it's shared.",
    "A team is not a group of people who work together — it's people who trust each other.",
    "Collaboration allows us to capture each other's collective intelligence.",
    'None of us is as smart as all of us.',
    'If everyone is moving forward together, success takes care of itself.',
    'It takes two flints to make a fire.',
    'Unity is strength. When there is teamwork, wonderful things can be achieved.',
    'The whole is greater than the sum of the parts.',
    'Individually we are one drop. Together we are an ocean.',
    'Teamwork makes the dream work.',
    'Great teams do not hold back with one another.',
    'Together, ordinary people can achieve extraordinary results.',
  ];

  private readonly categories: string[] = [
    'Team',
    'Events',
    'Culture',
    'Team',
    'Events',
    'Culture',
    'Team',
    'Events',
    'Culture',
    'Team',
    'Events',
    'Culture',
    'Team',
    'Events',
    'Culture',
    'Team',
    'Events',
    'Culture',
  ];

  // ── Lifecycle ────────────────────────────
  // Some images may vary in extension — add fallback handler in template
  // Map known extensions per index (1-22)
  private readonly imgExts: string[] = [
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
    'jpeg',
  ];

  ngOnInit(): void {
    this.titleService.setTitle('Our Portfolio - Blute Technologies');
    this.metaService.updateTag({ name: 'description', content: 'Browse our portfolio of completed projects. We deliver scalable, high-performance technology solutions across various industries.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Blute Technologies Portfolio, IT Case Studies, Custom Software Projects, Enterprise Portfolios' });

    this.images = Array.from({ length: 22 }, (_, i) => ({
      src: `assets/images/clients/image%20${i + 1}.${this.imgExts[i]}`,
      alt: `Portfolio Image ${i + 1}`,
      quote: this.quotes[i % this.quotes.length],
      category: this.categories[i % this.categories.length],
    }));
    this.startQuoteRotation();
  }

  ngOnDestroy(): void {
    this.stopQuoteRotation();
  }

  // ── Hero quote rotation ──────────────────
  private startQuoteRotation(): void {
    this.quoteTimer = setInterval(() => {
      this.exitQuoteIndex = this.activeQuoteIndex;
      this.activeQuoteIndex = (this.activeQuoteIndex + 1) % this.heroQuotes.length;
      setTimeout(() => {
        this.exitQuoteIndex = -1;
      }, 600);
    }, 4000);
  }

  private stopQuoteRotation(): void {
    if (this.quoteTimer) {
      clearInterval(this.quoteTimer);
      this.quoteTimer = null;
    }
  }

  setQuote(index: number): void {
    this.stopQuoteRotation();
    this.exitQuoteIndex = this.activeQuoteIndex;
    this.activeQuoteIndex = index;
    setTimeout(() => {
      this.exitQuoteIndex = -1;
    }, 600);
    this.startQuoteRotation();
  }

  // ── Gallery filter ───────────────────────
  get filteredImages(): PortfolioImage[] {
    return this.activeFilter === 'All'
      ? this.images
      : this.images.filter((img) => img.category === this.activeFilter);
  }

  setFilter(f: string): void {
    this.activeFilter = f;
  }

  // ── Lightbox ─────────────────────────────
  openLightbox(img: PortfolioImage): void {
    this.selectedIndex = this.filteredImages.indexOf(img);
    this.selectedImage = img;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage = null;
    document.body.style.overflow = '';
  }

  nextImage(): void {
    const next = (this.selectedIndex + 1) % this.filteredImages.length;
    this.selectedIndex = next;
    this.selectedImage = this.filteredImages[next];
  }

  prevImage(): void {
    const prev = (this.selectedIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
    this.selectedIndex = prev;
    this.selectedImage = this.filteredImages[prev];
  }

  // ── Keyboard navigation ──────────────────
  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this.selectedImage) return;
    if (e.key === 'ArrowRight') this.nextImage();
    if (e.key === 'ArrowLeft') this.prevImage();
    if (e.key === 'Escape') this.closeLightbox();
  }
}

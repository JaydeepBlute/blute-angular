// home.component.ts - COMPLETE FILE - REPLACE EVERYTHING
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Meta, Title } from '@angular/platform-browser';

interface Content {
  title: string;
  subtitle: string;
  description: string;
  links: Array<{ text: string; url: string }>;
  bgImage: string;
  serviceImage: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home implements OnInit, OnDestroy {
  currentIndex = 0;
  private contentInterval: any;

  content: Content[] = [
    {
      title: 'Ecosystem for',
      subtitle: 'Transformation',
      description: 'Promoting Entrepreneurship at Rural and Urban areas...',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      route: 'ecosystem',
    },
    {
      title: 'Build Your',
      subtitle: 'Dream Team',
      description: 'We are a comprehensive resource outsourcing partner...',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      route: 'build-team',
    },

    {
      title: 'Internet of',
      subtitle: 'Things',
      description: 'Drawing upon our experience, diverse talent pool...',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      route: 'iot-solutions',
    },
    {
      title: 'Mobile App',
      subtitle: 'Development',
      description: 'Our skilled professionals deliver high performance...',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      route: 'mobile-app-development',
    },
    {
      title: 'Product',
      subtitle: 'Engineering',
      description: 'Leveraging web, mobile and cloud technologies...',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80',
      route: 'product-engineering',
    },
  ];

  constructor(private router: Router, private titleService: Title, private metaService: Meta) {}

  get currentContent(): Content {
    return this.content[this.currentIndex];
  }

  ngOnInit() {
    this.titleService.setTitle('Software Development Company in Bangalore | Blute Technologies');
    this.metaService.updateTag({ name: 'description', content: 'Blute Technologies is a leading software development company in Bangalore offering custom software solutions, mobile app development, IoT, AI/ML, AR/VR, and IT outsourcing services.' });
    this.metaService.updateTag({ name: 'keywords', content: 'software development company, IT services company India, custom software solutions, digital transformation company, technology outsourcing partner, Blute Technologies, mobile app development Bangalore, IoT company Bangalore, offshore software development India, software company Bengaluru' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'Blute Technologies' });
    this.metaService.updateTag({ property: 'og:title', content: 'Software Development Company in Bangalore | Blute Technologies' });
    this.metaService.updateTag({ property: 'og:description', content: 'Blute Technologies is a leading software development company in Bangalore offering custom software solutions, mobile app development, IoT, AI/ML, AR/VR, and IT outsourcing services.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://blute.co.in' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://blute.co.in/assets/images/og-banner.png' });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@blutetech' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Software Development Company in Bangalore | Blute Technologies' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Blute Technologies is a leading software development company in Bangalore offering custom software solutions, mobile app development, IoT, AI/ML, AR/VR, and IT outsourcing services.' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://blute.co.in/assets/images/og-banner.png' });

    this.contentInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.content.length;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.contentInterval) {
      clearInterval(this.contentInterval);
    }
  }

  setIndex(index: number) {
    this.currentIndex = index;
  }

  // SIMPLE NAVIGATION - NO COMPLEXITY
  goToPage(route: string) {
    this.router.navigate([route]);
  }
}

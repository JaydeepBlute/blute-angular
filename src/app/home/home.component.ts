// home.component.ts - COMPLETE FILE - REPLACE EVERYTHING
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Meta, Title } from '@angular/platform-browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LatestPostsComponent } from '../latest-posts/latest-posts.component';

interface Content {
  title: string;
  subtitle: string;
  description: string;
  links: Array<{ text: string; url: string }>;
  bgImage: string;
  serviceImage: string;
  route: string;
}

interface Client {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LatestPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  currentIndex = 0;
  private contentInterval: ReturnType<typeof setInterval> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private gsapCtx: any;
  private waveCleanup: (() => void) | undefined;
  marqueeClients: Client[] = [];



  content: Content[] = [
    {
      title: 'Ecosystem for',
      subtitle: 'Transformation',
      description: 'Digital ecosystems for governments and enterprises — smart city platforms, rural broadband, and incubation accelerators. 8 ecosystems delivered.',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      route: 'ecosystem',
    },
    {
      title: 'GIS & Geospatial',
      subtitle: 'Solutions',
      description: 'Precision at every coordinate. Custom GIS platforms powering logistics, agriculture, and urban planning — real-time location intelligence at enterprise scale.',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
      route: 'it-consulting',
    },
    {
      title: 'Build Your',
      subtitle: 'Dream Team',
      description: 'Your engineering team, on demand. Vetted senior engineers and dedicated project squads embedded in your workflow — ready in 72 hours.',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
      route: 'build-team',
    },
    {
      title: 'Internet of',
      subtitle: 'Things',
      description: 'Connect everything. IoT platforms from sensor to dashboard — smart factories, connected health, and industrial automation. Trusted by Mitsubishi and global manufacturers.',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80',
      route: 'iot-solutions',
    },
    {
      title: 'Mobile App',
      subtitle: 'Development',
      description: 'From concept to App Store in 8 weeks. Enterprise-grade iOS & Android — React Native, Flutter, Swift, Kotlin. 50+ apps shipped across 3 continents.',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80',
      route: 'mobile-app-development',
    },
    {
      title: 'Product',
      subtitle: 'Engineering',
      description: 'Ship products that scale to millions. End-to-end engineering from wireframe to production — one accountable team, zero handoffs, on time.',
      links: [],
      bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
      serviceImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
      route: 'product-engineering',
    },
  ];


  clients: Client[] = [
    { src: 'assets/images/clients/agile.jpeg',                        alt: 'Agile Network' },
    { src: 'assets/images/clients/aikya.jpeg',                        alt: 'Aikya' },
    { src: 'assets/images/clients/alkimi.jpeg',                       alt: 'Alkimi' },
    { src: 'assets/images/clients/AmazingCare.jpg',                   alt: 'Amazing Care' },
    { src: 'assets/images/clients/arion.jpeg',                        alt: 'Arion' },
    { src: 'assets/images/clients/conlis.jpeg',                       alt: 'Conlis Global' },
    { src: 'assets/images/clients/evoscience.jpg',                    alt: 'Evoscience' },
    { src: 'assets/images/clients/firstearth.webp',                   alt: 'First Earth' },
    { src: 'assets/images/clients/gravity-india-technologies.png',    alt: 'Gravity India Technologies' },
    { src: 'assets/images/clients/heylearno.png',                     alt: 'HeyLearno' },
    { src: 'assets/images/clients/infosys.jpg',                       alt: 'Infosys' },
    { src: 'assets/images/clients/ITC-Infotech.webp',                 alt: 'ITC Infotech' },
    { src: 'assets/images/clients/medverve.jpeg',                     alt: 'Medverve' },
    { src: 'assets/images/clients/Mitsubishi.png',                    alt: 'Mitsubishi' },
    { src: 'assets/images/clients/nivetti.jpeg',                      alt: 'Nivetti' },
    { src: 'assets/images/clients/novem.jpg',                         alt: 'Novem Solutions' },
    { src: 'assets/images/clients/percept.png',                       alt: 'Percept' },
    { src: 'assets/images/clients/simplex.jpeg',                      alt: 'Simplex' },
    { src: 'assets/images/clients/skbl.jpeg',                         alt: 'SKBL' },
    { src: 'assets/images/clients/tansorian.png',                     alt: 'Transorion' },
    { src: 'assets/images/clients/ullas.png',                         alt: 'Ullas' },
    { src: 'assets/images/clients/XUBERANT.jpg',                      alt: 'Xuberant' },
    { src: 'assets/images/clients/Zeiss.png',                         alt: 'Zeiss' },
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
    this.metaService.updateTag({ property: 'og:url', content: 'https://blute.org' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://blute.org/assets/images/og-banner.png' });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@blutetech' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Software Development Company in Bangalore | Blute Technologies' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Blute Technologies is a leading software development company in Bangalore offering custom software solutions, mobile app development, IoT, AI/ML, AR/VR, and IT outsourcing services.' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://blute.org/assets/images/og-banner.png' });

    this.startAutoplay();
    this.marqueeClients = [...this.clients, ...this.clients];
  }

  ngAfterViewInit() {
    this.initGSAPAnimations();
    this.waveCleanup = this.initHeroWaves();
  }

  initHeroWaves(): (() => void) | undefined {
    if (typeof window === 'undefined') return;
    const canvas = document.getElementById('hero-waves-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let count = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      count += 0.003; // Ultra slow, fluid speed matching Stripe premium wave

      const linesCount = 38; // Dense layered lines matching the user's screenshot
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        
        const opacity = (1 - (i / linesCount)) * 0.28;
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(247, 45, 243, ${opacity * 0.4})`); // Magenta
        grad.addColorStop(0.4, `rgba(83, 58, 253, ${opacity})`);   // Electric Iris
        grad.addColorStop(0.8, `rgba(0, 133, 255, ${opacity * 0.35})`);  // Electric Blue
        grad.addColorStop(1, `rgba(247, 45, 243, ${opacity * 0.1})`);
        
        ctx.strokeStyle = grad;

        const amplitude = 35 + i * 2.8;

        for (let x = 0; x < width; x += 10) {
          // Complex overlapping wave equations for natural fluid line dispersion
          const y =
            height / 1.7 +
            Math.sin(x * 0.0018 + count + i * 0.062) * amplitude * Math.cos(count * 0.18 + i * 0.008);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }



  initGSAPAnimations(): void {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    this.gsapCtx = gsap.context(() => {
      // Set initial offset — elements start 64px below natural position
      gsap.set('.scroll-reveal', { y: 64 });

      // Batch reveal with stagger as groups enter viewport
      ScrollTrigger.batch('.scroll-reveal', {
        onEnter: batch => gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.12,
          ease: 'power3.out', overwrite: true
        }),
        start: 'top 88%'
      });

      // Stats counter — animate digits up on enter
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          document.querySelectorAll<HTMLElement>('.stat-count').forEach(el => {
            const to = parseInt(el.dataset['to'] ?? '0', 10);
            gsap.fromTo(el, { innerText: 0 }, {
              innerText: to, duration: 1.8,
              snap: { innerText: 1 }, ease: 'power2.out'
            });
          });
        }
      });

      // Chat section — matchMedia for different screens (pin only on desktop)
      const mm = gsap.matchMedia();
      const chatMsgs = Array.from(document.querySelectorAll<HTMLElement>('.chat-msg'));
      if (chatMsgs.length) {
        // Desktop: Pin and scrub messages
        mm.add('(min-width: 1024px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '.chat-section',
              start: 'top top',
              end: `+=${chatMsgs.length * 220}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1
            }
          });
          chatMsgs.forEach((msg, i) => {
            tl.from(msg, { opacity: 0, y: 28, duration: 0.8, ease: 'power2.out' }, i * 0.7);
          });
        });

        // Mobile/Tablet: No pinning! Smooth fade-up reveal on scroll enter
        mm.add('(max-width: 1023px)', () => {
          gsap.from(chatMsgs, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.chat-section',
              start: 'top 80%',
              once: true
            }
          });
        });
      }
    });
  }


  ngOnDestroy() {
    this.stopAutoplay();
    this.gsapCtx?.revert();
    this.waveCleanup?.();
  }

  startAutoplay() {
    this.contentInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.content.length;
    }, 4000);
  }

  stopAutoplay() {
    if (this.contentInterval) {
      clearInterval(this.contentInterval);
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  setIndex(index: number) {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.content.length;
    this.resetAutoplay();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.content.length) % this.content.length;
    this.resetAutoplay();
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }
}

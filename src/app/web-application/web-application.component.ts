import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-web-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-application.component.html',
  styleUrl: './web-application.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('staggerList', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger('100ms', [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.85)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class WebApplicationComponent implements OnInit {
  codeSnippet!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const raw = `<span class="wa-c-purple">@Component</span>({
  <span class="wa-c-teal">selector</span>: <span class="wa-c-green">'app-root'</span>,
  <span class="wa-c-teal">standalone</span>: <span class="wa-c-amber">true</span>,
})<span class="wa-cursor-blink">|</span>`;
    this.codeSnippet = this.sanitizer.bypassSecurityTrustHtml(raw);
  }

  lineNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  techPills = ['Angular', 'React', 'TypeScript', 'Node.js', 'AWS'];

  services = [
    {
      icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
      title: 'Enterprise Web Applications',
      desc: 'Scalable, role-based platforms handling millions of users — built on Angular or React with a microservices backend.',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    },
    {
      icon: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
      title: 'UI/UX Design & Prototyping',
      desc: 'Figma-first design systems, pixel-perfect components, and interactive prototypes that win stakeholder sign-off.',
      img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Progressive Web Apps (PWA)',
      desc: 'Offline-ready, installable web apps that feel native on any device — with push notifications and background sync.',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'API & Backend Integration',
      desc: 'RESTful and GraphQL APIs, OAuth2 authentication, and third-party integrations from Stripe to Salesforce.',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    },
    {
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
      title: 'Cloud-Native Deployment',
      desc: 'Containerised deployments on AWS, Azure, or GCP — with CI/CD pipelines, auto-scaling, and zero downtime.',
      img: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&q=80',
    },
    {
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
      title: 'Performance Optimisation',
      desc: 'Lighthouse audits, lazy loading, SSR with Angular Universal, and CDN tuning to hit 95+ performance scores.',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    },
  ];

  whyItems = [
    {
      icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      title: 'Component-Driven Architecture',
      desc: 'Reusable design systems and modular code that scale gracefully as your product grows.',
      bg: 'rgba(20,184,166,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=120&q=80',
      title: 'Rapid Iteration',
      desc: 'Agile sprints with weekly demos so you see progress, give feedback, and ship faster.',
      bg: 'rgba(14,165,233,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: 'Security by Default',
      desc: 'OWASP Top 10 mitigation, CSP headers, and penetration testing built into every release.',
      bg: 'rgba(99,102,241,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80',
      title: 'Responsive & Accessible',
      desc: 'WCAG 2.1 AA compliant, mobile-first layouts that work flawlessly on every screen size.',
      bg: 'rgba(245,158,11,0.12)',
    },
  ];

  techStack = [
    { icon: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=120&q=80', name: 'Angular 17+', desc: 'Enterprise SPA framework' },
    { icon: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=120&q=80', name: 'React 18', desc: 'Component UI library' },
    { icon: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=120&q=80', name: 'TypeScript', desc: 'Type-safe development' },
    { icon: 'https://images.unsplash.com/photo-1627390496608-7d6824d0140c?auto=format&fit=crop&w=120&q=80', name: 'Node.js', desc: 'Backend runtime' },
    { icon: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=120&q=80', name: 'Docker', desc: 'Container platform' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS / GCP', desc: 'Cloud infrastructure' },
    { icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', name: 'PostgreSQL', desc: 'Relational database' },
    { icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', name: 'Redis', desc: 'Caching & queues' },
  ];

  dashBars = [
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      label: 'Performance Score',
      pct: 98,
      val: '98/100',
      color: 'linear-gradient(90deg,#4ade80,#14b8a6)',
      labelColor: '#4ade80',
    },
    {
      icon: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=120&q=80',
      label: 'Accessibility',
      pct: 96,
      val: '96/100',
      color: 'linear-gradient(90deg,#14b8a6,#0ea5e9)',
      labelColor: '#14b8a6',
    },
    {
      icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80',
      label: 'Mobile UX',
      pct: 94,
      val: '94/100',
      color: 'linear-gradient(90deg,#0ea5e9,#6366f1)',
      labelColor: '#0ea5e9',
    },
    {
      icon: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
      label: 'SEO Score',
      pct: 100,
      val: '100/100',
      color: 'linear-gradient(90deg,#6366f1,#a78bfa)',
      labelColor: '#a78bfa',
    },
  ];

  features = [
    'Real-time error tracking with Sentry integration',
    'Core Web Vitals monitoring (LCP, FID, CLS)',
    'User session recordings and heatmaps',
    'Automated Lighthouse CI on every PR',
    'Custom analytics dashboard for stakeholders',
  ];

  faqs = [
    {
      question: 'Which frontend frameworks do you specialise in?',
      answer:
        'We specialise in Angular 17+ and React 18, with TypeScript across the board. We choose the right framework based on your team, scale, and long-term roadmap.',
      open: false,
    },
    {
      question: 'How long does it take to build a web application?',
      answer:
        'An MVP typically takes 6–12 weeks. A full enterprise platform can range from 3–6 months. We use agile sprints so you see working software every 2 weeks.',
      open: false,
    },
    {
      question: 'Do you handle backend and database development too?',
      answer:
        'Yes — we build full-stack applications with Node.js, Spring Boot, PostgreSQL, Redis, and integrate with any third-party API you need.',
      open: false,
    },
    {
      question: 'Can you optimise our existing slow web application?',
      answer:
        'Absolutely. We run a full performance audit (Lighthouse, Web Vitals, bundle analysis) and deliver a prioritised optimisation roadmap with measurable improvements.',
      open: false,
    },
  ];

  toggleFaq(i: number) {
    this.faqs[i].open = !this.faqs[i].open;
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

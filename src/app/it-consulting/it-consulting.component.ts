import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { RouterModule } from '@angular/router';

/* ── Reusable ease tokens ───────────────────── */
const SPRING = '0.7s cubic-bezier(0.16,1,0.3,1)';
const BOUNCE = '0.55s cubic-bezier(0.34,1.56,0.64,1)';
const SMOOTH = '0.65s ease';
const SPRING_D = '0.8s 0.15s cubic-bezier(0.16,1,0.3,1)'; // with delay

@Component({
  selector: 'app-it-consulting',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './it-consulting.component.html',
  styleUrls: ['./it-consulting.component.scss'],
  animations: [
    /* Hero left — fade + rise */
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate(
          '0.9s 0.1s cubic-bezier(0.16,1,0.3,1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),

    /* Hero right — slide from right */
    trigger('slideRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(70px)' }),
        animate(
          '0.9s 0.25s cubic-bezier(0.16,1,0.3,1)',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),

    /* Floating chips on hero */
    trigger('popIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.7)' }),
        animate(
          '0.6s 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          style({ opacity: 1, transform: 'scale(1)' }),
        ),
      ]),
    ]),

    /* Section headers & general fade-up (scroll-triggered) */
    trigger('fadeUp2', [
      state('out', style({ opacity: 0, transform: 'translateY(40px)' })),
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('out => in', animate('0.65s ease')),
    ]),

    /* Cards slide up (scroll-triggered) */
    trigger('cardUp', [
      state('out', style({ opacity: 0, transform: 'translateY(60px)' })),
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('out => in', animate('0.65s cubic-bezier(0.16,1,0.3,1)')),
    ]),

    /* Why section — image slides from left */
    trigger('slideLeft', [
      state('out', style({ opacity: 0, transform: 'translateX(-60px)' })),
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('out => in', animate('0.8s cubic-bezier(0.16,1,0.3,1)')),
    ]),

    /* Why section — content slides from right */
    trigger('slideRight2', [
      state('out', style({ opacity: 0, transform: 'translateX(60px)' })),
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('out => in', animate('0.8s cubic-bezier(0.16,1,0.3,1)')),
    ]),

    /* Why float card pop (scroll-triggered) */
    trigger('popIn2', [
      state('out', style({ opacity: 0, transform: 'scale(0.75)' })),
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition('out => in', animate('0.5s cubic-bezier(0.34,1.56,0.64,1)')),
    ]),

    /* Why list rows stagger */
    trigger('staggerUp', [
      state('out', style({ opacity: 0, transform: 'translateX(-20px)' })),
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('out => in', animate('0.5s ease')),
    ]),

    /* Process nodes pop */
    trigger('stepPop', [
      state('out', style({ opacity: 0, transform: 'translateY(40px) scale(0.9)' })),
      state('in', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      transition('out => in', animate('0.5s cubic-bezier(0.34,1.56,0.64,1)')),
    ]),

    /* Hero trust row items */
    trigger('staggerIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('0.5s 0.8s ease', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ItConsultingComponent implements OnInit, AfterViewInit {
  @ViewChild('servicesRef') servicesRef!: ElementRef;

  vis = false; // scroll visibility flag

  /* ── Hero trust row ──────────────────────── */

  /* ── Services ───────────────────────────── */
  services = [
    {
      icon: '🗺️',
      color: '#0ea5e9',
      iconBg: 'rgba(14,165,233,0.15)',
      bg: '#f0f9ff',
      img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&q=75',
      title: 'IT Strategy & Roadmap',
      desc: 'Clear, achievable technology roadmaps aligned with your long-term business vision.',
      hov: false,
    },
    {
      icon: '☁️',
      color: '#6366f1',
      iconBg: 'rgba(99,102,241,0.15)',
      bg: '#f5f3ff',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=75',
      title: 'Cloud Advisory',
      desc: 'Plan and execute cloud adoption on AWS, Azure, and GCP for maximum ROI.',
      hov: false,
    },
    {
      icon: '🔄',
      color: '#10b981',
      iconBg: 'rgba(16,185,129,0.15)',
      bg: '#f0fdf4',
      img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=75',
      title: 'Digital Transformation',
      desc: 'Modernise legacy systems and processes with cutting-edge digital solutions.',
      hov: false,
    },
    {
      icon: '🛡️',
      color: '#ef4444',
      iconBg: 'rgba(239,68,68,0.15)',
      bg: '#fff1f2',
      img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&q=75',
      title: 'Risk & Compliance',
      desc: 'Identify vulnerabilities and build resilient IT governance frameworks.',
      hov: false,
    },
    {
      icon: '🤝',
      color: '#f59e0b',
      iconBg: 'rgba(245,158,11,0.15)',
      bg: '#fffbeb',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=75',
      title: 'Vendor Selection',
      desc: 'Evaluate and select the right technology partners for your needs.',
      hov: false,
    },
    {
      icon: '📊',
      color: '#06b6d4',
      iconBg: 'rgba(6,182,212,0.15)',
      bg: '#ecfeff',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=75',
      title: 'IT Cost Optimisation',
      desc: 'Analyse IT spend, eliminate waste, and reduce infrastructure costs.',
      hov: false,
    },
  ];

  /* ── Why Us ──────────────────────────────── */
  whyItems = [
    {
      icon: '🎯',
      bg: '#e0f2fe',
      title: 'Business-First Approach',
      desc: 'Every recommendation is grounded in your goals, not just tech preferences.',
    },
    {
      icon: '👥',
      bg: '#d1fae5',
      title: 'Senior-Only Consultants',
      desc: 'Work directly with experts — no juniors, no hand-offs, ever.',
    },
    {
      icon: '📐',
      bg: '#ede9fe',
      title: 'Proven Frameworks',
      desc: 'Battle-tested methodologies from TOGAF, ITIL, and agile transformation.',
    },
    {
      icon: '📦',
      bg: '#fef9c3',
      title: 'End-to-End Ownership',
      desc: 'We stay accountable for outcomes — not just deliverables.',
    },
  ];

  /* ── Process ─────────────────────────────── */
  steps = [
    {
      num: '01',
      color: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
      img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80',
      title: 'Discovery',
      desc: 'Deep-dive into your IT landscape and strategic goals.',
    },
    {
      num: '02',
      color: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80',
      title: 'Strategy',
      desc: 'Craft a tailored roadmap with prioritised initiatives.',
    },
    {
      num: '03',
      color: 'linear-gradient(135deg,#8b5cf6,#f59e0b)',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80',
      title: 'Execute',
      desc: 'Guide your teams with expert oversight and change management.',
    },
    {
      num: '04',
      color: 'linear-gradient(135deg,#f59e0b,#10b981)',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      title: 'Optimise',
      desc: 'Measure outcomes and continuously refine for sustained value.',
    },
  ];

  /* ── Industries ─────────────────────────── */
  industries = [
    {
      icon: '🏥',
      name: 'Healthcare',
      img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=70',
    },
    {
      icon: '🏦',
      name: 'Banking',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=70',
    },
    {
      icon: '🛒',
      name: 'Retail',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=70',
    },
    {
      icon: '🏭',
      name: 'Manufacturing',
      img: 'https://images.unsplash.com/photo-1565793979540-c5ccf3dcba02?w=400&q=70',
    },
    {
      icon: '📚',
      name: 'Education',
      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=70',
    },
    {
      icon: '🚚',
      name: 'Logistics',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=70',
    },
  ];

  /* ── Testimonials ────────────────────────── */
  testimonials = [
    {
      text: 'Their strategic roadmap saved us 40% in operational costs within the first year. Truly transformational.',
      name: 'Sarah Mitchell',
      role: 'CTO, FinEdge Solutions',
      initials: 'SM',
      avBg: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    },
    {
      text: 'Exceptional cloud advisory team. Our AWS migration was flawless with zero downtime — world-class work.',
      name: 'David Okafor',
      role: 'VP Technology, MediCore Group',
      initials: 'DO',
      avBg: 'linear-gradient(135deg,#10b981,#0ea5e9)',
    },
    {
      text: 'Senior-only consultants made all the difference. Expert guidance from day one to go-live, no surprises.',
      name: 'Priya Sharma',
      role: 'Head of IT, RetailFirst Ltd.',
      initials: 'PS',
      avBg: 'linear-gradient(135deg,#8b5cf6,#f59e0b)',
    },
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.checkVis(), 400);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.checkVis();
  }

  private checkVis(): void {
    if (!this.servicesRef) return;
    const r = this.servicesRef.nativeElement.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) this.vis = true;
  }
}

import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-devops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devops.component.html',
  styleUrls: ['./devops.component.scss'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-70px)' }),
        animate('1s cubic-bezier(0.16,1,0.3,1)', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(70px)' }),
        animate(
          '1s 0.25s cubic-bezier(0.16,1,0.3,1)',
          style({ opacity: 1, transform: 'translateX(0)' }),
        ),
      ]),
    ]),
    trigger('floatBadge', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.88)' }),
        animate(
          '0.7s 0.55s cubic-bezier(0.34,1.56,0.64,1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate('1s 1s ease', style({ opacity: 1 }))]),
    ]),
    trigger('statPop', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.75) translateY(24px)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      transition('hidden => visible', animate('0.55s cubic-bezier(0.34,1.56,0.64,1)')),
    ]),
    trigger('sectionFade', [
      state('hidden', style({ opacity: 0, transform: 'translateY(44px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.75s ease')),
    ]),
    trigger('cardSlide', [
      state('hidden', style({ opacity: 0, transform: 'translateY(55px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.65s cubic-bezier(0.16,1,0.3,1)')),
    ]),
    trigger('techPop', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.7)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('0.45s cubic-bezier(0.34,1.56,0.64,1)')),
    ]),
    trigger('stepFade', [
      state('hidden', style({ opacity: 0, transform: 'translateY(36px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('0.65s ease')),
    ]),
  ],
})
export class DevopsComponent implements OnInit, AfterViewInit {
  @ViewChild('servicesRef') servicesRef!: ElementRef;

  servicesVisible = false;
  statsVisible = false;

  heroPills = ['Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'AWS'];

  // ── Pipeline ──────────────────────────────────────────────────
  pipelineStages = [
    { name: 'Source', emoji: '📁', label: 'main branch', status: 'done' },
    { name: 'Build', emoji: '🔨', label: 'Docker built', status: 'done' },
    { name: 'Test', emoji: '🧪', label: '247 passed', status: 'done' },
    { name: 'Scan', emoji: '🔍', label: '0 vulns', status: 'done' },
    { name: 'Deploy', emoji: '🚀', label: 'to k8s…', status: 'running' },
    { name: 'Monitor', emoji: '📊', label: 'watching…', status: 'pending' },
  ];

  stageColor(s: string) {
    return s === 'done' ? '#10b981' : s === 'running' ? '#0ea5e9' : '#cbd5e1';
  }
  stageIcon(s: string) {
    return s === 'done' ? '✓' : s === 'running' ? '⟳' : '○';
  }

  // ── Services ──────────────────────────────────────────────────
  services = [
    {
      icon: '⚙️',
      color: '#0ea5e9',
      iconBg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
      img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=70',
      title: 'CI/CD Pipelines',
      desc: 'Automate build, test, and deployment workflows with Jenkins, GitHub Actions, and GitLab CI.',
      hovered: false,
    },
    {
      icon: '☁️',
      color: '#6366f1',
      iconBg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=70',
      title: 'Cloud Infrastructure',
      desc: 'Design and manage scalable cloud environments on AWS, Azure, and GCP with Terraform IaC.',
      hovered: false,
    },
    {
      icon: '🐳',
      color: '#06b6d4',
      iconBg: 'linear-gradient(135deg,#cffafe,#a5f3fc)',
      img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=70',
      title: 'Containerization',
      desc: 'Containerize workloads with Docker and orchestrate at scale with Kubernetes for high availability.',
      hovered: false,
    },
    {
      icon: '📊',
      color: '#f59e0b',
      iconBg: 'linear-gradient(135deg,#fef9c3,#fef08a)',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=70',
      title: 'Monitoring & Observability',
      desc: 'Full-stack observability with Prometheus, Grafana, ELK Stack, and Datadog for real-time insights.',
      hovered: false,
    },
    {
      icon: '🔒',
      color: '#ef4444',
      iconBg: 'linear-gradient(135deg,#fee2e2,#fecaca)',
      img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=70',
      title: 'Security & Compliance',
      desc: 'Security in every pipeline stage — automated SAST/DAST, vulnerability scanning, and audit logs.',
      hovered: false,
    },
    {
      icon: '🔄',
      color: '#10b981',
      iconBg: 'linear-gradient(135deg,#d1fae5,#a7f3d0)',
      img: 'https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?w=400&q=70',
      title: 'GitOps & Automation',
      desc: 'Adopt GitOps with ArgoCD and Flux for declarative, version-controlled infrastructure management.',
      hovered: false,
    },
  ];

  // ── Tools ─────────────────────────────────────────────────────
  tools = [
    {
      icon: '🔧',
      name: 'Jenkins',
      category: 'CI/CD',
      bg: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    },
    {
      icon: '🐳',
      name: 'Docker',
      category: 'Container',
      bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)',
    },
    {
      icon: '⎈',
      name: 'Kubernetes',
      category: 'Orchestration',
      bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
    },
    {
      icon: '🏗️',
      name: 'Terraform',
      category: 'IaC',
      bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
    },
    { icon: '☁️', name: 'AWS', category: 'Cloud', bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)' },
    {
      icon: '🚀',
      name: 'GitHub Actions',
      category: 'CI/CD',
      bg: 'linear-gradient(135deg,#f0fdf4,#bbf7d0)',
    },
    {
      icon: '📈',
      name: 'Prometheus',
      category: 'Monitoring',
      bg: 'linear-gradient(135deg,#fff1f2,#fecdd3)',
    },
    {
      icon: '📊',
      name: 'Grafana',
      category: 'Visualization',
      bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)',
    },
    {
      icon: '⚡',
      name: 'Ansible',
      category: 'Automation',
      bg: 'linear-gradient(135deg,#fef9c3,#fef08a)',
    },
    {
      icon: '🔄',
      name: 'ArgoCD',
      category: 'GitOps',
      bg: 'linear-gradient(135deg,#ecfdf5,#a7f3d0)',
    },
    {
      icon: '🔐',
      name: 'Vault',
      category: 'Security',
      bg: 'linear-gradient(135deg,#fee2e2,#fecaca)',
    },
    {
      icon: '⛵',
      name: 'Helm',
      category: 'K8s Pkg',
      bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
    },
  ];

  // ── Process Steps ─────────────────────────────────────────────
  processSteps = [
    {
      num: '01',
      color: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
      img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&q=80',
      title: 'Assessment',
      desc: 'Analyze current infrastructure, workflows, and bottlenecks to craft a tailored DevOps strategy.',
    },
    {
      num: '02',
      color: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80',
      title: 'Design',
      desc: 'Architect cloud-native solutions and define CI/CD pipelines aligned with your business goals.',
    },
    {
      num: '03',
      color: 'linear-gradient(135deg,#8b5cf6,#f59e0b)',
      img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=80',
      title: 'Implement',
      desc: 'Deploy automation tools, containerize workloads, and establish monitoring and alerting systems.',
    },
    {
      num: '04',
      color: 'linear-gradient(135deg,#f59e0b,#10b981)',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
      title: 'Optimize',
      desc: 'Continuously improve performance, reduce costs, and enhance reliability through data-driven insights.',
    },
  ];

  // ── Lifecycle ──────────────────────────────────────────────────
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.checkVisibility(), 300);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    if (this.servicesRef) {
      const rect = this.servicesRef.nativeElement.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        this.servicesVisible = true;
        this.statsVisible = true;
      }
    }
  }
}

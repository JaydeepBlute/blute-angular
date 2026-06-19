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
    { name: 'Source', emoji: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', label: 'main branch', status: 'done' },
    { name: 'Build', emoji: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=120&q=80', label: 'Docker built', status: 'done' },
    { name: 'Test', emoji: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=120&q=80', label: '247 passed', status: 'done' },
    { name: 'Scan', emoji: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=120&q=80', label: '0 vulns', status: 'done' },
    { name: 'Deploy', emoji: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=120&q=80', label: 'to k8s…', status: 'running' },
    { name: 'Monitor', emoji: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80', label: 'watching…', status: 'pending' },
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
      icon: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=120&q=80',
      color: '#0ea5e9',
      iconBg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
      img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=70',
      title: 'CI/CD Pipelines',
      desc: 'Automate build, test, and deployment workflows with Jenkins, GitHub Actions, and GitLab CI.',
      hovered: false,
    },
    {
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
      color: '#6366f1',
      iconBg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=70',
      title: 'Cloud Infrastructure',
      desc: 'Design and manage scalable cloud environments on AWS, Azure, and GCP with Terraform IaC.',
      hovered: false,
    },
    {
      icon: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=120&q=80',
      color: '#06b6d4',
      iconBg: 'linear-gradient(135deg,#cffafe,#a5f3fc)',
      img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=70',
      title: 'Containerization',
      desc: 'Containerize workloads with Docker and orchestrate at scale with Kubernetes for high availability.',
      hovered: false,
    },
    {
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
      color: '#f59e0b',
      iconBg: 'linear-gradient(135deg,#fef9c3,#fef08a)',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=70',
      title: 'Monitoring & Observability',
      desc: 'Full-stack observability with Prometheus, Grafana, ELK Stack, and Datadog for real-time insights.',
      hovered: false,
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      color: '#ef4444',
      iconBg: 'linear-gradient(135deg,#fee2e2,#fecaca)',
      img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=70',
      title: 'Security & Compliance',
      desc: 'Security in every pipeline stage — automated SAST/DAST, vulnerability scanning, and audit logs.',
      hovered: false,
    },
    {
      icon: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      name: 'Jenkins',
      category: 'CI/CD',
      bg: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
      name: 'Terraform',
      category: 'IaC',
      bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
    },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS', category: 'Cloud', bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)' },
    {
      icon: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=120&q=80',
      name: 'GitHub Actions',
      category: 'CI/CD',
      bg: 'linear-gradient(135deg,#f0fdf4,#bbf7d0)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
      name: 'Prometheus',
      category: 'Monitoring',
      bg: 'linear-gradient(135deg,#fff1f2,#fecdd3)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
      name: 'Grafana',
      category: 'Visualization',
      bg: 'linear-gradient(135deg,#fff7ed,#fed7aa)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      name: 'Ansible',
      category: 'Automation',
      bg: 'linear-gradient(135deg,#fef9c3,#fef08a)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=120&q=80',
      name: 'ArgoCD',
      category: 'GitOps',
      bg: 'linear-gradient(135deg,#ecfdf5,#a7f3d0)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80',
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

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-devsecops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devsecops.component.html',
  styleUrl: './devsecops.component.scss',
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
            stagger('120ms', [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class DevSecOpsComponent implements OnInit {
  stats = [
    { value: '3×', label: 'Faster Deployments' },
    { value: '90%', label: 'Fewer Security Bugs' },
    { value: '100%', label: 'Automated Compliance' },
    { value: '< 5ms', label: 'Avg. Scan Overhead' },
  ];

  services = [
    {
      icon: '🔍',
      title: 'SAST & DAST Scanning',
      desc: 'Static and dynamic analysis baked into every PR — catch vulnerabilities before they reach production.',
      bg: 'rgba(20,184,166,0.10)',
    },
    {
      icon: '🔄',
      title: 'CI/CD Security Gates',
      desc: 'Automated policy enforcement at every pipeline stage with zero-tolerance security checkpoints.',
      bg: 'rgba(14,165,233,0.10)',
    },
    {
      icon: '🛡️',
      title: 'Container & Image Security',
      desc: 'Scan Docker images for CVEs, misconfigs, and malicious packages before deployment.',
      bg: 'rgba(99,102,241,0.10)',
    },
    {
      icon: '📋',
      title: 'Compliance as Code',
      desc: 'Automate SOC2, ISO 27001, PCI-DSS, and HIPAA compliance checks across your infrastructure.',
      bg: 'rgba(245,158,11,0.10)',
    },
    {
      icon: '🔑',
      title: 'Secrets Management',
      desc: 'Detect and rotate leaked secrets across repos, pipelines, and cloud environments automatically.',
      bg: 'rgba(20,184,166,0.10)',
    },
    {
      icon: '📊',
      title: 'Security Observability',
      desc: 'Unified dashboards for threat detection, audit logs, and security posture scoring in real time.',
      bg: 'rgba(14,165,233,0.10)',
    },
  ];

  whyItems = [
    {
      icon: '🚀',
      title: 'Shift-Left Security',
      desc: 'Catch vulnerabilities at commit time — not after deployment — dramatically reducing fix costs.',
      bg: 'rgba(20,184,166,0.12)',
    },
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      desc: 'Machine-learning triage cuts false positives by 80%, so engineers focus on real risks.',
      bg: 'rgba(14,165,233,0.12)',
    },
    {
      icon: '🔧',
      title: 'Tool-Agnostic Integration',
      desc: 'Works with GitHub Actions, GitLab CI, Jenkins, ArgoCD, Terraform, and 50+ tools.',
      bg: 'rgba(99,102,241,0.12)',
    },
    {
      icon: '📈',
      title: 'Measurable ROI',
      desc: 'Customers report 3× faster releases and 90% fewer production security incidents.',
      bg: 'rgba(245,158,11,0.12)',
    },
  ];

  dashBars = [
    {
      icon: '💻',
      label: 'Code Analysis',
      pct: 100,
      status: 'Passed',
      color: 'linear-gradient(90deg,#4ade80,#14b8a6)',
      labelColor: '#4ade80',
    },
    {
      icon: '🔨',
      label: 'Build & SAST',
      pct: 100,
      status: 'Passed',
      color: 'linear-gradient(90deg,#14b8a6,#0ea5e9)',
      labelColor: '#14b8a6',
    },
    {
      icon: '🧪',
      label: 'Tests & DAST',
      pct: 85,
      status: 'Running…',
      color: 'linear-gradient(90deg,#0ea5e9,#6366f1)',
      labelColor: '#0ea5e9',
    },
    {
      icon: '☁️',
      label: 'Deploy & Audit',
      pct: 60,
      status: 'Queued',
      color: 'linear-gradient(90deg,#6366f1,#a78bfa)',
      labelColor: '#a78bfa',
    },
  ];

  features = [
    'Real-time SAST/DAST results in pull requests',
    'Automated rollback on security gate failure',
    'CVE trending and remediation tracking',
    'Secrets detection across all git history',
    'Compliance report generation on every release',
  ];

  faqs = [
    {
      question: 'What CI/CD tools do you integrate with?',
      answer:
        'We support GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps, ArgoCD, and more — with native plugins for each.',
      open: false,
    },
    {
      question: 'How does shift-left security reduce costs?',
      answer:
        'Fixing a vulnerability at code-review time costs ~10× less than fixing it post-deployment. Our tools surface issues instantly in the developer workflow.',
      open: false,
    },
    {
      question: 'Can you help us achieve SOC2 compliance?',
      answer:
        'Yes — our Compliance as Code module automates evidence collection, control mapping, and audit reporting for SOC2 Type II, ISO 27001, and PCI-DSS.',
      open: false,
    },
    {
      question: 'Will security scanning slow down our pipelines?',
      answer:
        'Our incremental scanning approach adds less than 5ms overhead per commit. Parallel scan execution means no impact on developer velocity.',
      open: false,
    },
  ];

  toggleFaq(i: number) {
    this.faqs[i].open = !this.faqs[i].open;
  }

  ngOnInit() {}
}

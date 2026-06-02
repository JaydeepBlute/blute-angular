import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-networking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './networking.component.html',
  styleUrl: './networking.component.scss',
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
export class NetworkingComponent implements OnInit {
  stats = [
    { value: '99.99%', label: 'Network Uptime' },
    { value: '10 Gbps', label: 'Core Bandwidth' },
    { value: '500+', label: 'Global Nodes' },
    { value: '< 5ms', label: 'Avg Latency' },
  ];

  services = [
    {
      icon: '🏗️',
      title: 'Network Architecture & Design',
      desc: 'Custom-designed LAN, WAN, and SD-WAN solutions aligned to your business requirements.',
      bg: 'rgba(20,184,166,0.1)',
    },
    {
      icon: '☁️',
      title: 'Cloud Networking',
      desc: 'Seamless hybrid and multi-cloud connectivity across AWS, Azure, and GCP environments.',
      bg: 'rgba(14,165,233,0.1)',
    },
    {
      icon: '🔒',
      title: 'Secure Network Access',
      desc: 'Zero-trust network access, VPN, and firewall management for a secure perimeter.',
      bg: 'rgba(99,102,241,0.1)',
    },
    {
      icon: '📊',
      title: 'Network Monitoring & NOC',
      desc: '24/7 NOC with real-time dashboards, anomaly detection, and proactive alerting.',
      bg: 'rgba(245,158,11,0.1)',
    },
    {
      icon: '⚡',
      title: 'SD-WAN Solutions',
      desc: 'Software-defined WAN for intelligent traffic routing, reduced costs, and better performance.',
      bg: 'rgba(20,184,166,0.1)',
    },
    {
      icon: '🌍',
      title: 'Global Connectivity',
      desc: 'MPLS, internet leased lines, and carrier-grade infrastructure across 60+ countries.',
      bg: 'rgba(14,165,233,0.1)',
    },
  ];

  whyItems = [
    {
      icon: '⚡',
      title: 'Ultra-Low Latency',
      desc: 'Sub-5ms latency across our backbone with intelligent traffic engineering.',
      bg: 'rgba(20,184,166,0.12)',
    },
    {
      icon: '🛡️',
      title: 'Built-In Security',
      desc: 'Every network layer is hardened with zero-trust principles and DDoS protection.',
      bg: 'rgba(14,165,233,0.12)',
    },
    {
      icon: '📈',
      title: 'Elastic Scalability',
      desc: 'Scale bandwidth on-demand — no hardware procurement, no downtime.',
      bg: 'rgba(99,102,241,0.12)',
    },
    {
      icon: '🔧',
      title: '24/7 Expert Support',
      desc: 'Dedicated network engineers available around the clock for rapid resolution.',
      bg: 'rgba(245,158,11,0.12)',
    },
  ];

  dashBars = [
    { label: 'Core Bandwidth', pct: 92, color: 'linear-gradient(90deg,#14b8a6,#0ea5e9)' },
    { label: 'WAN Utilisation', pct: 78, color: 'linear-gradient(90deg,#0ea5e9,#6366f1)' },
    { label: 'Latency Score', pct: 97, color: 'linear-gradient(90deg,#4ade80,#14b8a6)' },
    { label: 'Packet Loss', pct: 99, color: 'linear-gradient(90deg,#4ade80,#22d3ee)' },
  ];

  features = [
    'Live traffic heatmaps across all regions',
    'Automated failover & redundancy switching',
    'Per-device bandwidth & QoS reporting',
    'AI-driven capacity forecasting',
    'Instant alert escalation via Slack / PagerDuty',
  ];

  faqs = [
    {
      question: 'What types of businesses do you serve?',
      answer:
        'We serve SMBs to large enterprises across Finance, Healthcare, Retail, Manufacturing, and Government sectors.',
      open: false,
    },
    {
      question: 'Can you manage our existing network infrastructure?',
      answer:
        'Yes — our managed network services support multi-vendor environments including Cisco, Juniper, Palo Alto, and more.',
      open: false,
    },
    {
      question: 'How quickly can you deploy a new network?',
      answer:
        'Typical deployments range from 2 weeks for standard setups to 8 weeks for complex multi-site architectures.',
      open: false,
    },
    {
      question: 'Do you offer SLA-backed uptime guarantees?',
      answer:
        'Yes — we offer 99.99% uptime SLAs with financial penalties if targets are missed, giving you full accountability.',
      open: false,
    },
  ];

  toggleFaq(i: number) {
    this.faqs[i].open = !this.faqs[i].open;
  }

  ngOnInit() {}
}

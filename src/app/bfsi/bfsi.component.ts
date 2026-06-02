import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
  keyframes,
} from '@angular/animations';

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const EXPO = 'cubic-bezier(0.19, 1, 0.22, 1)';
const SMOOTH = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

@Component({
  selector: 'app-bfsi',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bfsi.component.html',
  animations: [
    // Same as retail page
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate(`600ms ease-out`, style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate(`600ms ease-out`, style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate(`600ms ease-out`, style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(`600ms ${SMOOTH}`, style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),

    // Stagger cards — 3D flip up
    trigger('staggerCards', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({
              opacity: 0,
              transform: 'perspective(600px) rotateX(30deg) translateY(40px)',
              filter: 'blur(3px)',
            }),
            stagger(80, [
              animate(
                `550ms ${SPRING}`,
                style({
                  opacity: 1,
                  transform: 'perspective(600px) rotateX(0) translateY(0)',
                  filter: 'blur(0)',
                }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),

    // Pills slide from left
    trigger('staggerPills', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({ opacity: 0, transform: 'translateX(-20px) scale(0.9)' }),
            stagger(50, [
              animate(
                `400ms ${SPRING}`,
                style({ opacity: 1, transform: 'translateX(0) scale(1)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),

    // Process steps
    trigger('staggerSteps', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({ opacity: 0, transform: 'translateX(-40px)', filter: 'blur(4px)' }),
            stagger(120, [
              animate(
                `550ms ${SPRING}`,
                style({ opacity: 1, transform: 'translateX(0)', filter: 'blur(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),

    // Card drop animations for floating hero cards
    trigger('cardDrop1', [
      transition(':enter', [
        animate(
          `700ms 300ms ${SPRING}`,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateY(-60px) rotate(-8deg) scale(0.8)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'translateY(6px) rotate(1deg) scale(1.04)',
              offset: 0.65,
            }),
            style({ opacity: 1, transform: 'translateY(0) rotate(0deg) scale(1)', offset: 1 }),
          ]),
        ),
      ]),
    ]),
    trigger('cardDrop2', [
      transition(':enter', [
        animate(
          `700ms 500ms ${SPRING}`,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(60px) translateY(40px) rotate(8deg) scale(0.8)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'translateX(-4px) translateY(-4px) rotate(-1deg) scale(1.04)',
              offset: 0.65,
            }),
            style({
              opacity: 1,
              transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)',
              offset: 1,
            }),
          ]),
        ),
      ]),
    ]),
    trigger('cardDrop3', [
      transition(':enter', [
        animate(
          `700ms 700ms ${SPRING}`,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(80px) scale(0.6) rotate(15deg)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'translateX(-6px) scale(1.05) rotate(-2deg)',
              offset: 0.65,
            }),
            style({ opacity: 1, transform: 'translateX(0) scale(1) rotate(0deg)', offset: 1 }),
          ]),
        ),
      ]),
    ]),
    trigger('centerPop', [
      transition(':enter', [
        animate(
          `800ms 900ms ${SPRING}`,
          keyframes([
            style({ opacity: 0, transform: 'scale(0) rotate(-30deg)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1.2) rotate(6deg)', offset: 0.55 }),
            style({ opacity: 1, transform: 'scale(1) rotate(0deg)', offset: 1 }),
          ]),
        ),
      ]),
    ]),

    // CTA vault drop
    trigger('vaultIn', [
      transition(':enter', [
        animate(
          `900ms ${SPRING}`,
          keyframes([
            style({
              opacity: 0,
              transform: 'perspective(1000px) rotateX(-20deg) translateY(-50px) scale(0.94)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'perspective(1000px) rotateX(3deg) translateY(4px) scale(1.01)',
              offset: 0.7,
            }),
            style({
              opacity: 1,
              transform: 'perspective(1000px) rotateX(0) translateY(0) scale(1)',
              offset: 1,
            }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class BfsiComponent implements OnInit {
  isVisible = false;

  trustBadges = [
    { icon: '🏦', label: 'RBI Compliant' },
    { icon: '🔒', label: 'PCI-DSS Certified' },
    { icon: '📜', label: 'ISO 27001' },
    { icon: '🇮🇳', label: 'SEBI Guidelines' },
    { icon: '🌐', label: 'GDPR Ready' },
    { icon: '⚡', label: '99.9% Uptime SLA' },
  ];

  challenges = [
    {
      icon: '🔐',
      title: 'Cybersecurity Threats',
      desc: 'Protecting sensitive financial data from evolving threats, fraud, and ransomware attacks.',
    },
    {
      icon: '📜',
      title: 'Regulatory Compliance',
      desc: 'Meeting RBI, SEBI, Basel III, GDPR, and PCI-DSS standards across all operations.',
    },
    {
      icon: '🏛️',
      title: 'Legacy Core Systems',
      desc: 'Modernising outdated core banking platforms without disrupting live financial operations.',
    },
    {
      icon: '📈',
      title: 'Real-Time Analytics',
      desc: 'Instant risk assessments, fraud detection, and market data processing at massive scale.',
    },
  ];

  solutions = [
    {
      title: 'Core Banking Modernisation',
      desc: 'Cloud-native core banking with real-time processing, microservices, and API-first design for modern financial institutions.',
      svg: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80',
      tags: ['Microservices', 'Spring Boot', 'Kafka'],
    },
    {
      title: 'Digital Banking & UPI Apps',
      desc: 'Mobile and internet banking with UPI, NEFT, IMPS integration and AI-driven personalised financial insights.',
      svg: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=80',
      tags: ['React Native', 'Angular', 'UPI APIs'],
    },

    {
      title: 'InsurTech Platforms',
      desc: 'Digital insurance with automated underwriting, claims processing, and IoT-based usage-based insurance.',
      svg: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80',
      tags: ['IoT', 'Blockchain', 'REST APIs'],
    },
    {
      title: 'Wealth & Investment Platforms',
      desc: 'Robo-advisory, portfolio management, algorithmic trading, and real-time market data dashboards.',
      svg: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80',
      tags: ['Algo Trading', 'Python', 'Power BI'],
    },
    {
      title: 'Compliance & RegTech',
      desc: 'Automated KYC/AML workflows, audit trails, and real-time regulatory monitoring for RBI, SEBI, and IRDAI.',
      svg: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80',
      tags: ['KYC', 'AML', 'RegTech'],
    },
  ];

  process = [
    {
      title: 'Financial Domain Analysis',
      desc: 'We assess your tech stack, regulatory obligations, and business workflows before scoping any solution.',
    },
    {
      title: 'Compliant Architecture Design',
      desc: 'PCI-DSS, RBI, and GDPR-aligned blueprints with zero-trust security and high-availability design.',
    },
    {
      title: 'Agile Build & UAT',
      desc: 'Sprint-based delivery with compliance checkpoints, pen testing, and user acceptance testing.',
    },
    {
      title: 'Go-Live & 24/7 Support',
      desc: 'Dedicated BFSI support for zero-downtime operations, incident response, and regulatory patching.',
    },
  ];

  techStack = [
    { icon: '🅰️', name: 'Angular / React', role: 'Frontend' },
    { icon: '☕', name: 'Spring Boot', role: 'Backend' },
    { icon: '☁️', name: 'AWS / Azure', role: 'Cloud' },
    { icon: '🔗', name: 'Open Banking APIs', role: 'Integrations' },
    { icon: '🗄️', name: 'Oracle / Postgres', role: 'Database' },
    { icon: '🔐', name: 'OAuth2 / Keycloak', role: 'Security' },
  ];

  integrations = [
    { icon: '🏦', name: 'Core Banking' },
    { icon: '💳', name: 'PCI-DSS Vault' },
    { icon: '📲', name: 'UPI / NPCI' },
    { icon: '📊', name: 'Bloomberg' },
    { icon: '🔗', name: 'SWIFT' },
    { icon: '🛡️', name: 'KYC / AML' },
    { icon: '📈', name: 'NSE / BSE APIs' },
    { icon: '📬', name: 'Twilio / SMS' },
    { icon: '☁️', name: 'AWS FinSpace' },
    { icon: '🔒', name: 'HSM Encryption' },
    { icon: '📋', name: 'CIBIL / Experian' },
    { icon: '🏢', name: 'Salesforce CRM' },
  ];

  whyBlute = [
    {
      icon: '🏦',
      title: 'BFSI Domain Expertise',
      desc: 'Deep understanding of banking, insurance, and capital markets technology landscapes.',
    },
    {
      icon: '⚡',
      title: 'Compliant by Design',
      desc: 'PCI-DSS, RBI, SEBI, and GDPR compliance built into every layer from day one.',
    },
    {
      icon: '🔧',
      title: 'Full-Stack Ownership',
      desc: 'From customer apps to core integrations — one accountable partner for your whole stack.',
    },
    {
      icon: '🛡️',
      title: '24/7 Mission-Critical Support',
      desc: 'Round-the-clock monitoring for zero-downtime on your financial systems.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-telecom',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './telecom.component.html',
  styleUrls: ['./telecom.component.scss'],
  animations: [
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate(`700ms ${EXPO}`, style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate(`700ms 150ms ${EXPO}`, style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(`600ms ${SMOOTH}`, style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
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
export class TelecomComponent implements OnInit, OnDestroy {
  isVisible = false;
  scrollProgress = 0;

  private scrollListener = () => {
    const el = document.documentElement;
    this.scrollProgress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  };

  keyPoints = [
    'BSS/OSS transformation platforms enabling end-to-end subscriber lifecycle management.',
    '5G network slicing and virtualisation solutions for next-generation service delivery.',
    'AI-powered network operations centres (NOC) with predictive fault detection and automated remediation.',
    'Revenue assurance and fraud management systems reducing revenue leakage by up to 40%.',
    'Customer experience platforms integrating CRM, self-care portals, and omni-channel support.',
  ];

  challenges = [
    {
      icon: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=120&q=80',
      title: 'Network Modernisation',
      desc: 'Legacy network infrastructure struggles to support 5G, IoT, and the exponential growth in data traffic demands.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
      title: 'Revenue Leakage & Fraud',
      desc: 'Complex billing environments and sophisticated fraud schemes erode margins without robust assurance systems.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      title: 'Customer Churn',
      desc: 'Rising customer expectations and fierce competition make retention a constant challenge for operators.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=120&q=80',
      title: 'BSS/OSS Complexity',
      desc: 'Siloed back-office systems create operational inefficiencies, billing errors, and slow time-to-market for new services.',
    },
  ];

  solutions = [
    {
      title: 'BSS/OSS Transformation',
      desc: 'End-to-end business and operations support systems covering order management, billing, mediation, and service fulfilment.',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop',
      svg: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18',
      tags: ['BSS', 'OSS', 'Billing'],
    },
    {
      title: '5G & Network Virtualisation',
      desc: 'NFV, SDN, and network slicing platforms enabling operators to deploy and monetise 5G services at scale.',
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80&auto=format&fit=crop',
      svg: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
      tags: ['5G', 'NFV', 'SDN'],
    },
    {
      title: 'AI Network Operations (NOC)',
      desc: 'Intelligent NOC platforms with ML-based anomaly detection, automated fault resolution, and predictive maintenance.',
      image:
        'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=700&q=80&auto=format&fit=crop',
      svg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      tags: ['AI/ML', 'AIOps', 'NOC'],
    },
    {
      title: 'Revenue Assurance & Fraud Mgmt',
      desc: 'Real-time revenue assurance engines and ML fraud detection platforms protecting operator revenue across all services.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80&auto=format&fit=crop',
      svg: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      tags: ['Revenue Assurance', 'Fraud', 'ML'],
    },
    {
      title: 'Customer Experience Platforms',
      desc: 'Self-care portals, omni-channel CRM, and AI-powered chatbots that reduce churn and improve NPS scores.',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80&auto=format&fit=crop',
      svg: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      tags: ['CRM', 'Self-Care', 'Chatbot'],
    },
    {
      title: 'IoT Connectivity & Management',
      desc: 'Enterprise IoT connectivity platforms with SIM management, device lifecycle, and real-time telemetry for telcos.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80&auto=format&fit=crop',
      svg: 'M13 10V3L4 14h7v7l9-11h-7z',
      tags: ['IoT', 'eSIM', 'MVNO'],
    },
  ];

  telecomStats = [
    { val: '40%', label: 'Reduction in Revenue Leakage' },
    { val: '150+', label: 'Telecom Operators Served' },
    { val: '99.99%', label: 'Network Uptime Achieved' },
    { val: '60%', label: 'Faster Time-to-Market' },
  ];

  process = [
    {
      title: 'Network & BSS/OSS Assessment',
      desc: 'We audit your existing infrastructure, billing systems, and operational workflows to identify transformation gaps and quick wins.',
    },
    {
      title: 'Solution Architecture & Roadmap',
      desc: 'Custom telecom-grade architecture designed around your network topology, service portfolio, and compliance requirements.',
    },
    {
      title: 'Agile Development & Integration',
      desc: 'Phased delivery with continuous integration into live network systems, minimising service disruption during rollout.',
    },
    {
      title: 'Go-Live, NOC Handover & Support',
      desc: 'Full operational handover with NOC team training, runbook documentation, and 24/7 carrier-grade support.',
    },
  ];

  techStack = [
    { icon: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=120&q=80', name: 'Angular / React', role: 'Frontend' },
    { icon: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80', name: 'Spring Boot', role: 'Backend' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS / Azure', role: 'Cloud' },
    { icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80', name: 'Diameter / SIP', role: 'Telecom Protocols' },
    { icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80', name: 'TensorFlow', role: 'AI / ML' },
    { icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', name: 'Cassandra / Oracle', role: 'Database' },
    { icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', name: 'Kafka / RabbitMQ', role: 'Messaging' },
    { icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80', name: 'Keycloak / PKI', role: 'Security' },
  ];

  whyBlute = [
    {
      icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80',
      title: 'Deep Telecom Domain Expertise',
      desc: 'Decades of combined experience in BSS/OSS, network virtualisation, and carrier-grade platform engineering.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Carrier-Grade Reliability',
      desc: '99.99% uptime SLAs backed by proven high-availability architecture and redundant deployment models.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'End-to-End Ownership',
      desc: 'From network layer integrations to customer-facing apps — one accountable team for your full digital stack.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: '24/7 NOC-Level Support',
      desc: 'Round-the-clock operations monitoring and incident response aligned with telecom-grade SLA requirements.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

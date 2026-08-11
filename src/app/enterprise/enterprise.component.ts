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
  selector: 'app-enterprise',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enterprise.component.html',
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
  ],
})
export class EnterpriseComponent implements OnInit {
  isVisible = false;

  keyPoints = [
    'End-to-end SAP, Oracle, and Microsoft integration with real-time data synchronisation.',
    'Event-driven microservices architecture ensuring zero data loss and sub-second latency.',
    'Pre-built connectors for 50+ enterprise platforms — reducing integration effort by 40%.',
    'AI-powered workflow automation with intelligent exception handling and self-healing.',
    'ISO 27001, SOC2, and GDPR compliant security framework built into every integration.',
  ];

  challenges = [
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Disconnected Systems',
      desc: 'Siloed ERP, CRM, and legacy platforms causing data inconsistencies and slow operations.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
      title: 'Poor Data Visibility',
      desc: 'Lack of real-time insights across business units leading to delayed decision-making.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
      title: 'Scalability Bottlenecks',
      desc: 'On-premise infrastructure unable to scale with business growth and demand spikes.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: 'Security & Compliance',
      desc: 'Vulnerability to data breaches and struggle with SOC2, ISO 27001 & GDPR requirements.',
    },
  ];

  platforms = [
    { name: 'SAP', icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80', desc: 'S/4HANA, BTP, SuccessFactors, Ariba' },
    { name: 'Oracle', icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', desc: 'Oracle Cloud, EBS, Fusion, NetSuite' },
    { name: 'Microsoft', icon: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&w=120&q=80', desc: 'Azure, Dynamics 365, Power Platform' },
    { name: 'Salesforce', icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', desc: 'CRM, Marketing Cloud, MuleSoft' },
    { name: 'ServiceNow', icon: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80', desc: 'ITSM, HRSD, CSM workflows' },
    { name: 'Custom APIs', icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', desc: 'REST, GraphQL, SOAP, gRPC' },
  ];

  features = [
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Real-time Data Sync',
      desc: 'Bi-directional sync across all enterprise systems with sub-second latency.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
      title: 'Microservices Architecture',
      desc: 'Scalable, resilient integration layers using event-driven design patterns.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: 'Enterprise Security',
      desc: 'End-to-end encryption, OAuth 2.0, SAML, SOC2 & ISO 27001 compliant.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
      title: 'Analytics & Monitoring',
      desc: 'Real-time dashboards, alerting, and full audit trails for all touchpoints.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80',
      title: 'AI-Powered Automation',
      desc: 'Intelligent workflow automation with ML-based anomaly detection.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
      title: 'Multi-Cloud Support',
      desc: 'Deploy across AWS, Azure, GCP, or hybrid on-premise environments.',
    },
  ];

  process = [
    {
      title: 'Discovery & Assessment',
      desc: 'We deeply understand your existing systems, data flows, and integration gaps.',
    },
    {
      title: 'Architecture Design',
      desc: 'Design a scalable integration blueprint tailored to your business objectives.',
    },
    {
      title: 'Development & Testing',
      desc: 'Build robust integration layers with comprehensive automated test suites.',
    },
    {
      title: 'Deployment & Go-Live',
      desc: 'Zero-downtime deployment with phased rollout and rollback capabilities.',
    },
    {
      title: 'Monitor & Optimize',
      desc: 'Continuous monitoring, performance tuning, and iterative improvements.',
    },
  ];

  techStack = [
    { icon: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=120&q=80', name: 'Angular / React', role: 'Frontend' },
    { icon: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80', name: 'Spring Boot', role: 'Backend' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS / Azure', role: 'Cloud' },
    { icon: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=120&q=80', name: 'Docker / K8s', role: 'DevOps' },
    { icon: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=120&q=80', name: 'Apache Kafka', role: 'Messaging' },
    { icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', name: 'MuleSoft', role: 'Integration' },
  ];

  techBadges = [
    'Apache Kafka',
    'MuleSoft',
    'Azure Service Bus',
    'RabbitMQ',
    'AWS Step Functions',
    'Kubernetes',
    'Docker',
    'GraphQL',
    'REST APIs',
    'SOAP',
    'gRPC',
    'Terraform',
    'CI/CD',
    'Microservices',
  ];

  whyBlute = [
    {
      icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80',
      title: 'Deep Domain Expertise',
      desc: 'Years of delivering enterprise integrations across SAP, Oracle, and Microsoft ecosystems.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Rapid Time-to-Value',
      desc: 'Pre-built accelerators cut deployment time by up to 40%.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'End-to-End Ownership',
      desc: 'One accountable partner from architecture to go-live and beyond.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: '24/7 Mission-Critical Support',
      desc: 'Round-the-clock monitoring ensuring your systems never miss a beat.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

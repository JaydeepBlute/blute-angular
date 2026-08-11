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
  selector: 'app-manufacturing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manufacture.component.html',
  styleUrls: ['./manufacture.component.scss'],

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
export class ManufacturingComponent implements OnInit {
  isVisible = false;

  trustBadges = [
    { icon: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&q=80', label: 'Industry 4.0 Ready' },
    { icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80', label: 'ISO 9001 Certified' },
    { icon: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=120&q=80', label: 'IIoT Enabled' },
    { icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80', label: 'AI-Powered Automation' },
    { icon: '♻️', label: 'Sustainable Manufacturing' },
    { icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', label: '99.9% Uptime SLA' },
  ];

  keyPoints = [
    'End-to-end manufacturing execution systems (MES) with real-time production tracking and OEE dashboards.',
    'IIoT-enabled predictive maintenance reducing unplanned downtime by up to 45%.',
    'Seamless ERP integration with SAP, Oracle, and custom back-office systems.',
    'AI-driven quality control with computer vision for defect detection on the production line.',
    'Digital twin simulations enabling virtual factory planning and process optimisation.',
  ];

  challenges = [
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'Ageing Machinery & Legacy Systems',
      desc: 'Older equipment and siloed IT systems hinder real-time visibility and slow down decision-making across the shop floor.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
      title: 'Unplanned Downtime',
      desc: 'Reactive maintenance strategies lead to costly production halts, missed delivery windows, and reduced throughput.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
      title: 'Quality & Compliance',
      desc: 'Manual quality checks are error-prone and struggle to keep pace with high-volume production and regulatory requirements.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
      title: 'Supply Chain Disruptions',
      desc: 'Lack of end-to-end supply chain visibility leads to inventory imbalances, procurement delays, and order fulfilment failures.',
    },
  ];

  solutions = [
    {
      title: 'Smart Factory & MES',
      desc: 'Real-time manufacturing execution systems with OEE tracking, shift management, work order automation, and live shop floor dashboards.',
      image:
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80&auto=format&fit=crop',
      svg: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18',
      tags: ['MES', 'OEE', 'Real-Time'],
    },
    {
      title: 'IIoT & Predictive Maintenance',
      desc: 'Sensor-driven IoT platforms that monitor machine health, predict failures before they occur, and automate maintenance scheduling.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80&auto=format&fit=crop',
      svg: 'M13 10V3L4 14h7v7l9-11h-7z',
      tags: ['IIoT', 'ML', 'Edge Computing'],
    },
    {
      title: 'AI Quality Control',
      desc: 'Computer vision-based defect detection systems integrated directly into production lines for zero-defect manufacturing.',
      image:
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80&auto=format&fit=crop',
      svg: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      tags: ['Computer Vision', 'AI/ML', 'TensorFlow'],
    },
    {
      title: 'Supply Chain Management',
      desc: 'End-to-end supply chain visibility with demand forecasting, supplier collaboration portals, and automated procurement workflows.',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80&auto=format&fit=crop',
      svg: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10',
      tags: ['SCM', 'ERP', 'Analytics'],
    },
    {
      title: 'Digital Twin & Simulation',
      desc: 'Virtual factory models that mirror physical assets, enabling process simulation, layout optimisation, and risk-free experimentation.',
      image:
        'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=700&q=80&auto=format&fit=crop',
      svg: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
      tags: ['Digital Twin', '3D Simulation', 'AR/VR'],
    },
    {
      title: 'ERP & System Integration',
      desc: 'Seamless integration of SAP, Oracle, and custom ERP systems with shop floor data for unified planning and reporting.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop',
      svg: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
      tags: ['SAP', 'Oracle', 'REST APIs'],
    },
  ];

  mfgStats = [
    { val: '45%', label: 'Reduction in Unplanned Downtime' },
    { val: '30%', label: 'Increase in OEE' },
    { val: '200+', label: 'Factory Floors Digitised' },
    { val: '60%', label: 'Faster Quality Inspections' },
  ];

  process = [
    {
      title: 'Discovery & Shop Floor Assessment',
      desc: 'We audit your existing machinery, IT infrastructure, and workflows to identify digitisation opportunities and ROI gaps.',
    },
    {
      title: 'Solution Architecture & Roadmap',
      desc: 'Custom technology roadmap designed around your production goals, compliance needs, and budget constraints.',
    },
    {
      title: 'Agile Implementation & Integration',
      desc: 'Phased rollout with minimal production disruption — integrating with existing ERP, SCADA, and PLC systems.',
    },
    {
      title: 'Training, Go-Live & 24/7 Support',
      desc: 'Operator and manager training, smooth go-live, and round-the-clock support to keep your production line running.',
    },
  ];

  techStack = [
    { icon: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=120&q=80', name: 'Angular / React', role: 'Frontend' },
    { icon: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80', name: 'Spring Boot', role: 'Backend' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS / Azure', role: 'Cloud' },
    { icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80', name: 'MQTT / OPC-UA', role: 'IIoT Protocols' },
    { icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80', name: 'TensorFlow', role: 'AI / ML' },
    { icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', name: 'TimescaleDB', role: 'Time-Series DB' },
    { icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', name: 'SAP / Oracle ERP', role: 'ERP Integration' },
    { icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80', name: 'Keycloak / PKI', role: 'Security' },
  ];

  whyBlute = [
    {
      icon: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=120&q=80',
      title: 'Deep Manufacturing Domain Expertise',
      desc: 'Years of experience digitising discrete, process, and hybrid manufacturing environments across industries.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Rapid Time-to-Value',
      desc: 'Pre-built accelerators and proven integration frameworks that cut deployment time by up to 40%.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'End-to-End Ownership',
      desc: 'From shop floor sensors to executive dashboards — one accountable partner for your entire digital factory.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: '24/7 Mission-Critical Support',
      desc: 'Round-the-clock monitoring ensuring your production systems never miss a beat.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

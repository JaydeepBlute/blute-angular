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
  selector: 'app-transportation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss'],
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
export class TransportationComponent implements OnInit {
  isVisible = false;
  scrollProgress = 0;

  onScroll() {
    const el = document.documentElement;
    this.scrollProgress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  }

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
    window.addEventListener('scroll', () => this.onScroll());
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => this.onScroll());
  }

  trustBadges = [
    { icon: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=120&q=80', label: 'Smart Mobility Ready' },
    { icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80', label: 'ISO 27001 Certified' },
    { icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80', label: 'Real-Time Tracking' },
    { icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80', label: 'AI Route Optimisation' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', label: 'Multi-Modal Support' },
    { icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', label: '99.9% Uptime SLA' },
  ];

  keyPoints = [
    'Real-time fleet tracking and telematics platforms with live dashboards for dispatchers and managers.',
    'AI-powered route optimisation reducing fuel costs and delivery times by up to 35%.',
    'Seamless passenger app experiences with booking, tracking, payments, and notifications.',
    'Predictive vehicle maintenance systems reducing unplanned breakdowns by up to 50%.',
    'Integrated multi-modal transport management covering road, rail, air, and last-mile logistics.',
  ];

  challenges = [
    {
      icon: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=120&q=80',
      title: 'Inefficient Route Planning',
      desc: 'Manual routing leads to fuel waste, delayed deliveries, and poor utilisation of fleet assets across the network.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'Vehicle Downtime & Maintenance',
      desc: 'Reactive maintenance causes unexpected breakdowns, costly repairs, and disruptions to service schedules.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80',
      title: 'Limited Fleet Visibility',
      desc: 'Without real-time tracking, operators lack the insights needed to make fast, data-driven dispatch decisions.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
      title: 'Last-Mile Delivery Challenges',
      desc: 'Rising customer expectations demand faster, more transparent last-mile delivery with live status updates.',
    },
  ];

  solutions = [
    {
      title: 'Fleet Management & Telematics',
      desc: 'End-to-end fleet tracking with GPS telematics, driver behaviour monitoring, fuel management, and live operations dashboards.',
      image:
        'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80&auto=format&fit=crop',
      svg: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l3 1 3-1h3l3 1 3-1v-1a1 1 0 00-1-1h-1',
      tags: ['GPS', 'Telematics', 'IoT'],
    },
    {
      title: 'Passenger & Ride Booking Apps',
      desc: 'Mobile-first passenger apps for ride booking, real-time vehicle tracking, digital payments, and feedback management.',
      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80&auto=format&fit=crop',
      svg: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      tags: ['Flutter', 'React Native', 'Payments'],
    },
    {
      title: 'AI Route Optimisation',
      desc: 'Machine learning algorithms that optimise delivery routes dynamically based on traffic, weather, capacity, and time windows.',
      image:
        'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=700&q=80&auto=format&fit=crop',
      svg: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
      tags: ['AI/ML', 'GIS', 'Real-Time'],
    },
    {
      title: 'Logistics & Supply Chain',
      desc: 'Warehouse management, shipment tracking, carrier integration, and end-to-end supply chain visibility platforms.',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80&auto=format&fit=crop',
      svg: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10',
      tags: ['WMS', 'ERP', 'Last-Mile'],
    },
    {
      title: 'Predictive Vehicle Maintenance',
      desc: 'IoT sensor-driven predictive maintenance platforms that monitor vehicle health and schedule servicing before failures occur.',
      image:
        'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=700&q=80&auto=format&fit=crop',
      svg: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      tags: ['IoT', 'ML', 'Sensors'],
    },
    {
      title: 'Traffic & Smart City Mobility',
      desc: 'Smart traffic management systems, public transit analytics, and multi-modal mobility platforms for city authorities.',
      image:
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80&auto=format&fit=crop',
      svg: 'M13 10V3L4 14h7v7l9-11h-7z',
      tags: ['Smart City', 'IoT', 'Analytics'],
    },
  ];

  transStats = [
    { val: '35%', label: 'Reduction in Fuel Costs' },
    { val: '500+', label: 'Fleets Managed Globally' },
    { val: '50%', label: 'Fewer Unplanned Breakdowns' },
    { val: '2M+', label: 'Daily Trips Tracked' },
  ];

  process = [
    {
      title: 'Operations Discovery & Fleet Audit',
      desc: 'We analyse your existing fleet, routes, dispatch workflows, and technology stack to identify optimisation opportunities.',
    },
    {
      title: 'Solution Design & Integration Planning',
      desc: 'Custom architecture designed around your operational model — integrating with existing ERP, TMS, and dispatch systems.',
    },
    {
      title: 'Phased Development & Pilot Rollout',
      desc: 'Agile builds with pilot fleet testing, driver app onboarding, and real-world performance validation before full launch.',
    },
    {
      title: 'Go-Live, Training & 24/7 Support',
      desc: 'Smooth deployment with operations team training, driver onboarding, and round-the-clock platform monitoring.',
    },
  ];

  techStack = [
    { icon: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=120&q=80', name: 'Angular / React', role: 'Frontend' },
    { icon: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80', name: 'Spring Boot', role: 'Backend' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS / Azure', role: 'Cloud' },
    { icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80', name: 'MQTT / WebSockets', role: 'Real-Time' },
    { icon: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=120&q=80', name: 'Google Maps / HERE', role: 'Mapping' },
    { icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80', name: 'TensorFlow', role: 'AI / ML' },
    { icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80', name: 'Flutter', role: 'Mobile Apps' },
    { icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80', name: 'Keycloak / OAuth2', role: 'Security' },
  ];

  whyBlute = [
    {
      icon: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=120&q=80',
      title: 'Deep Transport Domain Expertise',
      desc: 'Experience across freight, public transit, ride-hailing, and last-mile delivery platforms at enterprise scale.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Real-Time at the Core',
      desc: 'Built for millisecond-level tracking updates, live dispatch decisions, and high-concurrency passenger apps.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'End-to-End Delivery',
      desc: 'From IoT hardware integration to passenger-facing apps — one accountable team across your full tech stack.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: '24/7 Mission-Critical Support',
      desc: 'Round-the-clock monitoring and incident response keeping your transport operations running without interruption.',
    },
  ];

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

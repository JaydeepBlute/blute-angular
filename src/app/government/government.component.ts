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
  selector: 'app-government',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './government.component.html',
  styleUrls: ['./government.component.scss'],

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
export class GovernmentComponent implements OnInit {
  isVisible = false;

  keyPoints = [
    'Citizen-centric design ensuring accessibility for all demographics across urban and rural regions.',
    'Seamless integration with national identity systems — Aadhaar, DigiLocker, NPCI, and NIC GovCloud.',
    'End-to-end security aligned with CERT-In advisories, MeitY guidelines, and ISO 27001 standards.',
    'Scalable microservices architecture built to handle millions of concurrent government service requests.',
    'Multi-language, mobile-first portals that reduce physical footfall at government offices by up to 70%.',
  ];

  challenges = [
    {
      icon: '🏚️',
      title: 'Legacy System Modernisation',
      desc: 'Ageing IT infrastructure in government offices creates inefficiencies, data silos, and security vulnerabilities.',
    },
    {
      icon: '🔐',
      title: 'Cybersecurity & Data Privacy',
      desc: 'Protecting sensitive citizen data and critical national infrastructure from increasingly sophisticated cyber threats.',
    },
    {
      icon: '📋',
      title: 'Regulatory & Compliance Burden',
      desc: 'Meeting MeitY, NIC, and CERT-In mandates while ensuring inter-departmental data governance and audit readiness.',
    },
    {
      icon: '👥',
      title: 'Citizen Service Delivery',
      desc: 'Bridging the digital divide and delivering seamless, accessible e-governance services to every citizen.',
    },
  ];

  solutions = [
    {
      title: 'e-Governance & Citizen Portals',
      desc: 'End-to-end digital service delivery platforms with Aadhaar-based authentication, multi-language support, and grievance redressal systems.',
      svg: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=700&q=80',
      tags: ['Aadhaar API', 'Angular', 'Spring Boot'],
    },
    {
      title: 'Smart City Infrastructure',
      desc: 'IoT-enabled smart traffic, waste management, utilities monitoring, and real-time city dashboard platforms.',
      svg: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80',
      tags: ['IoT', 'AWS', 'Real-Time Analytics'],
    },
    {
      title: 'Land & Revenue Management',
      desc: 'Digital land records, property registration, mutation workflows, and geo-tagging with GIS-integrated dashboards.',
      svg: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80',
      tags: ['GIS', 'PostgreSQL', 'REST APIs'],
    },
    {
      title: 'Public Safety & Surveillance',
      desc: 'AI-powered CCTV analytics, facial recognition, incident management, and integrated command-and-control room systems.',
      svg: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
      tags: ['AI / ML', 'TensorFlow', 'Edge Computing'],
    },
    {
      title: 'Healthcare & Welfare Schemes',
      desc: 'Digital beneficiary management, Ayushman Bharat integrations, ration card systems, and scheme eligibility portals.',
      svg: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80',
      tags: ['NHA APIs', 'HL7', 'Microservices'],
    },
    {
      title: 'Cybersecurity & GovCloud',
      desc: 'CERT-In aligned security audits, GovCloud deployments, zero-trust architecture, and 24/7 SOC services for critical government systems.',
      svg: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=80',
      tags: ['CERT-In', 'GovCloud', 'Zero Trust'],
    },
  ];

  govStats = [
    { val: '500+', label: 'Government Services Digitised' },
    { val: '20+', label: 'State Departments Served' },
    { val: '99.9%', label: 'Platform Uptime SLA' },
    { val: '50M+', label: 'Citizens Reached Digitally' },
  ];

  process = [
    {
      title: 'Requirement Discovery & Scoping',
      desc: 'We work closely with government stakeholders to map existing systems, compliance mandates, and citizen service needs.',
    },
    {
      title: 'Compliant Architecture Design',
      desc: 'Solutions are designed to MeitY, NIC, and CERT-In standards with data residency, security, and accessibility at the core.',
    },
    {
      title: 'Agile Development & UAT',
      desc: 'Sprint-based builds with departmental review cycles, accessibility testing, and load testing for high-traffic portals.',
    },
    {
      title: 'Deployment, Training & Support',
      desc: 'Smooth rollout with staff training, documentation, and dedicated 24/7 support to keep services running uninterrupted.',
    },
  ];

  techStack = [
    { icon: '🅰️', name: 'Angular / React', role: 'Frontend' },
    { icon: '☕', name: 'Spring Boot', role: 'Backend' },
    { icon: '☁️', name: 'GovCloud / AWS', role: 'Cloud' },
    { icon: '🔗', name: 'Aadhaar / DigiLocker', role: 'Gov APIs' },
    { icon: '🤖', name: 'TensorFlow', role: 'AI / ML' },
    { icon: '🗄️', name: 'PostgreSQL / Oracle', role: 'Database' },
    { icon: '🗺️', name: 'GIS / MapMyIndia', role: 'Geospatial' },
    { icon: '🔐', name: 'PKI / Keycloak', role: 'Security' },
  ];

  integrations = [
    { icon: '🪪', name: 'Aadhaar API' },
    { icon: '📁', name: 'DigiLocker' },
    { icon: '💳', name: 'UPI / NPCI' },
    { icon: '🏥', name: 'Ayushman Bharat' },
    { icon: '🗺️', name: 'MapMyIndia GIS' },
    { icon: '📜', name: 'MCA21' },
    { icon: '🚗', name: 'VAHAN / Sarathi' },
    { icon: '📊', name: 'PFMS' },
    { icon: '☁️', name: 'NIC GovCloud' },
    { icon: '🔒', name: 'CERT-In SOC' },
    { icon: '📬', name: 'India Post APIs' },
    { icon: '🏦', name: 'Jan Dhan APIs' },
  ];

  whyBlute = [
    {
      icon: '🏛️',
      title: 'Government Domain Expertise',
      desc: 'Deep experience with e-governance frameworks, NIC standards, and public sector procurement processes.',
    },
    {
      icon: '⚡',
      title: 'Compliant & Secure Delivery',
      desc: 'MeitY, CERT-In, and ISO 27001 compliant solutions with GovCloud-ready architecture from day one.',
    },
    {
      icon: '🔧',
      title: 'End-to-End Capability',
      desc: 'From citizen portals to backend integrations — one accountable technology partner for your department.',
    },
    {
      icon: '🛡️',
      title: '24/7 Mission-Critical Support',
      desc: 'Round-the-clock monitoring ensuring uninterrupted public service delivery for millions of citizens.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }
}

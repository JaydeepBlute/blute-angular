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
  sequence,
  group,
} from '@angular/animations';

// ── Reusable easing curves ──────────────────────────────────────────────────
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // bouncy overshoot
const SMOOTH = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // silky ease-out
const EXPO = 'cubic-bezier(0.19, 1, 0.22, 1)'; // dramatic expo

@Component({
  selector: 'app-healthcare-pharma',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './healthcare-pharma.component.html',
  animations: [
    // ── 1. HERO HEADLINE — typewriter + clip reveal ──────────────────────────
    trigger('heroTitle', [
      transition(':enter', [
        style({ clipPath: 'inset(0 100% 0 0)', opacity: 0 }),
        animate(`900ms 200ms ${EXPO}`, style({ clipPath: 'inset(0 0% 0 0)', opacity: 1 })),
      ]),
    ]),

    // ── 2. MAGNETIC SLIDE-IN LEFT — 3D rotate + translate ───────────────────
    trigger('magnetLeft', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-80px) rotateY(-25deg) scale(0.9)',
          filter: 'blur(6px)',
        }),
        animate(
          `750ms ${SPRING}`,
          style({
            opacity: 1,
            transform: 'translateX(0) rotateY(0deg) scale(1)',
            filter: 'blur(0px)',
          }),
        ),
      ]),
    ]),

    // ── 3. MAGNETIC SLIDE-IN RIGHT — 3D rotate + translate ──────────────────
    trigger('magnetRight', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(80px) rotateY(25deg) scale(0.9)',
          filter: 'blur(6px)',
        }),
        animate(
          `750ms 150ms ${SPRING}`,
          style({
            opacity: 1,
            transform: 'translateX(0) rotateY(0deg) scale(1)',
            filter: 'blur(0px)',
          }),
        ),
      ]),
    ]),

    // ── 4. FLIP UP — cards flip from beneath ────────────────────────────────
    trigger('flipUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'perspective(600px) rotateX(60deg) translateY(40px)',
          transformOrigin: 'bottom center',
        }),
        animate(
          `650ms ${SPRING}`,
          style({
            opacity: 1,
            transform: 'perspective(600px) rotateX(0deg) translateY(0)',
          }),
        ),
      ]),
    ]),

    // ── 5. STAGGER CARDS — sequential flip-up with blur sweep ───────────────
    trigger('staggerCards', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({
              opacity: 0,
              transform: 'perspective(600px) rotateX(45deg) translateY(50px) scale(0.95)',
              filter: 'blur(4px)',
            }),
            stagger(80, [
              animate(
                `600ms ${SPRING}`,
                style({
                  opacity: 1,
                  transform: 'perspective(600px) rotateX(0) translateY(0) scale(1)',
                  filter: 'blur(0)',
                }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),

    // ── 6. PARTICLE BURST — scale from centre with rotation ─────────────────
    trigger('particleBurst', [
      transition(':enter', [
        animate(
          `800ms ${SPRING}`,
          keyframes([
            style({ opacity: 0, transform: 'scale(0) rotate(-15deg)', offset: 0 }),
            style({ opacity: 1, transform: 'scale(1.08) rotate(4deg)', offset: 0.6 }),
            style({ opacity: 1, transform: 'scale(0.97) rotate(-1deg)', offset: 0.8 }),
            style({ opacity: 1, transform: 'scale(1) rotate(0deg)', offset: 1 }),
          ]),
        ),
      ]),
    ]),

    // ── 7. NEON WIPE — text reveal with glowing sweep ───────────────────────
    trigger('neonWipe', [
      transition(':enter', [
        group([
          animate(
            `700ms 100ms ${EXPO}`,
            keyframes([
              style({ opacity: 0, transform: 'translateY(20px)', offset: 0 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
            ]),
          ),
        ]),
      ]),
    ]),

    // ── 8. STAGGER PILLS — horizontal slide cascade ─────────────────────────
    trigger('staggerPills', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({ opacity: 0, transform: 'translateX(-30px) scale(0.85)' }),
            stagger(60, [
              animate(
                `450ms ${SPRING}`,
                style({ opacity: 1, transform: 'translateX(0) scale(1)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),

    // ── 9. VAULT IN — CTA block drops from above like a door closing ─────────
    trigger('vaultIn', [
      transition(':enter', [
        animate(
          `900ms ${SPRING}`,
          keyframes([
            style({
              opacity: 0,
              transform: 'perspective(1000px) rotateX(-30deg) translateY(-60px) scale(0.92)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'perspective(1000px) rotateX(4deg)  translateY(6px)   scale(1.01)',
              offset: 0.65,
            }),
            style({
              opacity: 1,
              transform: 'perspective(1000px) rotateX(-1deg) translateY(-2px)  scale(1)',
              offset: 0.85,
            }),
            style({
              opacity: 1,
              transform: 'perspective(1000px) rotateX(0deg)  translateY(0)     scale(1)',
              offset: 1,
            }),
          ]),
        ),
      ]),
    ]),

    // ── 10. PROCESS STEPS — slide-in sequence with number pop ────────────────
    trigger('staggerSteps', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({ opacity: 0, transform: 'translateX(-50px)', filter: 'blur(3px)' }),
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
  ],
})
export class HealthcarePharmaComponent implements OnInit {
  isVisible = false;

  challenges = [
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: 'Data Privacy & Compliance',
      desc: 'Meeting HIPAA, HL7, and GDPR standards while managing sensitive patient data securely.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Legacy System Integration',
      desc: 'Connecting outdated hospital systems with modern EHR, LIS, and pharmacy platforms.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
      title: 'Clinical Data Management',
      desc: 'Handling large volumes of unstructured clinical data across departments and locations.',
    },
    {
      icon: '⏱️',
      title: 'Real-Time Patient Care',
      desc: 'Delivering instant access to patient records, diagnostics, and care coordination tools.',
    },
  ];

  solutions = [
    {
      title: 'Electronic Health Record (EHR) Systems',
      desc: 'Custom EHR platforms that streamline patient data management, clinical workflows, and care coordination across departments.',
      svg: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
      tags: ['HL7 FHIR', 'Angular', 'Spring Boot'],
    },
    {
      title: 'Telemedicine & Remote Care Platforms',
      desc: 'Secure video consultation, remote patient monitoring, and digital prescription platforms for modern healthcare delivery.',
      svg: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80',
      tags: ['WebRTC', 'React Native', 'AWS'],
    },
    {
      title: 'Hospital Management Systems',
      desc: 'End-to-end HMS covering patient registration, billing, inventory, pharmacy, lab, and ward management in one platform.',
      svg: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
      tags: ['Microservices', 'Oracle', 'Docker'],
    },
    {
      title: 'AI-Powered Clinical Decision Support',
      desc: 'Machine learning models for disease prediction, drug interaction alerts, diagnostic assistance, and treatment recommendations.',
      svg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80',
      tags: ['TensorFlow', 'NLP', 'Python'],
    },
    {
      title: 'Pharmacy & Drug Management',
      desc: 'Digital pharmacy systems with automated dispensing, drug inventory tracking, e-prescriptions, and regulatory compliance.',
      svg: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
      tags: ['IoT', 'Blockchain', 'REST APIs'],
    },
    {
      title: 'Healthcare Data Security & Compliance',
      desc: 'HIPAA-compliant infrastructure, end-to-end encryption, audit trails, and role-based access control for healthcare data.',
      svg: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
      tags: ['HIPAA', 'GDPR', 'SOC 2'],
    },
  ];

  process = [
    {
      title: 'Healthcare Domain Discovery',
      desc: 'We analyse your clinical workflows, compliance requirements, and integration needs before designing any solution.',
    },
    {
      title: 'Compliant Architecture Design',
      desc: 'Our architects design HIPAA/HL7-compliant system blueprints with security and interoperability at the core.',
    },
    {
      title: 'Agile Development & Validation',
      desc: 'We build in sprints with clinical stakeholder reviews, UAT cycles, and regulatory validation checkpoints.',
    },
    {
      title: 'Go-Live Support & Maintenance',
      desc: 'Dedicated healthcare IT support ensuring your systems stay secure, compliant, and available 24/7.',
    },
  ];

  techStack = [
    { icon: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=120&q=80', name: 'Angular / React', role: 'Frontend' },
    { icon: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80', name: 'Spring Boot', role: 'Backend' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS / Azure', role: 'Cloud' },
    { icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', name: 'HL7 / FHIR', role: 'Healthcare APIs' },
    { icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80', name: 'TensorFlow', role: 'AI / ML' },
    { icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', name: 'PostgreSQL', role: 'Database' },
    { icon: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=120&q=80', name: 'Docker / K8s', role: 'DevOps' },
    { icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80', name: 'OAuth2 / Keycloak', role: 'Security' },
  ];

  integrations = [
    { icon: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=120&q=80', name: 'Epic EHR' },
    { icon: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=120&q=80', name: 'HL7 FHIR' },
    { icon: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=120&q=80', name: 'Cerner' },
    { icon: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=120&q=80', name: 'LIMS' },
    { icon: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80', name: 'DICOM / PACS' },
    { icon: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80', name: 'Insurance APIs' },
    { icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80', name: 'Wearable Devices' },
    { icon: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=120&q=80', name: 'Google Health' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS HealthLake' },
    { icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80', name: 'Power BI' },
    { icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80', name: 'HIPAA Vault' },
    { icon: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=120&q=80', name: 'Twilio / SMS' },
  ];

  whyBlute = [
    {
      icon: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=120&q=80',
      title: 'Healthcare Domain Expertise',
      desc: 'Deep understanding of clinical workflows, compliance standards, and patient data management.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Fast & Compliant Delivery',
      desc: 'Agile delivery with built-in HIPAA, HL7, and GDPR compliance at every stage.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'Full-Stack Capability',
      desc: 'From patient-facing apps to backend integrations — one partner for your entire healthcare IT stack.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: '24/7 Secure Support',
      desc: 'Round-the-clock monitoring and support to keep critical healthcare systems always available.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

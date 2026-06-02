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
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],

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
export class EducationComponent implements OnInit {
  isVisible = false;

  trustBadges = [
    { icon: '🎓', label: 'EdTech Certified' },
    { icon: '🔒', label: 'FERPA Compliant' },
    { icon: '📱', label: 'Mobile-First Learning' },
    { icon: '🤖', label: 'AI-Powered Personalisation' },
    { icon: '🌍', label: 'Multi-Language Support' },
    { icon: '⚡', label: '99.9% Uptime SLA' },
  ];

  keyPoints = [
    "Adaptive learning platforms that personalise content delivery based on each student's pace and performance.",
    'Seamless LMS integrations with Moodle, Canvas, Google Classroom, and custom-built portals.',
    'Real-time analytics dashboards giving educators actionable insights on student engagement and outcomes.',
    'Secure, FERPA-compliant data architecture protecting student records across all touchpoints.',
    'Mobile-first design ensuring accessible learning experiences on any device, anywhere.',
  ];

  challenges = [
    {
      icon: '📚',
      title: 'Outdated Learning Systems',
      desc: 'Legacy LMS platforms fail to engage modern learners, resulting in poor completion rates and limited personalisation.',
    },
    {
      icon: '📊',
      title: 'Lack of Learning Analytics',
      desc: 'Educators struggle without real-time data on student progress, making timely intervention nearly impossible.',
    },
    {
      icon: '🔗',
      title: 'Siloed Platforms & Data',
      desc: 'Disconnected tools create friction for students and administrators, reducing efficiency and consistency.',
    },
    {
      icon: '🌐',
      title: 'Accessibility & Inclusion',
      desc: 'Many institutions lack the digital infrastructure to deliver equitable, accessible learning to all students.',
    },
  ];

  solutions = [
    {
      title: 'Learning Management Systems',
      desc: 'Custom-built or integrated LMS platforms with course management, assessments, progress tracking, and certification workflows.',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80&auto=format&fit=crop',
      svg: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      tags: ['LMS', 'Angular', 'Spring Boot'],
    },
    {
      title: 'AI-Powered Adaptive Learning',
      desc: 'Intelligent content recommendation engines that adapt curriculum paths to individual student strengths and learning styles.',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&q=80&auto=format&fit=crop',
      svg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      tags: ['AI/ML', 'Personalisation', 'NLP'],
    },
    {
      title: 'Student Information Systems',
      desc: 'Centralised SIS platforms managing enrolment, grades, attendance, timetables, and parent communication in one place.',
      image:
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=700&q=80&auto=format&fit=crop',
      svg: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      tags: ['SIS', 'PostgreSQL', 'REST APIs'],
    },
    {
      title: 'Virtual Classrooms & Live Learning',
      desc: 'Interactive virtual classroom platforms with live video, breakout rooms, whiteboards, polling, and session recordings.',
      image:
        'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=700&q=80&auto=format&fit=crop',
      svg: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      tags: ['WebRTC', 'Live Streaming', 'AWS'],
    },
    {
      title: 'Exam & Assessment Platforms',
      desc: 'Secure online examination systems with anti-cheating proctoring, adaptive testing, instant grading, and detailed reports.',
      image:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80&auto=format&fit=crop',
      svg: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      tags: ['Proctoring', 'Analytics', 'AI'],
    },
    {
      title: 'EdTech Mobile Apps',
      desc: 'Native and cross-platform mobile apps for on-the-go learning, push notifications, offline content access, and gamification.',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80&auto=format&fit=crop',
      svg: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      tags: ['Flutter', 'React Native', 'Offline-First'],
    },
  ];

  eduStats = [
    { val: '1M+', label: 'Students on Our Platforms' },
    { val: '300+', label: 'Institutions Served' },
    { val: '40%', label: 'Improvement in Completion Rates' },
    { val: '60+', label: 'Countries Reached' },
  ];

  process = [
    {
      title: 'Requirement Discovery & Pedagogy Review',
      desc: 'We work with educators and administrators to understand learning objectives, existing infrastructure, and student demographics.',
    },
    {
      title: 'Platform Architecture & UX Design',
      desc: 'Learner-first design with accessibility (WCAG 2.1), mobile responsiveness, and intuitive interfaces for both students and staff.',
    },
    {
      title: 'Agile Development & Pilot Testing',
      desc: 'Iterative builds with pilot cohorts, educator feedback loops, and performance testing at scale.',
    },
    {
      title: 'Launch, Training & Ongoing Support',
      desc: 'Full onboarding for staff, student orientation materials, and dedicated support to ensure adoption and continuous improvement.',
    },
  ];

  techStack = [
    { icon: '🅰️', name: 'Angular / React', role: 'Frontend' },
    { icon: '☕', name: 'Spring Boot', role: 'Backend' },
    { icon: '☁️', name: 'AWS / Azure', role: 'Cloud' },
    { icon: '🎓', name: 'Moodle / Canvas', role: 'LMS Integration' },
    { icon: '🤖', name: 'TensorFlow / NLP', role: 'AI / ML' },
    { icon: '🗄️', name: 'PostgreSQL', role: 'Database' },
    { icon: '📱', name: 'Flutter', role: 'Mobile' },
    { icon: '🔐', name: 'Keycloak / OAuth2', role: 'Security' },
  ];

  whyBlute = [
    {
      icon: '🎓',
      title: 'Deep EdTech Expertise',
      desc: 'Proven track record building scalable learning platforms for schools, universities, and corporate training providers.',
    },
    {
      icon: '⚡',
      title: 'Rapid Deployment',
      desc: 'Pre-built EdTech accelerators and reusable modules that reduce time-to-launch by up to 50%.',
    },
    {
      icon: '🔧',
      title: 'End-to-End Partnership',
      desc: 'From LMS to mobile app to analytics — one team, one vision, full accountability.',
    },
    {
      icon: '🛡️',
      title: 'Data Security & Compliance',
      desc: 'FERPA, COPPA, and GDPR-compliant platforms with role-based access and encrypted student data.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }
}

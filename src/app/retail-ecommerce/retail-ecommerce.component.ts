import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-retail-ecommerce',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './retail-ecommerce.component.html',
  styleUrls: ['./retail-ecommerce.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-40px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('staggerList', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(100, [
              animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class RetailEcommerceComponent implements OnInit {
  isVisible = false;

  challenges = [
    {
      icon: '🔗',
      title: 'Disconnected Systems',
      desc: 'Siloed POS, ERP, and e-commerce platforms causing data inconsistencies and slow operations.',
    },
    {
      icon: '📉',
      title: 'Poor Digital Experience',
      desc: 'Outdated web and mobile storefronts losing customers to faster, modern competitors.',
    },
    {
      icon: '☁️',
      title: 'Scalability Issues',
      desc: 'Infrastructure unable to handle seasonal traffic spikes and rapid business growth.',
    },
    {
      icon: '🔐',
      title: 'Security & Compliance',
      desc: 'Vulnerability to data breaches and struggle with PCI-DSS and GDPR compliance requirements.',
    },
  ];

  solutions = [
    {
      title: 'Custom E-Commerce Platform Development',
      desc: 'We build tailor-made, scalable e-commerce web and mobile applications using Angular, React, and Spring Boot — designed for your specific retail workflows.',
      svg: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      overlay: 'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.85))',
      tags: ['Angular', 'React', 'Spring Boot'],
    },
    {
      title: 'Enterprise System Integration',
      desc: 'Seamlessly connect your e-commerce platform with SAP, Oracle, and ERP systems for unified inventory, order, and customer data management.',
      svg: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      overlay: 'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.85))',
      tags: ['SAP', 'Oracle', 'REST APIs'],
    },
    {
      title: 'Cloud Infrastructure & DevOps',
      desc: 'Deploy your retail platform on AWS or Azure with auto-scaling, CI/CD pipelines, and containerised microservices for 99.9% uptime during peak seasons.',
      svg: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
      overlay: 'linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.85))',
      tags: ['AWS', 'Azure', 'Docker', 'CI/CD'],
    },
    {
      title: 'AI & Data Analytics',
      desc: 'Implement AI-powered product recommendations, demand forecasting, dynamic pricing, and customer behaviour dashboards to drive data-led decisions.',
      svg: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      overlay: 'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.85))',
      tags: ['Machine Learning', 'NLP', 'Power BI'],
    },
    {
      title: 'Mobile Commerce Applications',
      desc: 'We develop cross-platform iOS and Android retail apps with real-time inventory, push notifications, and integrated payment gateways for on-the-go shoppers.',
      svg: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
      overlay: 'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.85))',
      tags: ['React Native', 'Flutter', 'PWA'],
    },
    {
      title: 'Cyber Security & Compliance',
      desc: 'Protect customer data and payment information with security audits, PCI-DSS compliance implementation, and 24/7 threat monitoring services.',
      svg: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
      overlay: 'linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.85))',
      tags: ['PCI-DSS', 'GDPR', 'SOC 2'],
    },
  ];

  process = [
    {
      title: 'Discovery & Requirement Analysis',
      desc: 'We deeply understand your retail business processes, pain points, and technology gaps before writing a single line of code.',
    },
    {
      title: 'Solution Architecture & Design',
      desc: 'Our architects design scalable, future-proof system blueprints aligned with your growth plans and integration needs.',
    },
    {
      title: 'Agile Development & Delivery',
      desc: 'We build in sprints with regular demos, ensuring you get working software delivered incrementally with full visibility.',
    },
    {
      title: 'QA, Launch & Ongoing Support',
      desc: 'Rigorous testing, smooth go-live support, and long-term maintenance to keep your retail platform performing at its best.',
    },
  ];

  techStack = [
    { icon: '🅰️', name: 'Angular / React', role: 'Frontend' },
    { icon: '☕', name: 'Spring Boot', role: 'Backend' },
    { icon: '☁️', name: 'AWS / Azure', role: 'Cloud' },
    { icon: '🐳', name: 'Docker / K8s', role: 'DevOps' },
    { icon: '🤖', name: 'TensorFlow', role: 'AI / ML' },
    { icon: '🗄️', name: 'PostgreSQL / MongoDB', role: 'Database' },
    { icon: '🔗', name: 'REST / GraphQL', role: 'APIs' },
    { icon: '🔐', name: 'OAuth2 / Keycloak', role: 'Security' },
  ];

  integrations = [
    { icon: '🏢', name: 'SAP' },
    { icon: '🔶', name: 'Oracle' },
    { icon: '💳', name: 'Stripe' },
    { icon: '🛒', name: 'Shopify' },
    { icon: '📦', name: 'Magento' },
    { icon: '📊', name: 'Salesforce' },
    { icon: '📬', name: 'Mailchimp' },
    { icon: '🚚', name: 'FedEx / DHL APIs' },
    { icon: '🗺️', name: 'Google Maps' },
    { icon: '📱', name: 'Twilio SMS' },
    { icon: '📈', name: 'Google Analytics' },
    { icon: '🏦', name: 'PayPal / Razorpay' },
  ];

  whyBlute = [
    {
      icon: '🏗️',
      title: 'Retail Domain Expertise',
      desc: 'Deep understanding of retail workflows, seasonal demands, and omnichannel customer journeys.',
    },
    {
      icon: '⚡',
      title: 'Agile & Fast Delivery',
      desc: 'Sprint-based delivery model with transparent communication and on-time project completion.',
    },
    {
      icon: '🔧',
      title: 'Full-Stack Capability',
      desc: 'From UI/UX design to cloud deployment — one partner for your entire technology stack.',
    },
    {
      icon: '🛡️',
      title: '24/7 Support & Maintenance',
      desc: 'Dedicated support teams ensuring your retail platform stays live, secure, and performant.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }
}

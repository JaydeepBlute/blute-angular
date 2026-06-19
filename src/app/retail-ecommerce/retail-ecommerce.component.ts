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
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Disconnected Systems',
      desc: 'Siloed POS, ERP, and e-commerce platforms causing data inconsistencies and slow operations.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
      title: 'Poor Digital Experience',
      desc: 'Outdated web and mobile storefronts losing customers to faster, modern competitors.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
      title: 'Scalability Issues',
      desc: 'Infrastructure unable to handle seasonal traffic spikes and rapid business growth.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80',
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
    { icon: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=120&q=80', name: 'Angular / React', role: 'Frontend' },
    { icon: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80', name: 'Spring Boot', role: 'Backend' },
    { icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80', name: 'AWS / Azure', role: 'Cloud' },
    { icon: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=120&q=80', name: 'Docker / K8s', role: 'DevOps' },
    { icon: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=120&q=80', name: 'TensorFlow', role: 'AI / ML' },
    { icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', name: 'PostgreSQL / MongoDB', role: 'Database' },
    { icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80', name: 'REST / GraphQL', role: 'APIs' },
    { icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80', name: 'OAuth2 / Keycloak', role: 'Security' },
  ];

  integrations = [
    { icon: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80', name: 'SAP' },
    { icon: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=120&q=80', name: 'Oracle' },
    { icon: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80', name: 'Stripe' },
    { icon: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80', name: 'Shopify' },
    { icon: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80', name: 'Magento' },
    { icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80', name: 'Salesforce' },
    { icon: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=120&q=80', name: 'Mailchimp' },
    { icon: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=120&q=80', name: 'FedEx / DHL APIs' },
    { icon: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=120&q=80', name: 'Google Maps' },
    { icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80', name: 'Twilio SMS' },
    { icon: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80', name: 'Google Analytics' },
    { icon: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=120&q=80', name: 'PayPal / Razorpay' },
  ];

  whyBlute = [
    {
      icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
      title: 'Retail Domain Expertise',
      desc: 'Deep understanding of retail workflows, seasonal demands, and omnichannel customer journeys.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80',
      title: 'Agile & Fast Delivery',
      desc: 'Sprint-based delivery model with transparent communication and on-time project completion.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=120&q=80',
      title: 'Full-Stack Capability',
      desc: 'From UI/UX design to cloud deployment — one partner for your entire technology stack.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: '24/7 Support & Maintenance',
      desc: 'Dedicated support teams ensuring your retail platform stays live, secure, and performant.',
    },
  ];

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), 100);
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

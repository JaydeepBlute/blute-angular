import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cyber-security',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cyber-security.component.html',
  styleUrl: './cyber-security.component.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('staggerList', [
      transition(':enter', [
        query(
          '.stagger-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger('120ms', [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class CyberSecurityComponent implements OnInit {
  services = [
    {
      icon: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=120&q=80',
      title: 'Threat Detection & Prevention',
      desc: 'Real-time monitoring and AI-powered threat detection to stop attacks before they happen.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=120&q=80',
      title: 'Identity & Access Management',
      desc: 'Secure authentication, MFA, and role-based access controls across your enterprise.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
      title: 'Security Audits & Compliance',
      desc: 'Comprehensive audits ensuring compliance with ISO 27001, SOC 2, GDPR, and more.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
      title: 'Cloud Security',
      desc: 'End-to-end cloud security architecture for AWS, Azure, and GCP environments.',
    },
    {
      icon: '🚨',
      title: 'Incident Response',
      desc: '24/7 incident response team to contain, investigate, and recover from breaches.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=120&q=80',
      title: 'Penetration Testing',
      desc: 'Ethical hacking and vulnerability assessments to expose weaknesses before attackers do.',
    },
  ];

  faqs = [
    {
      question: 'What industries do you serve?',
      answer:
        'We serve Finance, Healthcare, Retail, Government, and Technology sectors with tailored cybersecurity solutions.',
      open: false,
    },
    {
      question: 'Do you offer managed security services?',
      answer:
        'Yes, our Managed Security Service (MSSP) provides 24/7 monitoring, threat response, and reporting.',
      open: false,
    },
    {
      question: 'How quickly can you respond to an incident?',
      answer:
        'Our average incident response time is under 1 hour with a dedicated team available around the clock.',
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  ngOnInit() {}

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

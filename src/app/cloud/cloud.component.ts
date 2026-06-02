import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-cloud-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cloud.component.html',
  styleUrl: './cloud.component.scss',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('staggerCards', [
      transition(':enter', [
        query(
          '.card-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(130, [
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
export class CloudDetailComponent implements OnInit, OnDestroy {
  private counterInterval: any;

  // Poly sphere faces array
  polyFaces = Array.from({ length: 20 });

  // Transform Your Business items
  transformItems = [
    {
      title: 'BECOME DATA-CENTRIC',
      desc: 'Cloud computing solutions will help your business seize and leverage all of your data.',
      svgIcon: '📊',
    },
    {
      title: 'SCALE, SPEED, AGILITY',
      desc: 'Cloud enables you to quickly launch your initiative with scale, reliability, and flexibility.',
      svgIcon: '⚡',
    },
    {
      title: 'ENTERPRISE-WIDE',
      desc: 'Cloud technology allows your business to be extensible, elastic, cost-efficient, and secure.',
      svgIcon: '🏢',
    },
    {
      title: 'DIGITAL TRANSFORMATION',
      desc: 'Transform and implement digital strategies with Public, Private, and Hybrid Cloud integration.',
      svgIcon: '🔄',
    },
  ];

  // Scale Speed Agility bullets
  scaleItems = {
    left: ['Microsoft Azure', 'Amazon Web Services', 'Google Cloud Platform'],
    right: ['IaaS', 'PaaS', 'SaaS'],
  };

  // Flexibility bullets
  flexItems = {
    left: ['Public Cloud', 'Hybrid Cloud'],
    right: ['Private On-premises Cloud', 'Multi-cloud'],
  };

  // Digital Transformation bullets
  digitalItems = {
    left: [
      'Internet of Things Integration',
      'Data Management for AI models',
      'Augmented Reality Solutions Management',
    ],
    right: [
      'Blockchain Solutions Integration',
      'Customer Engagement Solutions Integration',
      'Management of Mobile Apps',
    ],
  };

  ngOnInit() {
    this.startCounters();
  }

  ngOnDestroy() {
    clearInterval(this.counterInterval);
  }

  // Reused stats counters
  stats = [
    { label: 'Uptime SLA', suffix: '.9%', display: '0', target: 99.9, decimals: 1 },
    { label: 'Cost Reduction', suffix: '%', display: '0', target: 40, decimals: 0 },
    { label: 'Deploy Speed', suffix: 'x', display: '0', target: 10, decimals: 0 },
    { label: 'Global Regions', suffix: '+', display: '0', target: 25, decimals: 0 },
  ];

  startCounters() {
    let progress = 0;
    this.counterInterval = setInterval(() => {
      progress = Math.min(progress + 2, 100);
      this.stats = this.stats.map((s) => ({
        ...s,
        display: ((s.target * progress) / 100).toFixed(s.decimals),
      }));
      if (progress >= 100) clearInterval(this.counterInterval);
    }, 30);
  }
}

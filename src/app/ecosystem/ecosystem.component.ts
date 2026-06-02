// ecosystem.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ecosystem.component.html',
  styleUrl: './ecosystem.component.scss',
})
export class EcosystemComponent implements OnInit {
  features = [
    {
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Job Creation',
      description:
        'Creating sustainable employment opportunities in rural and urban communities through entrepreneurship and skill development.',
    },
    {
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      title: 'Infrastructure Development',
      description:
        'Building core infrastructure to support business growth and community development across regions.',
    },
    {
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      title: 'Quality of Life',
      description:
        'Improving living standards for individuals, families, and communities through comprehensive support programs.',
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Innovation Hub',
      description:
        'Fostering innovation and technology adoption to drive entrepreneurial success and economic growth.',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Support Programs',
      description:
        'Comprehensive support including mentorship, funding access, and business development resources.',
    },
    {
      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Community Impact',
      description:
        'Creating positive social and economic impact through sustainable and inclusive development initiatives.',
    },
  ];

  impactAreas = [
    {
      title: 'Rural Entrepreneurship',
      description:
        'Empowering rural communities with entrepreneurship training, market access, and financial support.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    },
    {
      title: 'Urban Innovation',
      description:
        'Supporting urban startups with technology infrastructure, co-working spaces, and networking opportunities.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    },
    {
      title: 'Skills Development',
      description:
        'Providing comprehensive training programs to build capabilities and enhance employability.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}

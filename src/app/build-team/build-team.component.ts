// build-team.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-build-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './build-team.component.html',
  styleUrl: './build-team.component.scss',
})
export class BuildTeamComponent implements OnInit {
  services = [
    {
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      title: 'Talent Search',
      description:
        'Comprehensive talent acquisition services to find the perfect candidates for your organization.',
    },
    {
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Screening & Assessment',
      description:
        'Rigorous evaluation process to ensure candidates meet your technical and cultural requirements.',
    },
    {
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      title: 'Team Integration',
      description:
        'Smooth onboarding and integration support to help new hires become productive team members.',
    },
    {
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      title: 'Contract Management',
      description:
        'End-to-end management of contractor relationships, payroll, and compliance requirements.',
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Rapid Deployment',
      description:
        'Quick turnaround time to get skilled professionals working on your projects faster.',
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'Flexible Staffing',
      description:
        'Scale your team up or down based on project requirements with our flexible staffing models.',
    },
  ];

  talentCategories = [
    {
      title: 'Software Developers',
      description:
        'Full-stack, frontend, backend developers with expertise in modern technologies and frameworks.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      skills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js'],
    },
    {
      title: 'Data Scientists',
      description:
        'Analytics experts, ML engineers, and data engineers to turn your data into actionable insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      skills: ['Python', 'R', 'SQL', 'TensorFlow', 'Tableau'],
    },
    {
      title: 'DevOps Engineers',
      description:
        'Infrastructure and automation specialists to optimize your development and deployment processes.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    },
  ];

  advantages = [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Quick Hiring',
      description: 'Get qualified candidates within 48 hours of requirement submission.',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Quality Assured',
      description: 'Pre-vetted professionals with verified skills and experience.',
    },
    {
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Cost Effective',
      description: 'Competitive rates without compromising on talent quality.',
    },
    {
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your staffing needs.',
    },
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}

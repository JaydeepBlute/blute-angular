import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Job {
  title: string;
  dept: string;
  type: string;
  typeColor: string;
  location: string;
  experience: string;
  tags: string[];
  icon: string;
  iconBg: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
})
export class CareersComponent {
  activeFilter = 'All';

  heroStats = [
    { value: '43+', label: 'Team Members' },
    { value: '8+', label: 'Years Old' },
    { value: '100%', label: 'Remote Friendly' },
  ];

  departments = ['All', 'Engineering', 'Design', 'Sales', 'Operations'];

  perks = [
    {
      icon: '🚀',
      iconBg: 'bg-blue-50',
      title: 'High-Impact Work',
      desc: 'Ship features used by thousands. Your work matters from day one.',
      gradient: 'from-blue-50/80 to-transparent',
    },
    {
      icon: '🌍',
      iconBg: 'bg-teal-50',
      title: 'Remote Friendly',
      desc: 'Work from anywhere. We value output, not office attendance.',
      gradient: 'from-teal-50/80 to-transparent',
    },
    {
      icon: '📈',
      iconBg: 'bg-purple-50',
      title: 'Growth & Learning',
      desc: 'Annual learning budget, internal tech talks, and clear career paths.',
      gradient: 'from-purple-50/80 to-transparent',
    },
    {
      icon: '🤝',
      iconBg: 'bg-orange-50',
      title: 'Collaborative Culture',
      desc: 'Flat hierarchy. Your ideas reach the founders directly.',
      gradient: 'from-orange-50/80 to-transparent',
    },
    {
      icon: '💰',
      iconBg: 'bg-green-50',
      title: 'Competitive Pay',
      desc: 'Market-beating salaries reviewed annually with performance bonuses.',
      gradient: 'from-green-50/80 to-transparent',
    },
    {
      icon: '🏥',
      iconBg: 'bg-red-50',
      title: 'Health Benefits',
      desc: 'Comprehensive health insurance for you and your family.',
      gradient: 'from-red-50/80 to-transparent',
    },
  ];

  jobs: Job[] = [
    {
      title: 'Senior Angular Developer',
      dept: 'Engineering',
      type: 'Full-time',
      typeColor: 'bg-blue-100 text-blue-700',
      location: 'Bangalore / Remote',
      experience: '4–7 years',
      tags: ['Angular', 'TypeScript', 'RxJS', 'Tailwind'],
      icon: '⚙️',
      iconBg: 'bg-blue-50',
      isNew: true,
    },
    {
      title: 'Spring Boot Backend Engineer',
      dept: 'Engineering',
      type: 'Full-time',
      typeColor: 'bg-blue-100 text-blue-700',
      location: 'Bangalore / Remote',
      experience: '3–6 years',
      tags: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
      icon: '🖥️',
      iconBg: 'bg-indigo-50',
    },
    {
      title: 'UI/UX Designer',
      dept: 'Design',
      type: 'Full-time',
      typeColor: 'bg-purple-100 text-purple-700',
      location: 'Bangalore / Remote',
      experience: '2–5 years',
      tags: ['Figma', 'Prototyping', 'Design Systems', 'User Research'],
      icon: '🎨',
      iconBg: 'bg-purple-50',
      isNew: true,
    },
    {
      title: 'DevOps / Cloud Engineer',
      dept: 'Engineering',
      type: 'Full-time',
      typeColor: 'bg-blue-100 text-blue-700',
      location: 'Remote',
      experience: '3–5 years',
      tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      icon: '☁️',
      iconBg: 'bg-sky-50',
    },
    {
      title: 'Business Development Executive',
      dept: 'Sales',
      type: 'Full-time',
      typeColor: 'bg-green-100 text-green-700',
      location: 'Bangalore',
      experience: '2–4 years',
      tags: ['B2B Sales', 'CRM', 'Proposal Writing', 'Client Relations'],
      icon: '📊',
      iconBg: 'bg-green-50',
    },
    {
      title: 'React Native Developer',
      dept: 'Engineering',
      type: 'Contract',
      typeColor: 'bg-orange-100 text-orange-700',
      location: 'Remote',
      experience: '2–4 years',
      tags: ['React Native', 'TypeScript', 'REST APIs', 'Redux'],
      icon: '📱',
      iconBg: 'bg-orange-50',
    },
  ];

  get filteredJobs(): Job[] {
    if (this.activeFilter === 'All') return this.jobs;
    return this.jobs.filter((j) => j.dept === this.activeFilter);
  }
}

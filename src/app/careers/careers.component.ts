import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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
export class CareersComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Careers | IT Jobs in Bangalore - Blute Technologies');
    this.metaService.updateTag({ name: 'description', content: 'Join Blute Technologies — a leading software development company in Bangalore. Explore IT jobs in engineering, design, DevOps, and more. Build your career with India\'s trusted technology outsourcing partner.' });
    this.metaService.updateTag({ name: 'keywords', content: 'IT jobs Bangalore, software development jobs India, IT company Bangalore careers, build dedicated development team India, IT staff augmentation, software engineer jobs Bengaluru, Blute Technologies careers' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'Blute Technologies' });
    this.metaService.updateTag({ property: 'og:title', content: 'Careers | IT Jobs in Bangalore - Blute Technologies' });
    this.metaService.updateTag({ property: 'og:description', content: 'Join Blute Technologies — a leading software development company in Bangalore. Explore IT jobs in engineering, design, DevOps, and more.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://blute.co.in/careers' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://blute.co.in/assets/images/og-banner.png' });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@blutetech' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Careers | IT Jobs in Bangalore - Blute Technologies' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Join Blute Technologies — a leading software development company in Bangalore. Explore IT jobs in engineering, design, DevOps, and more.' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://blute.co.in/assets/images/og-banner.png' });
  }
  activeFilter = 'All';

  heroStats = [
    { value: '43+', label: 'Team Members' },
    { value: '8+', label: 'Years Old' },
    { value: '100%', label: 'Remote Friendly' },
  ];

  departments = ['All', 'Engineering', 'Design', 'Sales', 'Operations'];

  perks = [
    {
      icon: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=120&q=80',
      iconBg: 'bg-blue-50',
      title: 'High-Impact Work',
      desc: 'Ship features used by thousands. Your work matters from day one.',
      gradient: 'from-blue-50/80 to-transparent',
    },
    {
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
      iconBg: 'bg-teal-50',
      title: 'Remote Friendly',
      desc: 'Work from anywhere. We value output, not office attendance.',
      gradient: 'from-teal-50/80 to-transparent',
    },
    {
      icon: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
      iconBg: 'bg-purple-50',
      title: 'Growth & Learning',
      desc: 'Annual learning budget, internal tech talks, and clear career paths.',
      gradient: 'from-purple-50/80 to-transparent',
    },
    {
      icon: 'https://images.unsplash.com/photo-1521791136364-728647532899?auto=format&fit=crop&w=120&q=80',
      iconBg: 'bg-orange-50',
      title: 'Collaborative Culture',
      desc: 'Flat hierarchy. Your ideas reach the founders directly.',
      gradient: 'from-orange-50/80 to-transparent',
    },
    {
      icon: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80',
      iconBg: 'bg-green-50',
      title: 'Competitive Pay',
      desc: 'Market-beating salaries reviewed annually with performance bonuses.',
      gradient: 'from-green-50/80 to-transparent',
    },
    {
      icon: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
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
      icon: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=120&q=80',
      iconBg: 'bg-orange-50',
    },
  ];

  get filteredJobs(): Job[] {
    if (this.activeFilter === 'All') return this.jobs;
    return this.jobs.filter((j) => j.dept === this.activeFilter);
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

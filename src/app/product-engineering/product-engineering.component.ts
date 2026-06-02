import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface Technology {
  category: string;
  items: string[];
}

interface CaseStudy {
  title: string;
  industry: string;
  description: string;
  results: string[];
  imageClass: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-product-engineering',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './product-engineering.component.html',
  styleUrls: ['./product-engineering.component.scss'],
})
export class ProductEngineeringComponent implements OnInit {
  services: Service[] = [
    {
      icon: 'code',
      title: 'Web Development',
      description:
        'Build responsive, scalable web applications using modern frameworks like React, Angular',
      features: [
        'Progressive Web Apps',
        'Single Page Applications',
        'E-commerce Platforms',
        'Enterprise Portals',
      ],
    },
    {
      icon: 'smartphone',
      title: 'Mobile App Development',
      description:
        'Native and cross-platform mobile solutions for iOS and Android with seamless user experiences',
      features: ['iOS & Android Apps', 'React Native', 'Flutter Development', 'App Modernization'],
    },
    {
      icon: 'cloud',
      title: 'Cloud Architecture',
      description:
        'Design and implement scalable cloud infrastructure on AWS, Azure, and Google Cloud Platform',
      features: [
        'Cloud Migration',
        'Microservices',
        'DevOps Integration',
        'Container Orchestration',
      ],
    },
    {
      icon: 'zap',
      title: 'Product Strategy',
      description:
        'End-to-end product development from concept to deployment with agile methodologies',
      features: ['MVP Development', 'Product Roadmap', 'User Research', 'Rapid Prototyping'],
    },
  ];

  process: ProcessStep[] = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description:
        'We analyze your requirements, define project scope, and create a comprehensive roadmap aligned with your business objectives.',
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description:
        'Our team designs intuitive user interfaces and robust system architecture ensuring scalability and performance.',
    },
    {
      step: '03',
      title: 'Development & Testing',
      description:
        'Agile development with continuous integration, rigorous testing, and quality assurance at every sprint.',
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description:
        'Seamless deployment to production with ongoing maintenance, monitoring, and 24/7 technical support.',
    },
  ];

  technologies: Technology[] = [
    { category: 'Frontend', items: ['React', 'Angular', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Java', 'Spring Boot'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'DynamoDB'] },
  ];

  caseStudies: CaseStudy[] = [
    {
      title: 'E-Learning Platform',
      industry: 'Education Technology',
      description:
        'Built a comprehensive exam preparation platform serving 50,000+ students with real-time assessments and progress tracking.',
      results: ['300% user growth', '99.9% uptime', '40% faster load times'],
      imageClass: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      title: 'Healthcare Management System',
      industry: 'Healthcare',
      description:
        'Developed an integrated patient management system with telemedicine capabilities and electronic health records.',
      results: ['50+ hospitals', '200K+ patients', 'HIPAA compliant'],
      imageClass: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    },
    {
      title: 'IoT Analytics Dashboard',
      industry: 'Manufacturing',
      description:
        'Created a real-time analytics platform processing data from 10,000+ IoT sensors for predictive maintenance.',
      results: ['60% reduced downtime', 'Real-time insights', 'AI-powered alerts'],
      imageClass: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
  ];

  benefits: Benefit[] = [
    {
      icon: 'users',
      title: 'Expert Team',
      description: 'Skilled engineers with 10+ years of experience',
    },
    {
      icon: 'award',
      title: 'Quality Assurance',
      description: 'Rigorous testing and code review processes',
    },
    {
      icon: 'trending-up',
      title: 'Scalable Solutions',
      description: 'Architecture designed for growth and performance',
    },
    {
      icon: 'message-square',
      title: 'Agile Methodology',
      description: 'Iterative development with regular feedback cycles',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToPortfolio(): void {
    // Navigate to portfolio page if it exists
    // this.router.navigate(['/portfolio']);
    console.log('Navigate to portfolio');
  }
}

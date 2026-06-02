// mobile-app-development.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Service {
  title: string;
  icon: string;
  description: string;
  color: string;
  image: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface Technology {
  name: string;
  category: string;
}

@Component({
  selector: 'app-mobile-app-development',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-app-development.component.html',
  styleUrl: './mobile-app-development.component.scss',
})
export class MobileAppDevelopmentComponent implements OnInit, OnDestroy {
  activeService = 0;
  scrollY = 0;
  isVisible: { [key: string]: boolean } = {};

  services: Service[] = [
    {
      title: 'iOS Development',
      icon: 'M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z',
      description: 'Native iOS apps built with Swift and SwiftUI for optimal performance',
      color: 'from-blue-500 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    },
    {
      title: 'Android Development',
      icon: 'M17.6 11.48l-5.6-3.23v6.46l5.6-3.23z M4 3h16v18H4V3z',
      description: 'High-performance Android applications using Kotlin and Jetpack Compose',
      color: 'from-green-500 to-emerald-600',
      image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
    },
    {
      title: 'Cross-Platform',
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
      description: 'React Native and Flutter apps that work seamlessly across platforms',
      color: 'from-purple-500 to-pink-600',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    },
    {
      title: 'Progressive Web Apps',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 019-9',
      description: 'Web apps that feel like native mobile applications',
      color: 'from-orange-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
  ];

  features: Feature[] = [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance',
    },
    {
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      title: 'Secure & Reliable',
      description: 'Bank-level security implementation',
    },
    {
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
      title: 'Beautiful UI/UX',
      description: 'Stunning designs that users love',
    },
    {
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      title: 'Cloud Integration',
      description: 'Seamless cloud connectivity',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Quality Assurance',
      description: 'Rigorous testing protocols',
    },
    {
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      title: 'Scalable Solutions',
      description: 'Built to grow with your business',
    },
  ];

  process: ProcessStep[] = [
    {
      step: '01',
      title: 'Discovery & Planning',
      desc: 'Understanding your vision and requirements',
    },
    { step: '02', title: 'Design & Prototype', desc: 'Creating intuitive user experiences' },
    { step: '03', title: 'Development', desc: 'Building robust and scalable solutions' },
    { step: '04', title: 'Testing & QA', desc: 'Ensuring flawless performance' },
    { step: '05', title: 'Deployment', desc: 'Launching your app to the world' },
    { step: '06', title: 'Support & Maintenance', desc: 'Continuous improvement and updates' },
  ];

  technologies: Technology[] = [
    { name: 'Swift', category: 'iOS' },
    { name: 'Kotlin', category: 'Android' },
    { name: 'React Native', category: 'Cross-Platform' },
    { name: 'Flutter', category: 'Cross-Platform' },
    { name: 'Firebase', category: 'Backend' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
  ];

  constructor(private router: Router) {
    console.log('MobileAppDevelopmentComponent initialized');
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrollY = window.scrollY;
  }

  ngOnInit(): void {
    console.log('MobileAppDevelopmentComponent ngOnInit called');
    // Scroll to top when component initializes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  setActiveService(index: number): void {
    this.activeService = index;
  }

  navigateToService(serviceTitle: string): void {
    console.log('Service clicked:', serviceTitle);
    // You can implement specific navigation logic here
    alert(`More information about ${serviceTitle} coming soon!`);
  }
}

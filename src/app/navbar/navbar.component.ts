import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  href?: string;
  routerLink?: string;
  description?: string;
  badge?: string;
  badgeBg?: string;
  badgeText?: string;
  iconBg: string;
  iconColor: string;
  iconHover?: string;
  hoverBg: string;
  hoverBorder?: string;
  hoverText: string;
  svgPath: string;
  imageUrl?: string;
  tags?: string[];
  tagBg?: string;
  tagText?: string;
  tagBg2?: string;
  tagText2?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class Navbar {
  activeMenu: string | null = null;
  isScrolled = false;
  showAnnouncement = true;
  mobileOpen = false;
  mobileSection: string | null = null;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 24;
  }

  openMenu(menu: string): void { this.activeMenu = menu; }
  closeMenu(): void { this.activeMenu = null; }
  toggleMobile(): void { this.mobileOpen = !this.mobileOpen; if (!this.mobileOpen) this.mobileSection = null; }
  toggleMobileSection(s: string): void { this.mobileSection = this.mobileSection === s ? null : s; }
  closeMobile(): void { this.mobileOpen = false; this.mobileSection = null; }

  onImgError(event: Event): void {
    const target = event.currentTarget as HTMLImageElement;
    if (target) {
      target.style.opacity = '0';
    }
  }

  products: NavItem[] = [
    {
      label: 'Equipment Ops Platform',
      description: 'Unified Sales, Installed Base & Field Service',
      routerLink: '/products/equipment-ops',
      badge: 'Platform',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      hoverBg: 'hover:bg-indigo-50',
      hoverText: 'group-hover:text-indigo-600',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      label: 'Service & FSM Module',
      description: 'Asset 360, AMC & EFSR Work Orders',
      routerLink: '/products/equipment-ops/service',
      badge: 'Feature',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-50',
      hoverText: 'group-hover:text-blue-600',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M11 4a2 2 0 114 0v1a2 2 0 01-4 0V4z',
    },
    {
      label: 'Agentic AI Platform',
      description: 'Autonomous AI Agents & Workflows',
      routerLink: '/agentic-ai',
      badge: 'Platform',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
      hoverBg: 'hover:bg-violet-50',
      hoverText: 'group-hover:text-violet-600',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    },
    {
      label: 'Mobility & Bus Platform',
      description: 'Seat Booking, Live GPS & Conductor POS',
      routerLink: '/products/mobility-ops',
      badge: 'Platform',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      hoverBg: 'hover:bg-rose-50',
      hoverText: 'group-hover:text-rose-600',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M8 7h8m-8 4h8m-8 4h8M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z',
    },
    {
      label: 'IoT Asset Telemetry',
      description: 'Connected Sensor Streams & Predictive Alerts',
      routerLink: '/iot-solutions',
      badge: 'Platform',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      hoverBg: 'hover:bg-cyan-50',
      hoverText: 'group-hover:text-cyan-600',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    },
  ];

  technologies: NavItem[] = [
    {
      label: 'Web Application',
      description: 'Modern scalable web apps',
      routerLink: '/web-application',
      iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      iconColor: 'text-white',
      hoverBg: 'hover:bg-teal-50',
      hoverBorder: 'hover:border-teal-100',
      hoverText: 'group-hover:text-teal-600',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=350&q=80',
      tags: ['Angular', 'React'],
      tagBg: 'bg-gray-100',
      tagText: 'text-gray-600',
      badge: 'Web',
      tagBg2: 'bg-teal-100',
      tagText2: 'text-teal-700',
      svgPath:
        'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      label: 'Cloud',
      description: 'Scalable cloud infrastructure',
      routerLink: 'cloud',
      iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600',
      iconColor: 'text-white',
      hoverBg: 'hover:bg-sky-50',
      hoverBorder: 'hover:border-sky-100',
      hoverText: 'group-hover:text-sky-600',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=350&q=80',
      tags: ['AWS', 'Azure', 'DevOps'],
      badge: 'Cloud',
      tagBg: 'bg-gray-100',
      tagText: 'text-gray-600',
      tagBg2: 'bg-sky-100',
      tagText2: 'text-sky-700',
      svgPath:
        'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    },
    {
      label: 'Cognitive Computing',
      description: 'Intelligent decision-making systems',
      routerLink: '/cognitive',
      iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      iconColor: 'text-white',
      hoverBg: 'hover:bg-indigo-50',
      hoverBorder: 'hover:border-indigo-100',
      hoverText: 'group-hover:text-indigo-600',
      imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=350&q=80',
      tags: ['NLP', 'Deep Learning'],
      badge: 'Cognitive',
      tagBg: 'bg-gray-100',
      tagText: 'text-gray-600',
      tagBg2: 'bg-indigo-100',
      tagText2: 'text-indigo-700',
      svgPath:
        'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    },
    {
      label: 'Internet of Things',
      description: 'Connected device ecosystems',
      routerLink: 'iot-solutions',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-600',
      iconColor: 'text-white',
      hoverBg: 'hover:bg-cyan-50',
      hoverBorder: 'hover:border-cyan-100',
      hoverText: 'group-hover:text-cyan-600',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=350&q=80',
      tags: ['Industrial IoT', 'Embedded'],
      tagBg: 'bg-gray-100',
      tagText: 'text-gray-600',
      badge: 'IoT',
      tagBg2: 'bg-cyan-100',
      tagText2: 'text-cyan-700',
      svgPath:
        'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    },
    {
      label: 'Agentic AI',
      description: 'Autonomous AI-driven automation',
      routerLink: 'agentic-ai',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-700',
      iconColor: 'text-white',
      hoverBg: 'hover:bg-violet-50',
      hoverBorder: 'hover:border-violet-100',
      hoverText: 'group-hover:text-violet-600',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=350&q=80',
      tags: ['AI Agents', 'LLMs'],
      badge: 'AI',
      tagBg: 'bg-gray-100',
      tagText: 'text-gray-600',
      tagBg2: 'bg-violet-100',
      tagText2: 'text-violet-700',
      svgPath:
        'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    },
  ];

  services: NavItem[] = [
    {
      label: 'Enterprise Application Integration',
      description: 'SAP · Oracle · Microsoft',
      routerLink: '/enterprise',
      iconBg: 'bg-blue-100',
      iconHover: 'group-hover:bg-blue-200',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-50',
      hoverBorder: 'hover:border-blue-100',
      hoverText: 'group-hover:text-blue-600',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      label: 'Product Engineering',
      description: 'End-to-end development',
      routerLink: '/product-engineering',
      iconBg: 'bg-purple-100',
      iconHover: 'group-hover:bg-purple-200',
      iconColor: 'text-purple-600',
      hoverBg: 'hover:bg-purple-50',
      hoverBorder: 'hover:border-purple-100',
      hoverText: 'group-hover:text-purple-600',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Mobile Application',
      description: 'iOS · Android · Hybrid',
      routerLink: '/mobile-app-development',
      iconBg: 'bg-orange-100',
      iconHover: 'group-hover:bg-orange-200',
      iconColor: 'text-orange-600',
      hoverBg: 'hover:bg-orange-50',
      hoverBorder: 'hover:border-orange-100',
      hoverText: 'group-hover:text-orange-600',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
    {
      label: 'DevOps',
      description: 'CI/CD · Cloud pipelines',
      routerLink: '/devops',
      iconBg: 'bg-indigo-100',
      iconHover: 'group-hover:bg-indigo-200',
      iconColor: 'text-indigo-600',
      hoverBg: 'hover:bg-indigo-50',
      hoverBorder: 'hover:border-indigo-100',
      hoverText: 'group-hover:text-indigo-600',
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    },
    {
      label: 'IT Consulting',
      description: 'Strategic guidance',
      routerLink: '/it-consulting',
      iconBg: 'bg-green-100',
      iconHover: 'group-hover:bg-green-200',
      iconColor: 'text-green-600',
      hoverBg: 'hover:bg-green-50',
      hoverBorder: 'hover:border-green-100',
      hoverText: 'group-hover:text-green-600',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Cyber Security',
      description: 'Threat detection & protection',
      routerLink: '/cyber-security',
      iconBg: 'bg-red-100',
      iconHover: 'group-hover:bg-red-200',
      iconColor: 'text-red-600',
      hoverBg: 'hover:bg-red-50',
      hoverBorder: 'hover:border-red-100',
      hoverText: 'group-hover:text-red-600',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      label: 'Networking',
      description: 'Enterprise networks',
      routerLink: 'networking',
      iconBg: 'bg-yellow-100',
      iconHover: 'group-hover:bg-yellow-200',
      iconColor: 'text-yellow-600',
      hoverBg: 'hover:bg-yellow-50',
      hoverBorder: 'hover:border-yellow-100',
      hoverText: 'group-hover:text-yellow-600',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    },
    {
      label: 'DevSecOps',
      description: 'Dedicated resources',
      routerLink: 'devsecops',
      iconBg: 'bg-teal-100',
      iconHover: 'group-hover:bg-teal-200',
      iconColor: 'text-teal-600',
      hoverBg: 'hover:bg-teal-50',
      hoverBorder: 'hover:border-teal-100',
      hoverText: 'group-hover:text-teal-600',
      imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
  ];

  industries: NavItem[] = [
    {
      label: 'Retail & E-Commerce',
      routerLink: '/retail-ecommerce',
      iconBg: 'bg-blue-100',
      iconHover: 'group-hover:bg-blue-200',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-50',
      hoverText: 'group-hover:text-blue-700',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    },
    {
      label: 'Healthcare & Pharma',
      routerLink: '/healthcare-pharma',
      iconBg: 'bg-red-100',
      iconHover: 'group-hover:bg-red-200',
      iconColor: 'text-red-600',
      hoverBg: 'hover:bg-red-50',
      hoverText: 'group-hover:text-red-700',
      imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
    {
      label: 'BFSI',
      routerLink: '/industries/bfsi',
      iconBg: 'bg-green-100',
      iconHover: 'group-hover:bg-green-200',
      iconColor: 'text-green-600',
      hoverBg: 'hover:bg-green-50',
      hoverText: 'group-hover:text-green-700',
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Government',
      routerLink: '/industries/government',
      iconBg: 'bg-purple-100',
      iconHover: 'group-hover:bg-purple-200',
      iconColor: 'text-purple-600',
      hoverBg: 'hover:bg-purple-50',
      hoverText: 'group-hover:text-purple-700',
      imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      label: 'Manufacturing',
      routerLink: '/industries/manufacturing',
      iconBg: 'bg-orange-100',
      iconHover: 'group-hover:bg-orange-200',
      iconColor: 'text-orange-600',
      hoverBg: 'hover:bg-orange-50',
      hoverText: 'group-hover:text-orange-700',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Education',
      routerLink: '/industries/education',
      iconBg: 'bg-indigo-100',
      iconHover: 'group-hover:bg-indigo-200',
      iconColor: 'text-indigo-600',
      hoverBg: 'hover:bg-indigo-50',
      hoverText: 'group-hover:text-indigo-700',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      label: 'Transportation',
      routerLink: '/industries/transportation',
      iconBg: 'bg-teal-100',
      iconHover: 'group-hover:bg-teal-200',
      iconColor: 'text-teal-600',
      hoverBg: 'hover:bg-teal-50',
      hoverText: 'group-hover:text-teal-700',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Telecom',
      routerLink: '/industries/telecom',
      iconBg: 'bg-blue-100',
      iconHover: 'group-hover:bg-blue-200',
      iconColor: 'text-blue-700',
      hoverBg: 'hover:bg-blue-50',
      hoverText: 'group-hover:text-blue-700',
      imageUrl: 'https://images.unsplash.com/photo-1520869562399-e772f042f422?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
    },
  ];

  companyLinks: NavItem[] = [
    {
      label: 'About Us',
      description: 'Our story, mission & values',
      routerLink: '/about',
      iconBg: 'bg-blue-100',
      iconHover: 'group-hover:bg-blue-200',
      iconColor: 'text-blue-600',
      hoverBg: 'hover:bg-blue-50',
      hoverText: 'group-hover:text-blue-600',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=350&q=80',
      svgPath: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      label: 'Team',
      description: 'Meet the people behind us',
      routerLink: '/team',
      iconBg: 'bg-purple-100',
      iconHover: 'group-hover:bg-purple-200',
      iconColor: 'text-purple-600',
      hoverBg: 'hover:bg-purple-50',
      hoverText: 'group-hover:text-purple-600',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Portfolio',
      description: 'Explore our work & projects',
      routerLink: '/portfolio',
      iconBg: 'bg-yellow-100',
      iconHover: 'group-hover:bg-yellow-200',
      iconColor: 'text-yellow-600',
      hoverBg: 'hover:bg-yellow-50',
      hoverText: 'group-hover:text-yellow-600',
      imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
    {
      label: 'Insights',
      description: 'Latest updates from our team',
      routerLink: '/insights',
      iconBg: 'bg-indigo-100',
      iconHover: 'group-hover:bg-indigo-200',
      iconColor: 'text-indigo-600',
      hoverBg: 'hover:bg-indigo-50',
      hoverText: 'group-hover:text-indigo-600',
      imageUrl:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m0 0h2a2 2 0 012 2v9a2 2 0 01-2 2h-2m0-13v13M7 8h6M7 12h4',
    },
    {
      label: 'Careers',
      description: 'Join our growing team',
      routerLink: '/careers',
      badge: 'Hiring',
      badgeBg: 'bg-green-100',
      badgeText: 'text-green-700',
      iconBg: 'bg-green-100',
      iconHover: 'group-hover:bg-green-200',
      iconColor: 'text-green-600',
      hoverBg: 'hover:bg-green-50',
      hoverText: 'group-hover:text-green-600',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      label: 'Clients',
      description: 'Trusted by leading organisations',
      routerLink: '/clients',
      iconBg: 'bg-cyan-100',
      iconHover: 'group-hover:bg-cyan-200',
      iconColor: 'text-cyan-600',
      hoverBg: 'hover:bg-cyan-50',
      hoverText: 'group-hover:text-cyan-600',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      label: 'Privacy Policy',
      description: 'How we handle your data',
      routerLink: '/privacy-policy',
      iconBg: 'bg-slate-100',
      iconHover: 'group-hover:bg-slate-200',
      iconColor: 'text-slate-600',
      hoverBg: 'hover:bg-slate-50',
      hoverText: 'group-hover:text-slate-600',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      label: 'Terms of Use',
      description: 'Our terms & conditions',
      routerLink: '/terms-of-use',
      iconBg: 'bg-rose-100',
      iconHover: 'group-hover:bg-rose-200',
      iconColor: 'text-rose-600',
      hoverBg: 'hover:bg-rose-50',
      hoverText: 'group-hover:text-rose-600',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
    {
      label: 'Contact',
      description: 'Get in touch with us',
      routerLink: '/contact',
      iconBg: 'bg-orange-100',
      iconHover: 'group-hover:bg-orange-200',
      iconColor: 'text-orange-600',
      hoverBg: 'hover:bg-orange-50',
      hoverText: 'group-hover:text-orange-600',
      imageUrl: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=350&q=80',
      svgPath:
        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];
}

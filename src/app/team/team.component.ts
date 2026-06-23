import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
  twitter?: string;
  email?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Our Team | Blute Technologies - Software Development Company Bangalore');
    this.metaService.updateTag({ name: 'description', content: 'Meet the passionate engineers, designers, and leaders at Blute Technologies — driving custom software development, mobile app development, IoT, and AI/ML solutions for global enterprises from Bangalore, India.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Blute Technologies team, software engineers Bangalore, IT professionals India, software development company Bangalore, tech leadership team, IT company Bangalore' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:site_name', content: 'Blute Technologies' });
    this.metaService.updateTag({ property: 'og:title', content: 'Our Team | Blute Technologies - Software Development Company Bangalore' });
    this.metaService.updateTag({ property: 'og:description', content: 'Meet the passionate engineers, designers, and leaders at Blute Technologies driving custom software, mobile app, IoT, and AI solutions for global enterprises.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://blute.co.in/team' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://blute.co.in/assets/images/og-banner.png' });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@blutetech' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Our Team | Blute Technologies - Software Development Company Bangalore' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Meet the passionate engineers, designers, and leaders at Blute Technologies driving custom software, mobile app, IoT, and AI solutions for global enterprises.' });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://blute.co.in/assets/images/og-banner.png' });
  }
  // Floating particles data
  particles = Array.from({ length: 18 }, (_, i) => ({
    x: Math.random() * 100 + '%',
    y: Math.random() * 100 + '%',
    delay: (Math.random() * 4).toFixed(1) + 's',
    duration: (4 + Math.random() * 4).toFixed(1) + 's',
  }));

  team: TeamMember[] = [
    {
      name: 'Vittaladas Bhat',
      role: 'Co-Founder & Chief Executive Officer',
      image: 'assets/images/clients/vittal-2026.jpg',
      bio: 'A seasoned business leader and visionary entrepreneur with decades of experience in enterprise technology. Vittaladas co-founded Blute Technologies with a mission to deliver transformative digital solutions that create lasting business value for clients across industries.',
      expertise: [],
      linkedin: 'https://www.linkedin.com/in/vittaladas-bhat-2440195/',
    },
    {
      name: 'Sudarshan Shenvi',
      role: 'Co-Founder & Director – Technology',
      image: 'assets/images/clients/sudarshan-2026.jpg',
      bio: 'A technology visionary with deep expertise in cloud architecture, AI, and modern software engineering. Sudarshan leads the technology direction at Blute, driving innovation and ensuring the delivery of scalable, high-performance solutions that keep clients ahead of the curve.',
      expertise: [],
      linkedin: 'https://www.linkedin.com/in/sudarshan-shenvi-27564226/',
    },
    {
      name: 'Satya Prakash H M',
      role: 'Co-Founder & Director – Sales',
      image: 'assets/images/clients/satya.png',
      bio: 'A dynamic sales leader with a proven track record of building strong client relationships and driving business growth. Satya Prakash spearheads the go-to-market strategy at Blute Technologies, connecting clients with the right technology solutions to meet their unique goals.',
      expertise: [],
      linkedin: 'https://www.linkedin.com/in/satyaprakashhm/',
    },
  ];

  stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '23+', label: 'Happy Clients' },
    { value: '8+', label: 'Industries Served' },
    { value: '8+', label: 'Years of Excellence' },
  ];

  private readonly avatarColors = [
    '0d9488', '2563eb', '7c3aed', '059669',
    'd97706', 'dc2626', '0284c7', '9333ea',
  ];

  extendedTeam = [
    { name: 'Janakiraman T S',     role: 'Technology Lead',    linkedin: 'https://www.linkedin.com/in/janakiraman-t-s' },
    { name: 'Chaithra P',          role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/chaithra-p-1b76b7157/' },
    { name: 'Kavita Patil',        role: 'Angular Developer',  linkedin: 'https://www.linkedin.com/in/kavita-patil-angular/' },
    { name: 'Sudhanshu Bhardwaj',  role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/sudhanshu-bhardwaj-0301a6113/' },
    { name: 'Krishna Goudelar',    role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/krishnagoudelar/' },
    { name: 'Aftab Alam',          role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/aftab-alam-73827b164/' },
    { name: 'Varun Gowda',         role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/varun-gowda-40209a82/' },
    { name: 'Akshay Hegde',        role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/akshay-hegde-050649196/' },
    { name: 'Akshaya Kharvi',      role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/akshaya-kharvi-47a9ba1b5/' },
    { name: 'Salmaan Jawad',       role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/salmaan-jawad-52383111/' },
    { name: 'Asha Kumari Ranawat', role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/asha-kumari-ranawat-8b1599287/' },
    { name: 'Madhan Mohan',        role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/madhan-mohan-0bb463123' },
    { name: 'Bharath Petkar',      role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/bharath-petkar/' },
    { name: 'Asha Anwar',          role: 'Software Developer', linkedin: 'https://www.linkedin.com/in/asha-anwar-developer/' },
    { name: 'Mithun K',            role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/mithun-k-9a90151b3/' },
    { name: 'Varunakumara G',      role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/varunakumara-g-a9201917b/' },
    { name: 'Darshan BR',          role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/darshan-br-972769231/' },
    { name: 'Deepa Ramalingiah',   role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/deepa-ramalingiah-034593255/' },
    { name: 'Sahana Godi',         role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/sahana-godi-0772ba40a/' },
    { name: 'Likhith M Gowda',     role: 'Software Engineer',  linkedin: 'https://www.linkedin.com/in/likhith-m-gowda/' },
  ].map((m, i) => ({
    ...m,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=${this.avatarColors[i % this.avatarColors.length]}&color=fff&size=200&bold=true&font-size=0.38`,
  }));

  onPhotoError(event: Event, name: string): void {
    const img = event.target as HTMLImageElement;
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff&size=300&bold=true&font-size=0.38`;
  }
}

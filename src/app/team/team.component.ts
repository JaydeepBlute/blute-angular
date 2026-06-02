import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
export class TeamComponent {
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
      image: 'assets/images/clients/vittal.jpg',
      bio: 'A seasoned business leader and visionary entrepreneur with decades of experience in enterprise technology. Vittaladas co-founded Blute Technologies with a mission to deliver transformative digital solutions that create lasting business value for clients across industries.',
      expertise: [],
      linkedin: 'https://www.linkedin.com/in/vittaladas-bhat-2440195/',
    },
    {
      name: 'Sudarshan Shenvi',
      role: 'Co-Founder & Director – Technology',
      image: 'assets/images/clients/sudarshan.jpg',
      bio: 'A technology visionary with deep expertise in cloud architecture, AI, and modern software engineering. Sudarshan leads the technology direction at Blute, driving innovation and ensuring the delivery of scalable, high-performance solutions that keep clients ahead of the curve.',
      expertise: [],
      linkedin: 'https://www.linkedin.com/in/sudarshan-shenvi-27564226/',
    },
    {
      name: 'Satya Prakash H M',
      role: 'Co-Founder & Director – Sales',
      image: 'assets/images/clients/satya.jpg',
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
}

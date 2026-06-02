import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Stat {
  value: string;
  label: string;
}

interface Client {
  name: string;
  logo: string;
}
interface MissionVision {
  icon: string;
  title: string;
  description: string;
}
interface Technology {
  icon: string;
  category: string;
  description: string;
}
interface Benefit {
  icon: 'globe' | 'shield' | 'trending-up' | 'support';
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initScrollAnimations();
    this.initHeroCanvas();
  }

  navigateToServices(): void {
    this.router.navigate(['/services']);
  }

  initHeroCanvas(): void {
    // Wait for DOM to be ready
    setTimeout(() => {
      const canvas = document.getElementById('heroCanvas') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Match canvas size to its container
      const resize = () => {
        canvas.width = canvas.offsetWidth || 580;
        canvas.height = canvas.offsetHeight || 420;
      };
      resize();
      window.addEventListener('resize', resize);

      // Create particles
      const makeParticles = () =>
        Array.from({ length: 85 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r: Math.random() * 1.6 + 0.4,
          a: Math.random() * 0.6 + 0.2,
          c: Math.random() > 0.5 ? '13,148,136' : '6,182,212',
        }));

      let pts = makeParticles();

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connecting lines
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(13,148,136,${0.18 * (1 - dist / 110)})`;
              ctx.lineWidth = 0.6;
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw & move dots
        pts.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.c},${p.a})`;
          ctx.fill();
        });

        requestAnimationFrame(draw);
      };

      draw();
    }, 200);
  }

  initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.15 },
    );
    setTimeout(() => {
      document
        .querySelectorAll('.animate-fade-in-up, .animate-fade-in-down, .animate-fade-in')
        .forEach((el) => observer.observe(el));
    }, 100);
  }

  stats: Stat[] = [
    { value: '8+', label: 'Years in Operation' },
    { value: '23+', label: 'Clients Served' },
    { value: '43+', label: 'Full-Time Employees' },
    { value: '2', label: 'Offices' },
  ];

  missionVision: MissionVision[] = [
    {
      icon: '🎯',
      title: 'Our Vision',
      description:
        'To help enterprises accelerate adoption of latest technologies, untangle complex issues that always emerge during digital transformation, and orchestrate ongoing innovation for sustainable growth.',
    },
    {
      icon: '🌍',
      title: 'Our Mission',
      description:
        'To lead the process from ideation and concept to delivery, providing ongoing maintenance support to enhance business growth — building consumer-oriented apps or transformative enterprise-class solutions that create reliable competitive advantage.',
    },
    {
      icon: '⚡',
      title: 'Our Approach',
      description:
        'We combine strategy consulting, CX design, engineering expertise, and lifecycle management to deliver world-class technology solutions that keep our clients always ahead of the curve.',
    },
  ];

  whyBadges: string[] = [
    'Cost-Effective',
    'Highest Quality',
    'Highly Secured',
    'Scalable Solutions',
    'High Performance',
  ];

  benefits: Benefit[] = [
    {
      icon: 'globe',
      title: 'Global Presence',
      description:
        'Partnerships and delivery capabilities spanning multiple continents and industries worldwide.',
    },
    {
      icon: 'shield',
      title: 'Enterprise Security',
      description:
        'Industry-standard security practices and compliance built into every solution we deliver.',
    },
    {
      icon: 'trending-up',
      title: 'Scalable Solutions',
      description:
        'Architecture designed to grow seamlessly with your business from MVP to enterprise scale.',
    },
    {
      icon: 'support',
      title: 'Dedicated Support',
      description:
        'Responsive support teams available round the clock to ensure your systems run flawlessly.',
    },
  ];

  technologies: Technology[] = [
    {
      icon: '🖥️',
      category: 'Web Application',
      description:
        'Modern scalable web apps built with Angular and React for seamless, high-performance user experiences.',
    },
    {
      icon: '☁️',
      category: 'Cloud',
      description:
        'Scalable cloud infrastructure, migration, CI/CD pipelines and managed services on AWS, Azure and DevOps.',
    },
    {
      icon: '🧠',
      category: 'Cognitive Computing',
      description:
        'Intelligent decision-making systems powered by NLP, Deep Learning, and machine learning tailored to your data.',
    },
    {
      icon: '🌐',
      category: 'Internet of Things',
      description:
        'Connected device ecosystems with Industrial IoT and Embedded systems for smart automation applications.',
    },
    {
      icon: '🤖',
      category: 'Agentic AI',
      description:
        'Autonomous AI-driven automation using AI Agents and LLMs to streamline complex business workflows.',
    },
    {
      icon: '🎨',
      category: 'Customer Experience (UI/UX)',
      description:
        'User-centred design, interactive prototypes, and intuitive interfaces that delight your customers.',
    },
  ];

  clients: Client[] = [
    { name: 'Agile Network', logo: 'assets/images/clients/agile.jpeg' },
    { name: 'Aikya', logo: 'assets/images/clients/aikya.jpeg' },
    { name: 'Alkimi', logo: 'assets/images/clients/alkimi.jpeg' },
    { name: 'Amazing Care', logo: 'assets/images/clients/AmazingCare.jpg' },
    { name: 'Arion', logo: 'assets/images/clients/arion.jpeg' },
    { name: 'Conlis Global', logo: 'assets/images/clients/conlis.jpeg' },
    { name: 'Evoscience', logo: 'assets/images/clients/evoscience.jpg' },
    { name: 'First Earth', logo: 'assets/images/clients/firstearth.webp' },
    {
      name: 'Gravity India Technologies',
      logo: 'assets/images/clients/gravity-india-technologies.png',
    },
    { name: 'HeyLearno', logo: 'assets/images/clients/heylearno.png' },
    { name: 'Infosys', logo: 'assets/images/clients/infosys.jpg' },
    { name: 'ITC Infotech', logo: 'assets/images/clients/ITC-Infotech.webp' },
    { name: 'Medverve', logo: 'assets/images/clients/medverve.jpeg' },
    { name: 'Mitsubishi', logo: 'assets/images/clients/Mitsubishi.png' },
    { name: 'Nivetti', logo: 'assets/images/clients/nivetti.jpeg' },
    { name: 'Novem Solutions', logo: 'assets/images/clients/novem.jpg' },
    { name: 'Oracle', logo: 'assets/images/clients/oracle.png' },
    { name: 'Percept', logo: 'assets/images/clients/percept.png' },
    { name: 'Power Synergy', logo: 'assets/images/clients/powersynergy.png' },
    { name: 'Simplex', logo: 'assets/images/clients/simplex.jpeg' },
    { name: 'SKBL', logo: 'assets/images/clients/skbl.jpeg' },
    { name: 'Transorion', logo: 'assets/images/clients/tansorian.png' },
    { name: 'Ullas', logo: 'assets/images/clients/ullas.png' },
    { name: 'Xuberant', logo: 'assets/images/clients/XUBERANT.jpg' },
    { name: 'Zeiss', logo: 'assets/images/clients/Zeiss.png' },
  ];
}

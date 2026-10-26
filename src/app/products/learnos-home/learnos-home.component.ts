import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type AudienceTab = 'students' | 'business' | 'universities' | 'government';

interface AudienceContent {
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  stat: string;
  statLabel: string;
}

interface Category {
  name: string;
  count: string;
  svgPath: string;
  accentBg: string;
  accentText: string;
}

interface Feature {
  number: string;
  title: string;
  description: string;
}

interface ActiveCourse {
  title: string;
  lessons: number;
  category: string;
  categoryBg: string;
  completion: number;
  barColor: string;
  rating: number;
  enrolled: number;
}

interface TestResult {
  title: string;
  student: string;
  attempt: number;
  daysAgo: string;
  score: number;
}

interface AdminModule {
  label: string;
  svgPath: string;
  accentColor: string;
  accentBg: string;
}

@Component({
  selector: 'app-learnos-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './learnos-home.component.html',
  styleUrls: ['./learnos-home.component.scss'],
})
export class LearnosHomeComponent {
  readonly lmsUrl = 'https://lms.blute.co.in';
  readonly adminUrl = 'https://lms.blute.co.in';

  activeTab: AudienceTab = 'students';

  readonly tabs: { id: AudienceTab; label: string }[] = [
    { id: 'students', label: 'For Students' },
    { id: 'business', label: 'For Businesses' },
    { id: 'universities', label: 'For Universities / Colleges' },
    { id: 'government', label: 'For Government' },
  ];

  readonly audienceContent: Record<AudienceTab, AudienceContent> = {
    students: {
      eyebrow: 'BUILD YOUR FUTURE',
      headline: 'Learn skills that move you forward.',
      sub: 'Build practical skills, earn certificates, and learn from expert-led courses designed for the real world.',
      cta: 'Get Started Free',
      stat: '+24%',
      statLabel: 'Keep growing this month',
    },
    business: {
      eyebrow: 'UPSKILL YOUR WORKFORCE',
      headline: 'Upskill your entire team — at scale.',
      sub: 'Assign courses, track team progress, manage batches, and issue certificates across your whole organisation from one dashboard.',
      cta: 'See Business Plans',
      stat: '30',
      statLabel: 'Active learners enrolled',
    },
    universities: {
      eyebrow: 'CAMPUS LEARNING',
      headline: 'Bring structured learning to your campus.',
      sub: "Deploy student batches, run live classes, issue verified certificates, and track cohort progress — all under your institution's brand.",
      cta: 'Talk to Our Team',
      stat: '29',
      statLabel: 'Courses live on the platform',
    },
    government: {
      eyebrow: 'PUBLIC SECTOR TRAINING',
      headline: 'Train public servants. Build national capacity.',
      sub: 'A compliance-ready, scalable platform for government training programmes — with role-based access, audit trails, and certificate issuance.',
      cta: 'Request a Demo',
      stat: '3',
      statLabel: 'Active certificate programmes',
    },
  };

  get current(): AudienceContent {
    return this.audienceContent[this.activeTab];
  }

  selectTab(tab: AudienceTab): void {
    this.activeTab = tab;
  }

  readonly metrics = [
    { value: '30', label: 'Active Learners', detail: 'Across current course enrollments' },
    { value: '29', label: 'Published Courses', detail: '34 total courses on the platform' },
    { value: '3', label: 'Certs Issued', detail: '3 active certificate templates' },
    { value: '₹19.5 L', label: 'Revenue Generated', detail: 'From company subscriptions' },
  ];

  readonly categories: Category[] = [
    {
      name: 'Technology',
      count: '120+ courses',
      accentBg: 'bg-slate-100',
      accentText: 'text-slate-600',
      svgPath:
        'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    },
    {
      name: 'Data & AI',
      count: '64+ courses',
      accentBg: 'bg-blue-100',
      accentText: 'text-blue-600',
      svgPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      name: 'Design',
      count: '48+ courses',
      accentBg: 'bg-violet-100',
      accentText: 'text-violet-600',
      svgPath:
        'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    },
    {
      name: 'Career Skills',
      count: '56+ courses',
      accentBg: 'bg-emerald-100',
      accentText: 'text-emerald-600',
      svgPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    },
    {
      name: 'Business',
      count: '85+ courses',
      accentBg: 'bg-amber-100',
      accentText: 'text-amber-600',
      svgPath:
        'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      name: 'Finance',
      count: '42+ courses',
      accentBg: 'bg-rose-100',
      accentText: 'text-rose-600',
      svgPath:
        'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  readonly features: Feature[] = [
    {
      number: '01',
      title: 'Practical Learning',
      description:
        'Learn through relevant lessons and real-world projects that build job-ready skills from day one.',
    },
    {
      number: '02',
      title: 'Track Your Progress',
      description:
        'See your growth, completed lessons, and achievements in a clear learner dashboard.',
    },
    {
      number: '03',
      title: 'Celebrate Achievement',
      description:
        'Earn certificates that reflect the skills you have built — shareable, verifiable, and employer-ready.',
    },
    {
      number: '04',
      title: 'Learn Anywhere',
      description:
        'Continue learning across your web and mobile experience — on any device, at any pace.',
    },
  ];

  readonly activeCourses: ActiveCourse[] = [
    {
      title: 'Accounting Fundamentals',
      lessons: 4,
      category: 'Accounting Fundamentals',
      categoryBg: 'bg-blue-100 text-blue-700',
      completion: 56,
      barColor: 'bg-blue-500',
      rating: 4.0,
      enrolled: 7,
    },
    {
      title: 'Flutter for Beginners',
      lessons: 6,
      category: 'Programming & Software Dev',
      categoryBg: 'bg-green-100 text-green-700',
      completion: 58,
      barColor: 'bg-green-500',
      rating: 3.7,
      enrolled: 5,
    },
    {
      title: 'Financial Modelling for Finance Professionals',
      lessons: 7,
      category: 'Corporate Finance',
      categoryBg: 'bg-orange-100 text-orange-700',
      completion: 55,
      barColor: 'bg-orange-500',
      rating: 4.5,
      enrolled: 2,
    },
    {
      title: 'Leadership & Time Management',
      lessons: 4,
      category: 'Professional & Soft Skills',
      categoryBg: 'bg-purple-100 text-purple-700',
      completion: 46,
      barColor: 'bg-purple-500',
      rating: 5.0,
      enrolled: 2,
    },
  ];

  readonly recentTests: TestResult[] = [
    {
      title: 'Accounting Fundamentals Assessment',
      student: 'Navin Thomas',
      attempt: 2,
      daysAgo: '49d ago',
      score: 92,
    },
    {
      title: 'Flutter Fundamentals Assessment',
      student: 'Salmaan Jawad',
      attempt: 2,
      daysAgo: '50d ago',
      score: 100,
    },
    {
      title: 'Flutter Fundamentals Assessment',
      student: 'Anitha Ranganath',
      attempt: 1,
      daysAgo: '52d ago',
      score: 83,
    },
    {
      title: 'Flutter Fundamentals Assessment',
      student: 'Gopal Madhusudhan',
      attempt: 1,
      daysAgo: '52d ago',
      score: 100,
    },
  ];

  readonly adminModules: AdminModule[] = [
    {
      label: 'Course Builder',
      accentColor: 'text-amber-400',
      accentBg: 'bg-amber-500/10',
      svgPath:
        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      label: 'Live Classes',
      accentColor: 'text-blue-400',
      accentBg: 'bg-blue-500/10',
      svgPath:
        'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    },
    {
      label: 'Content Library',
      accentColor: 'text-violet-400',
      accentBg: 'bg-violet-500/10',
      svgPath:
        'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
    },
    {
      label: 'Tests & Quizzes',
      accentColor: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10',
      svgPath:
        'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    },
    {
      label: 'Certifications',
      accentColor: 'text-rose-400',
      accentBg: 'bg-rose-500/10',
      svgPath:
        'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z',
    },
    {
      label: 'Analytics',
      accentColor: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10',
      svgPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      label: 'Companies',
      accentColor: 'text-orange-400',
      accentBg: 'bg-orange-500/10',
      svgPath:
        'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    },
    {
      label: 'Batches & Groups',
      accentColor: 'text-indigo-400',
      accentBg: 'bg-indigo-500/10',
      svgPath:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
  ];

  getScoreColor(score: number): string {
    if (score === 100) return 'bg-green-100 text-green-700';
    if (score >= 80) return 'bg-blue-100 text-blue-700';
    if (score >= 60) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  }
}

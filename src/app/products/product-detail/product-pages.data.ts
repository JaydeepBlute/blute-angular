export interface ProductFeature {
  readonly title: string;
  readonly bullets: readonly string[];
}

export interface ProductFlowStep {
  readonly label: string;
  readonly desc: string;
}

export interface ProductMetric {
  readonly value: string;
  readonly label: string;
}

export interface ProductPage {
  readonly slug: string;
  readonly name: string;
  readonly navDescription: string;
  readonly kicker: string;
  readonly headline: string;
  readonly intro: string;
  readonly imageUrl: string;
  readonly svgPath: string;
  readonly accent: {
    readonly text: string;
    readonly glow: string;
    readonly gradient: string;
    readonly shadow: string;
    readonly border: string;
    readonly cta: string;
  };
  readonly metrics: readonly ProductMetric[];
  readonly features: readonly ProductFeature[];
  readonly flowTitle: string;
  readonly flow: readonly ProductFlowStep[];
  readonly benefitsTitle: string;
  readonly benefits: readonly string[];
  readonly tech: readonly string[];
}

export const PRODUCT_PAGES: readonly ProductPage[] = [
  {
    slug: 'e-contractor',
    name: 'E-Contractor Management',
    navDescription: 'Contractor Onboarding, Training, Access & Safety',
    kicker: 'E-Contractor Management System · Built by Blute Technologies',
    headline: 'Onboard, certify and track every contractor on site.',
    intro:
      'A new-age contractor management system that administers and tracks the work and movement of all contractors. It ensures every contractor is certified before working at a designated workplace, with the right safety precautions in place.',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=350&q=80',
    svgPath:
      'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    accent: {
      text: 'text-orange-400',
      glow: 'from-orange-700/20 via-amber-700/10',
      gradient: 'from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500',
      shadow: 'shadow-[0_10px_30px_rgba(234,88,12,0.35)]',
      border: 'hover:border-orange-500/40',
      cta: 'from-orange-900/60 via-amber-900/60 to-yellow-900/60 border-orange-500/30',
    },
    metrics: [
      { value: '5', label: 'Major user roles' },
      { value: '3', label: 'Approval levels' },
      { value: '8', label: 'Automated processes' },
    ],
    features: [
      {
        title: 'Contractor Onboarding & Training',
        bullets: [
          'Easy onboarding of main contractors, sub contractors and contractors',
          'Schedule training for contractors, with auto-scheduling for new joiners',
          'Supervisor grades each contractor — a fail sends them back to training',
          'Train and certify contractors before they can be assigned to work',
        ],
      },
      {
        title: 'Access Control',
        bullets: [
          'Submit access requests through the intranet',
          'Multi-level approval — requester, approver and executor',
          'Email sent to the approver and executor at each step',
          'Requester is notified by mail when access is granted or rejected',
        ],
      },
      {
        title: 'Risk Work Plan (RWP)',
        bullets: [
          'Security or supervisor creates the RWP and assigns active contractors',
          'Add and track contractors and tools against the plan',
          'Raise an extension request to the HOD when more time is needed',
          'HOD approves or rejects the extension',
        ],
      },
      {
        title: 'Movement Tracking',
        bullets: [
          'Track contractor movement across rooms and gates',
          'Track tools movement against inventory',
          'Access types configured per room, gate and training',
        ],
      },
      {
        title: 'Incident Reporting',
        bullets: [
          'Security or supervisor creates incident reports',
          'Incidents stay linked to the contractor and work plan',
        ],
      },
      {
        title: 'Roles & Configuration',
        bullets: [
          'Roles: HOD, Supervisor, Security, Main Contractor and Sub Contractor',
          'Configure access types, rooms, gates, trainings and training schedules',
          'Configure inventory for tools issued to contractors',
        ],
      },
    ],
    flowTitle: 'From onboarding to site work — in one flow',
    flow: [
      { label: 'Onboard', desc: 'Contractor registered' },
      { label: 'Train', desc: 'Auto-scheduled training' },
      { label: 'Grade', desc: 'Pass or back to training' },
      { label: 'Approve Access', desc: 'Requester → approver → executor' },
      { label: 'Assign RWP', desc: 'Risk work plan created' },
      { label: 'Track', desc: 'Movement of people and tools' },
    ],
    benefitsTitle: 'Why organisations choose it',
    benefits: [
      'Multi level approval — 3 levels',
      'Support planning (work)',
      'Easy onboarding of contractors',
      'Schedule training of contractors',
      'Train and certify contractors',
      'Provide access control',
      'Track movement of contractors and tools',
      'Support incident reports',
    ],
    tech: ['Java', 'Angular'],
  },
  {
    slug: 'amazing-care-assist',
    name: 'Amazing Care Assist',
    navDescription: 'Patient Health Monitoring, Alerts & Status Tracking',
    kicker: 'Amazing Care Assist · Mobile Health App',
    headline: 'Doctors and patients, tracking progress in one place.',
    intro:
      'A mobile app that collects health data from iPhones and Android devices, so doctors and patients can track progress in one convenient place.',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=350&q=80',
    svgPath:
      'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    accent: {
      text: 'text-rose-400',
      glow: 'from-rose-700/20 via-pink-700/10',
      gradient: 'from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500',
      shadow: 'shadow-[0_10px_30px_rgba(225,29,72,0.35)]',
      border: 'hover:border-rose-500/40',
      cta: 'from-rose-900/60 via-pink-900/60 to-fuchsia-900/60 border-rose-500/30',
    },
    metrics: [
      { value: 'iOS + Android', label: 'Health data sources' },
      { value: '1', label: 'Shared view for doctor and patient' },
      { value: 'Live', label: 'Focused alerts' },
    ],
    features: [
      {
        title: 'Patient Health Monitoring',
        bullets: [
          'Collects health data from iPhone and Android devices',
          'Doctors and patients track progress in one place',
        ],
      },
      {
        title: 'Alerts & Feedback',
        bullets: [
          'Timely, focused alerts for patients and care teams',
          'Feedback captured through question status tracking',
        ],
      },
      {
        title: 'Status Tracking',
        bullets: [
          'Patient status at a glance',
          'Question status and tracking status per patient',
        ],
      },
    ],
    flowTitle: 'How care stays connected',
    flow: [
      { label: 'Collect', desc: 'Health data from devices' },
      { label: 'Monitor', desc: 'Patient health and status' },
      { label: 'Alert', desc: 'Timely, focused alerts' },
      { label: 'Review', desc: 'Doctor and patient progress' },
    ],
    benefitsTitle: 'Benefits',
    benefits: ['Monitors patients health', 'Timely alerts', 'Patients status'],
    tech: ['Mobile (iOS / Android)', 'Java Spring Boot', 'Angular'],
  },
  {
    slug: 'first-earth',
    name: 'First Earth',
    navDescription: 'Farming Tutorials, Products & Orders on Mobile',
    kicker: 'First Earth · Mobile & Web Platform',
    headline: 'Farming knowledge and products, in every farmer’s hands.',
    intro:
      'The First Earth project offers farmers tutorials and farming product sales through a user-friendly platform, with a web page for management and an Ionic app for easy access.',
    imageUrl:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=350&q=80',
    svgPath:
      'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    accent: {
      text: 'text-emerald-400',
      glow: 'from-emerald-700/20 via-green-700/10',
      gradient: 'from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500',
      shadow: 'shadow-[0_10px_30px_rgba(5,150,105,0.35)]',
      border: 'hover:border-emerald-500/40',
      cta: 'from-emerald-900/60 via-green-900/60 to-teal-900/60 border-emerald-500/30',
    },
    metrics: [
      { value: 'Web + App', label: 'Management portal and Ionic app' },
      { value: 'Multi', label: 'Language support' },
      { value: '8', label: 'Core modules' },
    ],
    features: [
      {
        title: 'Learning',
        bullets: ['Tutorials for farmers', 'Farming videos', 'Content in multiple languages'],
      },
      {
        title: 'Commerce',
        bullets: ['Farming products catalogue', 'Orders', 'Advertisements'],
      },
      {
        title: 'Engagement & Administration',
        bullets: ['Notifications to users', 'User management', 'Web page for management'],
      },
    ],
    flowTitle: 'How the platform works',
    flow: [
      { label: 'Learn', desc: 'Tutorials and videos' },
      { label: 'Browse', desc: 'Farming products' },
      { label: 'Order', desc: 'Place orders in the app' },
      { label: 'Manage', desc: 'Admin web page' },
    ],
    benefitsTitle: 'Benefits',
    benefits: [
      'Tutorials',
      'Products',
      'Farming videos',
      'Advertisements',
      'Languages',
      'Orders',
      'Notifications',
      'Users',
    ],
    tech: ['Ionic', 'Angular', 'Web management portal'],
  },
  {
    slug: 'order-management',
    name: 'Order Management App',
    navDescription: 'On-the-spot Order Booking & Status on Mobile',
    kicker: 'Order Management App · Mobile',
    headline: 'Place orders on the spot, in front of the buyer.',
    intro:
      'Integrated mobile features that ease the order placement process. Orders can be placed on the spot, using the advanced options needed for entering lens data, and reviewed before they are sent.',
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=350&q=80',
    svgPath:
      'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    accent: {
      text: 'text-sky-400',
      glow: 'from-sky-700/20 via-blue-700/10',
      gradient: 'from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500',
      shadow: 'shadow-[0_10px_30px_rgba(2,132,199,0.35)]',
      border: 'hover:border-sky-500/40',
      cta: 'from-sky-900/60 via-blue-900/60 to-indigo-900/60 border-sky-500/30',
    },
    metrics: [
      { value: 'On the spot', label: 'Order placement' },
      { value: 'Play Store', label: 'Easy download' },
      { value: 'Live', label: 'Order status' },
    ],
    features: [
      {
        title: 'Order Entry',
        bullets: [
          'Place orders on the spot, in front of the buyer',
          'Advanced options for entering lens data',
        ],
      },
      {
        title: 'Review & Send',
        bullets: [
          'Order review screen to check an order before placing it',
          'Successfully placed orders are listed under sent orders',
        ],
      },
      {
        title: 'Status & Search',
        bullets: [
          'Displays order status',
          'Narrow the search to orders placed for a specific product',
        ],
      },
    ],
    flowTitle: 'From booking to confirmation',
    flow: [
      { label: 'Enter Order', desc: 'Including lens data' },
      { label: 'Review', desc: 'Order review screen' },
      { label: 'Place', desc: 'Sent to the back office' },
      { label: 'Track', desc: 'Status and sent orders' },
    ],
    benefitsTitle: 'Benefits',
    benefits: [
      'Mobile app is easy to use',
      'Can place orders on spot in front of the buyer',
      'App can be easily downloaded from the Play Store',
      'Increased productivity',
      'Time management',
      'Can view order status',
      'No need to go back to the web application to place the order',
    ],
    tech: ['Java', 'AngularJS', 'Android'],
  },
  {
    slug: 'vendor-portal',
    name: 'Vendor Portal',
    navDescription: 'PO Tracking, Dispatch Updates & Vendor Reports',
    kicker: 'Vendor Portal · Web Application',
    headline: 'Replace manual follow-ups with one vendor portal.',
    intro:
      'An efficient system that reduced the time required each day from 5 hours to 3 hours across all locations. Vendors track their purchase orders and communicate delivery and dispatch details for production parts through the portal.',
    imageUrl:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=350&q=80',
    svgPath:
      'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    accent: {
      text: 'text-indigo-400',
      glow: 'from-indigo-700/20 via-violet-700/10',
      gradient: 'from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500',
      shadow: 'shadow-[0_10px_30px_rgba(79,70,229,0.35)]',
      border: 'hover:border-indigo-500/40',
      cta: 'from-indigo-900/60 via-violet-900/60 to-purple-900/60 border-indigo-500/30',
    },
    metrics: [
      { value: '5h → 3h', label: 'Daily time per location' },
      { value: '0', label: 'Manual work' },
      { value: 'Role-based', label: 'Vendor-specific data' },
    ],
    features: [
      {
        title: 'PO Tracking',
        bullets: [
          'Vendors track all their POs and statuses with easy search conditions',
          'Communicate delivery and dispatch details of production parts',
        ],
      },
      {
        title: 'Reports & Audit',
        bullets: [
          'Consolidated Excel report generation',
          'Detailed report generation',
          'User audit history',
        ],
      },
      {
        title: 'Security & Notifications',
        bullets: [
          'Role-based and vendor-specific data',
          'Vendor data confidentiality maintained',
          'Auto email notifications',
        ],
      },
      {
        title: 'Visualisation & Integration',
        bullets: [
          'Show as graph, data analysis and details download',
          'Alarm and reporting',
          'Integration database with GPS and SAP',
        ],
      },
    ],
    flowTitle: 'How vendors and buyers stay in sync',
    flow: [
      { label: 'PO Issued', desc: 'Visible to the vendor' },
      { label: 'Dispatch Update', desc: 'Delivery details shared' },
      { label: 'Notify', desc: 'Auto email notifications' },
      { label: 'Report', desc: 'Consolidated Excel reports' },
    ],
    benefitsTitle: 'Benefits',
    benefits: [
      'No more manual interference',
      'Increased productivity',
      'Time management',
      'Auto email notifications',
      'Detailed report generation',
      'Role based and vendor specific data',
      'Vendor data confidentiality maintenance',
      'Consolidated Excel report generation',
      'User audit history',
    ],
    tech: ['.NET', 'AngularJS', 'SAP', 'GPS'],
  },
];

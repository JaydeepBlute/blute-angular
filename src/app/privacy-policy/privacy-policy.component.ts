import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SubSection {
  title: string;
  content: string;
}

interface PolicySection {
  id: string;
  title: string;
  color: string;
  intro?: string;
  points?: string[];
  subsections?: SubSection[];
}

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  sections: PolicySection[] = [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      color: 'bg-blue-500',
      intro:
        'We collect information to provide better services to our users. The types of information we collect include:',
      subsections: [
        {
          title: 'Information You Provide',
          content:
            'Name, email address, phone number, company name, and any other details you voluntarily submit through our contact forms, career applications, or service inquiries.',
        },
        {
          title: 'Automatically Collected Information',
          content:
            'When you visit our website, we automatically collect certain information such as your IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages via cookies and similar tracking technologies.',
        },
        {
          title: 'Business Information',
          content:
            'For clients and partners, we may collect business-related information including company details, billing information, project requirements, and communication history.',
        },
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      color: 'bg-teal-500',
      intro: 'We use the information we collect for the following purposes:',
      points: [
        'To respond to your inquiries, provide requested services, and manage client relationships.',
        'To send service updates, project communications, and important notices related to our services.',
        'To improve our website, services, and overall user experience based on usage patterns.',
        'To process job applications and evaluate candidates for open positions.',
        'To comply with legal obligations and enforce our terms of service.',
        'To send promotional content and newsletters — only with your explicit consent.',
        'To analyze website traffic and measure the effectiveness of our marketing efforts.',
      ],
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing & Disclosure',
      color: 'bg-purple-500',
      intro:
        'We do not sell, rent, or trade your personal information. We may share your data only in the following circumstances:',
      points: [
        'With trusted service providers who assist in operating our website and services (e.g., hosting, analytics, email delivery) under strict confidentiality agreements.',
        'With business partners, only when required to deliver a specific service you have requested.',
        'When required by law, regulation, or valid legal process such as a court order or government request.',
        'In connection with a merger, acquisition, or sale of business assets, with appropriate confidentiality protections.',
        'To protect the rights, property, or safety of Blute Technologies, our clients, or others.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking Technologies',
      color: 'bg-orange-500',
      intro: 'We use cookies and similar technologies to enhance your browsing experience.',
      subsections: [
        {
          title: 'Essential Cookies',
          content:
            'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.',
        },
        {
          title: 'Analytics Cookies',
          content:
            'We use analytics tools (such as Google Analytics) to understand how visitors interact with our website. This helps us improve our content and services. These can be disabled via your browser settings.',
        },
        {
          title: 'Preference Cookies',
          content:
            'These cookies remember your preferences and settings to provide a more personalized experience on return visits.',
        },
      ],
    },
    {
      id: 'data-security',
      title: 'Data Security',
      color: 'bg-red-500',
      intro:
        'We take the security of your personal information seriously and implement industry-standard measures to protect it:',
      points: [
        'All data transmitted between your browser and our servers is encrypted using SSL/TLS protocols.',
        'Access to personal data is restricted to authorized personnel only, on a need-to-know basis.',
        'We regularly review and update our security practices to address new threats and vulnerabilities.',
        'Our systems are hosted on secure, ISO-certified cloud infrastructure with regular security audits.',
        'However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      color: 'bg-indigo-500',
      intro:
        'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy:',
      points: [
        'Client and project data is retained for the duration of our engagement and up to 7 years thereafter for legal and accounting purposes.',
        'Marketing and newsletter subscriber data is retained until you unsubscribe.',
        'Job application data is retained for up to 12 months after the position is filled.',
        'Website analytics data is retained in aggregated, anonymized form for up to 26 months.',
        'You may request deletion of your data at any time, subject to legal retention requirements.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      color: 'bg-green-500',
      intro:
        'Depending on your location, you may have the following rights regarding your personal data:',
      points: [
        'Right to Access — Request a copy of the personal data we hold about you.',
        'Right to Rectification — Request correction of inaccurate or incomplete data.',
        'Right to Erasure — Request deletion of your personal data, subject to legal requirements.',
        'Right to Restrict Processing — Request that we limit how we use your data in certain circumstances.',
        'Right to Data Portability — Request your data in a structured, machine-readable format.',
        'Right to Object — Object to processing of your data for direct marketing purposes.',
        'Right to Withdraw Consent — Withdraw consent at any time where processing is based on consent.',
      ],
    },
    {
      id: 'third-party',
      title: 'Third-Party Links',
      color: 'bg-cyan-500',
      intro:
        'Our website may contain links to third-party websites, plugins, and applications. Clicking on those links may allow third parties to collect or share data about you.',
      points: [
        'We do not control these third-party websites and are not responsible for their privacy practices.',
        'We encourage you to read the privacy policy of every website you visit.',
        'Our privacy policy applies only to information collected on our website and services.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      color: 'bg-slate-500',
      intro:
        'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.',
      points: [
        'We will notify you of significant changes by posting the new policy on this page with an updated "Last Updated" date.',
        'For material changes, we may also send a notification to your registered email address.',
        'Your continued use of our services after changes are posted constitutes acceptance of the updated policy.',
        'We encourage you to review this page periodically to stay informed about how we protect your information.',
      ],
    },
  ];
}

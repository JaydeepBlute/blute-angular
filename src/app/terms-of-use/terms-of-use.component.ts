import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SubSection {
  title: string;
  content: string;
}

interface TermsSection {
  id: string;
  title: string;
  color: string;
  intro?: string;
  points?: string[];
  subsections?: SubSection[];
}

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent {
  sections: TermsSection[] = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      color: 'bg-rose-500',
      intro:
        'By accessing or using the Blute Technologies website (www.bluetechnologies.in) or any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our Privacy Policy.',
      points: [
        'These terms apply to all visitors, users, clients, and anyone who accesses or uses our services.',
        'If you are using our services on behalf of a company or organization, you represent that you have the authority to bind that entity to these terms.',
        'We reserve the right to update or modify these terms at any time. Continued use after changes constitutes acceptance.',
        'These terms were last updated on January 1, 2025 and are effective immediately.',
      ],
    },
    {
      id: 'use-of-services',
      title: 'Use of Services',
      color: 'bg-blue-500',
      intro:
        'You agree to use our website and services only for lawful purposes and in accordance with these Terms.',
      points: [
        'You must not use our services in any way that violates applicable local, national, or international laws or regulations.',
        'You must not transmit any unsolicited or unauthorized advertising or promotional material (spam).',
        'You must not attempt to gain unauthorized access to any part of our website, systems, or networks.',
        'You must not use our services to harass, abuse, or harm another person or entity.',
        'You must not engage in any conduct that restricts or inhibits the use or enjoyment of our services by others.',
        'We reserve the right to terminate access to any user who violates these terms without notice.',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      color: 'bg-purple-500',
      intro:
        'All content on this website — including text, graphics, logos, icons, images, audio clips, digital downloads, and software — is the property of Blute Technologies Pvt. Ltd. and is protected by applicable intellectual property laws.',
      subsections: [
        {
          title: 'Our Content',
          content:
            'The Blute Technologies name, logo, and all related trademarks, service marks, and trade names are owned exclusively by us. You may not use, reproduce, or distribute any content from our website without explicit written permission.',
        },
        {
          title: 'Client Deliverables',
          content:
            'Intellectual property rights for work product developed specifically for a client are governed by the individual service agreement or contract. Unless otherwise agreed in writing, all custom deliverables become the property of the client upon full payment.',
        },
        {
          title: 'Third-Party Content',
          content:
            'Our website may include content from third parties. Such content remains the intellectual property of its respective owners. We acknowledge their ownership and use such content lawfully.',
        },
      ],
    },
    {
      id: 'client-obligations',
      title: 'Client Obligations',
      color: 'bg-teal-500',
      intro:
        'When engaging Blute Technologies for services, clients agree to the following responsibilities:',
      points: [
        'Provide accurate, complete, and timely information required for project delivery.',
        'Ensure that any materials, data, or content provided to us do not infringe on third-party rights.',
        'Designate a primary point of contact for all project communications and decisions.',
        'Make timely payments as per the agreed schedule outlined in the service agreement.',
        'Participate in reviews, approvals, and feedback sessions within agreed timelines to avoid project delays.',
        'Maintain confidentiality of any proprietary methodologies, tools, or processes shared by Blute Technologies.',
      ],
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      color: 'bg-green-500',
      intro:
        'All payment obligations are governed by the specific service agreement. The following general terms apply:',
      points: [
        'Invoices are due within 30 days of the invoice date unless otherwise agreed in writing.',
        'Late payments may incur interest at 1.5% per month or the maximum rate permitted by law, whichever is lower.',
        'We reserve the right to suspend services for accounts with overdue payments exceeding 15 days.',
        'All fees are quoted in INR unless otherwise specified. International clients are responsible for applicable taxes and foreign exchange fees.',
        'Refunds, if applicable, are subject to the terms of the individual service agreement.',
      ],
    },
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      color: 'bg-indigo-500',
      intro:
        'Both parties agree to maintain the confidentiality of proprietary and sensitive information shared during the course of engagement.',
      subsections: [
        {
          title: 'What is Confidential',
          content:
            'Confidential information includes business plans, technical data, client lists, financial information, project details, pricing, and any other information designated as confidential by either party.',
        },
        {
          title: 'Obligations',
          content:
            'Each party agrees not to disclose confidential information to any third party without prior written consent, and to use confidential information solely for the purposes of the business relationship.',
        },
        {
          title: 'Exceptions',
          content:
            'Confidentiality obligations do not apply to information that is publicly known, independently developed, rightfully received from a third party, or required to be disclosed by law or court order.',
        },
      ],
    },
    {
      id: 'disclaimer',
      title: 'Disclaimers & Warranties',
      color: 'bg-orange-500',
      intro:
        'Our website and services are provided on an "as is" and "as available" basis. To the fullest extent permitted by law:',
      points: [
        'We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of any content on our website.',
        'We do not warrant that our website will be uninterrupted, error-free, or free from viruses or other harmful components.',
        'We disclaim all warranties of merchantability, fitness for a particular purpose, and non-infringement.',
        'Any reliance you place on information from our website is strictly at your own risk.',
        'We are not responsible for the content or practices of any third-party websites linked from our platform.',
      ],
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      color: 'bg-red-500',
      intro:
        'To the maximum extent permitted by applicable law, Blute Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:',
      points: [
        'Your use of, or inability to use, our website or services.',
        'Any errors, mistakes, or inaccuracies in content on the website.',
        'Unauthorized access to or use of our servers and any personal information stored therein.',
        'Any interruption or cessation of transmission to or from our website.',
        'Any bugs, viruses, or other harmful code that may be transmitted through our services.',
        'In no event shall our total liability exceed the amount paid by you for the specific service giving rise to the claim in the preceding 3 months.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing Law & Disputes',
      color: 'bg-slate-500',
      intro:
        'These Terms of Use are governed by and construed in accordance with the laws of India.',
      subsections: [
        {
          title: 'Jurisdiction',
          content:
            'Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India.',
        },
        {
          title: 'Dispute Resolution',
          content:
            'Before initiating any legal proceedings, both parties agree to attempt to resolve disputes amicably through good-faith negotiations for a period of 30 days from the date of written notice of the dispute.',
        },
        {
          title: 'Arbitration',
          content:
            'If the dispute is not resolved through negotiation, it shall be settled by binding arbitration under the Arbitration and Conciliation Act, 1996 of India, with arbitration conducted in Bangalore in the English language.',
        },
      ],
    },
    {
      id: 'termination',
      title: 'Termination',
      color: 'bg-cyan-600',
      intro:
        'Either party may terminate the service relationship under the following circumstances:',
      points: [
        'We may terminate or suspend access to our services immediately, without prior notice, if you breach any of these Terms of Use.',
        'Clients may terminate a service engagement by providing written notice as stipulated in the service agreement.',
        'Upon termination, your right to access and use our services ceases immediately.',
        'Provisions that by their nature should survive termination (including intellectual property, payment obligations, confidentiality, and limitation of liability) shall remain in effect.',
        'We are not liable to you or any third party for termination of your access due to a breach of these terms.',
      ],
    },
  ];
}

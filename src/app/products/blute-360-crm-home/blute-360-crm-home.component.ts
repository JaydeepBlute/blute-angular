import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CRM_FLOWS } from '../blute-360-crm-flows/blute-360-crm-flows.data';

@Component({
  selector: 'app-blute-360-crm-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blute-360-crm-home.component.html',
  styleUrls: ['./blute-360-crm-home.component.scss'],
})
export class Blute360CrmHomeComponent {
  readonly contactLink = '/contact';

  loginVisible = false;

  openLogin(): void {
    this.loginVisible = true;
  }

  closeLogin(): void {
    this.loginVisible = false;
  }

  readonly demoAccess = {
    url: 'http://150.241.247.73:9090',
    fields: [
      { label: 'Tenant', value: 'blute' },
      { label: 'Username', value: 'admin' },
      { label: 'Password', value: 'vk1818' },
    ],
  };

  readonly flowLinks = CRM_FLOWS.map((f) => ({
    commands: ['/products/blute-360-crm', 'flows', f.slug],
    title: f.title,
    module: f.module,
    summary: f.summary,
  }));

  readonly metrics = [
    { value: '4', label: 'Business Modules', detail: 'Sales · Inventory · Purchase · Service' },
    { value: '₹1,733 Cr', label: 'Stock Value Managed', detail: 'Real-time inventory valuation' },
    { value: '201', label: 'PM Tasks Tracked', detail: 'Preventive maintenance monitoring' },
    { value: '100%', label: 'GSTIN Compliant', detail: 'Built-in tax & invoice compliance' },
  ];

  readonly features = [
    {
      title: 'Sales CRM',
      category: 'Sales Module',
      color: 'from-violet-600 to-purple-600',
      description:
        'Full lead-to-invoice pipeline — manage accounts, contacts, opportunities, quotations, sales orders, and payment collection in one view.',
      bullets: [
        'Leads & opportunity pipeline with funnel analytics',
        'Quotations, Sales Orders, Invoices, Proforma Invoice',
        'Individual and team sales dashboards with real-time charts',
        'Payment receipt tracking and GSTIN-verified transactions',
      ],
    },
    {
      title: 'Inventory Management',
      category: 'Inventory Module',
      color: 'from-blue-600 to-indigo-600',
      description:
        'Real-time stock visibility across multiple warehouses — track GRN, delivery challans, RMAs, and stock adjustments with aging analysis.',
      bullets: [
        'Multi-warehouse stock tracking with real-time valuation',
        'GRN, DC Issue, DC Return, RMA, and Stock Adjustment workflows',
        'Stock health monitoring: reorder, below-min, out-of-stock alerts',
        'Inventory aging analysis by stock value across date buckets',
      ],
    },
    {
      title: 'Purchase Management',
      category: 'Purchase Module',
      color: 'from-emerald-600 to-teal-600',
      description:
        'End-to-end procurement from Purchase Order to Bill — with health scoring for procurement, inventory, payment, returns, and billing.',
      bullets: [
        '5 health scores: Procurement, Inventory, Payment, Returns, Billing',
        'Open PO, Pending GRN, GRN Not Billed, Bills & Overdue tracking',
        'Purchase trend charts across configurable date ranges',
        'Action center listing all pending procurement activities',
      ],
    },
    {
      title: 'Service & AMC',
      category: 'Service Module',
      color: 'from-rose-600 to-red-600',
      description:
        'Complete field service management — complaints, preventive maintenance, AMC contracts, installations, SLA tracking, and resource allocation.',
      bullets: [
        'Complaint management with SLA breach monitoring',
        'Preventive Maintenance scheduling and overdue tracking',
        'AMC Contracts with revenue pipeline and renewal forecasting',
        'Installation and warranty tracking with status stages',
      ],
    },
    {
      title: 'GSTIN & Tax Compliance',
      category: 'Compliance',
      color: 'from-amber-500 to-orange-500',
      description:
        'Built-in GSTIN verification, HSN code management, and fully compliant tax invoice generation — no external integrations needed.',
      bullets: [
        'GSTIN verification on every customer and supplier transaction',
        'HSN code master with tax rate mapping',
        'GST-compliant sales invoices and purchase bills',
        'Tax summary reports ready for filing',
      ],
    },
    {
      title: 'Reports & Analytics',
      category: 'Analytics',
      color: 'from-cyan-600 to-sky-600',
      description:
        'Cross-module reporting across Sales, Inventory, Purchase, and Service — with filterable dashboards and exportable data.',
      bullets: [
        'Sales reports: funnel, pipeline, invoice, payment collection',
        'Inventory reports: aging, movement, stock health, return summary',
        'Purchase reports: trend charts, action center, procurement progress',
        'Service reports: attendance, SLA, AMC revenue forecast',
      ],
    },
  ];

  readonly adminModules = [
    {
      label: 'Accounts & Contacts',
      accentColor: 'text-violet-400',
      accentBg: 'bg-violet-500/10',
      svgPath:
        'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      label: 'Leads & Opportunities',
      accentColor: 'text-blue-400',
      accentBg: 'bg-blue-500/10',
      svgPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10',
    },
    {
      label: 'Quotation & Orders',
      accentColor: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10',
      svgPath:
        'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
    {
      label: 'GRN & Delivery',
      accentColor: 'text-amber-400',
      accentBg: 'bg-amber-500/10',
      svgPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    },
    {
      label: 'Purchase Orders',
      accentColor: 'text-rose-400',
      accentBg: 'bg-rose-500/10',
      svgPath:
        'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17',
    },
    {
      label: 'AMC Contracts',
      accentColor: 'text-cyan-400',
      accentBg: 'bg-cyan-500/10',
      svgPath:
        'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138z',
    },
    {
      label: 'Work Orders & PMS',
      accentColor: 'text-orange-400',
      accentBg: 'bg-orange-500/10',
      svgPath:
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    },
    {
      label: 'Reports & Analytics',
      accentColor: 'text-indigo-400',
      accentBg: 'bg-indigo-500/10',
      svgPath:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
  ];

  readonly workflowSteps = [
    { label: 'Lead Captured', desc: 'Accounts & Contacts' },
    { label: 'Opportunity', desc: 'Pipeline & Funnel' },
    { label: 'Quotation', desc: 'QTN with GST' },
    { label: 'Sales Order', desc: 'Confirmed Order' },
    { label: 'Delivery / GRN', desc: 'Inventory Movement' },
    { label: 'Invoice', desc: 'GST-compliant Bill' },
    { label: 'Payment', desc: 'Receipt & Reconcile' },
  ];
}

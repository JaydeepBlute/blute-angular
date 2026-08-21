import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface PositioningPillar {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  route: string;
  metrics: string[];
}

export interface CompetitorComparison {
  category: string;
  competitors: string;
  gap: string;
  platformAdvantage: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
  detail: string;
}

export interface ProductFeatureModule {
  name: string;
  tagline: string;
  description: string;
  route: string;
  icon: string;
  color: string;
  keyFeatures: string[];
}

@Component({
  selector: 'app-equipment-ops-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipment-ops-home.component.html',
  styleUrls: ['./equipment-ops-home.component.scss'],
})
export class EquipmentOpsHomeComponent implements OnInit {
  productName = 'Equipment Sales & Service Platform';
  heroTitle = 'One Unified Platform. Five Core Integrated Features.';
  heroSubtitle =
    'A single-database business platform for equipment dealers, machinery distributors, and OEM service arms. Every operational area — Sales, Purchase, Inventory, Field Service, and Analytics — works seamlessly in one single system.';

  pillars: PositioningPillar[] = [
    {
      title: 'Stop Revenue Leaking Out of Your Installed Base',
      subtitle: 'Zero Expired AMC Surprises',
      description:
        'Single-screen visibility into warranty expiries, AMC renewals, and service bills due in 30/60/90 days by value. Track non-returned standby machines and estimation vs bill variance.',
      icon: 'trending-up',
      route: '/products/equipment-ops/service',
      metrics: ['90-Day Renewal Cockpit', 'Standby Machine Aging', 'SLA Clock Protection'],
    },
    {
      title: 'One Chain: Sales to Field Service, No Re-Keying',
      subtitle: 'Single Source of Serial Truth',
      description:
        'The serial number entered on the GRN is the exact serial number the field engineer consumes a spare against 3 years later. Trace conversion info tabs across every document.',
      icon: 'link',
      route: '/products/equipment-ops/service',
      metrics: ['Serial & Batch Traceability', 'Audit-Ready Conversion Trails', 'Zero Duplicate Data'],
    },
    {
      title: 'Built Specifically for Indian Equipment Companies',
      subtitle: 'Native Statutory Compliance',
      description:
        'Native GST, HSN linkage, e-invoice generation with IRN & QR code retention, e-way bills, multi-branch GSTIN support, quote buyback, and margin-gated approvals.',
      icon: 'shield-check',
      route: '/products/equipment-ops/sales',
      metrics: ['IRN & QR Code Generation', 'Buyback Line Processing', 'Margin Approval Gates'],
    },
  ];

  featureModules: ProductFeatureModule[] = [
    {
      name: 'Service & Field Operations',
      tagline: 'Installed base, AMC renewals & field engineers',
      description:
        'Asset 360, warranty tracking, AMC auto-renewal rules, complaint SLA matrix, work orders with EFSR capture, spare indents, and non-returned standby machine tracking.',
      route: '/products/equipment-ops/service',
      icon: 'tool',
      color: 'from-blue-600 to-indigo-600',
      keyFeatures: [
        'Asset 360 & Serial Tracking',
        'AMC Billing & PMS Schedules',
        'EFSR Mobile Capture',
        'Standby Unit Aging',
      ],
    },
    {
      name: 'Sales & CRM',
      tagline: 'Lead-to-cash with quote buyback & e-invoicing',
      description:
        'Account & Contact 360, opportunity pipeline, quote buybacks, margin-gated approval matrices, sales orders, proforma invoices, and statutory e-invoicing with QR code.',
      route: '/products/equipment-ops/sales',
      icon: 'dollar-sign',
      color: 'from-emerald-600 to-teal-600',
      keyFeatures: [
        'Quote Buyback Lines',
        'Margin Approval Engine',
        'E-Invoice with IRN & QR',
        'Actual vs Target Tracking',
      ],
    },
    {
      name: 'Inventory & Warehouse',
      tagline: 'Serial & batch traceability from receipt to consumption',
      description:
        'Multi-store inventory, serial & batch GRN capture, Delivery Challans (DC), stock adjustments, RMA returns, reorder alerts, and dead stock analysis.',
      route: '/products/equipment-ops/inventory',
      icon: 'box',
      color: 'from-amber-500 to-orange-600',
      keyFeatures: [
        'Serial/Batch History',
        'Multi-Warehouse Mapping',
        'Spare Stock Adjustments',
        'Reorder & Aging Reports',
      ],
    },
    {
      name: 'Purchase & Procurement',
      tagline: 'Indent to GRN & supplier payables',
      description:
        'Purchase orders with document approvals, purchase bills, supplier inventory tracking, payables aging (0-90+ days), and dedicated service-side spare procurement.',
      route: '/products/equipment-ops/purchase',
      icon: 'shopping-cart',
      color: 'from-purple-600 to-violet-600',
      keyFeatures: [
        'PO to GRN Conversion Info',
        'Payables Aging Matrix',
        'Spare PO & Bill Chain',
        'Purchase vs Sales Margin Analysis',
      ],
    },
    {
      name: 'Analytics & Dashboards',
      tagline: '4 role dashboards & ~50 dedicated reports',
      description:
        'Real-time operational dashboards for Sales, Service, Inventory, and Purchase. Styled Excel export and audit-ready PDF on every report screen.',
      route: '/products/equipment-ops/analytics',
      icon: 'pie-chart',
      color: 'from-pink-600 to-rose-600',
      keyFeatures: [
        '4 Role-Specific Dashboards',
        '~50 Pre-Built Report Screens',
        'Styled Excel & PDF Export',
        'Chart-to-Image Export',
      ],
    },
  ];

  comparisons: CompetitorComparison[] = [
    {
      category: 'Horizontal CRMs (Zoho, Salesforce)',
      competitors: 'Zoho CRM, Salesforce Sales Cloud',
      gap: 'Stops at the sale. No installed base, no AMC billing schedule, no spare indent.',
      platformAdvantage:
        'Full single-product lifecycle: Enquiry -> Quote (Buyback) -> SO -> GRN -> Installed Asset -> Warranty -> AMC Renewal -> Complaint -> Work Order -> Spare Indent -> Service Bill.',
    },
    {
      category: 'Horizontal ERPs (SAP B1, Odoo, ERPNext)',
      competitors: 'SAP Business One, Odoo, ERPNext',
      gap: 'Complex 6-18 month implementations; thin FSM modules; high partner customization cost.',
      platformAdvantage:
        'Go-live in 6 weeks with native equipment service depth, GST e-invoicing, and 50 pre-built industry reports.',
    },
    {
      category: 'FSM Specialists (ServiceMax, Zuper, FieldEZ)',
      competitors: 'ServiceMax, Zuper, FieldEZ',
      gap: 'Services the machine but does not sell it — no buyback, no PO/GRN chain, no sales pipeline.',
      platformAdvantage:
        'Owns both sell and service sides inside one single product database — eliminate double entry and fragmented data silos.',
    },
    {
      category: 'Traditional Accounting (Tally, Busy)',
      competitors: 'TallyPrime, Busy',
      gap: 'Accounting and tax only. No customer asset records, no SLA tracking, no mobile EFSR.',
      platformAdvantage:
        'Sits alongside Tally for operational dominance while providing complete sales, service, and inventory control.',
    },
  ];

  activeTab: 'service' | 'sales' | 'inventory' | 'purchase' | 'analytics' = 'service';
  searchQuery = '';

  metrics: MetricHighlight[] = [
    { value: '1', label: 'Single Product Database', detail: 'Zero data duplication or re-keying' },
    { value: '5', label: 'Integrated Core Features', detail: 'Sales, Service, Inventory, Purchase, Analytics' },
    { value: '~50', label: 'Dedicated Reports', detail: 'With styled Excel & PDF export' },
    { value: '100%', label: 'India GST & E-Invoice', detail: 'With IRN & QR Code capture' },
  ];

  selectTab(tab: 'service' | 'sales' | 'inventory' | 'purchase' | 'analytics'): void {
    this.activeTab = tab;
  }

  get filteredModules(): ProductFeatureModule[] {
    if (!this.searchQuery.trim()) return this.featureModules;
    const q = this.searchQuery.toLowerCase();
    return this.featureModules.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.keyFeatures.some((f) => f.toLowerCase().includes(q))
    );
  }

  get activeSimulatorDetails() {
    switch (this.activeTab) {
      case 'service':
        return {
          title: 'Live Service & Field Operations Cockpit',
          badge: 'Service Suite Active',
          color: 'from-blue-600 to-indigo-600',
          stats: [
            { label: 'AMCs Due (90 Days)', val: '₹48.5 Lakhs (64 Contracts)', trend: '+18% vs Last Month' },
            { label: 'SLA Clock Achievement', val: '98.4% On-Time', trend: 'Respecting Working Hours' },
            { label: 'Standby Equipment Aging', val: '12 Units (₹18.2 Lakhs)', trend: 'Aged > 45 Days' },
          ],
        };
      case 'sales':
        return {
          title: 'Live Sales & Quote Buyback Engine',
          badge: 'Sales Suite Active',
          color: 'from-emerald-600 to-teal-600',
          stats: [
            { label: 'Active Quote Pipeline', val: '₹1.84 Crore', trend: '34 Open Quotes' },
            { label: 'Trade-in Buyback Value', val: '₹22.5 Lakhs', trend: '6 Machine Trade-ins' },
            { label: 'GST E-Invoices Issued', val: '100% Verified IRN', trend: 'QR Code Encoded' },
          ],
        };
      case 'inventory':
        return {
          title: 'Live Multi-Store Serialized Inventory',
          badge: 'Inventory Suite Active',
          color: 'from-amber-500 to-orange-600',
          stats: [
            { label: 'Total Store Valuation', val: '₹3.42 Crore', trend: '4 Regional Stores' },
            { label: 'Serial & Batch Receipts', val: '1,420 Items Tracked', trend: 'Dock to Field Trace' },
            { label: 'Dead Stock Alert', val: '₹4.1 Lakhs Identified', trend: 'Idle > 180 Days' },
          ],
        };
      case 'purchase':
        return {
          title: 'Live Procurement & Supplier Payables',
          badge: 'Procurement Suite Active',
          color: 'from-purple-600 to-violet-600',
          stats: [
            { label: 'Pending PO Conversion', val: '₹62.8 Lakhs', trend: 'PO -> GRN -> Bill' },
            { label: 'Overdue Vendor Bills', val: '3 Bills (₹8.4 Lakhs)', trend: 'Payables Matrix 60+ D' },
            { label: 'Spare Parts Indents', val: '28 Active Indents', trend: 'Work Order Linked' },
          ],
        };
      case 'analytics':
        return {
          title: 'Live Executive Analytics & 50 Report Screens',
          badge: 'Analytics Suite Active',
          color: 'from-pink-600 to-rose-600',
          stats: [
            { label: 'Operational Dashboards', val: '4 Role Views', trend: 'Sales, Service, Stock, PO' },
            { label: 'Pre-Built Report Screens', val: '50 Dedicated Views', trend: 'Styled Excel & PDF' },
            { label: 'Margin Variance Analysis', val: 'Item-by-Item Trace', trend: 'Purchase vs Sales' },
          ],
        };
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}

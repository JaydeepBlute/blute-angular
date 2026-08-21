import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ServiceFeature {
  title: string;
  category: string;
  description: string;
  bullets: string[];
}

@Component({
  selector: 'app-equipment-ops-service',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './equipment-ops-service.component.html',
  styleUrls: ['./equipment-ops-service.component.scss'],
})
export class EquipmentOpsServiceComponent implements OnInit {
  pageTitle = 'Service & Field Operations (FSM)';
  pageSubtitle =
    'The engine that protects installed base revenue. Manage customer assets, warranty expiries, AMC auto-renewals, SLA complaint clocks, EFSR work orders, and standby unit aging.';

  features: ServiceFeature[] = [
    {
      title: 'Installed Base & Asset 360',
      category: 'Asset Intelligence',
      description:
        'Complete asset registry linked to customer, site location, and equipment serial numbers. Complete 360-degree maintenance lifecycle history for every machine.',
      bullets: [
        'Asset category, subcategory, criticality rating',
        'Bulk spreadsheet asset ingestion',
        'Asset 360 report & machine service log',
        'Customer site & shipping address mapping',
      ],
    },
    {
      title: 'Warranty & AMC Renewal Engine',
      category: 'Contract Revenue Protection',
      description:
        'Never lose an AMC contract to expiry again. Auto-renewal rules, minimum margin rules, annual price hikes, and automated billing & PMS schedules.',
      bullets: [
        'Warranty expiry to AMC pipeline conversion',
        '90-day AMC & warranty renewal forecast by value',
        'Automated billing schedule generation',
        'Annual price-hike and auto-renewal rules',
      ],
    },
    {
      title: 'Complaint Management & SLA Clocks',
      category: 'Service Level Agreement',
      description:
        'Log customer complaints with live spare availability check. SLA engines configured with company business hours and holiday calendars to prevent SLA breaches.',
      bullets: [
        'Business-hours aware SLA tracking clock',
        'Live spare stock & replacement history lookup',
        'One-click conversion to Work Order or DC',
        'Escalation matrix & real-time risk alerts',
      ],
    },
    {
      title: 'Work Orders & Mobile EFSR',
      category: 'Field Execution',
      description:
        'Empower field engineers to record Engineer Field Service Reports (EFSR), request spare indents, select serial/batch numbers, and track job closure on phone browsers.',
      bullets: [
        'EFSR digital service report on mobile browsers',
        'Service indents & repair indents directly from WO',
        'Serial and batch consumption logging',
        'Same-day job closure percentage tracking',
      ],
    },
    {
      title: 'Standby Machine Tracking & Aging',
      category: 'Cash Leakage Prevention',
      description:
        'Track temporary standby machines placed at customer sites during major overhaul. Monitor standby machine quantity, value, and aging to eliminate lost equipment.',
      bullets: [
        'Outstanding standby unit quantity & total asset value',
        'Standby aging breakdown (30/60/90+ days)',
        'Replacement machine tracking report',
        'Return reconciliation against original work orders',
      ],
    },
    {
      title: 'Preventive Maintenance (PMS) & IMS',
      category: 'Proactive Servicing',
      description:
        'Automated PMS visit generation from active AMC contracts and installation management (IMS) tracking for seamless machine handovers.',
      bullets: [
        'Automated PM schedule generation from AMC',
        'Overdue PM alert cockpit for service heads',
        'Installation record tracking (IMS) with WO info',
        'Estimation vs Invoice variance reporting',
      ],
    },
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}

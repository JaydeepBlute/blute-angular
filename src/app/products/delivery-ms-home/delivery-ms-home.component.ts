import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-delivery-ms-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delivery-ms-home.component.html',
  styleUrls: ['./delivery-ms-home.component.scss'],
})
export class DeliveryMsHomeComponent {

  readonly contactLink = '/contact';

  readonly metrics = [
    { value: '< 2 min', label: 'Order Assignment',  detail: 'Auto-assign to nearest driver'    },
    { value: '360°',    label: 'Live Tracking',      detail: 'Real-time GPS for every delivery' },
    { value: '100%',    label: 'Digital POD',        detail: 'Proof of delivery on every order' },
    { value: 'Multi',   label: 'Vehicle Support',    detail: 'Bike · Van · Truck · Fleet'       },
  ];

  readonly features = [
    {
      title: 'Order Management',
      category: 'Core Module',
      color: 'from-green-600 to-emerald-600',
      description: 'Centralise all incoming delivery orders from multiple channels — web, mobile, and API — into one real-time order queue.',
      bullets: [
        'Single dashboard for all incoming delivery orders',
        'Auto-assign orders to available drivers by proximity',
        'Priority order tagging — urgent, standard, scheduled',
        'Bulk order import via CSV or direct API integration',
      ],
    },
    {
      title: 'Route Optimisation',
      category: 'Smart Routing',
      color: 'from-blue-600 to-indigo-600',
      description: 'Automatically calculate the fastest multi-stop delivery routes — saving fuel, time, and driver effort on every trip.',
      bullets: [
        'Multi-stop route planning with live traffic data',
        'Drag-and-drop route editing by dispatcher',
        'Estimated time of arrival (ETA) per stop',
        'Route history with distance and time analytics',
      ],
    },
    {
      title: 'Driver & Fleet Management',
      category: 'Fleet Module',
      color: 'from-violet-600 to-purple-600',
      description: 'Manage your entire delivery workforce — driver profiles, vehicle assignment, shift scheduling, and performance tracking.',
      bullets: [
        'Driver onboarding with document and licence upload',
        'Vehicle assignment with capacity and type matching',
        'Shift scheduling and availability management',
        'Driver performance scores: on-time rate, delivery count',
      ],
    },
    {
      title: 'Live GPS Tracking',
      category: 'Tracking Module',
      color: 'from-cyan-600 to-sky-600',
      description: 'Track every driver and delivery in real time — visible to dispatchers, customers, and operations managers simultaneously.',
      bullets: [
        'Live map view for all active deliveries and drivers',
        'Customer-facing tracking link sent on order dispatch',
        'Geofence alerts when driver enters or leaves a zone',
        'Replay historical route for any completed delivery',
      ],
    },
    {
      title: 'Proof of Delivery (POD)',
      category: 'Delivery Module',
      color: 'from-amber-500 to-orange-500',
      description: 'Capture digital delivery confirmation — OTP, e-signature, photo, or QR scan — and attach it instantly to the order record.',
      bullets: [
        'OTP-based delivery confirmation for secure handover',
        'Digital signature capture on driver mobile app',
        'Photo upload at delivery point with GPS stamp',
        'Automatic POD email to customer on completion',
      ],
    },
    {
      title: 'Reports & Analytics',
      category: 'Analytics',
      color: 'from-rose-600 to-red-600',
      description: 'Measure delivery performance across every dimension — on-time rate, driver efficiency, route cost, and customer satisfaction.',
      bullets: [
        'On-time delivery rate by driver, zone, and time period',
        'Failed delivery analysis with reason code breakdown',
        'Fuel and distance cost per delivery report',
        'Customer satisfaction scores from post-delivery feedback',
      ],
    },
  ];

  readonly workflowSteps = [
    { label: 'Order Received',    desc: 'Web · Mobile · API'        },
    { label: 'Auto Assigned',     desc: 'Nearest available driver'   },
    { label: 'Route Planned',     desc: 'Optimised multi-stop route' },
    { label: 'Driver Dispatched', desc: 'Live GPS tracking active'   },
    { label: 'POD Captured',      desc: 'OTP / Sign / Photo'         },
    { label: 'Order Closed',      desc: 'Reports & analytics updated'},
  ];

  readonly platformModules = [
    { label: 'Order Queue',         accentColor: 'text-green-400',   accentBg: 'bg-green-500/10',   svgPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Route Planner',       accentColor: 'text-blue-400',    accentBg: 'bg-blue-500/10',    svgPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { label: 'Live Map',            accentColor: 'text-cyan-400',    accentBg: 'bg-cyan-500/10',    svgPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Driver App',          accentColor: 'text-violet-400',  accentBg: 'bg-violet-500/10',  svgPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { label: 'POD Capture',         accentColor: 'text-amber-400',   accentBg: 'bg-amber-500/10',   svgPath: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'Notifications',       accentColor: 'text-rose-400',    accentBg: 'bg-rose-500/10',    svgPath: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { label: 'Returns Management',  accentColor: 'text-orange-400',  accentBg: 'bg-orange-500/10',  svgPath: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' },
    { label: 'Analytics Dashboard', accentColor: 'text-indigo-400',  accentBg: 'bg-indigo-500/10',  svgPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  ];
}

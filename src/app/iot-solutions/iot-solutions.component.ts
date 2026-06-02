import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-iot-solutions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './iot-solutions.component.html',
  styleUrl: './iot-solutions.component.scss',
})
export class IotSolutionsComponent implements OnInit {
  services = [
    {
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
      title: 'Connected Devices',
      description:
        'End-to-end IoT device development and integration — from sensors and microcontrollers to edge computing nodes and gateways.',
    },
    {
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      title: 'Cloud IoT Platforms',
      description:
        'Scalable cloud infrastructure on AWS IoT, Azure IoT Hub, and Google Cloud IoT to manage millions of connected devices.',
    },
    {
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      title: 'Edge Computing',
      description:
        'Real-time data processing at the edge to reduce latency, bandwidth usage, and dependency on cloud connectivity.',
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'IoT Analytics',
      description:
        'Advanced dashboards and analytics pipelines to extract actionable insights from your device data streams.',
    },
    {
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      title: 'IoT Security',
      description:
        'Device authentication, encrypted communication, and firmware security to protect your IoT ecosystem end-to-end.',
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Industrial IoT',
      description:
        'Smart factory and Industry 4.0 solutions including predictive maintenance, asset tracking, and automated quality control.',
    },
  ];

  useCases = [
    {
      title: 'Smart Manufacturing',
      description:
        'Automate production lines, monitor equipment health, and reduce downtime with real-time IoT sensor networks.',
      image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80',
      tags: ['Predictive Maintenance', 'Automation', 'OEE'],
    },
    {
      title: 'Smart Cities',
      description:
        'Intelligent traffic management, waste monitoring, energy optimization, and public safety systems.',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      tags: ['Traffic', 'Energy', 'Safety'],
    },
    {
      title: 'Healthcare IoT',
      description:
        'Remote patient monitoring, smart medical devices, and hospital asset tracking for better care outcomes.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
      tags: ['Remote Monitoring', 'Wearables', 'Compliance'],
    },
  ];

  advantages = [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Real-Time Data',
      description:
        'Millisecond-level data collection and processing from thousands of devices simultaneously.',
    },
    {
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      title: 'Seamless Integration',
      description:
        'Compatible with existing enterprise systems, ERP, SCADA, and third-party platforms.',
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Enterprise Security',
      description:
        'End-to-end encryption, zero-trust architecture, and continuous threat monitoring.',
    },
    {
      icon: 'M7 11l5-5m0 0l5 5m-5-5v12',
      title: 'Highly Scalable',
      description: 'Architecture designed to grow from 100 to 10 million devices without redesign.',
    },
  ];

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}

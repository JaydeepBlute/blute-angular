import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-cognitive-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cognitive.component.html',
  styleUrl: './cognitive.component.scss',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(60px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('staggerCards', [
      transition(':enter', [
        query(
          '.card-item',
          [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(120, [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class CognitiveDetailComponent implements OnInit, OnDestroy {
  private counterInterval: any;

  // ── Floating particles ──
  particles = Array.from({ length: 25 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 8,
  }));

  // ── Core capabilities ──
  capabilities = [
    {
      icon: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=120&q=80',
      title: 'Natural Language Processing',
      desc: 'Extract meaning, sentiment, and intent from unstructured text and speech with state-of-the-art NLP models.',
      tags: ['Text Analysis', 'Sentiment', 'NER'],
      bg: 'rgba(139,92,246,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=120&q=80',
      title: 'Deep Learning',
      desc: 'Multi-layered neural networks that recognize complex patterns across images, audio, video and tabular data.',
      tags: ['CNN', 'RNN', 'Transformers'],
      bg: 'rgba(99,102,241,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80',
      title: 'Computer Vision',
      desc: 'Enable machines to see and interpret visual data — from object detection to facial recognition and OCR.',
      tags: ['Object Detection', 'OCR', 'Segmentation'],
      bg: 'rgba(168,85,247,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80',
      title: 'Conversational AI',
      desc: 'Build intelligent chatbots and virtual assistants that understand context and deliver natural conversations.',
      tags: ['Chatbots', 'Dialog Systems', 'GPT'],
      bg: 'rgba(139,92,246,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=120&q=80',
      title: 'Predictive Analytics',
      desc: 'Forecast outcomes, detect anomalies, and surface actionable insights from complex data streams.',
      tags: ['Forecasting', 'Anomaly Detection', 'ML'],
      bg: 'rgba(99,102,241,0.12)',
    },
    {
      icon: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=120&q=80',
      title: 'Intelligent Automation',
      desc: 'Combine AI with RPA to automate complex workflows that traditionally require human judgment.',
      tags: ['RPA', 'Decision AI', 'Workflow'],
      bg: 'rgba(168,85,247,0.12)',
    },
  ];

  // ── NLP terminal lines ──
  nlpLines = [
    'Analyzing text corpus...',
    'Extracting named entities...',
    'Sentiment: POSITIVE (0.94)',
    'Intent classified: purchase_query',
    'Response generated ✓',
  ];

  nlpFeatures = [
    'Text classification & categorization',
    'Named Entity Recognition (NER)',
    'Sentiment & emotion analysis',
    'Machine translation services',
    'Document summarization',
    'Question answering systems',
  ];

  dlFeatures = [
    'Convolutional Neural Networks (CNN)',
    'Recurrent & LSTM networks',
    'Transformer-based architectures',
    'Transfer learning & fine-tuning',
    'Real-time inference pipelines',
    'Model optimization & quantization',
  ];

  // ── Use cases ──
  useCases = [
    {
      title: 'Healthcare Diagnosis AI',
      category: 'HEALTHCARE',
      desc: 'Cognitive systems that assist doctors by analyzing medical images, patient records and symptoms to support faster, more accurate diagnoses.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80',
    },
    {
      title: 'Financial Fraud Detection',
      category: 'FINANCE',
      desc: 'Real-time AI models that detect fraudulent transactions by learning complex behavioral patterns across millions of data points.',
      img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80',
    },
    {
      title: 'Intelligent Customer Support',
      category: 'RETAIL',
      desc: 'NLP-powered virtual agents that resolve customer queries, personalize recommendations and escalate complex issues seamlessly.',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
    },
    {
      title: 'Predictive Maintenance',
      category: 'MANUFACTURING',
      desc: 'Deep learning models that analyze sensor data from industrial equipment to predict failures before they occur, reducing downtime.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80',
    },
  ];

  // ── Process steps ──
  processSteps = [
    {
      icon: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=120&q=80',
      title: 'Discovery & Data Audit',
      desc: 'We assess your data landscape, identify AI opportunities, and define success metrics aligned to business goals.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80',
      title: 'Model Architecture Design',
      desc: 'Our AI architects design the optimal neural network topology and select the right frameworks for your use case.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=120&q=80',
      title: 'Training & Validation',
      desc: 'We train models on your data with rigorous validation pipelines ensuring accuracy, fairness, and robustness.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=120&q=80',
      title: 'Deployment & Integration',
      desc: 'Seamless deployment to cloud or edge with REST APIs, monitoring dashboards and CI/CD pipelines.',
    },
    {
      icon: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=120&q=80',
      title: 'Continuous Learning',
      desc: 'Models are monitored and retrained as new data arrives, ensuring they stay accurate and relevant over time.',
    },
  ];

  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.counterInterval);
  }

  isUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }
}

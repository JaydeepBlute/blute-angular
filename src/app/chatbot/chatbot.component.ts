import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

export interface ChatMsg {
  from: 'user' | 'bot';
  text: string;
}

const RULES: { kw: string[]; reply: string }[] = [
  {
    kw: ['hello', 'hi', 'hey', 'hii', 'start', 'sup', 'good morning', 'good afternoon', 'howdy'],
    reply: "Hi there! 👋 I'm Blute's AI assistant. Ask me about our services, pricing, or how to get in touch. What can I help with?"
  },
  {
    kw: ['web', 'website', 'webapp', 'angular', 'react', 'vue', 'frontend', 'backend', 'fullstack', 'node'],
    reply: "We build modern web apps — MVPs to enterprise platforms — using Angular, React, Node.js and more. Want to discuss your project requirements?"
  },
  {
    kw: ['mobile', 'app', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin'],
    reply: "We've shipped 50+ native and cross-platform apps for iOS and Android using React Native and Flutter. What type of app are you planning to build?"
  },
  {
    kw: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'chatbot', 'agent', 'agentic', 'llm', 'gpt', 'automation', 'intelligent'],
    reply: "Our Agentic AI service builds autonomous agents that handle full workflows — support bots, code review, data pipelines. Want to see a live demo?"
  },
  {
    kw: ['iot', 'internet of things', 'connected', 'embedded', 'hardware', 'sensor', 'smart device'],
    reply: "We build full-stack IoT solutions — firmware, cloud integration, and real-time dashboards. Which industry are you in?"
  },
  {
    kw: ['cloud', 'aws', 'azure', 'gcp', 'devops', 'kubernetes', 'docker', 'infrastructure', 'serverless'],
    reply: "We handle cloud migration, DevOps pipelines, and infrastructure across AWS, Azure, and GCP. What does your current setup look like?"
  },
  {
    kw: ['gis', 'geospatial', 'map', 'mapping', 'location', 'route', 'navigation'],
    reply: "We build enterprise GIS solutions — custom digital maps, route optimization, geospatial databases, and real-time location analytics. What's your use case?"
  },
  {
    kw: ['blockchain', 'web3', 'nft', 'smart contract', 'defi', 'crypto', 'solidity'],
    reply: "We build blockchain solutions — smart contracts, DeFi protocols, NFT platforms, and Web3 integrations. Which blockchain ecosystem are you targeting?"
  },
  {
    kw: ['cognitive', 'computer vision', 'nlp', 'deep learning', 'neural', 'ar', 'vr', 'xr'],
    reply: "From computer vision and NLP to AR/VR experiences, our cognitive computing team builds intelligent, immersive applications. Tell me more about your project?"
  },
  {
    kw: ['price', 'cost', 'budget', 'quote', 'pricing', 'how much', 'rate', 'charge', 'affordable', 'expensive'],
    reply: "Pricing depends on scope and stack — most projects start at $10k–$15k. I can get our team to prepare a precise estimate for you. Shall I?"
  },
  {
    kw: ['contact', 'meet', 'call', 'schedule', 'meeting', 'demo', 'talk', 'discuss', 'appointment', 'reach'],
    reply: "📧 info@blute.co.in\n📞 +91 99002 69617\n\nWe respond within 24h. Or just click 'Get in Touch' in the top nav!"
  },
  {
    kw: ['hire', 'developer', 'resource', 'talent', 'staff', 'outsource', 'offshore', 'team', 'engineer', 'recruit'],
    reply: "We provide dedicated dev teams, individual engineers, and project squads — onboarding in as little as 2 weeks. What skills and team size do you need?"
  },
  {
    kw: ['about', 'company', 'who are you', 'blute', 'experience', 'history', 'clients', 'years', 'office'],
    reply: "Blute Technologies — 8+ years of experience, 23+ enterprise clients, headquartered in Bengaluru with partners across the USA, Singapore, Africa, and India. How can we help you?"
  },
  {
    kw: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'good', 'nice', 'wow', 'cool', 'excellent', 'helpful'],
    reply: "Glad I could help! 😊 Is there anything else you'd like to know about Blute Technologies?"
  },
  {
    kw: ['bye', 'goodbye', 'see you', 'later', 'ciao', 'take care', 'farewell'],
    reply: "Thanks for reaching out — feel free to come back anytime! Have a great day! 👋"
  },
];

const FALLBACKS = [
  "That's a great question! Our team would be best placed to answer. Drop us a line at info@blute.co.in.",
  "I want to make sure you get the most accurate answer. Reach us at +91 99002 69617 or fill the contact form.",
  "Interesting challenge! I'll connect you with the right specialist. Email info@blute.co.in and mention what you need.",
];

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  animations: [
    trigger('panelAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.90) translateY(20px)' }),
        animate('280ms cubic-bezier(0.34,1.56,0.64,1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('160ms ease',
          style({ opacity: 0, transform: 'scale(0.90) translateY(16px)' }))
      ])
    ])
  ]
})
export class ChatbotComponent {
  @ViewChild('scrollArea', { static: false })
  scrollArea!: ElementRef<HTMLDivElement>;

  isOpen = false;
  isTyping = false;
  inputText = '';
  messages: ChatMsg[] = [
    { from: 'bot', text: "Hi! 👋 I'm Blute's AI assistant. Ask me about our services, pricing, or how to get started." }
  ];

  private fallbackIdx = 0;

  toggle(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.scrollToBottom();
  }

  send(): void {
    const text = this.inputText.trim();
    if (!text || this.isTyping) return;

    this.inputText = '';
    this.messages.push({ from: 'user', text });
    this.scrollToBottom();
    this.isTyping = true;

    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      this.messages.push({ from: 'bot', text: this.getReply(text) });
      this.isTyping = false;
      this.scrollToBottom();
    }, delay);
  }

  private getReply(input: string): string {
    const lower = input.toLowerCase();
    for (const rule of RULES) {
      if (rule.kw.some(k => lower.includes(k))) return rule.reply;
    }
    return FALLBACKS[this.fallbackIdx++ % FALLBACKS.length];
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      const el = this.scrollArea?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-agentic-ai-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agentic-ai.component.html',
  styleUrl: './agentic-ai.component.scss',
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
export class AgenticAiDetailComponent implements OnInit, OnDestroy {
  private counterInterval: any;

  heroTags = ['AI Agents', 'LLMs', 'RAG', 'Multi-Agent', 'LangChain', 'CrewAI', 'AutoGen'];

  pipelineTools = [
    { icon: '🌐', name: 'Web Search' },
    { icon: '📊', name: 'Data Analyst' },
    { icon: '💻', name: 'Code Exec' },
    { icon: '📧', name: 'Email API' },
    { icon: '🗄️', name: 'Database' },
  ];

  capabilities = [
    {
      icon: '🤖',
      title: 'Autonomous AI Agents',
      desc: 'Agents that perceive context, plan actions, use tools, and iterate toward goals without human guidance.',
      tags: ['ReAct', 'AutoGPT', 'BabyAGI'],
      bg: 'rgba(124,58,237,0.10)',
    },
    {
      icon: '🔗',
      title: 'Multi-Agent Orchestration',
      desc: 'Coordinate teams of specialized agents — Planner, Executor, Validator — working in concert to solve complex tasks.',
      tags: ['CrewAI', 'AutoGen', 'LangGraph'],
      bg: 'rgba(168,85,247,0.10)',
    },
    {
      icon: '🧠',
      title: 'LLM Integration & Fine-Tuning',
      desc: 'Integrate GPT-4, Claude, Gemini, Llama 3 or fine-tune open-source models on your proprietary data.',
      tags: ['GPT-4o', 'Claude 3', 'Llama 3'],
      bg: 'rgba(124,58,237,0.10)',
    },
    {
      icon: '📚',
      title: 'RAG Pipelines',
      desc: 'Retrieval-Augmented Generation systems that ground LLM responses in your enterprise knowledge base.',
      tags: ['LangChain', 'LlamaIndex', 'Pinecone'],
      bg: 'rgba(168,85,247,0.10)',
    },
    {
      icon: '🛠️',
      title: 'Tool Use & Function Calling',
      desc: 'Agents equipped with tools — web search, code execution, database queries, API calls — to take real-world actions.',
      tags: ['Function Calling', 'APIs', 'Code Exec'],
      bg: 'rgba(124,58,237,0.10)',
    },
    {
      icon: '💾',
      title: 'Agent Memory Systems',
      desc: 'Short-term and long-term memory architectures giving agents context persistence across sessions.',
      tags: ['Vector DB', 'Redis', 'Episodic Memory'],
      bg: 'rgba(168,85,247,0.10)',
    },
  ];

  agentFeatures = [
    'ReAct & Chain-of-Thought reasoning frameworks',
    'Autonomous tool selection and execution',
    'Self-correcting error handling loops',
    'Multi-step task decomposition and planning',
    'Real-time web browsing and data retrieval',
    'Code generation, execution and debugging',
  ];

  llmFeatures = [
    'GPT-4o / GPT-4 integration via OpenAI API',
    'Claude 3 Opus, Sonnet & Haiku deployment',
    'Google Gemini Pro & Ultra integration',
    'Open-source Llama 3 & Mistral fine-tuning',
    'Private on-premise LLM deployment',
    'RAG with semantic vector search',
  ];

  useCases = [
    {
      icon: '💼',
      title: 'Autonomous Sales Agent',
      category: 'SALES',
      desc: 'AI agents that qualify leads, draft personalised outreach, schedule meetings and update CRM — running 24/7.',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
    },
    {
      icon: '⚖️',
      title: 'Legal Document Analysis',
      category: 'LEGAL',
      desc: 'Agents that read contracts, flag risks, extract clauses, and produce structured summaries in seconds.',
      img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80',
    },
    {
      icon: '🏥',
      title: 'Clinical Decision Support',
      category: 'HEALTHCARE',
      desc: 'Medical agents that retrieve patient history, cross-reference research and assist clinicians with diagnosis.',
      img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80',
    },
    {
      icon: '📊',
      title: 'Financial Research Agent',
      category: 'FINANCE',
      desc: 'Agents that monitor markets, synthesize news, run financial models and deliver real-time intelligence reports.',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
    },
  ];

  processSteps = [
    {
      icon: '🎯',
      title: 'Goal & Workflow Analysis',
      desc: 'We map your business workflows, identify automation opportunities, and define goals for the agentic system.',
    },
    {
      icon: '🏗️',
      title: 'Agent Architecture Design',
      desc: 'Design multi-agent topology — roles, memory, tools, and LLM selection — optimised for your use case.',
    },
    {
      icon: '🔧',
      title: 'Build & Tool Integration',
      desc: 'Develop agents with custom tool sets, connect to APIs, databases, and external services securely.',
    },
    {
      icon: '🧪',
      title: 'Testing & Evaluation',
      desc: 'Rigorous benchmark testing, edge-case validation, and human-in-the-loop review before production.',
    },
    {
      icon: '🚀',
      title: 'Deploy & Monitor',
      desc: 'Production deployment with real-time observability dashboards, agent tracing, and continuous improvement.',
    },
  ];

  ngOnInit() {
  }
  ngOnDestroy() {
    clearInterval(this.counterInterval);
  }

 
}

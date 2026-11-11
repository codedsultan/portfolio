/**
 * Recorded answers for the home page Ask panel. Nothing here is generated at
 * runtime: every answer is written from data/projects.ts, data/experience.ts
 * and data/profile.ts, and every claim links to its source.
 */

import { profile } from '@/data/profile';

export interface AnswerSource {
  label: string;
  href: string;
}

export interface RecordedAnswer {
  id: string;
  question: string;
  answer: string;
  sources: AnswerSource[];
  /**
   * Words or phrases (already lowercase, no punctuation) that point a typed
   * question at this answer, with a weight. See lib/askMatcher.ts.
   */
  keywords: Record<string, number>;
}

export const askIntro = {
  title: 'Ask about me or my work.',
  text: 'Pick a question or type your own. Answers are recorded and replayed, the same way Argus runs in the demo, and every one links to its source.',
  inputLabel: 'Ask a question',
  placeholder: 'Ask about me or my work',
  noMatch: "I don't have a recorded answer for that. Try one of these:",
  footer: 'replay mode · no model call',
};

export const recordedAnswers: RecordedAnswer[] = [
  {
    id: 'ai-shipped',
    question: 'What has he shipped in AI?',
    answer:
      'Two AI projects are live. Argus is a tool-calling shop agent with deterministic replay and OpenTelemetry traces. WriterIX is a multi-tenant content platform built on a LangGraph pipeline with pgvector RAG.',
    sources: [
      { label: 'Argus', href: '/projects/argus' },
      { label: 'WriterIX', href: '/projects/writerix' },
    ],
    keywords: {
      ai: 3,
      shipped: 2,
      ship: 2,
      llm: 2,
      llms: 2,
      rag: 2,
      'machine learning': 2,
      'artificial intelligence': 3,
      langgraph: 2,
      langchain: 2,
      agents: 1,
      agent: 1,
    },
  },
  {
    id: 'full-stack-product',
    question: 'Show me a full-stack product',
    answer:
      'Veci CRM is a multi-tenant CRM built from scratch for Veci Technologies and live in production. It is a domain-driven Django 5 monolith across 20+ bounded contexts, with a React 19 and TypeScript front end via Inertia, Celery and Redis workers for CSV/XLSX import and email ingestion, and Stripe for payments. For a smaller full-stack build, xurl.fyi is a URL shortener with a Go API and a Next.js front end.',
    sources: [
      { label: 'Veci CRM', href: '/projects/veci-crm' },
      { label: 'xurl.fyi', href: '/projects/xurl-fyi' },
    ],
    keywords: {
      'full stack': 3,
      fullstack: 3,
      'end to end': 2,
      product: 1,
      products: 1,
      frontend: 1,
      'front end': 1,
      backend: 1,
      'back end': 1,
      crm: 2,
      veci: 1,
      saas: 1,
      'web app': 1,
    },
  },
  {
    id: 'work-history',
    question: 'Where has he worked?',
    answer:
      'He has been a Software Engineer (Engineering Lead) at Tedbree (London, UK, remote) since October 2022, leading architecture across 15+ concurrent client projects. Before that he was a Full Stack Engineer at Tedbree from April 2021 to October 2022, and at Veci Technologies in Ibadan, Nigeria, from September 2017 to March 2021. He also built and maintains Veci CRM for Veci Technologies as a freelance engagement.',
    sources: [
      { label: 'Experience', href: '/#experience' },
      { label: 'Veci CRM', href: '/projects/veci-crm' },
      { label: 'Résumé (PDF)', href: profile.resumeUrl },
    ],
    keywords: {
      worked: 3,
      'work history': 3,
      experience: 3,
      employer: 2,
      employers: 2,
      employed: 2,
      company: 2,
      companies: 2,
      job: 2,
      jobs: 2,
      career: 2,
      resume: 2,
      cv: 2,
      tedbree: 3,
      role: 1,
      roles: 1,
      background: 1,
    },
  },
  {
    id: 'how-argus-works',
    question: 'How does Argus work?',
    answer:
      'Argus is a tool-calling agent for a fictional field-optics shop. A stateless FastAPI service runs a LangChain tool loop over ten typed shop tools. The public demo runs in deterministic replay mode from recorded cassettes, so it needs no provider key and returns the same answer every time, which also makes it testable in CI. Every request produces an OpenTelemetry trace covering the agent workflow, the LLM call, the tool and the downstream API call, with prompt and completion content redacted before storage. Two Next.js front ends share one contract: a customer storefront and a trace-first inspector.',
    sources: [
      { label: 'Argus', href: '/projects/argus' },
      { label: 'Live demo', href: 'https://argus.xurl.fyi' },
      { label: 'argus-ai on GitHub', href: 'https://github.com/codedsultan/argus-ai' },
    ],
    keywords: {
      argus: 4,
      replay: 2,
      replayed: 2,
      trace: 2,
      traces: 2,
      tracing: 2,
      opentelemetry: 2,
      'tool calling': 2,
      cassettes: 2,
      inspector: 1,
    },
  },
];

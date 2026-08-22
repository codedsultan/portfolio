export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: 'fullstack' | 'backend' | 'platform';
  githubUrl: string | null;
  liveUrl: string | null;
  stagingUrl?: string | null;
  isFeatured: boolean;
  sortOrder: number;
  year: string;
  role: string;
  capacity: string;
  responsibilities: string[];
  highlights: string[];
  services?: {
    name: string;
    repo: string;
    description: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: 'docmind',
    title: 'DocMind',
    description:
      'A RAG-powered document intelligence platform — upload any document, query it in natural language, and let stateful AI agents handle multi-step reasoning workflows.',
    fullDescription:
      'DocMind is a portfolio-grade AI engineering showcase built to demonstrate production RAG and agentic workflow practices. Users upload PDFs and documents which are chunked, embedded, and stored in pgvector. Queries are handled by a LangChain retrieval pipeline that performs semantic search over the vector index and feeds the retrieved context to an LLM to produce grounded answers. For complex, multi-step queries — summarisation chains, cross-document comparison, structured extraction — a LangGraph stateful agent takes over, maintaining conversation state and calling tools across multiple reasoning steps. The FastAPI backend exposes typed endpoints with Pydantic validation throughout. A Next.js frontend handles document management, the chat interface, and query history. The platform is containerised with Docker, deployed on AWS, and structured with a public demo repo and a private production repo.',
    technologies: [
      'Python', 'FastAPI', 'LangChain', 'LangGraph', 'pgvector',
      'PostgreSQL', 'Next.js', 'TypeScript',
      'Docker', 'AWS',
    ],
    category: 'platform',
    githubUrl: 'https://github.com/codedsultan/docmind',
    liveUrl: null,
    isFeatured: true,
    sortOrder: 1,
    year: '2025–present',
    role: 'Creator & AI Engineer',
    capacity: 'Portfolio project',
    responsibilities: [
      'Designed the end-to-end RAG pipeline: document ingestion, chunking strategy, embedding generation, pgvector indexing, and retrieval-augmented generation with LangChain.',
      'Built stateful LangGraph agents for complex multi-step workflows — summarisation, cross-document comparison, and structured data extraction — with persistent conversation state across turns.',
      'Implemented pgvector semantic search with tuned HNSW indexing for sub-100ms retrieval across large document corpora.',
      'Built the FastAPI backend with Pydantic validation throughout, typed async endpoints, and background task handling for document processing jobs.',
      'Developed the Next.js frontend covering document upload, chat interface with streaming responses, query history, and workspace management.',
      'Containerised the full stack with Docker and deployed on AWS; structured a public demo repo and a separate private production repo.',
    ],
    highlights: [
      'Full RAG pipeline from document ingestion to grounded LLM answers',
      'LangGraph stateful agents for multi-step reasoning — not just retrieval',
      'pgvector HNSW indexing for production-grade semantic search performance',
      'Streaming LLM responses rendered live in the chat interface',
    ],
  },
  {
    slug: 'tech1m',
    title: 'Tech1M — AI Talent & AOR Platform',
    description:
      'A multi-product global workforce platform — 1M Elite contractor marketplace, AI Recruiter sourcing engine, and 1M Aptitude assessment tool — built end-to-end across three aligned product teams.',
    fullDescription:
      'Tech1M (tech1m.ai) is a production global workforce platform I architected and led as Engineering Lead while at Tedbree. The engagement covered three interconnected products: 1M Elite (a multi-jurisdiction contractor marketplace), AI Recruiter (an end-to-end automated sourcing pipeline), and 1M Aptitude (a candidate assessment tool). I joined when no unified architecture, coding standards, or security practices existed, and established the technical direction that aligned all three teams.\n\n1M Elite was built end-to-end from zero: talents, employer, and admin applications; smart matching; onboarding flows; and a full workforce management layer covering contracts and payments. The AOR compliance layer handles cross-border hiring obligations — tax, KYC/AML, contract generation, and regulatory reporting across multiple jurisdictions. The contractor wallet and payment pipeline is idempotent by design, covering balance management, collections, transfers, global payouts, webhook verification, and audit trails with zero duplicate disbursement incidents in production. An automated expense reimbursement workflow replaced a fully manual approval and payout process.\n\nThe AI Recruiter engine received job brief ingestion, candidate sourcing and scoring, scheduling automation, career pages, and HR/ATS integrations — enabling end-to-end automated sourcing pipelines for recruiters. The backend architecture is built on NestJS, Django, and FastAPI, with AWS Lambda for high-volume transaction flows, Grafana for observability, Docker for containerisation, and GitHub Actions + Ansible for CI/CD.',
    technologies: [
      'NestJS', 'Django', 'FastAPI', 'TypeScript', 'Python',
      'PostgreSQL', 'MySQL', 'Redis',
      'AWS (EC2, RDS, Lambda, S3, CloudWatch)',
      'Docker', 'GitHub Actions', 'Ansible',
      'Grafana', 'Kafka', 'RabbitMQ',
      'React', 'Next.js',
    ],
    category: 'platform',
    githubUrl: null,
    liveUrl: 'https://tech1m.ai/',
    isFeatured: true,
    sortOrder: 2,
    year: '2022–present',
    role: 'Senior Software Engineer & Engineering Lead',
    capacity: 'Lead engineer — Tedbree engagement',
    responsibilities: [
      'Led system architecture across 1M Elite, AI Recruiter, and 1M Aptitude; established unified coding standards, security practices, and system design direction that aligned three product teams.',
      'Built the 1M Elite marketplace end-to-end from zero: talents, employer and admin applications, smart matching, onboarding flows, and workforce management for contracts and payments.',
      'Engineered the AOR compliance layer for cross-border hiring covering tax obligations, contract generation, KYC/AML screening, and regulatory reporting; eliminated manual compliance reviews at scale.',
      'Designed an idempotent contractor wallet and payment pipeline covering balance management, collections, transfers, global payouts, webhook verification, and audit trails — zero duplicate disbursements in production.',
      'Built an automated expense reimbursement workflow with submissions, approvals, policy enforcement, and payout disbursement, removing processing delays across the entire contractor network.',
      'Contributed job brief ingestion, candidate sourcing and scoring, scheduling automation, career pages, and HR/ATS integrations to the AI Recruiter engine, enabling end-to-end automated sourcing pipelines.',
      'Designed and built the v1 backend architecture from scratch: core REST APIs in NestJS, Django, and FastAPI, including AWS Lambda for high-volume transaction flows.',
      'Architected containerised microservices with Docker and CI/CD pipelines with GitHub Actions and Ansible; onboarded 5 engineers to a fully automated workflow.',
      'Owned AWS production deployments and built Grafana monitoring dashboards; reduced mean time to recovery and improved production reliability across services.',
    ],
    highlights: [
      'Three-product platform built and led from architecture to production',
      'AOR compliance layer eliminating manual cross-border hiring reviews at scale',
      'Idempotent payment pipeline — zero duplicate disbursements in production',
      'Grafana observability stack across all services with structured alerting',
    ],
  },
  {
    slug: 'innermost',
    title: 'InnerMost',
    description:
      'A mind-reading game — gamified from a childhood prediction trick I invented. Players put on a mental performance: correctly guess a number or word someone is secretly thinking of, compete on leaderboards, and challenge friends in real time.',
    fullDescription:
      'InnerMost is a side project born from a prediction trick I created as a kid — a mathematical and pattern-based technique that lets you reliably guess a number or word someone is thinking of, with no prior knowledge. I gamified it into a live competitive app so others could experience the effect and compete on who could "read minds" most accurately.\n\nThe platform runs two primary game modes. Golden Mind challenges players to guess a hidden number through a structured sequence of questions — the algorithm narrows the answer to a single value regardless of what the subject picks. Golden Eye handles word and concept prediction, using categorical logic to converge on the target through a series of binary splits.\n\nThe backend is built on NestJS with PostgreSQL and Redis. WebSockets power the real-time multiplayer sessions — both players see state updates synchronously as the game progresses. An in-app credit system gates game plays and awards credits for wins, correct predictions, and streaks. A friends system lets players add each other and send direct game challenges. Leaderboards rank players by accuracy, win rate, and credits earned. The Next.js frontend handles auth, game flows, friend management, and the live leaderboard dashboard. The full stack is deployed on AWS.',
    technologies: [
      'Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis',
      'WebSockets', 'AWS',
    ],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://innermost.live/',
    isFeatured: true,
    sortOrder: 3,
    year: '2025–present',
    role: 'Creator & Full-Stack Engineer',
    capacity: 'Solo build — personal project',
    responsibilities: [
      'Invented the underlying prediction algorithm and designed both game modes (Golden Mind for numbers, Golden Eye for words/concepts) as structured binary-narrowing sequences.',
      'Built the NestJS backend with PostgreSQL for persistent player state, game history, credits, and leaderboards, and Redis for real-time session state and presence.',
      'Implemented WebSocket-based multiplayer sessions so both players see live game state transitions without polling.',
      'Designed and built the in-app credit economy: credits spent to play, earned for wins and prediction streaks, with a balance ledger and transaction history per player.',
      'Built the friends and challenge system: send/accept friend requests, view friend activity, and initiate direct 1v1 game challenges.',
      'Implemented global and friend-scoped leaderboards ranked by win rate, accuracy score, and total credits earned.',
      'Built the Next.js frontend covering auth, both game mode UIs, friend management, live leaderboard dashboard, and credit wallet.',
      'Deployed the full stack on AWS.',
    ],
    highlights: [
      'The core algorithm works — reliably converges on any number or word through a fixed question sequence',
      'Real-time multiplayer via WebSockets — both players see the same game state update live',
      'Full credit economy with earn/spend mechanics, streaks, and a transaction ledger',
      'Two distinct game modes: Golden Mind (numbers) and Golden Eye (words/concepts)',
      'Friends system with direct challenge invites and a friend-scoped leaderboard',
    ],
  },
  {
    slug: 'x-socials-platform',
    title: 'X-Socials Platform',
    description:
      'A four-service distributed social media platform — Node.js API, Next.js frontend, Laravel admin panel, and a FastAPI hybrid AI moderation engine — built end-to-end as an architectural showcase.',
    fullDescription:
      'X-Socials is a full distributed system built across four independent, production-deployed services. The Node.js/Express API is the platform core: multi-database (MongoDB for social content, SQL for users/tokens), JWT auth with refresh token rotation, BullMQ email queue, per-route rate limiting, Prometheus metrics on a dedicated port, OpenTelemetry tracing, and 390+ Vitest tests with coverage gates. The Next.js 16 frontend consumes the API with server-side rendering, authentication flows, and a social feed with cursor pagination. The Laravel 13 + Inertia.js + React admin panel provides a human moderation review queue, an auto-enforcement scheduler, on-demand content analysis, a full audit trail, and a live operational dashboard surfacing pipeline health metrics. The FastAPI AI moderation engine analyses every post and comment for policy violations using a hybrid pipeline: a local detoxify classifier handles roughly 60% of content for free, passing only the ambiguous middle band (scores 0.15–0.80) to an LLM via OpenRouter with automatic failover. Three enforcement paths — real-time webhook, auto-remove scheduler (≥ 95% confidence), and a daily reconciliation sweep — ensure content violations are caught within seconds of creation.',
    technologies: [
      'Node.js', 'Express', 'TypeScript', 'Next.js 16',
      'Laravel 13', 'Inertia.js', 'React', 'FastAPI', 'Python',
      'MongoDB', 'MySQL', 'PostgreSQL',
      'BullMQ', 'Redis',
      'OpenRouter', 'Anthropic Claude', 'detoxify',
      'Prometheus', 'OpenTelemetry',
      'Docker', 'GitHub Actions',
      'Vitest', 'Pytest',
    ],
    category: 'platform',
    githubUrl: 'https://github.com/codedsultan/x-socials',
    liveUrl: 'https://staging-api.x-social.xurl.fyi',
    isFeatured: true,
    sortOrder: 4,
    year: '2026',
    role: 'Architect & Full-Stack Engineer',
    capacity: 'Solo build',
    responsibilities: [
      'Designed the full distributed system architecture: four independently deployable services with a shared MySQL database as the integration point between FastAPI and Laravel.',
      'Built the Node.js/Express social platform API with multi-database routing (MongoDB for posts/comments/likes, SQL for users/tokens/OTPs), modular single-action controllers, and a typed BullMQ email queue with exponential backoff.',
      'Implemented JWT auth with refresh token rotation, email verification, OTP flows, and per-route rate limiting.',
      'Instrumented the API with OpenTelemetry tracing, Prometheus metrics, and structured Winston logging — enabling Grafana dashboards for production observability.',
      'Achieved 390+ Vitest tests with 65% statement/function/line coverage gates; all service tests use repo fakes with no real database required.',
      'Built the FastAPI hybrid AI moderation engine: detoxify local classifier as the pre-filter, escalating only ambiguous content to OpenRouter LLMs with automatic multi-provider failover, cutting paid API calls by ~60%.',
      'Implemented three enforcement paths: real-time webhook, auto-remove scheduler at ≥ 95% confidence, and a daily reconciliation sweep for items missed during downtime.',
      'Built the Laravel 13 admin panel with HMAC-signed API calls to Node.js, a human review queue, on-demand content analysis with model escalation, and a full audit trail.',
    ],
    highlights: [
      'Four independently deployable services with clean service boundaries',
      '~60% of content resolved free by detoxify — LLM costs scale sub-linearly with platform growth',
      'Three-path enforcement: real-time, auto-remove, and daily reconciliation',
      'Full observability: Prometheus metrics, OpenTelemetry, Grafana, structured logging',
      '390+ automated tests with coverage gates',
    ],
    services: [
      {
        name: 'x-socials (API)',
        repo: 'https://github.com/codedsultan/x-socials',
        description: 'Node.js + Express + TypeScript social platform backend — multi-DB, BullMQ, Prometheus, 390+ tests',
      },
      {
        name: 'x-socials-web',
        repo: 'https://github.com/codedsultan/x-socials-web',
        description: 'Next.js 16 frontend — SSR, auth flows, social feed with cursor pagination',
      },
      {
        name: 'x-socials-admin',
        repo: 'https://github.com/codedsultan/x-socials-admin',
        description: 'Laravel 13 + Inertia + React admin panel — review queue, auto-enforcement scheduler, audit trail',
      },
      {
        name: 'x-socials-ai-moderator',
        repo: 'https://github.com/codedsultan/x-socials-ai-moderator',
        description: 'FastAPI hybrid AI engine — detoxify pre-filter + OpenRouter LLM failover, three enforcement paths',
      },
    ],
  },
  {
    slug: 'veci-crm',
    title: 'Veci CRM',
    description:
      'A production multi-tenant CRM built from scratch for Veci Technologies — Laravel 13, domain-driven architecture across 20+ bounded contexts, Go microservices for import and email ingestion, live in production.',
    fullDescription:
      'Veci CRM is a full-featured, multi-tenant customer relationship management platform designed and built from scratch as a freelance engagement for Veci Technologies, which I continue to maintain. The platform is built on Laravel 13 with a domain-driven monorepo structure covering 20+ bounded contexts: Leads, Contacts, Organisations, Deals, Pipelines, Activities, Notes, Attachments, Custom Fields, Products, Quotes, Invoices, Automations, Email, Imports, Exports, Notifications, Audit, Comments, Files, Reports, Tags, API Keys, and Webhook Endpoints. Each domain follows a strict five-file structure — Actions, Queries, Models, Policies, Events — keeping business logic isolated and testable. Multi-tenancy is enforced through a BelongsToWorkspace trait and a global WorkspaceScope applied to every query, with ULID public IDs exposed to the client and integer PKs kept internal. The Inertia.js v3 + React 19 + TypeScript frontend uses shadcn/ui components and Tailwind CSS v4. Authentication uses Laravel Fortify with a five-role Spatie permissions system scoped per workspace. Two Go microservices handle the heavy-lifting data tasks: a CSV/XLSX importer worker and an email/reply ingestion service, both integrated into the Laravel queue via named channels. Laravel Horizon provides real-time queue monitoring across five named queues.',
    technologies: [
      'Laravel 13', 'PHP', 'Inertia.js v3', 'React 19', 'TypeScript',
      'Go', 'PostgreSQL', 'Redis',
      'Laravel Horizon', 'Spatie Permissions', 'Laravel Fortify',
      'Tailwind CSS v4', 'shadcn/ui',
      'Pest v4', 'Larastan',
      'Docker', 'Nginx', 'GitHub Actions',
    ],
    category: 'platform',
    githubUrl: null,
    liveUrl: 'https://crm.vecitechnologies.net/',
    stagingUrl: 'https://vecicrm.xurl.fyi/',
    isFeatured: true,
    sortOrder: 5,
    year: '2024–present',
    role: 'Freelance Software Engineer',
    capacity: 'Solo build · ongoing maintenance',
    responsibilities: [
      'Designed the entire platform architecture from scratch: multi-tenant monorepo, domain-driven structure, Go microservices, and infrastructure.',
      'Implemented workspace-scoped multi-tenancy with a BelongsToWorkspace trait, global WorkspaceScope, and ULID public IDs throughout the API surface.',
      'Built 20+ domain modules each following a strict Actions/Queries/Policies/Events structure.',
      'Developed a five-role Spatie permissions system per workspace with Laravel Fortify authentication, API key management, and webhook endpoints.',
      'Built Go microservices for CSV/XLSX bulk import and email/reply ingestion, integrated into the Laravel queue via five named channels.',
      'Set up Laravel Horizon for real-time queue monitoring, Pest v4 test suite, and Larastan level-6 static analysis enforced in CI.',
      'Configured and deployed Docker Compose infrastructure and maintains both staging and production environments.',
    ],
    highlights: [
      'Domain-driven architecture across 20+ bounded contexts — each domain fully isolated',
      'Workspace-scoped multi-tenancy enforced at the query layer',
      'Go microservices for high-throughput CSV/XLSX import and email ingestion',
      'Live in production at crm.vecitechnologies.net with active ongoing maintenance',
    ],
  },
  {
    slug: 'writerix',
    title: 'WriterIX',
    description:
      'Multi-tenant AI-powered blog generation SaaS — from topic ideation to published post, fully automated.',
    fullDescription:
      'WriterIX is a production SaaS platform that lets tenants generate, schedule, and publish SEO-optimised blog content using AI. The Laravel backend handles multi-tenancy, billing, and a domain-driven namespace architecture. AI generation is handled by a dedicated FastAPI + Celery microservice which orchestrates LLM calls, image generation, and featured-image selection, communicating results back to Laravel via webhooks. Real-time generation progress streams to the React frontend through Laravel Reverb WebSockets.',
    technologies: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'MySQL', 'Redis', 'Laravel Horizon', 'Laravel Reverb', 'Docker', 'Stripe', 'GitHub Actions'],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://writerix.xurl.fyi/',
    isFeatured: false,
    sortOrder: 6,
    year: '2026',
    role: 'Founder & Lead Engineer',
    capacity: 'Solo build',
    responsibilities: [
      'Architected a domain-first, multi-tenant Laravel backend with tenant-scoped helpers',
      'Integrated the WriterIX AI Pipeline microservice via webhook callbacks for async content generation',
      'Implemented real-time generation progress streaming via Laravel Reverb WebSockets',
      'Set up CI/CD via GitHub Actions for Docker cluster deployments',
    ],
    highlights: [
      'End-to-end automated blog pipeline from topic to published post',
      'Multi-tenant isolation with per-tenant billing and plan controls',
      'Live generation progress streamed in real time to the dashboard',
    ],
  },
  {
    slug: 'writerix-ai-pipeline',
    title: 'WriterIX AI Pipeline',
    description:
      'Async AI microservice powering WriterIX content generation — FastAPI + Celery with Gemini/Groq LLM orchestration.',
    fullDescription:
      'The WriterIX AI Pipeline is a standalone FastAPI microservice that handles all AI-driven content generation for the WriterIX platform. It exposes HMAC-secured endpoints that trigger Celery task chains for blog post generation: topic research, outline creation, section writing, SEO metadata, and featured-image selection. LLM calls use Gemini as the primary model with Groq as a fallback, with structured Pydantic output parsing for reliable results.',
    technologies: ['Python', 'FastAPI', 'Celery', 'Pydantic', 'Docker', 'Redis', 'Gemini API', 'Groq API', 'Pytest'],
    category: 'backend',
    githubUrl: null,
    liveUrl: null,
    isFeatured: false,
    sortOrder: 7,
    year: '2026',
    role: 'Backend Engineer',
    capacity: 'Internal service — WriterIX',
    responsibilities: [
      'Designed the Celery task-chain architecture for multi-step blog generation',
      'Integrated Gemini (primary) and Groq (fallback) LLMs with structured Pydantic output parsing',
      'Implemented HMAC key verification and secure webhook callbacks to Laravel',
    ],
    highlights: [
      'Multi-step LLM pipeline with Gemini/Groq failover',
      'Typed event broadcasting for live progress in the dashboard',
    ],
  },
  {
    slug: 'xurl-fyi',
    title: 'xurl.fyi — URL Shortener',
    description:
      'High-performance URL shortener built on a Go API backend and Next.js frontend.',
    fullDescription:
      'xurl.fyi is a production URL-shortening service built on Go and Next.js. The Go backend handles link creation, redirection, analytics, and user management with a focus on correctness and performance. A deep architectural review uncovered critical bugs — context-propagation leaks causing goroutine leaks, Redis client misuse in health checks, and sequential batch operations that should have used worker pools — all since resolved.',
    technologies: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://xurl.fyi/',
    isFeatured: false,
    sortOrder: 8,
    year: '2026',
    role: 'Full-Stack Engineer',
    capacity: 'Product build',
    responsibilities: [
      'Conducted a deep architectural review of the Go backend, identifying critical concurrency and resource-leak bugs',
      'Fixed context propagation across goroutines and Redis client lifecycle management',
      'Replaced sequential batch processing with concurrent worker-pool patterns',
    ],
    highlights: [
      'Production URL shortening with click analytics',
      'Concurrency-safe Go backend with proper context and resource management',
    ],
  },
  {
    slug: 'history-graphic-generator',
    title: 'History Graphic Generator',
    description:
      'Go microservice that renders shareable "This Day in History" social graphics, integrated with the WriterIX content pipeline.',
    fullDescription:
      'A Go-based image-rendering microservice that generates visually rich "This Day in History" social graphics for WriterIX. The service fetches historical events from public sources, scores event significance, and composites multi-layer images with event text, year watermarks, and headline kickers.',
    technologies: ['Go', 'Redis', 'Docker'],
    category: 'backend',
    githubUrl: null,
    liveUrl: null,
    isFeatured: false,
    sortOrder: 9,
    year: '2026',
    role: 'Backend Engineer',
    capacity: 'Internal service — WriterIX',
    responsibilities: [
      'Designed the multi-layer image-composition pipeline for social graphics',
      'Implemented significance scoring for historical event selection',
      'Fixed concurrency bugs: context-propagation leaks and Redis client lifecycle',
    ],
    highlights: [
      'Generates shareable social graphics at scale',
      'Integrated into the WriterIX automated content pipeline',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.isFeatured).sort((a, b) => a.sortOrder - b.sortOrder);
export const allProjectsSorted = [...projects].sort((a, b) => a.sortOrder - b.sortOrder);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories: { value: Project['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'platform', label: 'Platform' },
  { value: 'fullstack', label: 'Full-stack' },
  { value: 'backend', label: 'Backend' },
];
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
    slug: 'x-socials-platform',
    title: 'X-Socials Platform',
    description:
      'A four-service distributed social media platform — Node.js API, Next.js frontend, Laravel admin panel, and a FastAPI hybrid AI moderation engine — built end-to-end as an architectural showcase.',
    fullDescription:
      'X-Socials is a full distributed system built across four independent, production-deployed services. The Node.js/Express API is the platform core: multi-database (MongoDB for social content, SQL for users/tokens), JWT auth with refresh token rotation, BullMQ email queue, per-route rate limiting, Prometheus metrics on a dedicated port, OpenTelemetry tracing, and 390+ Vitest tests with coverage gates. The Next.js 16 frontend consumes the API with server-side rendering, authentication flows, and a social feed with cursor pagination. The Laravel 13 + Inertia.js + React admin panel provides a human moderation review queue, an auto-enforcement scheduler, on-demand content analysis, a full audit trail, and a live operational dashboard surfacing pipeline health metrics. The FastAPI AI moderation engine analyses every post and comment for policy violations using a hybrid pipeline: a local detoxify classifier handles roughly 60% of content for free, passing only the ambiguous middle band (scores 0.15–0.80) to an LLM via OpenRouter with automatic failover. Three enforcement paths — real-time webhook, auto-remove scheduler (≥ 95% confidence), and a daily reconciliation sweep for missed items — ensure content violations are caught within seconds of creation. All four services are containerised with Docker and deployed via GitHub Actions CI/CD.',
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
    isFeatured: false,
    sortOrder: 5,
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
      'Built the Laravel 13 admin panel with HMAC-signed API calls to Node.js, a human review queue, on-demand content analysis with model escalation, and a full admin_action_logs audit trail.',
      'Containerised all four services with Docker and deployed via GitHub Actions CI/CD pipelines.',
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
      'Veci CRM is a full-featured, multi-tenant customer relationship management platform designed and built from scratch as a freelance engagement for Veci Technologies, which I continue to maintain. The platform is built on Laravel 13 with a domain-driven monorepo structure covering 20+ bounded contexts: Leads, Contacts, Organisations, Deals, Pipelines, Activities, Notes, Attachments, Custom Fields, Products, Quotes, Invoices, Automations, Email, Imports, Exports, Notifications, Audit, Comments, Files, Reports, Tags, API Keys, and Webhook Endpoints. Each domain follows a strict five-file structure — Actions, Queries, Models, Policies, Events — keeping business logic isolated and testable. Multi-tenancy is enforced through a BelongsToWorkspace trait and a global WorkspaceScope applied to every query, with ULID public IDs exposed to the client and integer PKs kept internal. The Inertia.js v3 + React 19 + TypeScript frontend uses shadcn/ui components and Tailwind CSS v4. Authentication uses Laravel Fortify with a five-role Spatie permissions system scoped per workspace. Two Go microservices handle the heavy-lifting data tasks: a CSV/XLSX importer worker and an email/reply ingestion service, both integrated into the Laravel queue via named channels. Laravel Horizon provides real-time queue monitoring across five named queues. The full stack runs in Docker Compose with PHP-FPM, Nginx, PostgreSQL, Redis, and Mailpit for local dev. The test suite uses Pest v4 with Larastan level-6 static analysis enforced in CI via GitHub Actions. Both staging and production environments are live and actively maintained.',
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
    stagingUrl: null,
    isFeatured: true,
    sortOrder: 3,
    year: '2024–present',
    role: 'Freelance Software Engineer',
    capacity: 'Solo build · ongoing maintenance',
    responsibilities: [
      'Designed the entire platform architecture from scratch: multi-tenant monorepo, domain-driven structure, Go microservices, and infrastructure.',
      'Implemented workspace-scoped multi-tenancy with a BelongsToWorkspace trait, global WorkspaceScope, and ULID public IDs throughout the API surface.',
      'Built 20+ domain modules (Leads, Contacts, Deals, Pipelines, Quotes, Invoices, Automations, etc.) each following a strict Actions/Queries/Policies/Events structure.',
      'Developed a five-role Spatie permissions system per workspace with Laravel Fortify authentication, API key management, and webhook endpoints.',
      'Built Go microservices for CSV/XLSX bulk import and email/reply ingestion, integrated into the Laravel queue via five named channels.',
      'Set up Laravel Horizon for real-time queue monitoring, Pest v4 test suite, and Larastan level-6 static analysis enforced in CI.',
      'Configured and deployed Docker Compose infrastructure (PHP-FPM, Nginx, PostgreSQL, Redis, Mailpit) and maintains both staging and production environments.',
    ],
    highlights: [
      'Domain-driven architecture across 20+ bounded contexts — each domain fully isolated and independently testable',
      'Workspace-scoped multi-tenancy enforced at the query layer with zero tenant data leakage',
      'Go microservices for high-throughput CSV/XLSX import and email ingestion',
      'Live in production at crm.vecitechnologies.net with active ongoing maintenance',
    ],
  },
  {
    slug: 'docmind',
    title: 'DocMind',
    description:
      'An agentic RAG assistant that answers questions from your own documents with real citations, and takes scoped, audited actions through a three-tier risk model mirroring production agentic systems.',
    fullDescription:
      'DocMind is a portfolio-grade AI assistant built to prove out production RAG and agentic patterns end-to-end, not just wrap an LLM API call. The NestJS backend ingests PDFs, Markdown, and plain text through a BullMQ worker: documents are chunked (800-char target, 150-char overlap) and embedded with Gemini `gemini-embedding-001` (768 dimensions) into a Postgres + pgvector column with an HNSW index. Every query runs a parallel vector and keyword search — pgvector cosine similarity alongside Postgres tsvector/tsquery full-text search — fused via Reciprocal Rank Fusion (k=60), so cited answers point back to real source chunks. The chat layer is a LangGraph.js StateGraph agent rather than a raw prompt chain, with tools registered under an explicit three-tier risk model: read tools execute freely, internal-write tools execute and audit, and external-write tools like sending an email digest surface a confirmation card before running. Every tool call, successful or not, writes an audit row. Responses stream token-by-token over SSE, and a QueryTrace is recorded per query — retrieved chunks, vector/keyword/fused scores, provider, latency breakdown — visible in an admin trace viewer. A hand-labeled 18-case retrieval eval runs as a required CI job against a real pgvector container, gated on hit@5 ≥ 0.75 and MRR ≥ 0.60, with a deliberately regressed RRF constant used to confirm the gate actually catches regressions. The Next.js 16 frontend consumes the SSE stream, renders the trace viewer, and handles notes/tasks created by the agent. The full stack runs in Docker Compose with a GitHub Actions pipeline covering backend tests, the retrieval eval, frontend tests, and a security scan.',
    technologies: [
      'NestJS', 'Next.js 16', 'TypeScript',
      'PostgreSQL', 'pgvector', 'Prisma',
      'LangGraph.js', 'Gemini API', 'Groq API',
      'BullMQ', 'Redis',
      'Docker', 'GitHub Actions',
    ],
    category: 'fullstack',
    githubUrl: 'https://github.com/codedsultan/docmind',
    liveUrl: null,
    isFeatured: true,
    sortOrder: 2,
    year: '2026',
    role: 'Creator & Full-Stack Engineer',
    capacity: 'Solo build — portfolio project',
    responsibilities: [
      'Designed the hybrid retrieval pipeline: parallel pgvector cosine search and Postgres full-text search fused via Reciprocal Rank Fusion, with a similarity floor and optional re-ranking.',
      'Built the async ingestion path — chunking, Gemini embedding, and HNSW-indexed pgvector storage — on a BullMQ worker so uploads return immediately.',
      'Implemented a LangGraph.js StateGraph agent with an explicit three-tier tool risk model (read / internal-write / external-write), including a propose-confirm-execute flow for external-write actions.',
      'Built full observability: a QueryTrace row per query capturing retrieval scores, provider, and latency, plus a ToolCallAudit row for every tool invocation, surfaced in an admin trace viewer.',
      'Wrote a hand-labeled 18-case retrieval eval and wired it into CI as a required, DB-backed status check with explicit hit@5 and MRR thresholds.',
      'Implemented SSE streaming for both the direct retrieval-and-generate path and the agent loop, and built the Next.js 16 frontend consuming it.',
      'Set up Docker Compose infrastructure and a four-job GitHub Actions pipeline: backend tests, retrieval eval, frontend tests, and dependency/security scanning.',
    ],
    highlights: [
      'Hybrid retrieval (vector + keyword, RRF-fused) with citations that trace back to real source chunks',
      'Explicit three-tier tool risk model with confirm-gated external actions and a full audit trail',
      'Required CI eval job against a real pgvector container — verified to catch retrieval regressions, not just green-check CI',
      'Per-query observability via QueryTrace with a dedicated admin trace viewer',
      'Token-level SSE streaming across both the retrieval and agent code paths',
    ],
  },
  {
    slug: 'writerix',
    title: 'WriterIX',
    description:
      'Multi-tenant AI-powered blog generation SaaS — from topic ideation to published post, fully automated.',
    fullDescription:
      'WriterIX is a production SaaS platform that lets tenants generate, schedule, and publish SEO-optimised blog content using AI. The Laravel backend handles multi-tenancy, billing, and a domain-driven namespace architecture. AI generation is handled by a dedicated FastAPI + Celery microservice which orchestrates LLM calls, image generation, and featured-image selection, communicating results back to Laravel via webhooks. Real-time generation progress streams to the React frontend through Laravel Reverb WebSockets. The platform includes a WordPress plugin and theme — complete with an ad-management system and a WooCommerce cart — plus custom stepper controls for the publishing flow.',
    technologies: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'MySQL', 'Redis', 'Laravel Horizon', 'Laravel Reverb', 'Docker', 'Stripe', 'WordPress', 'GitHub Actions'],
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
      'Developed a WordPress plugin and theme with WooCommerce cart and ad-management sync',
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
      'The WriterIX AI Pipeline is a standalone FastAPI microservice that handles all AI-driven content generation for the WriterIX platform. It exposes HMAC-secured endpoints that trigger Celery task chains for blog post generation: topic research, outline creation, section writing, SEO metadata, and featured-image selection. LLM calls use Gemini as the primary model with Groq as a fallback, with structured Pydantic output parsing for reliable results. The service communicates generation events back to Laravel via webhook callbacks, with each pipeline step broadcasting a typed event so the frontend can render live progress.',
    technologies: ['Python', 'FastAPI', 'Celery', 'Pydantic', 'Docker', 'Redis', 'Gemini API', 'Groq API', 'Pytest'],
    category: 'backend',
    githubUrl: null,
    liveUrl: null,
    isFeatured: false,
    sortOrder: 9,
    year: '2026',
    role: 'Backend Engineer',
    capacity: 'Internal service — WriterIX',
    responsibilities: [
      'Designed the Celery task-chain architecture for multi-step blog generation',
      'Integrated Gemini (primary) and Groq (fallback) LLMs with structured Pydantic output parsing',
      'Implemented HMAC key verification and secure webhook callbacks to Laravel',
      'Achieved a clean type-checker run with full lint compliance across all service files',
    ],
    highlights: [
      'Multi-step LLM pipeline with Gemini/Groq failover',
      'Typed event broadcasting for live progress in the dashboard',
      'Comprehensive automated test coverage',
    ],
  },
  {
    slug: 'xurl-fyi',
    title: 'xurl.fyi — URL Shortener',
    description:
      'High-performance URL shortener built on a Go API backend and Next.js frontend.',
    fullDescription:
      'xurl.fyi is a production URL-shortening service built on Go and Next.js. The Go backend handles link creation, redirection, analytics, and user management with a focus on correctness and performance. A deep architectural review uncovered critical bugs — context-propagation leaks causing goroutine leaks, Redis client misuse in health checks, and sequential batch operations that should have used worker pools — all since resolved. The Next.js frontend provides a clean dashboard for link management, click analytics, and QR-code generation.',
    technologies: ['Go', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://xurl.fyi/',
    isFeatured: false,
    sortOrder: 7,
    year: '2026',
    role: 'Full-Stack Engineer',
    capacity: 'Product build',
    responsibilities: [
      'Conducted a deep architectural review of the Go backend, identifying critical concurrency and resource-leak bugs',
      'Fixed context propagation across goroutines and Redis client lifecycle management',
      'Replaced sequential batch processing with concurrent worker-pool patterns',
      'Maintained and extended the Next.js dashboard for link management and analytics',
    ],
    highlights: [
      'Production URL shortening with click analytics',
      'Concurrency-safe Go backend with proper context and resource management',
      'Clean Next.js dashboard with QR-code generation',
    ],
  },
  {
    slug: 'history-graphic-generator',
    title: 'History Graphic Generator',
    description:
      'Go microservice that renders shareable "This Day in History" social graphics, integrated with the WriterIX content pipeline.',
    fullDescription:
      'A Go-based image-rendering microservice that generates visually rich "This Day in History" social graphics for WriterIX. The service fetches historical events from public sources, scores event significance, and composites multi-layer images with event text, year watermarks, and headline kickers. Work included fixing a User-Agent omission causing CDN 403 errors, replacing silent placeholder fallbacks with proper error handling, implementing significance scoring for multi-event selection, and resolving goroutine leaks from missing context propagation.',
    technologies: ['Go', 'Redis', 'Docker'],
    category: 'backend',
    githubUrl: null,
    liveUrl: null,
    isFeatured: false,
    sortOrder: 8,
    year: '2026',
    role: 'Backend Engineer',
    capacity: 'Internal service — WriterIX',
    responsibilities: [
      'Designed the multi-layer image-composition pipeline for social graphics',
      'Implemented significance scoring for historical event selection',
      'Fixed concurrency bugs: context-propagation leaks and Redis client lifecycle',
      'Resolved CDN request failures via correct request headers',
    ],
    highlights: [
      'Generates shareable social graphics at scale',
      'Significance-scored multi-event representation',
      'Integrated into the WriterIX automated content pipeline',
    ],
  },
  {
    slug: 'innermost',
    title: 'InnerMost',
    description:
      'A mind-reading game — gamified from a childhood prediction trick I practised. Players put on a mental performance: correctly guess a number or word someone is secretly thinking of, compete on leaderboards, and challenge friends in real time.',
    fullDescription:
      'InnerMost is a side project born from a prediction trick I practised as a kid — a mathematical and pattern-based technique that lets you reliably guess a number or word someone is thinking of, with no prior knowledge. I gamified it into a live competitive app so others could experience the effect and compete on who could "read minds" most accurately.\n\nThe platform runs two primary game modes. Golden Mind challenges players to guess a hidden number through a structured sequence of questions — the algorithm narrows the answer to a single value regardless of what the subject picks. Golden Eye handles word and concept prediction, using categorical logic to converge on the target through a series of binary splits.\n\nThe backend is built on NestJS with PostgreSQL and Redis. WebSockets power the real-time multiplayer sessions — both players see state updates synchronously as the game progresses. An in-app credit system gates game plays and awards credits for wins, correct predictions, and streaks. A friends system lets players add each other and send direct game challenges. Leaderboards rank players by accuracy, win rate, and credits earned. The Next.js frontend handles auth, game flows, friend management, and the live leaderboard dashboard. The full stack is deployed on AWS.',
    technologies: [
      'Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis',
      'WebSockets', 'AWS',
    ],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://innermost.live/',
    isFeatured: true,
    sortOrder: 1,
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
      'The core algorithm works — it reliably converges on any number or word the subject is thinking of through a fixed question sequence',
      'Real-time multiplayer via WebSockets — both players see the same game state update live',
      'Full credit economy with earn/spend mechanics, streaks, and a transaction ledger',
      'Two distinct game modes: Golden Mind (numbers) and Golden Eye (words/concepts)',
      'Friends system with direct challenge invites and a friend-scoped leaderboard',
    ],
  },
  {
    slug: 'aws-image-pipeline',
    title: 'AWS Image Pipeline',
    description:
      'Serverless image processing pipeline on AWS — an S3 upload triggers a Lambda that generates a thumbnail and publishes a completion event via SNS, entirely defined in Terraform.',
    fullDescription:
      'AWS Image Pipeline is a small, deliberately clean serverless system built to demonstrate solid infrastructure-as-code and Lambda design patterns rather than feature breadth. An object landing in the raw/ prefix of an S3 bucket triggers a Lambda function that generates a thumbnail, writes it to the processed/ prefix, and publishes a completion event to an SNS topic. The entire stack — S3 buckets, the Lambda, IAM roles, and SNS — is defined in Terraform as reusable modules (s3, iam, lambda, sns) composed together in a dev environment, so the whole system is reproducible from a single apply. The Lambda\'s execution role is scoped to exact resource ARNs, read access to raw/* and write access to processed/* only, with no wildcard actions or resources anywhere in the policy. All AWS SDK calls are isolated behind a thin boto3 client layer that is injected rather than hardcoded, which keeps the core image-processing logic fully unit-testable against moto mocks with no live AWS credentials required.',
    technologies: ['Python', 'AWS Lambda', 'S3', 'SNS', 'IAM', 'CloudWatch', 'Terraform', 'pydantic', 'boto3', 'pytest', 'moto'],
    category: 'backend',
    githubUrl: 'https://github.com/codedsultan/aws-image-pipeline',
    liveUrl: null,
    isFeatured: false,
    sortOrder: 4,
    year: '2026',
    role: 'Backend / Cloud Engineer',
    capacity: 'Solo build — portfolio project',
    responsibilities: [
      'Designed the event-driven S3 → Lambda → SNS pipeline and defined the full stack as reusable Terraform modules (s3, iam, lambda, sns).',
      'Wrote least-privilege IAM policies scoped to exact resource ARNs per prefix, with no wildcard actions or resources.',
      'Isolated all boto3/AWS SDK calls behind an injected client layer to keep business logic fully unit-testable without live credentials.',
      'Built the pydantic-based request/response models and settings layer, with configuration read from environment variables set by Terraform.',
      'Wrote a pytest + moto unit test suite covering the image-processing logic against mocked AWS services.',
    ],
    highlights: [
      'Entire stack reproducible from a single `terraform apply` — S3, Lambda, IAM, and SNS as composed modules',
      'Least-privilege IAM scoped to exact per-prefix resource ARNs, no wildcards',
      'Fully unit-testable processing logic via an injected AWS client layer and moto mocks — no live AWS credentials needed for tests',
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
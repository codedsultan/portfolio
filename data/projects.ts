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
  websiteUrl?: string | null;
  demoUrl?: string | null;
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
    isFeatured: true,
    sortOrder: 1,
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
    sortOrder: 2,
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
    sortOrder: 3,
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
  // {
  //   slug: 'tech1m',
  //   title: 'Tech1M — AI Talent & AOR Platform',
  //   description:
  //     'A multi-product global workforce platform — 1M Elite contractor marketplace, AI Recruiter sourcing engine, and 1M Aptitude assessment tool — built end-to-end across three aligned product teams.',
  //   fullDescription:
  //     'Tech1M (tech1m.ai) is a production global workforce platform I architected and led as Engineering Lead while at Tedbree. The engagement covered three interconnected products: 1M Elite (a multi-jurisdiction contractor marketplace), AI Recruiter (an end-to-end automated sourcing pipeline), and 1M Aptitude (a candidate assessment tool). I joined when no unified architecture, coding standards, or security practices existed, and established the technical direction that aligned all three teams.\n\n1M Elite was built end-to-end from zero: talents, employer, and admin applications; smart matching; onboarding flows; and a full workforce management layer covering contracts and payments. The AOR compliance layer handles cross-border hiring obligations — tax, KYC/AML, contract generation, and regulatory reporting across multiple jurisdictions. The contractor wallet and payment pipeline is idempotent by design, covering balance management, collections, transfers, global payouts, webhook verification, and audit trails with zero duplicate disbursement incidents in production. An automated expense reimbursement workflow replaced a fully manual approval and payout process.\n\nThe AI Recruiter engine received job brief ingestion, candidate sourcing and scoring, scheduling automation, career pages, and HR/ATS integrations — enabling end-to-end automated sourcing pipelines for recruiters. The backend architecture is built on NestJS, Django, and FastAPI, with AWS Lambda for high-volume transaction flows, Grafana for observability, Docker for containerisation, and GitHub Actions + Ansible for CI/CD.',
  //   technologies: [
  //     'NestJS', 'Django', 'FastAPI', 'TypeScript', 'Python',
  //     'PostgreSQL', 'MySQL', 'Redis',
  //     'AWS (EC2, RDS, Lambda, S3, CloudWatch)',
  //     'Docker', 'GitHub Actions', 'Ansible',
  //     'Grafana', 'Kafka', 'RabbitMQ',
  //     'React', 'Next.js',
  //   ],
  //   category: 'platform',
  //   githubUrl: null,
  //   liveUrl: 'https://tech1m.ai/',
  //   isFeatured: true,
  //   sortOrder: 2,
  //   year: '2022–present',
  //   role: 'Senior Software Engineer & Engineering Lead',
  //   capacity: 'Lead engineer — Tedbree engagement',
  //   responsibilities: [
  //     'Led system architecture across 1M Elite, AI Recruiter, and 1M Aptitude; established unified coding standards, security practices, and system design direction that aligned three product teams.',
  //     'Built the 1M Elite marketplace end-to-end from zero: talents, employer and admin applications, smart matching, onboarding flows, and workforce management for contracts and payments.',
  //     'Engineered the AOR compliance layer for cross-border hiring covering tax obligations, contract generation, KYC/AML screening, and regulatory reporting; eliminated manual compliance reviews at scale.',
  //     'Designed an idempotent contractor wallet and payment pipeline covering balance management, collections, transfers, global payouts, webhook verification, and audit trails — zero duplicate disbursements in production.',
  //     'Built an automated expense reimbursement workflow with submissions, approvals, policy enforcement, and payout disbursement, removing processing delays across the entire contractor network.',
  //     'Contributed job brief ingestion, candidate sourcing and scoring, scheduling automation, career pages, and HR/ATS integrations to the AI Recruiter engine, enabling end-to-end automated sourcing pipelines.',
  //     'Designed and built the v1 backend architecture from scratch: core REST APIs in NestJS, Django, and FastAPI, including AWS Lambda for high-volume transaction flows.',
  //     'Architected containerised microservices with Docker and CI/CD pipelines with GitHub Actions and Ansible; onboarded 5 engineers to a fully automated workflow.',
  //     'Owned AWS production deployments and built Grafana monitoring dashboards; reduced mean time to recovery and improved production reliability across services.',
  //   ],
  //   highlights: [
  //     'Three-product platform built and led from architecture to production',
  //     'AOR compliance layer eliminating manual cross-border hiring reviews at scale',
  //     'Idempotent payment pipeline — zero duplicate disbursements in production',
  //     'Grafana observability stack across all services with structured alerting',
  //   ],
  // },

  // {
  //   slug: 'x-socials-platform',
  //   title: 'X-Socials Platform',
  //   description:
  //     'A four-service distributed social media platform — Node.js API, Next.js frontend, Laravel admin panel, and a FastAPI hybrid AI moderation engine — built end-to-end as an architectural showcase.',
  //   category: 'platform',
  //   githubUrl: 'https://github.com/codedsultan/x-socials',
  //   liveUrl: 'https://staging-api.x-social.xurl.fyi',
  //   isFeatured: false,
  //   sortOrder: 99,
  //   year: '2026',
  //   role: 'Architect & Full-Stack Engineer',
  //   capacity: 'Solo build',
  // },
  {
    slug: 'veci-crm',
    title: 'Veci CRM',
    description:
      'A production multi-tenant CRM built from scratch for Veci Technologies — Django 5, domain-driven monolith across 20+ bounded contexts, Celery workers, WebSocket support via Daphne, live in production.',
    fullDescription:
      'Veci CRM is a full-featured, multi-tenant customer relationship management platform designed and built from scratch as a freelance engagement for Veci Technologies, which I continue to maintain. The platform is built on Django 5 as a domain-driven modular monolith inside a uv workspace, covering 20+ bounded contexts: Leads, Contacts, Organisations, Deals, Pipelines, Activities, Notes, Attachments, Custom Fields, Products, Quotes, Invoices, Automations, Email, Imports, Exports, Notifications, Audit, Comments, Files, Reports, Tags, API Keys, and Webhook Endpoints. Shared infrastructure is split into internal packages (workspace-kernel, audit, scheduling-kernel, locale-kernel, byof-kernel, dispatch-kernel, observability, notification-kernel) consumed by the CRM app. Multi-tenancy is enforced at the query layer via workspace-scoped managers applied globally. The Inertia Django + React 19 + TypeScript frontend is bundled with Vite 6 and Tailwind CSS v4. Django REST Framework handles the API layer, with Celery + Redis for async task processing (bulk CSV/XLSX import, email ingestion, notifications). The platform runs under Daphne for ASGI/WebSocket support, with Whitenoise for static files. Stripe handles payment collection. Pytest + Playwright cover unit, integration, and E2E testing.',
    technologies: [
      'Python', 'Django 5', 'Django REST Framework',
      'Inertia Django', 'React 19', 'TypeScript',
      'Celery', 'Redis', 'PostgreSQL',
      'Daphne', 'Vite 6', 'Tailwind CSS v4',
      'Stripe', 'Pytest', 'Playwright',
      'Docker', 'GitHub Actions',
    ],
    category: 'platform',
    githubUrl: null,
    liveUrl: 'https://app-crm.xurl.fyi/',
    stagingUrl: null,
    websiteUrl: 'https://crm.xurl.fyi/',
    demoUrl: 'https://demo-crm.xurl.fyi/',
    isFeatured: true,
    sortOrder: 4,
    year: '2024–present',
    role: 'Freelance Software Engineer',
    capacity: 'Solo build · ongoing maintenance',
    responsibilities: [
      'Designed the entire platform architecture from scratch: domain-driven Django monolith, internal uv workspace packages for shared infrastructure, and Docker deployment.',
      'Implemented workspace-scoped multi-tenancy enforced at the query layer via global workspace managers, keeping tenant data isolated across all 20+ domains.',
      'Built 20+ domain modules each with isolated models, serializers, actions, and policies — keeping business logic testable and domain boundaries clean.',
      'Developed a role-based permissions system per workspace with Django authentication, API key management, and webhook endpoint management.',
      'Wired Celery + Redis workers for async heavy-lifting: bulk CSV/XLSX import, email/reply ingestion, and notification dispatch.',
      'Integrated Daphne ASGI server for WebSocket support alongside Whitenoise for static file serving, and Stripe for payment collection.',
      'Built the React 19 + TypeScript frontend via Inertia Django and Vite 6, with Tailwind CSS v4 and a custom component library.',
      'Maintained full test coverage with Pytest for Django and Playwright for E2E; deployed and maintains both staging and production environments.',
    ],
    highlights: [
      'Domain-driven Django monolith across 20+ bounded contexts — each domain fully isolated',
      'Workspace-scoped multi-tenancy enforced at the query layer',
      'Celery workers for high-throughput CSV/XLSX import and email ingestion',
      'Live in production with active ongoing maintenance',
    ],
  },
  {
    slug: 'writerix',
    title: 'WriterIX',
    description:
      'Multi-tenant AI content SaaS — workspaces bring their own LLM keys, pick a provider, and run end-to-end blog pipelines with live review gates, RAG knowledge bases, and social publishing.',
    fullDescription:
      'WriterIX 2.0 is a complete ground-up rebuild of the platform on a Django + Inertia/React stack. The architecture is domain-driven: each feature area (pipelines, runs, content, brand, knowledge, sources, destinations, billing, social) lives in its own domain under app/domains/ with models, services, selectors, tasks, and tests kept together.\n\nThe AI layer is fully integrated — no separate microservice. A LangGraph post pipeline (app/ai/) orchestrates every content run: topic research → outline → section writing → SEO metadata → graphics. The facade pattern enforces that no domain imports LangChain types directly; all AI calls flow through ai.facade. Workspaces bring their own API keys (BYOK) across five providers — Anthropic, OpenAI, Google Gemini, Groq, and OpenRouter — with per-workspace key encryption and a metering layer that tracks token spend per run.\n\nGraphics generation runs in a separate Node renderer sidecar (Fastify + Satori → resvg → sharp), supporting six template families at four sizes each. The renderer accepts a typed render request schema and returns an image buffer; Django dispatches render jobs via the internal dispatch-kernel.\n\nKnowledge bases are backed by pgvector RAG — workspaces can attach source documents, RSS feeds, and URLs; the ingestion pipeline chunks, embeds, and retrieves context at generation time. A scheduling layer handles recurring pipeline runs and publishes finished posts directly to connected destinations (CMS connectors, social platforms).\n\nThe frontend runs on Inertia.js with React and TypeScript inside the Django project. Billing and plan controls are handled via Stripe with workspace-scoped subscription management. The full stack ships as Docker images; the marketing site is a static export deployed separately behind Nginx.',
    technologies: [
      'Python', 'Django', 'Inertia.js', 'React', 'TypeScript',
      'PostgreSQL', 'pgvector', 'Redis', 'Celery', 'LangChain', 'LangGraph',
      'Node.js', 'Fastify', 'Stripe', 'Docker', 'GitHub Actions',
    ],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://app-writerix.xurl.fyi/',
    websiteUrl: 'https://writerix.xurl.fyi/',
    demoUrl: 'https://demo-writerix.xurl.fyi/',
    isFeatured: true,
    sortOrder: 5,
    year: '2026',
    role: 'Founder & Lead Engineer',
    capacity: 'Solo build',
    responsibilities: [
      'Rebuilt WriterIX from scratch on Django with a domain-driven architecture — each domain owns its models, services, selectors, tasks, and tests.',
      'Designed and implemented the integrated LangGraph AI pipeline replacing the old standalone microservice — topic research, outline, section writing, SEO metadata, and graphics generation in a single orchestrated graph.',
      'Built the BYOK (Bring Your Own Key) system supporting five LLM providers (Anthropic, OpenAI, Google Gemini, Groq, OpenRouter) with per-workspace encrypted key storage and token-spend metering.',
      'Implemented pgvector-backed RAG knowledge bases with ingestion pipelines for documents, RSS feeds, and URLs, retrieved as context at generation time.',
      'Built the Node renderer sidecar (Fastify + Satori) for graphics generation — six template families at four sizes, dispatched via the internal dispatch-kernel.',
      'Designed workspace-scoped multi-tenancy with ULID public IDs enforced at the query layer, review gates in the editor, and a full Stripe billing integration.',
      'Set up the two-tier deployment: Django app as Docker image for the platform, static-export Nginx image (ghcr.io/quantsultan/writerix/website) for the marketing site.',
    ],
    highlights: [
      'Integrated LangGraph pipeline — AI pipeline lives inside the app, not as a separate service',
      'BYOK across 5 providers: Anthropic, OpenAI, Google Gemini, Groq, OpenRouter',
      'pgvector RAG knowledge base — workspace documents and sources retrieved at generation time',
      'Node renderer sidecar for graphics: 6 template families × 4 sizes',
      'Domain-driven Django architecture with import-linter enforcing AI facade boundaries',
      'Two-tier deployment: app image + static site image, mirroring Veci CRM dispatch pattern',
    ],
  },

  // {
  //   slug: 'history-graphic-generator',
  //   title: 'History Graphic Generator',
  //   description:
  //     'Go microservice that renders shareable "This Day in History" social graphics, integrated with the WriterIX content pipeline.',
  //   fullDescription:
  //     'A Go-based image-rendering microservice that generates visually rich "This Day in History" social graphics for WriterIX. The service fetches historical events from public sources, scores event significance, and composites multi-layer images with event text, year watermarks, and headline kickers.',
  //   technologies: ['Go', 'Redis', 'Docker'],
  //   category: 'backend',
  //   githubUrl: null,
  //   liveUrl: null,
  //   isFeatured: false,
  //   sortOrder: 9,
  //   year: '2026',
  //   role: 'Backend Engineer',
  //   capacity: 'Internal service — WriterIX',
  //   responsibilities: [
  //     'Designed the multi-layer image-composition pipeline for social graphics',
  //     'Implemented significance scoring for historical event selection',
  //     'Fixed concurrency bugs: context-propagation leaks and Redis client lifecycle',
  //   ],
  //   highlights: [
  //     'Generates shareable social graphics at scale',
  //     'Integrated into the WriterIX automated content pipeline',
  //   ],
  // },
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
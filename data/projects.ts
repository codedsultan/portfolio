export interface ProjectImage {
  /** Path under /public, e.g. '/images/projects/argus/cover.webp' */
  src: string;
  /** Describe what the screenshot shows, not that it is a screenshot */
  alt: string;
  /** Intrinsic pixel size of the file (used to reserve space and avoid layout shift) */
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: 'fullstack' | 'backend' | 'platform';
  githubUrl: string | null;
  liveUrl: string | null;
  liveUrlLabel?: string;
  /** Shown on the project card and at the top of the project page. Capture at 16:10 (e.g. 1600x1000). */
  cover?: ProjectImage;
  /** Extra images shown on the project page under the overview. */
  screenshots?: ProjectImage[];
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
    slug: 'argus',
    title: 'Argus — Traceable AI Agent',
    description:
      'A tool-calling shop agent you can replay without an API key and inspect span by span. Python/FastAPI agent core, OpenTelemetry traces, a customer storefront, and a trace-first inspector, all deployed.',
    fullDescription:
      'Argus answers questions about Argus Field Supply, a fictional field-optics shop, and is built around one loop: prompt, agent, tool call, shop API, replayed LLM, answer, trace. The public demo runs in deterministic replay mode, so it needs no provider key and returns the same answers every time, which makes the agent testable in CI. Every request produces an OpenTelemetry trace covering the agent workflow, the LLM call, the selected tool and the downstream API call, with prompt and completion content redacted before storage. Two Next.js frontends sit on a shared contract: a customer storefront with an assistant workspace and status page, and an engineer-facing inspector that exposes tool calls, arguments, results and trace IDs. The public edge is hardened as a first-class concern: allowlisted prompts, request-size caps, per-client rate limits, a global concurrency cap, destructive tools removed, and replay misses that fail closed. The next phase adds a hybrid-retrieval RAG layer with cited answers, claim-level verification and abstention, evaluated on a hand-written golden set that is half unanswerable.',
    technologies: [
      'Python', 'FastAPI', 'LangChain', 'OpenTelemetry', 'Jaeger',
      'Next.js', 'TypeScript', 'Tailwind CSS',
      'Docker', 'GitHub Actions',
    ],
    category: 'fullstack',
    githubUrl: 'https://github.com/codedsultan/argus-ai',
    liveUrl: 'https://argus.xurl.fyi',
    liveUrlLabel: 'View live demo (replay mode)',
    // Captured per docs/project-screenshots.md (scripts/capture-screenshots.mjs).
    cover: {
      src: '/images/projects/argus/cover.webp',
      alt: 'Argus Field Supply storefront assistant answering "What current promotions are available on binoculars?" with a Ridgeview 8x42 offer card at 50% off, a "Checked Promotions" provenance line, and the catalog sidebar of field-supply categories',
      width: 1600,
      height: 1000,
    },
    screenshots: [
      {
        src: '/images/projects/argus/inspector.webp',
        alt: 'Trace-first inspector with the "Trace & tools" panel expanded: the get_ads tool call, its binoculars category argument, call counts and estimated tokens, and the 32-character trace ID behind the answer',
        width: 1600,
        height: 1000,
        caption:
          'The engineer lens: every answer expands to its tool call, arguments, metrics, and trace ID.',
      },
      {
        src: '/images/projects/argus/waterfall.webp',
        alt: 'Operations console span waterfall for one recorded request: the agent root, workflow and LangGraph invoke spans expanded with timing bars and redacted tags, followed by collapsed rows for the LLM calls, get_ads tool execution, and shop-api round trip',
        width: 1600,
        height: 2164,
        caption:
          'One request as OpenTelemetry spans: agent workflow, LLM call, get_ads tool execution, and the shop-api round trip — prompt and completion content redacted before storage.',
      },
    ],
    isFeatured: true,
    sortOrder: 1,
    year: '2026',
    role: 'Creator & AI Engineer',
    capacity: 'Solo build',
    responsibilities: [
      'Designed the agent core: a stateless FastAPI service running a LangChain tool loop over ten typed shop tools, with a client-owned history contract and a token-budget trimmer.',
      'Built the deterministic replay layer (VCR-style cassettes for two model providers) so the full agent path runs offline, identically, in CI and in the public demo.',
      'Instrumented every request with OpenTelemetry GenAI spans, with a collector pipeline that normalizes attributes and redacts prompt and completion content.',
      'Hardened the public edge: prompt allowlist, 16 KiB body cap, per-client rate limit, global concurrency cap, destructive tools removed, fail-closed replay, and a bearer token between the BFFs and the backend.',
      'Built the Next.js customer storefront with an assistant workspace and a server-side BFF that returns only normalized customer data, plus a password-protected operations console with a span waterfall viewer.',
      'Built a second, trace-first Next.js client that shows tool calls, arguments, results, metrics and trace IDs for the same answers.',
      'Wrote a test suite of 49 tests covering the replay matcher, history trimming, determinism, public-mode guards, smoke prompts and telemetry, plus module guides documenting each design decision.',
    ],
    highlights: [
      'Agent runs deterministically offline: same prompt, same answer, no API key',
      'Every answer has an inspectable trace, with content redacted by default',
      'Public edge designed to fail closed, with the residual risks documented',
      'Two frontends, one backend contract: customer lens and engineer lens',
    ],
    services: [
      {
        name: 'argus-ai',
        repo: 'https://github.com/codedsultan/argus-ai',
        description: 'Agent core, shop API, replay cassettes, collector and public edge',
      },
      {
        name: 'argus-frontend',
        repo: 'https://github.com/codedsultan/argus-frontend',
        description: 'Customer storefront, assistant workspace and operations console',
      },
      {
        name: 'argus-agent-web',
        repo: 'https://github.com/codedsultan/argus-agent-web',
        description: 'Trace-first inspector UI for tool calls and trace IDs',
      },
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
    // Captured per docs/project-screenshots.md (scripts/capture-screenshots.mjs).
    cover: {
      src: '/images/projects/xurl-fyi/cover.webp',
      alt: 'xurl.fyi landing page with the headline "Shorten your links. Track every click.", a paste-your-long-URL field with a "Get started free" button, and the first row of feature cards: instant shortening, real analytics, custom domains and link protection',
      width: 1600,
      height: 1000,
    },
    isFeatured: true,
    sortOrder: 4,
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
      'A mind-reading game — gamified from a childhood prediction trick I learned. Players put on a mental performance: correctly guess a number or word someone is secretly thinking of, compete on leaderboards, and challenge friends in real time.',
    fullDescription:
      'InnerMost is a side project born from a prediction trick I learned as a kid — a mathematical and pattern-based technique that lets you reliably guess a number or word someone is thinking of, with no prior knowledge. I gamified it into a live competitive app so others could experience the effect and compete on who could "read minds" most accurately.\n\nThe platform runs two primary game modes. Golden Mind challenges players to guess a hidden number through a structured sequence of questions — the algorithm narrows the answer to a single value regardless of what the subject picks. Golden Eye handles word and concept prediction, using categorical logic to converge on the target through a series of binary splits.\n\nThe backend is built on NestJS with PostgreSQL and Redis. WebSockets power the real-time multiplayer sessions — both players see state updates synchronously as the game progresses. An in-app credit system gates game plays and awards credits for wins, correct predictions, and streaks. A friends system lets players add each other and send direct game challenges. Leaderboards rank players by accuracy, win rate, and credits earned. The Next.js frontend handles auth, game flows, friend management, and the live leaderboard dashboard. The full stack is deployed on AWS.',
    technologies: [
      'Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis',
      'WebSockets', 'AWS',
    ],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://innermost.live/',
    // Captured per docs/project-screenshots.md (scripts/capture-screenshots.mjs).
    cover: {
      src: '/images/projects/innermost/cover.webp',
      alt: 'InnerMost Golden Mind round: "You are a member of Team Gold" above a grid of numbers outlined in gold, red and blue team colours, with a Proceed button; the player bar shows a member account with its credit balance and one player online',
      width: 1600,
      height: 1000,
    },
    isFeatured: true,
    sortOrder: 5,
    year: '2025–present',
    role: 'Creator & Full-Stack Engineer',
    capacity: 'Solo build — personal project',
    responsibilities: [
      'Developed the underlying prediction algorithm and designed both game modes (Golden Mind for numbers, Golden Eye for words/concepts) as structured binary-narrowing sequences.',
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
    isFeatured: false,
    sortOrder: 6,
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
    liveUrlLabel: 'View staging app',
    stagingUrl: null,
    websiteUrl: 'https://crm.xurl.fyi/',
    demoUrl: 'https://demo-crm.xurl.fyi/',
    // Captured per docs/project-screenshots.md (scripts/capture-screenshots.mjs),
    // from a local install seeded with fictional demo data, cropped to ~1.5x.
    cover: {
      src: '/images/projects/veci-crm/cover.webp',
      alt: 'Veci CRM dashboard, close up: the app top bar with the demo workspace and user, then KPI tiles for active projects, open pipeline value ($13,500), won this period ($7,500), win rate (50%), lead conversion rate (33%) and upcoming bookings, quick-action buttons for a new contact, lead, deal or project, and a needs-attention deal list',
      width: 1600,
      height: 1000,
    },
    isFeatured: true,
    sortOrder: 3,
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
      'WriterIX is a multi-tenant SaaS platform for AI-driven content generation. The architecture is domain-driven: pipelines, runs, content, brand, knowledge, sources, destinations, billing, and social each live in their own domain with models, services, selectors, tasks, and tests kept together.\n\nThe AI layer uses a LangGraph pipeline that orchestrates every content run: topic research → outline → section writing → SEO metadata → graphics. The facade pattern keeps LangChain types out of domain code; all AI calls flow through a single entry point. Workspaces bring their own API keys (BYOK) across five providers — Anthropic, OpenAI, Google Gemini, Groq, and OpenRouter — with per-workspace key encryption and a metering layer that tracks token spend per run.\n\nGraphics generation runs in a Node renderer sidecar (Fastify + Satori → resvg → sharp) supporting six template families at four sizes. Knowledge bases are backed by pgvector RAG — workspaces attach documents, RSS feeds, and URLs; the ingestion pipeline chunks, embeds, and retrieves context at generation time. A scheduling layer handles recurring pipeline runs and publishes finished posts to connected destinations.\n\nThe frontend runs on Inertia.js with React and TypeScript. Billing is handled via Stripe with workspace-scoped subscription management. The platform ships as Docker images; the marketing site is a static export deployed separately behind Nginx.',
    technologies: [
      'Python', 'Django', 'Inertia.js', 'React', 'TypeScript',
      'PostgreSQL', 'pgvector', 'Redis', 'Celery', 'LangChain', 'LangGraph',
      'Node.js', 'Fastify', 'Stripe', 'Docker', 'GitHub Actions',
    ],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://app-writerix.xurl.fyi/',
    liveUrlLabel: 'View staging app',
    websiteUrl: 'https://writerix.xurl.fyi/',
    demoUrl: 'https://demo-writerix.xurl.fyi/',
    // Captured per docs/project-screenshots.md (scripts/capture-screenshots.mjs),
    // from a local demo-mode stack (AI calls simulated), cropped to ~1.5x.
    cover: {
      src: '/images/projects/writerix/cover.webp',
      alt: 'WriterIX run detail, close up: the app top bar with the demo workspace and user, the run title "On this day, 10 November in Africa history" marked Needs review, a "Paused for review: final draft" banner, and a progress list of pipeline steps (research, outline, section drafts, editor review) beside a usage panel showing 8,695 tokens with the Claude model and token count for each step',
      width: 1600,
      height: 1000,
    },
    isFeatured: true,
    sortOrder: 2,
    year: '2026',
    role: 'Architect & Full-Stack Engineer',
    capacity: 'Solo build',
    responsibilities: [
      'Architected the domain-driven Django backend — each domain owns its models, services, selectors, tasks, and tests.',
      'Designed the LangGraph AI pipeline for end-to-end content runs: topic research, outline, section writing, SEO metadata, and graphics in a single orchestrated graph.',
      'Built the BYOK system supporting five LLM providers (Anthropic, OpenAI, Google Gemini, Groq, OpenRouter) with per-workspace encrypted key storage and token-spend metering.',
      'Implemented pgvector-backed RAG knowledge bases with ingestion pipelines for documents, RSS feeds, and URLs.',
      'Built the Node renderer sidecar (Fastify + Satori) for graphics generation — six template families at four sizes.',
      'Designed workspace-scoped multi-tenancy with ULID public IDs, review gates in the content editor, and Stripe billing.',
      'Deployed as two independent images: the Django app and a static-export Nginx image for the marketing site.',
    ],
    highlights: [
      'LangGraph pipeline orchestrates full content runs: topic → outline → sections → SEO → graphics',
      'BYOK across 5 providers: Anthropic, OpenAI, Google Gemini, Groq, OpenRouter',
      'pgvector RAG — workspace documents and sources retrieved as context at generation time',
      'Node renderer sidecar for social graphics: 6 template families × 4 sizes',
      'Domain-driven architecture with import-linter enforcing AI facade boundaries',
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
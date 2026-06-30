export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: 'fullstack' | 'backend' | 'platform';
  githubUrl: string | null;
  liveUrl: string | null;
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
      'X-Socials is a full distributed system built across four independent, production-deployed services. The Node.js/Express API is the platform core: multi-database (MongoDB for social content, SQL for users/tokens), JWT auth with refresh token rotation, BullMQ email queue, per-route rate limiting, Prometheus metrics on a dedicated port, OpenTelemetry tracing, and 390+ Vitest tests with coverage gates. The Next.js 16 frontend consumes the API with server-side rendering, authentication flows, and a social feed with cursor pagination. The Laravel 13 + Inertia.js + React admin panel provides a human moderation review queue, an auto-enforcement scheduler, on-demand content analysis, a full audit trail, and a live operational dashboard surfacing pipeline health metrics. The FastAPI AI moderation engine analyses every post and comment for policy violations using a hybrid pipeline: a local detoxify classifier handles roughly 60% of content for free, passing only the ambiguous middle band (scores 0.15–0.80) to an LLM via OpenRouter with automatic failover. Three enforcement paths — real-time webhook, auto-remove scheduler (≥ 95% confidence), and a daily reconciliation sweep for missed items — ensure content violations are caught within seconds of creation. All four services are containerised with Docker and deployed via GitHub Actions CI/CD. The full system reaches staging at x-social.xurl.fyi.',
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
    sortOrder: 1,
    year: '2026',
    role: 'Architect & Full-Stack Engineer',
    capacity: 'Solo build',
    responsibilities: [
      'Designed the full distributed system architecture: four independently deployable services with a shared MySQL database as the integration point between FastAPI and Laravel — no message queue between them.',
      'Built the Node.js/Express social platform API with multi-database routing (MongoDB for posts/comments/likes, SQL for users/tokens/OTPs), modular single-action controllers, service-layer business logic, and a typed BullMQ email queue with exponential backoff.',
      'Implemented JWT auth with refresh token rotation, email verification, OTP flows, and per-route rate limiting (auth: 10/15 min, write: 30/min, API: 100/min).',
      'Instrumented the API with OpenTelemetry tracing, Prometheus metrics on a dedicated port (:9464), and structured Winston logging — enabling Grafana dashboards for production observability.',
      'Achieved 390+ Vitest tests with 65% statement/function/line coverage gates; all service tests use repo fakes with no real database required.',
      'Built the FastAPI hybrid AI moderation engine: detoxify local classifier as the pre-filter, escalating only ambiguous content (scores 0.15–0.80) to OpenRouter LLMs with automatic multi-provider failover, cutting paid API calls by ~60%.',
      'Implemented three enforcement paths: real-time webhook (202 Accepted in microseconds, async processing), auto-remove scheduler at ≥ 95% confidence within 5 minutes, and a daily reconciliation sweep for items missed during downtime.',
      'Built the Laravel 13 admin panel with HMAC-signed API calls to the Node.js service, a full human review queue, on-demand per-post content analysis with model escalation, and a complete admin_action_logs audit trail.',
      'Containerised all four services with Docker and deployed via GitHub Actions CI/CD pipelines with per-environment promotion gates.',
    ],
    highlights: [
      'Four independently deployable services with clean service boundaries and no shared code',
      '~60% of content resolved free by detoxify — LLM costs scale sub-linearly with platform growth',
      'Three-path enforcement: real-time, auto-remove, and daily reconciliation — content violations actioned within seconds',
      'Full observability stack: Prometheus metrics, OpenTelemetry, Grafana dashboards, structured logging',
      '390+ automated tests with coverage gates across the API surface',
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
    slug: 'writerix',
    title: 'WriterIX',
    description:
      'Multi-tenant AI-powered blog generation SaaS — from topic ideation to published post, fully automated.',
    fullDescription:
      'WriterIX is a production SaaS platform that lets tenants generate, schedule, and publish SEO-optimised blog content using AI. The Laravel backend handles multi-tenancy, billing, and a domain-driven namespace architecture. AI generation is handled by a dedicated FastAPI + Celery microservice (WriterIX AI Pipeline) which orchestrates LLM calls, image generation, and featured-image selection, communicating results back to Laravel via webhooks. Real-time generation progress streams to the React frontend through Laravel Reverb WebSockets. The platform includes a WordPress plugin and theme — complete with an ad-management system and a WooCommerce cart — plus custom stepper controls for the publishing flow.',
    technologies: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'MySQL', 'Redis', 'Laravel Horizon', 'Laravel Reverb', 'Docker', 'Stripe', 'WordPress', 'GitHub Actions'],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://writerix.xurl.fyi/',
    isFeatured: true,
    sortOrder: 2,
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
    sortOrder: 3,
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
    isFeatured: true,
    sortOrder: 4,
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
      'A Go-based image-rendering microservice that generates visually rich "This Day in History" social graphics for WriterIX. The service fetches historical events from public sources, scores event significance, and composites multi-layer images with event text, year watermarks, and headline kickers. Earlier work fixed a User-Agent omission causing CDN 403 errors, replaced silent placeholder fallbacks with proper error handling, implemented significance scoring for multi-event selection, and resolved goroutine leaks from missing context propagation.',
    technologies: ['Go', 'Redis', 'Docker'],
    category: 'backend',
    githubUrl: null,
    liveUrl: null,
    isFeatured: false,
    sortOrder: 5,
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
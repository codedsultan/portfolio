export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: 'fullstack' | 'backend' | 'wordpress';
  githubUrl: string | null;
  liveUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
  year: string;
  role: string;
  capacity: string;
  responsibilities: string[];
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: 'writerix',
    title: 'WriterIX',
    description:
      'Multi-tenant AI-powered blog generation SaaS — from topic ideation to published post, fully automated.',
    fullDescription:
      'WriterIX is a production SaaS platform that lets tenants generate, schedule, and publish SEO-optimised blog content using AI. The Laravel backend handles multi-tenancy, billing, and a domain-driven namespace architecture. AI generation is handled by a dedicated FastAPI + Celery microservice (see: WriterIX AI Pipeline) which orchestrates LLM calls, image generation, and featured-image selection, communicating results back to Laravel via webhooks. Real-time generation progress streams to the React frontend through Laravel Reverb WebSockets. The platform includes a WordPress plugin and theme — complete with an ad-management system and a WooCommerce cart — plus custom stepper controls for the publishing flow.',
    technologies: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'MySQL', 'Redis', 'Laravel Horizon', 'Laravel Reverb', 'Docker', 'Stripe', 'WordPress', 'GitHub Actions'],
    category: 'fullstack',
    githubUrl: null,
    liveUrl: 'https://writerix.xurl.fyi/',
    isFeatured: true,
    sortOrder: 1,
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
      'The WriterIX AI Pipeline is a standalone FastAPI microservice that handles all AI-driven content generation for the WriterIX platform. It exposes HMAC-secured endpoints that trigger Celery task chains for blog post generation: topic research, outline creation, section writing, SEO metadata, and featured-image selection. LLM calls use Gemini as the primary model with Groq as a fallback, with structured Pydantic output parsing for reliable results. The service communicates generation events back to Laravel via webhook callbacks, with each pipeline step broadcasting a typed event so the frontend can render live progress. The codebase runs with a clean type-checker, full lint compliance, and a comprehensive Pytest suite covering async/sync task flows.',
    technologies: ['Python', 'FastAPI', 'Celery', 'Pydantic', 'Docker', 'Redis', 'Gemini API', 'Groq API', 'Pytest'],
    category: 'backend',
    githubUrl: null,
    liveUrl: null,
    isFeatured: false,
    sortOrder: 2,
    year: '2026',
    role: 'Backend Engineer',
    capacity: 'Internal service — WriterIX',
    responsibilities: [
      'Designed the Celery task-chain architecture for multi-step blog generation',
      'Integrated Gemini (primary) and Groq (fallback) LLMs with structured output parsing',
      'Implemented HMAC key verification and secure webhook callbacks to Laravel',
      'Resolved async/sync mismatches and Celery response assertions across the test suite',
      'Achieved a clean type-checker run with full lint compliance across all service files',
    ],
    highlights: [
      'Multi-step LLM pipeline with Gemini/Groq failover',
      'Typed event broadcasting for live progress in the dashboard',
      'Comprehensive automated test coverage',
    ],
  },
  // {
  //   slug: 'portfolioos',
  //   title: 'PortfolioOS',
  //   description:
  //     'SaaS portfolio builder for developers — custom domains, live public profiles, and WriterIX post sync.',
  //   fullDescription:
  //     'PortfolioOS is a multi-user SaaS that lets developers build and host professional portfolios with custom domain support. Built on Laravel and Inertia.js/React, it features a guided four-step creation wizard (Profile → Social Links → Appearance → Go Live), a mobile-responsive dashboard, and a command palette. Portfolios support custom CNAME domains with on-demand TLS via Caddy. A push-based, HMAC-signed webhook integration with WriterIX surfaces AI-generated blog posts directly on a developer\u2019s public portfolio page. This very site began as a page inside that platform — rebuilt here as a focused, static personal site.',
  //   technologies: ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'MySQL', 'Redis', 'Stripe', 'Caddy', 'Tailwind CSS'],
  //   category: 'fullstack',
  //   githubUrl: null,
  //   liveUrl: 'https://portfolioos.xurl.fyi/',
  //   isFeatured: true,
  //   sortOrder: 3,
  //   year: '2026',
  //   role: 'Founder & Lead Engineer',
  //   capacity: 'Solo build',
  //   responsibilities: [
  //     'Built a four-step portfolio creation wizard with appearance and plan controls',
  //     'Implemented custom domain support with CNAME verification and on-demand TLS',
  //     'Designed a push-based, HMAC-signed webhook integration consuming WriterIX blog posts',
  //     'Delivered a mobile-responsive dashboard with command palette and activity feed',
  //     'Integrated billing with per-plan feature gating',
  //   ],
  //   highlights: [
  //     'Custom domain support with automated TLS provisioning',
  //     'Live blog post syndication from WriterIX to the public portfolio',
  //     'Guided wizard UX reducing time-to-live to under five minutes',
  //   ],
  // },
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
    role: 'Full-stack Engineer',
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
      'A Go-based image-rendering microservice that generates visually rich "This Day in History" social graphics for WriterIX. The service fetches historical events from public sources, scores event significance, and composites multi-layer images with event text, year watermarks, and headline kickers. Development involved fixing a User-Agent omission that caused CDN 403 errors, replacing silent placeholder fallbacks with proper error handling, implementing significance scoring for multi-event selection, and switching image scaling to a higher-quality algorithm. Earlier passes also fixed a compile-breaking config mismatch, goroutine leaks from missing context propagation, and a Redis client leak in the health-check endpoint.',
    technologies: ['Go', 'Redis', 'Docker'],
    category: 'backend',
    githubUrl: null,
    liveUrl: null,
    isFeatured: false,
    sortOrder: 5,
    year: '2026',
    role: 'Backend Engineer',
    capacity: 'Internal service',
    responsibilities: [
      'Designed the multi-layer image-composition pipeline for social graphics',
      'Implemented significance scoring for historical event selection',
      'Fixed concurrency bugs: context-propagation leaks and Redis client lifecycle',
      'Resolved CDN request failures via correct request headers',
      'Replaced low-quality scaling and silent placeholder fallbacks with proper handling',
    ],
    highlights: [
      'Generates shareable social graphics at scale',
      'Significance-scored multi-event representation',
      'Integrated into the WriterIX automated content pipeline',
    ],
  },
  // {
  //   slug: 'veci-technologies-website',
  //   title: 'Veci Technologies Website',
  //   description:
  //     'Custom WordPress theme and marketing site for Veci Technologies, featuring the Pegasus Suite CRM/ERP product launch.',
  //   fullDescription:
  //     'Designed and built the Veci Technologies company website on a fully custom WordPress theme using Tailwind CSS. The site communicates the company\u2019s IT solutions offering — software development, UI/UX, cloud, and consulting — and serves as the primary conversion surface for the Pegasus Suite (CRM + ERP bundle). The design language uses a dark base with dot-grid hero sections, scroll-reveal animations, and frosted-glass panels. Dedicated Pegasus CRM and ERP landing pages articulate the product modules, pricing, and onboarding path.',
  //   technologies: ['WordPress', 'Tailwind CSS', 'PHP', 'JavaScript', 'Figma'],
  //   category: 'wordpress',
  //   githubUrl: null,
  //   liveUrl: 'https://vecitechnologies.net/',
  //   isFeatured: false,
  //   sortOrder: 6,
  //   year: '2026',
  //   role: 'Designer & Developer',
  //   capacity: 'In-house build',
  //   responsibilities: [
  //     'Designed and built a fully custom WordPress theme with Tailwind CSS',
  //     'Created Pegasus Suite product landing pages (CRM and ERP)',
  //     'Implemented scroll-reveal animations and frosted-glass UI patterns',
  //     'Optimised for performance, SEO, and conversion',
  //   ],
  //   highlights: [
  //     'Distinct dark design language with a premium feel',
  //     'Pegasus Suite product launch showcase',
  //     'Scroll-reveal and interactive UI across all sections',
  //   ],
  // },
  // {
  //   slug: 'sdep-website',
  //   title: 'SDEP Website',
  //   description:
  //     'Professional WordPress website for SDEP — designed and delivered as a client engagement through Veci Technologies.',
  //   fullDescription:
  //     'Built and delivered the SDEP website as a client project under the Veci Technologies umbrella. The engagement covered discovery, design, WordPress theme development, content structure, and deployment. The site was tailored to SDEP\u2019s organisational identity and communication goals, with a clean, accessible layout and an SEO-friendly structure.',
  //   technologies: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
  //   category: 'wordpress',
  //   githubUrl: null,
  //   liveUrl: 'https://www.sdep.info/',
  //   isFeatured: false,
  //   sortOrder: 7,
  //   year: '2025',
  //   role: 'WordPress Developer',
  //   capacity: 'Client project',
  //   responsibilities: [
  //     'Led discovery, design, and WordPress theme development',
  //     'Structured content and navigation for clarity and SEO',
  //     'Deployed and handed over the site with documentation',
  //   ],
  //   highlights: [
  //     'Delivered on time as a full-scope client engagement',
  //     'Clean, accessible layout tailored to the client\u2019s brand',
  //   ],
  // },
  // {
  //   slug: 'infinibrium-global-website',
  //   title: 'Infinibrium Global Website',
  //   description:
  //     'Corporate WordPress website for Infinibrium Global — designed and developed as a client project.',
  //   fullDescription:
  //     'Designed and developed the corporate website for Infinibrium Global, a client project delivered through Veci Technologies. The engagement included brand-aligned design, custom WordPress theme development, and deployment. The site presents Infinibrium\u2019s services and value proposition with a professional, modern layout built for performance and discoverability.',
  //   technologies: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
  //   category: 'wordpress',
  //   githubUrl: null,
  //   liveUrl: 'https://www.infinibriumglobal.com/',
  //   isFeatured: false,
  //   sortOrder: 8,
  //   year: '2025',
  //   role: 'WordPress Developer',
  //   capacity: 'Client project',
  //   responsibilities: [
  //     'Designed a modern, brand-aligned WordPress theme',
  //     'Structured service pages and corporate messaging',
  //     'Deployed with performance and SEO optimisations',
  //   ],
  //   highlights: [
  //     'Professional corporate presence delivered end to end',
  //     'Brand-consistent design aligned with client identity',
  //   ],
  // },
  // {
  //   slug: 'progress-nigeria-website',
  //   title: 'Progress Nigeria Website',
  //   description:
  //     'News and editorial WordPress site for Progress Nigeria — a client engagement focused on content delivery and performance.',
  //   fullDescription:
  //     'Built the Progress Nigeria website as a client project, focusing on content-heavy news and editorial delivery on WordPress. The site required a clean reading experience, efficient categorisation, and a structure that supports high content throughput. Theme development was tailored to the editorial workflow, with SEO and page-speed optimisations ensuring visibility and fast load times for a broad audience.',
  //   technologies: ['WordPress', 'PHP', 'CSS', 'JavaScript'],
  //   category: 'wordpress',
  //   githubUrl: null,
  //   liveUrl: 'https://www.progressnigeria.com/',
  //   isFeatured: false,
  //   sortOrder: 9,
  //   year: '2025',
  //   role: 'WordPress Developer',
  //   capacity: 'Client project',
  //   responsibilities: [
  //     'Developed a content-optimised WordPress theme for news and editorial',
  //     'Structured categories, tags, and archives for navigability',
  //     'Optimised for SEO and page speed',
  //   ],
  //   highlights: [
  //     'Supports high-volume editorial content publishing',
  //     'Fast-loading, SEO-friendly structure for a broad audience',
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
  { value: 'fullstack', label: 'Full-stack' },
  { value: 'backend', label: 'Backend' },
  { value: 'wordpress', label: 'WordPress' },
];

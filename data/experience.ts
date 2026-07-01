export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  employmentType: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  summary: string;
  achievements: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Tech1M',
    role: 'Senior Software Engineer (Engineering Lead)',
    location: 'London, UK · Remote',
    employmentType: 'Full-time',
    startDate: '2023-12',
    endDate: null,
    isCurrent: true,
    summary:
      'Engineering lead across three concurrent products — 1M Elite, AI Recruiter, and 1M Aptitude — establishing architecture standards, security practices, and system design direction across three aligned product teams.',
    achievements: [
      'Built the 1M Elite marketplace end-to-end from zero: talents, employer and admin applications, smart matching, onboarding flows, and workforce management for contracts and payments — delivering a production-ready multi-jurisdiction contractor hiring platform.',
      'Engineered the AOR compliance layer for cross-border hiring covering tax obligations, contract generation, KYC/AML screening, and regulatory reporting; eliminated manual compliance reviews at scale.',
      'Designed an idempotent contractor wallet and payment pipeline covering balance management, collections, transfers, global payouts, webhook verification, and audit trails; achieved zero duplicate disbursement incidents in production.',
      'Built an automated expense reimbursement workflow with submissions, approvals, policy enforcement, and payout disbursement — removing processing delays across the entire contractor network.',
      'Contributed job brief ingestion, candidate sourcing and scoring, scheduling automation, career pages, and HR/ATS integrations to the AI Recruiter engine, enabling end-to-end automated sourcing pipelines.',
      'Architected containerised microservices with Docker and CI/CD pipelines with GitHub Actions and Ansible; onboarded 5 engineers to a fully automated workflow and cut cross-environment deployment variance.',
      'Owned AWS production deployments and built Grafana monitoring dashboards; reduced mean time to recovery and improved production reliability across services.',
      'Drove TDD adoption through structured code reviews and pair programming; reduced regression incidents and raised code quality standards across releases.',
    ],
  },
  {
    company: 'Tech1M',
    role: 'Principal Backend Engineer',
    location: 'London, UK · Remote',
    employmentType: 'Full-time',
    startDate: '2022-10',
    endDate: '2023-11',
    isCurrent: false,
    summary:
      "Designed the initial backend architecture for Tech1M from scratch, building a fault-tolerant foundation in Node.js (NestJS), Laravel, and FastAPI that supported the platform's growth to production scale.",
    achievements: [
      'Built core REST APIs in Node.js (NestJS), Laravel, and FastAPI, including serverless functions on AWS Lambda for high-volume transactions; delivered a fault-tolerant, secure foundation that took the platform to production scale.',
      "Built payment gateway integrations and SSO/auth provider connections to enable global payments, compliance workflows, geolocation, and social auth — unblocking the platform's international expansion.",
      'Designed and optimised MySQL and PostgreSQL schemas with targeted indexing and query tuning; pre-empted early-stage scalability issues and set the platform query performance standard.',
      'Introduced TDD and structured code review practices in the absence of engineering standards; reduced regressions and improved delivery velocity across the backend team.',
      'Mentored junior developers through hands-on code reviews and pair programming; improved team-wide code quality and shortened review cycle times.',
    ],
  },
  {
    company: 'Veci Technologies',
    role: 'Freelance Software Engineer',
    location: 'Remote',
    employmentType: 'Freelance',
    startDate: '2024-01',
    endDate: null,
    isCurrent: true,
    summary:
      'Designing and building a full-featured, multi-tenant CRM from scratch for Veci Technologies — a domain-driven Laravel 13 + Inertia + React platform with Go microservices, currently in active use and ongoing maintenance.',
    achievements: [
      'Architected a multi-tenant CRM monorepo from the ground up: Laravel 13 (domain-driven, 20+ domains), Inertia.js v3 + React 19 + TypeScript frontend, PostgreSQL, Redis, and Laravel Horizon for background job orchestration.',
      'Designed domain-driven architecture across 20+ bounded contexts (Leads, Contacts, Organisations, Deals, Pipelines, Activities, Quotes, Invoices, Automations, and more) using Actions, Queries, Policies, and Events per domain.',
      'Built a workspace-scoped multi-tenancy model using a BelongsToWorkspace trait and global WorkspaceScope, with ULID public IDs exposed to clients and integer PKs kept internal.',
      'Implemented a five-role Spatie permissions system (per-workspace) with Laravel Fortify authentication and full audit logging.',
      'Built Go microservices for CSV/XLSX contact import (importer service) and email/reply ingestion (ingestion service), integrated into the Laravel queue via named queue channels.',
      'Maintained 5 named queue channels (default, emails, imports, notifications, automations) with Laravel Horizon dashboards for real-time queue monitoring.',
      'Set up a full Docker Compose environment (PHP-FPM, Nginx, PostgreSQL, Redis, Mailpit) with Pest v4 test suite and Larastan level-6 static analysis enforced in CI.',
      'Deployed and currently maintaining both staging (vecicrm.xurl.fyi) and production (crm.vecitechnologies.net) environments.',
    ],
  },
  {
    company: 'Tedbree',
    role: 'Full-Stack Engineer',
    location: 'London, UK',
    employmentType: 'Full-time',
    startDate: '2021-04',
    endDate: '2022-10',
    isCurrent: false,
    summary:
      'Built REST APIs, backend services, admin dashboards, and CRM systems across multiple concurrent client projects in Laravel, Node.js, React, and Vue.js — meeting all delivery targets across the portfolio.',
    achievements: [
      'Built REST APIs, backend services, internal tools, admin dashboards, and CRM systems in Laravel, Node.js, Next.js Inertia, React, and Vue.js across concurrent client projects with tight delivery timelines.',
      'Integrated payment gateways, geolocation APIs, and auth providers; standardised integration patterns and measurably improved response times across client projects.',
      'Improved SQL/NoSQL query performance through optimisation and indexing across projects where integrations were inconsistent.',
      'Collaborated directly with product and business stakeholders to translate loosely defined requirements into production-ready solutions; reduced scope creep and shortened feedback cycles.',
    ],
  },
  {
    company: 'Veci Technologies',
    role: 'Web Developer',
    location: 'Ibadan, Nigeria',
    employmentType: 'Full-time',
    startDate: '2017-09',
    endDate: '2021-03',
    isCurrent: false,
    summary:
      'Delivered web applications in Laravel, PHP, MySQL, and JavaScript while managing relational database design and Linux hosting environments across diverse client verticals.',
    achievements: [
      'Delivered web applications in Laravel, PHP, MySQL, and JavaScript while managing relational database design and Linux hosting environments across diverse client verticals.',
      'Developed custom WordPress themes and plugins; reduced client-reported bugs and improved site stability across the portfolio.',
    ],
  },
];
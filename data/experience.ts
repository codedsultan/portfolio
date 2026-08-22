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
    company: 'Tedbree',
    role: 'Software Engineer (Engineering Lead)',
    location: 'London, UK · Remote',
    employmentType: 'Full-time',
    startDate: '2022-10',
    endDate: null,
    isCurrent: true,
    summary:
      'Engineering lead across 15+ concurrent client projects — directing system architecture, full-stack delivery, AI engineering, and cloud infrastructure while setting company-wide technical standards.',
    achievements: [
      'Led system architecture across 15+ concurrent client projects, tailoring stack selections (FastAPI, Django, Laravel, TypeScript, Node.js, NestJS) to deliver bespoke SaaS and enterprise applications.',
      'Architected production RAG pipelines and stateful AI agents using Python, LangChain, LangGraph, LLMs, and pgvector with Pydantic validation to power document workflows and semantic search.',
      'Engineered scalable frontend design systems and reusable UI libraries using TypeScript, React, Next.js, and Tailwind CSS, standardising UI/UX patterns and accelerating rollout times.',
      'Shipped 15+ production applications with zero critical bugs — leading development across TypeScript, React, Next.js, Django, Laravel, NestJS, and FastAPI.',
      'Engineered high-concurrency RESTful APIs and microservices, optimising PostgreSQL schema models and pgvector indexing to accelerate data retrieval across active workspaces.',
      'Designed asynchronous architectures using Kafka, RabbitMQ, AWS SQS, and AWS SNS for reliable job queuing, pub/sub messaging, and background task execution across microservices.',
      'Provisioned environments using Terraform (IaC), Ansible, and Docker; integrated AWS Lambda, S3, CloudWatch, and GitHub Actions for automated CI/CD pipelines.',
      'Partnered with UI/UX and stakeholders to translate goals into technical specs, acceptance criteria, and OpenAPI schemas while setting company-wide architectural guardrails.',
      'Mentored cross-functional teams through code reviews and design reviews, elevating quality standards, boosting sprint velocity, and reducing review turnaround times.',
    ],
  },
  {
    company: "Veci Technologies",
    role: "Freelance AI Engineer & Systems Architect",
    location: "Remote",
    employmentType: "Freelance",
    startDate: "2026-01",
    endDate: null,
    isCurrent: true,
    summary: "Modernizing legacy CRM architecture into a full-featured, multi-tenant platform for Veci Technologies — domain-driven Django + React 19 platform with Go microservices, integrated AI features, live in production and actively maintained.",
    achievements: [
      "Refactored legacy monolithic CRM architecture into a modern multi-tenant platform, migrating core services to Django and React 19 while integrating intelligent, context-aware AI capabilities.",
      "Engineered production AI pipelines and RAG workflows using Django, React 19, LangChain, and pgvector with Pydantic validation to power automated lead scoring, smart document parsing, and semantic search.",
      "Architected a multi-tenant monorepo across 20+ bounded contexts (Leads, Deals, Invoices, Automations) using Django, TypeScript, React 19, PostgreSQL, and Redis with workspace-scoped data isolation.",
      "Built high-performance Go microservices for bulk CSV/XLSX data ingestion, email/reply parsing, and asynchronous job processing, integrated directly into distributed queue channels.",
      "Set up Docker Compose infrastructure with automated test suites and static analysis enforced in CI/CD pipelines via GitHub Actions.",
      "Deployed and actively maintains production and staging environments with high availability and automated monitoring."
    ]
  },
  {
    company: 'Tedbree',
    role: 'Full Stack Engineer',
    location: 'London, UK',
    employmentType: 'Full-time',
    startDate: '2021-04',
    endDate: '2022-10',
    isCurrent: false,
    summary:
      'Built REST APIs, backend services, admin dashboards, and CRM/ERP systems across multiple concurrent client projects in Laravel, Node.js, React, and Vue.js.',
    achievements: [
      'Developed full-stack internal tools, admin dashboards, and custom CRM and ERP systems across multiple concurrent client projects.',
      'Built and maintained REST APIs and backend services using Django, Laravel, Node.js, and NestJS.',
      'Built frontend applications with Next.js, Inertia.js, React, and Vue.js.',
      'Integrated payment gateways, geolocation APIs, and auth providers across client projects.',
      'Designed and implemented database schemas using PostgreSQL, MySQL, and MongoDB; improved performance through query optimisation and indexing.',
      'Collaborated directly with product and business stakeholders to translate requirements into production-ready solutions.',
    ],
  },
  {
    company: 'Veci Technologies',
    role: 'Full Stack Engineer',
    location: 'Ibadan, Nigeria',
    employmentType: 'Full-time',
    startDate: '2017-09',
    endDate: '2021-03',
    isCurrent: false,
    summary:
      'Delivered web applications, REST APIs, admin dashboards, and CRM systems while managing relational database design and Linux hosting environments across diverse client verticals.',
    achievements: [
      'Delivered dynamic web applications using Laravel, PHP, MySQL, and JavaScript; designed and implemented relational databases and managed Linux hosting environments.',
      'Built and maintained REST APIs and backend services using Laravel and Node.js.',
      'Developed internal tools, admin dashboards, and CRM systems with Laravel, Inertia, React, and Vue.js.',
      'Integrated payment gateways, geolocation APIs, and auth providers; improved SQL/NoSQL performance through query optimisation and indexing.',
      'Developed custom WordPress themes and plugins; resolved complex compatibility and performance issues across client projects.',
    ],
  },
];
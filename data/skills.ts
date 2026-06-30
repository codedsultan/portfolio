export interface SkillGroup {
  category: string;
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'languages',
    label: 'Languages',
    skills: ['TypeScript', 'JavaScript (ES6+)', 'PHP', 'Python', 'Go'],
  },
  {
    category: 'frontend',
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Vue.js', 'Inertia.js', 'HTML5 & CSS3'],
  },
  {
    category: 'backend',
    label: 'Frameworks',
    skills: ['Node.js', 'NestJS', 'Fastify', 'Laravel', 'FastAPI', 'Django'],
  },
  {
    category: 'architecture',
    label: 'Architecture',
    skills: ['Event-Driven Systems', 'Microservices', 'REST API', 'GraphQL', 'RabbitMQ', 'Kafka', 'SQS'],
  },
  {
    category: 'databases',
    label: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Firebase'],
  },
  {
    category: 'devops',
    label: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3, RDS, Lambda)', 'GCP', 'Docker', 'GitHub Actions', 'GitLab CI', 'Ansible'],
  },
  {
    category: 'observability',
    label: 'Observability',
    skills: ['Grafana', 'System Monitoring', 'Production Dashboards'],
  },
];

export interface EngineeringPractice {
  title: string;
}

export const engineeringPractices: EngineeringPractice[] = [
  { title: 'System Design & Architecture' },
  { title: 'Event-Driven & Microservices' },
  { title: 'Test-Driven Development (TDD)' },
  { title: 'Security Best Practices' },
  { title: 'Agile / Scrum Delivery' },
  { title: 'CI/CD & DevOps Pipelines' },
  { title: 'Observability & Monitoring' },
  { title: 'Technical Mentorship & Code Review' },
  { title: 'Production Reliability Engineering' },
];

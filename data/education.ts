export interface EducationItem {
  school: string;
  program: string;
  date: string;
}

export interface CertificationItem {
  issuer: string;
  name: string;
  date: string;
}

export const education: EducationItem[] = [
  {
    school: 'Osun State University, Osogbo, Nigeria',
    program: 'Bachelor of Engineering (B.Eng.) in Civil Engineering',
    date: 'September 2015',
  },
];

export const certifications: CertificationItem[] = [
  {
    issuer: 'Project Management Institute',
    name: 'Project Management Professional (PMP)',
    date: 'May 2026',
  },
  {
    issuer: 'The Chartered Institute of IT (BCS), London, UK',
    name: 'Higher Education Qualification (HEQ) in IT',
    date: 'April 2022',
  },
];

export interface OpenSourceRepo {
  label: string;
  url: string;
}

export interface OpenSourceContribution {
  project: string;
  repos: OpenSourceRepo[];
  website: string;
  tech: string;
  summary: string;
  date: string;
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    project: 'Goravel Framework & Ecosystem',
    website: 'https://goravel.dev',
    repos: [
      { label: 'goravel/framework', url: 'https://github.com/goravel/framework' },
      { label: 'goravel/slack', url: 'https://github.com/goravel/slack' },
    ],
    tech: 'Go',
    summary:
      'Contributed core framework features, notification channels, and architectural enhancements to the open-source Go framework designed to recreate the Laravel developer experience in Go. Also authored and maintains the Goravel Slack Driver — a driver package enabling seamless Slack notification and webhook integrations for the Goravel ecosystem.',
    date: '2026–present',
  },
];
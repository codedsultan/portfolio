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
    program: 'Bachelor of Engineering (B.Eng.)',
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

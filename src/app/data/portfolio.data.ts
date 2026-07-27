export interface Skill { name: string; level: number; }

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  image: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
  accent: string;
  image: string;
}

export interface OrbitCard { label: string; ring: number; }

export const PROFILE = {
  name: 'Nathaniel Sims',
  title: 'AI Agent & Angular Expert',
  subtitle: 'Azure | Healthcare | FinTech',
  rate: '$70/hr',
  availability: 'Available for Enterprise Projects',
  email: 'nathaniel.sims@example.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export const STATS = [
  { label: 'Years Experience', value: 20, suffix: '+' },
  { label: 'Enterprise Projects', value: 150, suffix: '+' },
  { label: 'Industries Served', value: 6, suffix: '' },
  { label: 'Cloud Architectures', value: 40, suffix: '+' },
];

export const SKILLS: Skill[] = [
  { name: 'Angular', level: 95 },
  { name: 'Azure', level: 95 },
  { name: '.NET', level: 98 },
  { name: 'RxJS', level: 92 },
  { name: 'TailwindCSS', level: 95 },
  { name: 'TypeScript', level: 96 },
  { name: 'Power BI', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 85 },
];

export const ORBIT_CARDS: OrbitCard[] = [
  { label: 'Angular', ring: 0 },
  { label: 'TypeScript', ring: 0 },
  { label: 'RxJS', ring: 0 },
  { label: 'Azure', ring: 0 },
  { label: 'ASP.NET Core', ring: 1 },
  { label: 'C#', ring: 1 },
  { label: 'AI Agents', ring: 1 },
  { label: 'Power BI', ring: 1 },
  { label: 'TailwindCSS', ring: 2 },
  { label: 'Ionic', ring: 2 },
  { label: 'Azure OpenAI', ring: 2 },
  { label: 'PostgreSQL', ring: 2 },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'DXC Technology',
    role: 'Cloud AI Solutions Architect',
    period: 'March 2018 – Present',
    summary:
      'Lead architect for enterprise Azure + Angular platforms across healthcare and FinTech, designing AI-augmented microservices and high-throughput frontends.',
    highlights: [
      'Architected Angular + Azure OpenAI agent platform serving 2M+ monthly users',
      'Reduced frontend bundle size 38% via standalone components & lazy loading',
      'Established design system adopted across 12 enterprise product teams',
    ],
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    company: 'Presbyterian Healthcare Services',
    role: 'Senior Full Stack Developer',
    period: 'June 2012 – February 2018',
    summary:
      'Built HIPAA-compliant patient portals and clinical analytics dashboards using Angular and .NET, integrating FHIR data and Power BI reporting.',
    highlights: [
      'Shipped patient portal used by 600k+ members',
      'Integrated FHIR APIs with real-time clinical event streams',
      'Cut report generation time from minutes to seconds with cached aggregates',
    ],
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    company: 'Sandia National Laboratories',
    role: 'Software Developer',
    period: 'August 2005 – May 2012',
    summary:
      'Developed secure data-intensive .NET applications and visualization tooling for national-security research programs.',
    highlights: [
      'Built simulation visualization tools for research scientists',
      'Hardened applications to DOE security standards',
      'Introduced automated testing across the team',
    ],
    image: 'https://images.pexels.com/photos/2280570/pexels-photo-2280570.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Healthcare Platform',
    category: 'Healthcare',
    description:
      'HIPAA-compliant patient engagement platform with Angular SSR, FHIR integration, and real-time clinical event streams.',
    tech: ['Angular', 'Azure', '.NET', 'FHIR', 'SignalR'],
    accent: '#38bdf8',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Enterprise CRM',
    category: 'SaaS',
    description:
      'Multi-tenant enterprise CRM with modular Angular architecture, role-based access, and Power BI embedded analytics.',
    tech: ['Angular', 'ASP.NET Core', 'PostgreSQL', 'Power BI'],
    accent: '#7c5cff',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Azure AI Agent',
    category: 'AI',
    description:
      'Conversational AI agent using Azure OpenAI, RAG over enterprise documents, and an Angular chat surface with streaming responses.',
    tech: ['Azure OpenAI', 'Angular', 'LangChain', 'Cognitive Search'],
    accent: '#34d399',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Financial Dashboard',
    category: 'FinTech',
    description:
      'Real-time financial analytics dashboard with sub-second updates, ApexCharts visualizations, and audit-grade logging.',
    tech: ['Angular', 'RxJS', 'WebSockets', 'SQL Server'],
    accent: '#fbbf24',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Power BI Analytics',
    category: 'Analytics',
    description:
      'Embedded Power BI analytics suite with custom Angular wrappers, row-level security, and automated dataset refresh orchestration.',
    tech: ['Power BI', 'Angular', 'Azure Functions', 'Azure SQL'],
    accent: '#f87171',
    image: 'https://images.pexels.com/photos/590059/pexels-photo-590059.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    title: 'Document AI',
    category: 'AI',
    description:
      'Document intelligence pipeline extracting structured data from unstructured contracts using Azure Document Intelligence and AI agents.',
    tech: ['Azure Doc Intel', 'Azure OpenAI', 'Python', 'Angular'],
    accent: '#9b86ff',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export const AI_SOLUTIONS = [
  { title: 'Azure OpenAI', desc: 'Production GPT-4o deployments with responsible AI guardrails and streaming.', image: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'AI Agents', desc: 'Tool-using agents orchestrated for enterprise workflows and autonomous tasks.', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'RAG', desc: 'Retrieval-augmented generation over private knowledge bases with citations.', image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'LangChain', desc: 'Composable chains and agent runtimes integrated with .NET and Angular.', image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Document Intelligence', desc: 'OCR + layout-aware extraction for contracts, claims, and clinical docs.', image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Automation', desc: 'End-to-end automation pipelines replacing manual back-office operations.', image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Power BI AI', desc: 'AI visuals and natural-language Q&A embedded in Power BI reports.', image: 'https://images.pexels.com/photos/590059/pexels-photo-590059.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Semantic Search', desc: 'Vector search with Cognitive Search + embeddings for enterprise corpora.', image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export const CERTIFICATIONS = [
  { name: 'Azure Solutions Architect', issuer: 'Microsoft' },
  { name: 'Azure AI Engineer', issuer: 'Microsoft' },
  { name: '.NET Developer', issuer: 'Microsoft' },
  { name: 'Angular Certified', issuer: 'Angular' },
  { name: 'Power BI Data Analyst', issuer: 'Microsoft' },
];

export const EDUCATION = [
  { school: 'University of New Mexico', degree: 'B.S. Information Technology' },
  { school: 'Central New Mexico Community College', degree: 'A.A.S. Computer Information Systems' },
];

export const ARCHITECTURE_FLOW = [
  'Microservices',
  'Azure',
  'API Gateway',
  'Angular Frontend',
  'Authentication',
  'Databases',
  'AI Services',
];

export const CLOUD_FLOW = [
  'Azure',
  'API Management',
  'App Services',
  'Functions',
  'Azure SQL',
  'Storage',
  'OpenAI',
  'Angular Frontend',
];

export const CODE_QUALITY = [
  'Standalone Components', 'Signals', 'RxJS', 'SSR', 'SEO', 'Accessibility',
  'Lazy Loading', 'Performance', 'State Management', 'Dependency Injection', 'Testing',
];

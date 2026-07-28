export interface Skill { name: string; level: number; image: string; accent: string; }

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
  repo: string;
}

export interface OrbitCard { label: string; ring: number; color: string; icon: string; }

export const PROFILE = {
  name: 'Nathaniel Sims',
  title: 'AI Agent & Angular Expert',
  subtitle: 'Azure | Healthcare | FinTech',
  rate: '$70/hr',
  availability: 'Available for Enterprise Projects',
  github: 'https://github.com/nathanielsims45',
  githubHandle: 'nathanielsims45',
  location: 'Albuquerque, New Mexico · Remote worldwide',
  timezone: 'UTC−7 (MST) · Overlaps US + EU mornings',
  image: 'assets/me.webp',
};

export const STATS = [
  { label: 'Years Experience', value: 20, suffix: '+' },
  { label: 'Enterprise Projects', value: 150, suffix: '+' },
  { label: 'Industries Served', value: 6, suffix: '' },
  { label: 'Cloud Architectures', value: 40, suffix: '+' },
];

const PX = (id: string, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const SKILLS: Skill[] = [
  { name: 'Angular', level: 95, accent: '#f87171', image: PX('11035380') },
  { name: 'Azure', level: 95, accent: '#38bdf8', image: PX('1181280') },
  { name: '.NET', level: 98, accent: '#7c5cff', image: PX('4164418') },
  { name: 'RxJS', level: 92, accent: '#9b86ff', image: PX('1476321') },
  { name: 'TailwindCSS', level: 95, accent: '#7dd3fc', image: PX('196644') },
  { name: 'TypeScript', level: 96, accent: '#38bdf8', image: PX('574071') },
  { name: 'Power BI', level: 90, accent: '#fbbf24', image: PX('590022') },
  { name: 'Node.js', level: 88, accent: '#34d399', image: PX('160107') },
  { name: 'Python', level: 85, accent: '#facc15', image: PX('1181671') },
];

export const ORBIT_CARDS: OrbitCard[] = [
  { label: 'Angular', ring: 0, color: '#dd0031', icon: '△' },
  { label: 'TypeScript', ring: 0, color: '#3178c6', icon: 'TS' },
  { label: 'RxJS', ring: 1, color: '#e0234e', icon: '∿' },
  { label: 'Azure', ring: 1, color: '#0089d6', icon: '☁' },
  { label: 'ASP.NET Core', ring: 1, color: '#512bd4', icon: '❖' },
  { label: 'C#', ring: 1, color: '#68217a', icon: 'C#' },
  { label: 'AI Agents', ring: 2, color: '#10a37f', icon: '✦' },
  { label: 'Power BI', ring: 2, color: '#f2c811', icon: '▤' },
  { label: 'TailwindCSS', ring: 2, color: '#38bdf8', icon: '≋' },
  { label: 'Ionic', ring: 2, color: '#3880ff', icon: '◉' },
  { label: 'Azure OpenAI', ring: 2, color: '#00a67e', icon: '⬡' },
  { label: 'PostgreSQL', ring: 2, color: '#4169e1', icon: '▣' },
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
    repo: 'https://github.com/nathanielsims45/healthcare-platform',
  },
  {
    title: 'Enterprise CRM',
    category: 'SaaS',
    description:
      'Multi-tenant enterprise CRM with modular Angular architecture, role-based access, and Power BI embedded analytics.',
    tech: ['Angular', 'ASP.NET Core', 'PostgreSQL', 'Power BI'],
    accent: '#7c5cff',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900',
    repo: 'https://github.com/nathanielsims45/enterprise-crm',
  },
  {
    title: 'Azure AI Agent',
    category: 'AI',
    description:
      'Conversational AI agent using Azure OpenAI, RAG over enterprise documents, and an Angular chat surface with streaming responses.',
    tech: ['Azure OpenAI', 'Angular', 'LangChain', 'Cognitive Search'],
    accent: '#34d399',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900',
    repo: 'https://github.com/nathanielsims45/azure-ai-agent',
  },
  {
    title: 'Financial Dashboard',
    category: 'FinTech',
    description:
      'Real-time financial analytics dashboard with sub-second updates, ApexCharts visualizations, and audit-grade logging.',
    tech: ['Angular', 'RxJS', 'WebSockets', 'SQL Server'],
    accent: '#fbbf24',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=900',
    repo: 'https://github.com/nathanielsims45/financial-dashboard',
  },
  {
    title: 'Power BI Analytics',
    category: 'Analytics',
    description:
      'Embedded Power BI analytics suite with custom Angular wrappers, row-level security, and automated dataset refresh orchestration.',
    tech: ['Power BI', 'Angular', 'Azure Functions', 'Azure SQL'],
    accent: '#f87171',
    image: 'https://images.pexels.com/photos/590059/pexels-photo-590059.jpeg?auto=compress&cs=tinysrgb&w=900',
    repo: 'https://github.com/nathanielsims45/powerbi-analytics',
  },
  {
    title: 'Document AI',
    category: 'AI',
    description:
      'Document intelligence pipeline extracting structured data from unstructured contracts using Azure Document Intelligence and AI agents.',
    tech: ['Azure Doc Intel', 'Azure OpenAI', 'Python', 'Angular'],
    accent: '#9b86ff',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=900',
    repo: 'https://github.com/nathanielsims45/document-ai',
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
  { name: 'Azure Solutions Architect', issuer: 'Microsoft', code: 'AZ-305', year: '2024', image: PX('1181298', 600) },
  { name: 'Azure AI Engineer', issuer: 'Microsoft', code: 'AI-102', year: '2024', image: PX('8386434', 600) },
  { name: '.NET Developer', issuer: 'Microsoft', code: 'MCSD', year: '2021', image: PX('11035471', 600) },
  { name: 'Angular Certified', issuer: 'Angular', code: 'ADV', year: '2023', image: PX('4164418', 600) },
  { name: 'Power BI Data Analyst', issuer: 'Microsoft', code: 'PL-300', year: '2023', image: PX('590041', 600) },
];

export const EDUCATION = [
  {
    school: 'University of New Mexico',
    degree: 'B.S. Information Technology',
    period: '2001 – 2005',
    detail: 'Focus on distributed systems, databases, and software engineering.',
    image: PX('207692', 900),
  },
  {
    school: 'Central New Mexico Community College',
    degree: 'A.A.S. Computer Information Systems',
    period: '1999 – 2001',
    detail: 'Foundations in programming, networking, and systems administration.',
    image: PX('256490', 900),
  },
];

export interface FlowNode { label: string; detail: string; icon: string; image: string; }

export const ARCHITECTURE_FLOW: FlowNode[] = [
  { label: 'Microservices', detail: 'Domain-bounded .NET services', icon: '◈', image: PX('1181244', 600) },
  { label: 'Azure', detail: 'Managed cloud backbone', icon: '☁', image: PX('1148820', 600) },
  { label: 'API Gateway', detail: 'Routing, throttling, versioning', icon: '⇄', image: PX('2881229', 600) },
  { label: 'Angular Frontend', detail: 'Standalone components + signals', icon: '△', image: PX('11035380', 600) },
  { label: 'Authentication', detail: 'Entra ID, OAuth2, RBAC', icon: '⚿', image: PX('5473955', 600) },
  { label: 'Databases', detail: 'Azure SQL + PostgreSQL', icon: '▤', image: PX('1181671', 600) },
  { label: 'AI Services', detail: 'Azure OpenAI + vector search', icon: '✦', image: PX('8386440', 600) },
];

export const CLOUD_FLOW: FlowNode[] = [
  { label: 'Azure', detail: 'Subscription + landing zone', icon: '☁', image: PX('1148820', 600) },
  { label: 'API Management', detail: 'Policies, quotas, developer portal', icon: '⇄', image: PX('2881229', 600) },
  { label: 'App Services', detail: 'Containerised web APIs', icon: '▢', image: PX('325229', 600) },
  { label: 'Functions', detail: 'Event-driven serverless jobs', icon: '⚡', image: PX('355952', 600) },
  { label: 'Azure SQL', detail: 'Elastic pools, geo-replication', icon: '▤', image: PX('1181671', 600) },
  { label: 'Storage', detail: 'Blob, queues, CDN delivery', icon: '⬢', image: PX('442150', 600) },
  { label: 'OpenAI', detail: 'GPT deployments with guardrails', icon: '✦', image: PX('8849295', 600) },
  { label: 'Angular Frontend', detail: 'SSR + edge caching', icon: '△', image: PX('11035380', 600) },
];

export const CODE_QUALITY = [
  { label: 'Standalone Components', icon: '◈', detail: 'Zero NgModule boilerplate' },
  { label: 'Signals', icon: '⚡', detail: 'Fine-grained reactivity' },
  { label: 'RxJS', icon: '∿', detail: 'Declarative async streams' },
  { label: 'SSR', icon: '▤', detail: 'Fast first paint, hydration' },
  { label: 'SEO', icon: '◎', detail: 'Meta, schema, sitemaps' },
  { label: 'Accessibility', icon: '☺', detail: 'WCAG 2.2 AA baseline' },
  { label: 'Lazy Loading', icon: '⇣', detail: 'Route-level code splitting' },
  { label: 'Performance', icon: '↗', detail: 'Strict budgets in CI' },
  { label: 'State Management', icon: '▦', detail: 'Signal stores, immutability' },
  { label: 'Dependency Injection', icon: '⇄', detail: 'Typed, tree-shakable providers' },
  { label: 'Testing', icon: '✓', detail: 'Unit, component, and e2e' },
];

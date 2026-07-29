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
  /** Longer write-up shown on the detail view. */
  detail: string;
  /** What I specifically built. */
  highlights: string[];
  tech: string[];
  accent: string;
  image: string;
  /** Every real screenshot for this product; index 0 doubles as the card thumbnail. */
  gallery: string[];
  repo: string;
}

export interface OrbitCard { label: string; ring: number; color: string; icon: string; }

export const PROFILE = {
  name: 'Nathaniel Sims',
  title: 'AI Agent & Full Stack Developer | Azure | Healthcare | FinTech',
  subtitle: 'C# · ASP.NET · Azure · Python · Next.js · React · LangChain',
  rate: '$70/hr',
  availability: 'Available for Enterprise Projects',
  github: 'https://github.com/nathanielsims45',
  githubHandle: 'nathanielsims45',
  location: 'Albuquerque, New Mexico · Remote worldwide',
  timezone: 'UTC−7 (MST) · Overlaps US + EU mornings',
  image: 'assets/me.webp',
};

export const STATS = [
  { label: 'Years Building Software', value: 20, suffix: '+' },
  { label: 'Enterprise Apps Shipped', value: 60, suffix: '+' },
  { label: 'AI Agent Builds', value: 14, suffix: '' },
  { label: 'Industries Served', value: 6, suffix: '' },
];

const PX = (id: string, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const SKILLS: Skill[] = [
  { name: 'AI Agent Development', level: 94, accent: '#412991', image: PX('8386440') },
  { name: 'Azure', level: 96, accent: '#0078d4', image: PX('4164418') },
  { name: 'Python', level: 95, accent: '#3776ab', image: PX('5473955') },
  { name: 'C# / ASP.NET', level: 97, accent: '#512bd4', image: PX('546819') },
  { name: 'React', level: 93, accent: '#61dafb', image: PX('1181677') },
  { name: 'Next.js', level: 90, accent: '#ffffff', image: PX('8386434') },
  { name: 'LangChain', level: 88, accent: '#1c3c3c', image: PX('8438918') },
  { name: 'PostgreSQL / Supabase', level: 92, accent: '#3ecf8e', image: PX('546819') },
  { name: 'Power BI', level: 90, accent: '#f2c811', image: PX('373543') },
];

export const ORBIT_CARDS: OrbitCard[] = [
  { label: 'AI Agent Dev', ring: 0, color: '#412991', icon: '✦' },
  { label: 'Azure', ring: 0, color: '#0078d4', icon: '☁' },
  { label: 'Python', ring: 1, color: '#3776ab', icon: '◈' },
  { label: 'C#', ring: 1, color: '#512bd4', icon: '#' },
  { label: 'ASP.NET', ring: 1, color: '#512bd4', icon: '▦' },
  { label: 'React', ring: 1, color: '#61dafb', icon: '◎' },
  { label: 'Next.js', ring: 2, color: '#ffffff', icon: '▲' },
  { label: 'LangChain', ring: 2, color: '#1c3c3c', icon: '⛓' },
  { label: 'Supabase', ring: 2, color: '#3ecf8e', icon: '⬢' },
  { label: 'PostgreSQL', ring: 2, color: '#336791', icon: '⛁' },
  { label: 'Power BI', ring: 2, color: '#f2c811', icon: '▤' },
  { label: 'Stripe', ring: 2, color: '#635bff', icon: '$' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'DXC Technology',
    role: 'Cloud AI Solutions Architect',
    period: 'March 2018 – Present',
    summary:
      'Lead cloud architecture projects on Azure and AWS for healthcare and FinTech clients — scalable platforms, AI agent tooling, and enterprise modernization.',
    highlights: [
      'Architected Azure-native platforms serving 2M+ monthly users',
      'Built RAG-based AI agents and GraphQL/REST microservices for enterprise clients',
      'Guided teams on architecture, DevOps, security, and CI/CD best practices',
    ],
    image: PX('4164418', 900),
  },
  {
    company: 'Presbyterian Healthcare Services',
    role: 'Senior Full Stack Developer',
    period: 'June 2012 – February 2018',
    summary:
      'Designed secure healthcare apps and cloud infrastructure, leading modernization of enterprise systems with React, PostgreSQL, and AWS/Azure.',
    highlights: [
      'Shipped HIPAA-compliant patient portal used by 600k+ members',
      'Built RBAC access control and immutable audit logging for PHI access',
      'Integrated clinical, financial, and operational platforms end to end',
    ],
    image: PX('1181677', 900),
  },
  {
    company: 'Sandia National Laboratories',
    role: 'Software Developer',
    period: 'August 2005 – May 2012',
    summary:
      'Built enterprise apps with C#, .NET, SQL Server, and JavaScript for national-security research programs — internal tools, automation, and reporting.',
    highlights: [
      'Built internal tools, automation, and reporting platforms',
      'Hardened applications to DOE security standards',
      'Worked on enterprise architecture, integrations, and infrastructure upgrades',
    ],
    image: PX('546819', 900),
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Azure AI Foundry Knowledge Assistant',
    category: 'AI / Azure',
    description:
      'RAG-based knowledge assistant for clinical operations teams, built on Azure OpenAI and Azure AI Search with hybrid vector/keyword retrieval.',
    detail:
      'An enterprise knowledge assistant for a healthcare client’s clinical operations and support teams, built on Azure AI Foundry so staff can search policies, SOPs, and regulatory documentation in plain language instead of digging through shared drives. Azure OpenAI handles generation, Azure AI Search runs hybrid vector/keyword retrieval, and Python orchestrates the pipeline end to end. Secured with Entra ID, Key Vault, private networking, and managed identities so nothing touches the public internet. CI/CD via GitHub Actions promotes changes through dev, staging, and production, with prompt evaluation and telemetry wired in from day one.',
    highlights: [
      'RAG pipeline: Azure OpenAI + Azure AI Search hybrid vector/keyword retrieval',
      'Secured with Entra ID, Key Vault, private networking, managed identities',
      'CI/CD via GitHub Actions across dev, staging, and production',
    ],
    tech: ['Azure OpenAI', 'Azure AI Search', 'Python', 'Azure'],
    accent: '#412991',
    image: PX('8438918', 1200),
    gallery: [PX('8438918', 1200)],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'AWS AppSync Multi-Tenant Healthcare Platform',
    category: 'Healthcare',
    description:
      'Lead full-stack build of a GraphQL healthcare platform supporting multiple organizations with server-enforced tenant isolation and role-based permissions.',
    detail:
      'Lead full-stack engineer on a multi-tenant healthcare platform built on AWS AppSync, supporting several organizations on one system without any of them seeing each other’s data. Tenant ID is scoped and checked server-side in every resolver, never trusted from the client. Designed the GraphQL schema, wrote the Lambda resolvers, integrated Cognito auth, built the React frontend, and wrote backend services in Python. Ran under HIPAA BAAs on AppSync, Lambda, Cognito, and RDS/Postgres, and owned architecture, production deployments, debugging, and feature delivery through launch.',
    highlights: [
      'Server-enforced tenant isolation checked in every GraphQL resolver',
      'Designed schema, Lambda resolvers, Cognito auth, and React frontend',
      'HIPAA BAA-covered infrastructure on AppSync, Lambda, RDS/Postgres',
    ],
    tech: ['React', 'Python', 'PostgreSQL', 'Automation'],
    accent: '#38bdf8',
    image: PX('4164418', 1200),
    gallery: [PX('4164418', 1200)],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Builts AI — Tenant Operations Automation',
    category: 'AI / Automation',
    description:
      'Automation platform connecting Buildium, AppFolio, and DoorLoop to tenant-communication workflows, with emergency-keyword detection for on-call routing.',
    detail:
      'Built in 2026 for small property management teams that need to automate tenant communication without hiring more staff. Connects Buildium, AppFolio, and DoorLoop to n8n/Make automation workflows covering rent reminders, maintenance intake, and lease renewals. An emergency-keyword detector bypasses the normal queue and alerts the on-call manager directly instead of letting an urgent message sit in a backlog. Benchmarked against Leasey.ai during architecture design — Leasey covers the same property-management integrations but leans toward leasing and ops rather than tenant-communication triage, which is the gap Builts AI targets.',
    highlights: [
      'Emergency-keyword detection that bypasses the queue for on-call alerts',
      'Buildium / AppFolio / DoorLoop integrations wired into n8n/Make workflows',
      'Rent reminder, maintenance intake, and renewal workflows, end to end',
    ],
    tech: ['Automation', 'Python', 'PostgreSQL', 'React'],
    accent: '#34d399',
    image: PX('8386440', 1200),
    gallery: [PX('8386440', 1200)],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Catalyst Sync — Biopharma Intelligence Screener',
    category: 'FinTech',
    description:
      'Subscription screener tool fusing SEC EDGAR filings and ClinicalTrials.gov data to filter biopharma companies by cash runway, trial phase, and FDA designation.',
    detail:
      'Built the user login/account system, the data pipeline pulling from SEC EDGAR filings and ClinicalTrials.gov, and the core screener flow for biopharmawatch.com/catalyst-sync. The screener filters companies by cash runway, burn rate, trial phase, FDA designation, therapeutic area, and approval probability — positioned as a small subscription-based tool for retail-facing research rather than an institutional-scale platform.',
    highlights: [
      'Data pipeline fusing SEC EDGAR filings with ClinicalTrials.gov',
      'Screener flow filtering by cash runway, burn rate, trial phase, FDA designation',
      'User login and subscription account system built end to end',
    ],
    tech: ['Next.js', 'PostgreSQL', 'Supabase', 'Stripe'],
    accent: '#7c5cff',
    image: PX('1181244', 1200),
    gallery: [PX('1181244', 1200)],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Healthie + Keragon EHR Integration',
    category: 'Healthcare',
    description:
      'Webhook-driven integration between Healthie (EHR) and Keragon automation middleware, cutting manual data entry 40% for a healthcare client.',
    detail:
      'Built a webhook-driven integration between Healthie, a GraphQL-based EHR, and Keragon automation middleware for a healthcare client (referred to as Beacon). GraphQL payloads write directly back to the patient chart, producing a fully auditable workflow with no manual re-entry step. Result: a 40% reduction in manual data entry. Also built CRM-to-EHR billing middleware in a similar shape, cutting reconciliation errors by 70%.',
    highlights: [
      'Webhook-driven architecture with GraphQL payloads writing to patient charts',
      '40% reduction in manual data entry, fully auditable workflow',
      'CRM-to-EHR billing middleware cutting reconciliation errors 70%',
    ],
    tech: ['C#', 'ASP.NET', 'Automation', 'PostgreSQL'],
    accent: '#0078d4',
    image: PX('5473955', 1200),
    gallery: [PX('5473955', 1200)],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'VeraGov HR Case Management',
    category: 'Microsoft 365',
    description:
      'HR case management system built on Power Apps canvas app (tablet and mobile) over SharePoint Lists, with Power Automate handling routing and status tracking.',
    detail:
      'An HR case-tracking build for onboarding, employee relations, investigations, and accommodation requests, all as one auditable system. Screens are split by section with a progress tracker rather than one long scrolling form, using collections to hold in-progress data before final submit to SharePoint. Power Automate flows route each case to the right department and update a status field the requester can check without asking anyone. A Power BI dashboard sits on top for cases in progress, average time to close, and bottlenecks by stage.',
    highlights: [
      'Multi-section canvas app with screen-per-section structure and progress tracker',
      'Power Automate routing and status tracking across departments',
      'Power BI dashboard wired to live SharePoint case data',
    ],
    tech: ['Microsoft Power BI', 'Automation', 'C#'],
    accent: '#742774',
    image: PX('373543', 1200),
    gallery: [PX('373543', 1200)],
    repo: 'https://github.com/nathanielsims45/veragov-powerapps-power-automate',
  },
];

export const AI_SOLUTIONS = [
  { title: 'AI Agent Development', desc: 'Tool-using agents with LangChain and Azure OpenAI, orchestrated for real workflows.', image: PX('8386440', 600) },
  { title: 'RAG & Document Intelligence', desc: 'Retrieval-augmented answers over private document stores, with citations.', image: PX('8438918', 600) },
  { title: 'React / Next.js Frontends', desc: 'Fast, typed frontends wired to live data, not static mockups.', image: PX('1181677', 600) },
  { title: 'Supabase / PostgreSQL', desc: 'Clean relational schemas with row-level security and realtime data.', image: PX('546819', 600) },
  { title: 'Azure Cloud Architecture', desc: 'Production Azure OpenAI and App Service deployments with CI/CD.', image: PX('4164418', 600) },
  { title: 'Power BI', desc: 'Dashboards wired to live app and database data, not static exports.', image: PX('373543', 600) },
  { title: 'C# / .NET / ASP.NET Core', desc: 'Enterprise APIs and services behind the apps, built to last.', image: PX('5473955', 600) },
  { title: 'Stripe Integrations', desc: 'Billing, subscriptions, and payment flows wired end to end.', image: PX('1181244', 600) },
];

export const CERTIFICATIONS = [
  { name: 'Azure Solutions Architect', issuer: 'Microsoft', code: 'AZ', year: '2023', image: PX('4164418', 600) },
  { name: 'Azure AI Foundry Developer', issuer: 'Microsoft', code: 'AF', year: '2024', image: PX('8386440', 600) },
  { name: 'Azure AI Engineer', issuer: 'Microsoft', code: 'AI', year: '2023', image: PX('8438918', 600) },
  { name: '.NET Developer', issuer: 'Microsoft', code: 'NET', year: '2022', image: PX('5473955', 600) },
  { name: 'Power BI Data Analyst', issuer: 'Microsoft', code: 'BI', year: '2022', image: PX('373543', 600) },
];

export const EDUCATION = [
  {
    school: 'University of New Mexico',
    degree: 'B.S. Information Technology',
    period: '2001 – 2004',
    detail: 'Software engineering foundations, enterprise systems, and database design.',
    image: PX('207692', 900),
  },
  {
    school: 'Central New Mexico Community College',
    degree: 'A.A.S. Computer Information Systems',
    period: '1999 – 2001',
    detail: 'Systems fundamentals feeding directly into a two-decade Microsoft stack career.',
    image: PX('1779487', 900),
  },
];

export interface FlowNode { label: string; detail: string; icon: string; image: string; }

export const ARCHITECTURE_FLOW: FlowNode[] = [
  { label: 'Requirements & Mockups', detail: 'Field-level scope and visual designs', icon: '◈', image: PX('3585047', 600) },
  { label: 'SharePoint List Schema', detail: 'Single data backend, no Dataverse debate', icon: '▦', image: PX('196644', 600) },
  { label: 'Power Apps Canvas App', detail: 'Screens split by section, progress tracker', icon: '△', image: PX('11035380', 600) },
  { label: 'Power Automate Flow', detail: 'Routing, approvals, status updates', icon: '∿', image: PX('1476321', 600) },
  { label: 'Tablet & Phone Pass', detail: 'Usable on every device staff actually use', icon: '⇄', image: PX('326502', 600) },
  { label: 'Handoff Docs', detail: 'Schema, flow steps, and app logic documented', icon: '✓', image: PX('590022', 600) },
];

export const CLOUD_FLOW: FlowNode[] = [
  { label: 'Azure AD / Entra ID', detail: 'Identity and access across the tenant', icon: '△', image: PX('11035380', 600) },
  { label: 'SharePoint Lists', detail: 'Structured, auditable data backend', icon: '▦', image: PX('196644', 600) },
  { label: 'Power Apps', detail: 'Canvas apps on tablet and mobile', icon: '◈', image: PX('1181671', 600) },
  { label: 'Power Automate', detail: 'Approval routing and notifications', icon: '∿', image: PX('3184292', 600) },
  { label: 'Power BI', detail: 'Live dashboards on app and list data', icon: '▤', image: PX('574071', 600) },
  { label: 'Azure App Services', detail: 'Supporting APIs on .NET and C#', icon: '⬢', image: PX('442150', 600) },
  { label: 'Azure DevOps', detail: 'CI/CD and release pipelines', icon: '◉', image: PX('325229', 600) },
];

export const CODE_QUALITY = [
  { label: 'Screen-per-Section Apps', icon: '◈', detail: 'No long scrolling forms on tablet' },
  { label: 'Collections Before Submit', icon: '⚡', detail: 'In-progress data held client-side' },
  { label: 'Status-Driven Flows', icon: '∿', detail: 'One field drives UI and routing' },
  { label: 'SharePoint Lists', icon: '▦', detail: 'No unnecessary Dataverse overhead' },
  { label: 'Clean Architecture (.NET)', icon: '↗', detail: 'Testable, maintainable service layers' },
  { label: 'Azure-Native Deployment', icon: '☁', detail: 'App Services, Functions, DevOps pipelines' },
  { label: 'Documented Handoff', icon: '✓', detail: 'Schema, flow steps, and app logic written down' },
  { label: 'Non-Technical Friendly', icon: '☺', detail: 'Built for staff, not just developers' },
  { label: 'Power BI on Live Data', icon: '◎', detail: 'No stale exports or manual refreshes' },
  { label: 'Typed C# Services', icon: '▤', detail: 'Strict typing, no implicit any equivalent' },
  { label: 'CI/CD Pipelines', icon: '⇣', detail: 'Azure DevOps and GitHub Actions' },
];

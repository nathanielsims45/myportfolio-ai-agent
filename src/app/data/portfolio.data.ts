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
  title: 'Microsoft Stack Architect',
  subtitle: 'Power Apps · Power Automate · Azure · .NET',
  rate: '$70/hr',
  availability: 'Available for Enterprise Projects',
  github: 'https://github.com/nathanielsims45',
  githubHandle: 'nathanielsims45',
  location: 'Albuquerque, New Mexico · Remote worldwide',
  timezone: 'UTC−7 (MST) · Overlaps US + EU mornings',
  image: 'assets/me.webp',
};

export const STATS = [
  { label: 'Years on Microsoft Stack', value: 20, suffix: '+' },
  { label: 'Enterprise Apps Shipped', value: 60, suffix: '+' },
  { label: 'Power Platform Builds', value: 14, suffix: '' },
  { label: 'Industries Served', value: 6, suffix: '' },
];

const PX = (id: string, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const SKILLS: Skill[] = [
  { name: 'Power Apps', level: 92, accent: '#742774', image: PX('11035380') },
  { name: 'Power Automate', level: 92, accent: '#0066ff', image: PX('574071') },
  { name: 'SharePoint', level: 90, accent: '#0078d4', image: PX('1476321') },
  { name: 'Azure', level: 96, accent: '#0078d4', image: PX('196644') },
  { name: 'C#', level: 97, accent: '#512bd4', image: PX('326502') },
  { name: '.NET / ASP.NET Core', level: 98, accent: '#512bd4', image: PX('3184292') },
  { name: 'Power BI', level: 90, accent: '#f2c811', image: PX('1779487') },
  { name: 'SQL Server', level: 92, accent: '#cc2927', image: PX('3585047') },
  { name: 'Angular', level: 94, accent: '#dd0031', image: PX('7130560') },
];

export const ORBIT_CARDS: OrbitCard[] = [
  { label: 'Power Apps', ring: 0, color: '#742774', icon: '◈' },
  { label: 'Power Automate', ring: 0, color: '#0066ff', icon: '⚡' },
  { label: 'Azure', ring: 1, color: '#0078d4', icon: '☁' },
  { label: 'C#', ring: 1, color: '#512bd4', icon: '#' },
  { label: '.NET', ring: 1, color: '#512bd4', icon: '▦' },
  { label: 'ASP.NET Core', ring: 1, color: '#512bd4', icon: '◎' },
  { label: 'SharePoint', ring: 2, color: '#0078d4', icon: '◉' },
  { label: 'Power BI', ring: 2, color: '#f2c811', icon: '▤' },
  { label: 'SQL Server', ring: 2, color: '#cc2927', icon: '⬢' },
  { label: 'Azure DevOps', ring: 2, color: '#0078d4', icon: '∿' },
  { label: 'Angular', ring: 2, color: '#dd0031', icon: '△' },
  { label: 'Azure OpenAI', ring: 2, color: '#412991', icon: '✦' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'DXC Technology',
    role: 'Cloud AI Solutions Architect',
    period: 'March 2018 – Present',
    summary:
      'Lead architect for enterprise Azure platforms across healthcare and FinTech clients — cloud architecture, AI-augmented microservices, and Microsoft 365 automation.',
    highlights: [
      'Architected Azure-native platforms serving 2M+ monthly users',
      'Delivered Power Platform automation replacing manual back-office workflows',
      'Established architecture and DevOps practices adopted across 12 enterprise teams',
    ],
    image: 'assets/casino/silverskystake-thumb.jpg',
  },
  {
    company: 'Presbyterian Healthcare Services',
    role: 'Senior Full Stack Developer',
    period: 'June 2012 – February 2018',
    summary:
      'Built HIPAA-compliant patient portals and clinical systems using .NET, Azure, and SQL Server, integrating clinical, financial, and operational platforms.',
    highlights: [
      'Shipped patient portal used by 600k+ members',
      'Modernized enterprise systems onto Azure with .NET and SQL Server',
      'Built Power BI reporting on top of clinical and operational data',
    ],
    image: 'assets/casino/7zone-casino-thumb.jpg',
  },
  {
    company: 'Sandia National Laboratories',
    role: 'Software Developer',
    period: 'August 2005 – May 2012',
    summary:
      'Developed secure enterprise applications and internal automation tooling with C#, .NET, and SQL Server for national-security research programs.',
    highlights: [
      'Built internal tools, automation, and reporting platforms',
      'Hardened applications to DOE security standards',
      'Worked on enterprise architecture, integrations, and infrastructure upgrades',
    ],
    image: 'assets/casino/silverskystake-blog.jpg',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: 'VeraGov HR Case Management',
    category: 'Power Platform',
    description:
      'Multi-section HR case management system: Power Apps canvas app (tablet and mobile) on SharePoint Lists, with Power Automate handling routing, status tracking, and group notifications.',
    detail:
      'A Power Platform build for HR case tracking end to end — onboarding, employee relations, investigations, and accommodation requests, all as one auditable system. Screens are split by section with a progress tracker rather than one long scrolling form, using collections to hold in-progress data before final submit to SharePoint. Power Automate flows route each case to the right department and update a status field the requester can check without asking anyone. A Power BI dashboard sits on top for cases in progress, average time to close, and bottlenecks by stage.',
    highlights: [
      'Multi-section canvas app with screen-per-section structure and progress tracker',
      'Power Automate routing and status tracking across departments',
      'Power BI dashboard wired to live SharePoint case data',
    ],
    tech: ['Power Apps', 'Power Automate', 'SharePoint', 'Power BI'],
    accent: '#0078d4',
    image: 'assets/casino/7zone-casino-thumb.jpg',
    gallery: ['assets/casino/7zone-casino-thumb.jpg'],
    repo: 'https://github.com/nathanielsims45/veragov-powerapps-power-automate',
  },
  {
    title: 'Purchase Request Approval System',
    category: 'Power Platform',
    description:
      'Power Apps canvas app plus Power Automate flow for internal purchase requests, with multi-step sequential approval routing and live status tracking.',
    detail:
      'A purchase-request workflow built for teams that need requests to move through one or more approvers in sequence before they are approved. A status field on the SharePoint item updates at each step, so the requester always knows exactly where a request sits without pinging anyone. The approval logic and status model are the same pattern used on VeraGov, adapted for a single-form request flow instead of a multi-section case record.',
    highlights: [
      'Sequential multi-approver routing in Power Automate',
      'Status field driving both requester visibility and flow logic',
      'Clean handoff docs so a non-technical team can maintain it',
    ],
    tech: ['Power Apps', 'Power Automate', 'SharePoint'],
    accent: '#742774',
    image: 'assets/casino/silverskystake-thumb.jpg',
    gallery: ['assets/casino/silverskystake-thumb.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Azure AI Agent Platform',
    category: 'AI / Azure',
    description:
      'Conversational AI agent using Azure OpenAI, RAG over enterprise documents, and document intelligence for automated extraction.',
    detail:
      'An enterprise AI agent platform on Azure: Azure OpenAI for generation, Cognitive Search for retrieval-augmented answers over private document stores, and Azure Document Intelligence for structured extraction from contracts and forms — all wired into existing .NET services.',
    highlights: [
      'RAG pipeline over enterprise documents with citations',
      'Document intelligence extraction feeding downstream .NET services',
      'Production Azure OpenAI deployment with streaming responses',
    ],
    tech: ['Azure OpenAI', 'Azure', 'C#', '.NET'],
    accent: '#412991',
    image: 'assets/casino/runeverse-hero.jpg',
    gallery: ['assets/casino/runeverse-hero.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Enterprise CRM on Azure',
    category: 'Enterprise',
    description:
      'Multi-tenant enterprise CRM built on ASP.NET Core and Azure SQL, with role-based access and embedded Power BI analytics.',
    detail:
      'A multi-tenant CRM platform: ASP.NET Core Web API backend, Azure SQL for storage, role-based access control per tenant, and Power BI embedded analytics so account teams see live pipeline data inside the same product they work in.',
    highlights: [
      'ASP.NET Core Web API with multi-tenant, role-based access',
      'Power BI embedded analytics with row-level security',
      'Deployed on Azure App Services with CI/CD via Azure DevOps',
    ],
    tech: ['ASP.NET Core', 'Azure SQL', 'Power BI', 'C#'],
    accent: '#7c5cff',
    image: 'assets/casino/nftui-hero.jpg',
    gallery: ['assets/casino/nftui-hero.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Clinical Reporting Dashboard',
    category: 'Healthcare',
    description:
      'HIPAA-compliant clinical analytics dashboard on Azure, integrating FHIR data with cached Power BI reporting.',
    detail:
      'A clinical operations dashboard integrating FHIR APIs with real-time clinical event streams, backed by SQL Server and surfaced through Power BI with cached aggregates to cut report generation from minutes to seconds.',
    highlights: [
      'FHIR API integration with real-time event streams',
      'Power BI reporting on cached aggregates for sub-second load',
      'HIPAA-compliant data handling across the pipeline',
    ],
    tech: ['Azure', 'SQL Server', 'Power BI', '.NET'],
    accent: '#38bdf8',
    image: 'assets/casino/tournaments-hero.jpg',
    gallery: ['assets/casino/tournaments-hero.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Field Operations Automation',
    category: 'Power Platform',
    description:
      'Power Apps canvas app replacing a VBA macro-based form, with Power Automate routing submissions and tracking completion.',
    detail:
      'A field-operations form migrated off a network-drive VBA macro onto a Power Apps canvas app backed by SharePoint Lists, with a Power Automate flow that routes and tracks every submission — built so field staff need no training beyond the app itself.',
    highlights: [
      'Migrated a legacy VBA macro workflow to a maintainable canvas app',
      'Power Automate flow for submission routing and tracking',
      'SharePoint Lists as the single data backend, no Dataverse dependency',
    ],
    tech: ['Power Apps', 'Power Automate', 'SharePoint'],
    accent: '#34d399',
    image: 'assets/casino/maxibet-hero.jpg',
    gallery: ['assets/casino/maxibet-hero.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
];

export const AI_SOLUTIONS = [
  { title: 'Power Apps Canvas Apps', desc: 'Multi-section apps with branching logic that stay usable on tablet and phone.', image: PX('11035380', 600) },
  { title: 'Power Automate Flows', desc: 'Multi-step approval routing and status tracking, no manual follow-up needed.', image: PX('1779487', 600) },
  { title: 'SharePoint Lists', desc: 'Clean list schemas as the single data backend, no Dataverse overhead.', image: PX('326502', 600) },
  { title: 'Azure OpenAI', desc: 'Production GPT deployments with responsible AI guardrails and streaming.', image: PX('7130560', 600) },
  { title: 'AI Agents', desc: 'Tool-using agents orchestrated for enterprise workflows and automation.', image: PX('3184292', 600) },
  { title: 'Power BI', desc: 'Dashboards wired to live app and SharePoint data, not static exports.', image: PX('590022', 600) },
  { title: '.NET / ASP.NET Core', desc: 'Enterprise APIs and services behind the apps, built to last.', image: PX('590059', 600) },
  { title: 'Document Intelligence', desc: 'OCR and layout-aware extraction for contracts, claims, and clinical docs.', image: PX('3585047', 600) },
];

export const CERTIFICATIONS = [
  { name: 'Azure Solutions Architect', issuer: 'Microsoft', code: 'AZ', year: '2023', image: PX('11035380', 600) },
  { name: 'Power Platform Developer', issuer: 'Microsoft', code: 'PL', year: '2024', image: PX('574071', 600) },
  { name: 'Azure AI Engineer', issuer: 'Microsoft', code: 'AI', year: '2023', image: PX('196644', 600) },
  { name: '.NET Developer', issuer: 'Microsoft', code: 'NET', year: '2022', image: PX('1779487', 600) },
  { name: 'Power BI Data Analyst', issuer: 'Microsoft', code: 'BI', year: '2022', image: PX('3184292', 600) },
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

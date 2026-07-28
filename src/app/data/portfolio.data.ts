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
  /** What I specifically built on the frontend. */
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
  title: 'Angular Frontend Developer',
  subtitle: 'UI/UX-minded · Crypto · Casino & iGaming',
  rate: '$70/hr',
  availability: 'Available for Enterprise Projects',
  github: 'https://github.com/nathanielsims45',
  githubHandle: 'nathanielsims45',
  location: 'Albuquerque, New Mexico · Remote worldwide',
  timezone: 'UTC−7 (MST) · Overlaps US + EU mornings',
  image: 'assets/me.webp',
};

export const STATS = [
  { label: 'Years Frontend', value: 12, suffix: '+' },
  { label: 'Angular Apps Shipped', value: 60, suffix: '+' },
  { label: 'Design Systems Built', value: 14, suffix: '' },
  { label: 'Crypto & Casino UIs', value: 25, suffix: '+' },
];

const PX = (id: string, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const SKILLS: Skill[] = [
  { name: 'Angular', level: 98, accent: '#dd0031', image: PX('11035380') },
  { name: 'TypeScript', level: 96, accent: '#3178c6', image: PX('574071') },
  { name: 'RxJS & Signals', level: 94, accent: '#e0234e', image: PX('1476321') },
  { name: 'SCSS & Tailwind', level: 95, accent: '#38bdf8', image: PX('196644') },
  { name: 'Responsive UI', level: 96, accent: '#7c5cff', image: PX('326502') },
  { name: 'Accessibility', level: 90, accent: '#34d399', image: PX('3184292') },
  { name: 'Design Systems', level: 92, accent: '#f472b6', image: PX('1779487') },
  { name: 'Figma Handoff', level: 88, accent: '#f2c811', image: PX('3585047') },
  { name: 'Web Animation', level: 91, accent: '#a78bfa', image: PX('7130560') },
];

export const ORBIT_CARDS: OrbitCard[] = [
  { label: 'Angular', ring: 0, color: '#dd0031', icon: '△' },
  { label: 'TypeScript', ring: 0, color: '#3178c6', icon: 'TS' },
  { label: 'RxJS', ring: 1, color: '#e0234e', icon: '∿' },
  { label: 'Signals', ring: 1, color: '#a78bfa', icon: '⚡' },
  { label: 'SCSS', ring: 1, color: '#cd6799', icon: '❖' },
  { label: 'Tailwind', ring: 1, color: '#38bdf8', icon: '≋' },
  { label: 'Figma', ring: 2, color: '#f24e1e', icon: '◈' },
  { label: 'Design Systems', ring: 2, color: '#f472b6', icon: '▦' },
  { label: 'GSAP', ring: 2, color: '#88ce02', icon: '∿' },
  { label: 'Ionic', ring: 2, color: '#3880ff', icon: '◉' },
  { label: 'Web3 / ethers', ring: 2, color: '#f2c811', icon: '⬡' },
  { label: 'Accessibility', ring: 2, color: '#34d399', icon: '☺' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Crypto Exchange & Wallet Products',
    role: 'Senior Angular Frontend Developer',
    period: '2021 – Present',
    summary:
      'Frontend lead on trading, wallet, and token dashboard interfaces. I build the Angular side — component libraries, live market views, and responsive layouts — working from Figma with the design team and refining the UX as it hits real data.',
    highlights: [
      'Built real-time trading views with RxJS + WebSocket streams and virtual scrolling',
      'Shipped a shared Angular component library reused across four crypto products',
      'Cut Largest Contentful Paint 44% with lazy routes, OnPush, and image budgets',
    ],
    image: 'assets/casino/silverskystake-thumb.jpg',
  },
  {
    company: 'Casino & iGaming Platforms',
    role: 'Angular Frontend Developer (UI/UX-focused)',
    period: '2019 – 2023',
    summary:
      'Built game lobby, wallet, and promo interfaces for casino and sweepstakes products. Heavy on animation, state, and mobile-first layouts, translating UX flows into accessible Angular components.',
    highlights: [
      'Delivered animated lucky-spin and card-reveal UIs with GSAP and Angular animations',
      'Built responsive game lobbies with filtering, search, and skeleton loading states',
      'Partnered with designers on UX flows, then owned the production frontend build',
    ],
    image: 'assets/casino/7zone-casino-thumb.jpg',
  },
  {
    company: 'Product & Brand Frontend Work',
    role: 'Frontend Developer',
    period: '2014 – 2019',
    summary:
      'Marketing sites, product dashboards, and mobile web apps across consumer brands — where I moved from general frontend into Angular specialisation and picked up the design fundamentals I still use.',
    highlights: [
      'Converted design files into pixel-accurate, responsive frontends',
      'Introduced reusable SCSS architecture and a shared UI kit',
      'Improved Core Web Vitals across a portfolio of client sites',
    ],
    image: 'assets/casino/silverskystake-blog.jpg',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: '7Zone Casino',
    category: 'Casino',
    description:
      'Full casino lobby frontend — slots, live tables, tournaments, and jackpot promos in one dense but readable Angular layout that holds up on mobile.',
    detail:
      'A complete casino lobby built as a component-driven Angular app: a hero promo carousel, category-filtered game rails, a jackpot banner, and a dense live-casino grid — all sharing one token-driven theme so new game categories drop in without new CSS.',
    highlights: [
      'Category-filterable game grid (slots, live tables, jackpots) with skeleton loading',
      'Promo carousel and tournament banners built as reusable, data-driven components',
      'Dense UI kept scannable on mobile with a strict spacing and type scale',
    ],
    tech: ['Angular', 'RxJS', 'SCSS', 'Lazy Loading'],
    accent: '#22c55e',
    image: 'assets/casino/7zone-casino-thumb.jpg',
    gallery: ['assets/casino/7zone-casino-thumb.jpg', 'assets/casino/7zone-casino-lobby.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'SilverSkyStake',
    category: 'Crypto Casino',
    description:
      'Crypto-native casino dashboard with a BTC balance, live game categories, and a dark theme tuned for long sessions without eye strain.',
    detail:
      'A crypto-first casino product: wallet balance in the header, a dark theme designed for long play sessions, and an editorial blog section reusing the same design tokens so the whole product — game screens and content pages alike — feels like one system.',
    highlights: [
      'Wallet balance and deposit flow built into the primary navigation',
      'Dark theme tuned for extended sessions, not just aesthetics',
      'Blog/content section reusing the product\'s core design tokens and type scale',
    ],
    tech: ['Angular', 'TypeScript', 'Web3', 'SCSS'],
    accent: '#2dd4bf',
    image: 'assets/casino/silverskystake-thumb.jpg',
    gallery: ['assets/casino/silverskystake-thumb.jpg', 'assets/casino/silverskystake-blog.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Runeverse: Alpha Origins',
    category: 'Web3 / NFT',
    description:
      'NFT collection landing page with wallet connect, lore-driven world sections, and a live collection grid — built to feel cinematic without hurting load time.',
    detail:
      'An NFT collection site built to feel cinematic: a hero with wallet-connect, four illustrated "world" sections, a live collection grid, and a weekly community feature with a video story panel, a character voting grid, and an FAQ accordion — all state-driven Angular components over one design system.',
    highlights: [
      'Wallet-connect flow and collection grid built as reusable Angular components',
      'Weekly "story vote" feature: video panel, voting grid, and FAQ accordion',
      'Heavy illustrated content kept fast with lazy-loaded, budgeted imagery',
    ],
    tech: ['Angular', 'TypeScript', 'Web3', 'GSAP'],
    accent: '#ef4444',
    image: 'assets/casino/runeverse-hero.jpg',
    gallery: ['assets/casino/runeverse-hero.jpg', 'assets/casino/runeverse-worlds.jpg', 'assets/casino/runeverse-vote.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'NFT UI Marketplace',
    category: 'Web3',
    description:
      'NFT buy/sell marketplace frontend — trending collections, bidding cards, top-seller rail, and reviews, built as a reusable Angular template.',
    detail:
      'A full NFT marketplace template: trending-collection cards with live bidding state, a horizontally-scrolling top-seller rail, a popular-collection grid, and a reviews section — built as a reusable Angular component set rather than one-off page markup.',
    highlights: [
      'Bidding cards with live price state and "Place a Bid" actions',
      'Horizontal-scroll top-seller and collection rails as reusable carousel components',
      'Consistent card system reused across trending, popular, and collection views',
    ],
    tech: ['Angular', 'RxJS', 'Tailwind', 'Carousel'],
    accent: '#a855f7',
    image: 'assets/casino/nftui-hero.jpg',
    gallery: ['assets/casino/nftui-hero.jpg', 'assets/casino/nftui-collections.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'Tournaments.com',
    category: 'Esports',
    description:
      'Esports tournament platform — creation hub, rewards system, performance tracker, and a live leaderboard table built for fast scanning on any device.',
    detail:
      'An esports tournament platform frontend: a tournament creation hub, a rewards system, an in-app performance tracker with live stats, and a sortable leaderboard table — designed so competitive players can scan rank, win rate, and prize data fast on any device.',
    highlights: [
      'Sortable leaderboard table tuned for fast scanning at a glance',
      'Performance tracker combining stat cards with a live progress ring',
      'Tournament creation hub and rewards system as standalone feature modules',
    ],
    tech: ['Angular', 'RxJS', 'ApexCharts', 'Tailwind'],
    accent: '#818cf8',
    image: 'assets/casino/tournaments-hero.jpg',
    gallery: ['assets/casino/tournaments-hero.jpg', 'assets/casino/tournaments-features.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
  {
    title: 'MaxiBet Casino',
    category: 'Casino',
    description:
      'Sportsbook + casino hybrid frontend with live jackpot ticker, game-show rail, and a payment-method strip — dense UI kept scannable with a strict visual hierarchy.',
    detail:
      'A sportsbook-and-casino hybrid: live sports odds sit next to slot and live-dealer rails behind one navigation, with a running jackpot ticker, a game-show carousel, and a payment-method strip — an intentionally dense UI kept legible with a strict visual hierarchy and consistent card sizing.',
    highlights: [
      'Combined sportsbook + casino navigation without splitting the product in two',
      'Live jackpot ticker and game-show rail as independently updating components',
      'Payment-method strip and multi-language toggle built into the core shell',
    ],
    tech: ['Angular', 'RxJS', 'SCSS', 'i18n'],
    accent: '#fb923c',
    image: 'assets/casino/maxibet-hero.jpg',
    gallery: ['assets/casino/maxibet-hero.jpg', 'assets/casino/maxibet-games.jpg'],
    repo: 'https://github.com/nathanielsims45',
  },
];

export const AI_SOLUTIONS = [
  { title: 'Component Libraries', desc: 'Reusable, documented Angular components teams actually adopt.', image: PX('11035380', 600) },
  { title: 'Design Systems', desc: 'Tokens, spacing, and theming kept consistent from Figma to production.', image: PX('1779487', 600) },
  { title: 'Responsive Layouts', desc: 'Mobile-first UI that holds up from 320px to ultrawide.', image: PX('326502', 600) },
  { title: 'Web Animation', desc: 'Purposeful motion with GSAP and Angular animations, never at the cost of speed.', image: PX('7130560', 600) },
  { title: 'Accessibility', desc: 'Keyboard paths, focus states, and WCAG 2.2 AA as a baseline.', image: PX('3184292', 600) },
  { title: 'Performance', desc: 'Core Web Vitals budgets enforced in CI, lazy routes, OnPush by default.', image: PX('590022', 600) },
  { title: 'Data-Heavy UI', desc: 'Live charts, order books, and tables that stay smooth under streaming updates.', image: PX('590059', 600) },
  { title: 'Figma Handoff', desc: 'Comfortable in design files — I read specs, spot gaps, and close them.', image: PX('3585047', 600) },
];

export const CERTIFICATIONS = [
  { name: 'Angular Certified Developer', issuer: 'Angular', code: 'ADV', year: '2024', image: PX('11035380', 600) },
  { name: 'JavaScript Algorithms', issuer: 'freeCodeCamp', code: 'JS', year: '2022', image: PX('574071', 600) },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', code: 'RWD', year: '2021', image: PX('196644', 600) },
  { name: 'UI/UX Design Foundations', issuer: 'Interaction Design Fnd.', code: 'UX', year: '2023', image: PX('1779487', 600) },
  { name: 'Web Accessibility (WCAG)', issuer: 'W3Cx', code: 'A11Y', year: '2023', image: PX('3184292', 600) },
];

export const EDUCATION = [
  {
    school: 'University of New Mexico',
    degree: 'B.S. Information Technology',
    period: '2001 – 2005',
    detail: 'Software engineering foundations, plus electives in human–computer interaction.',
    image: PX('207692', 900),
  },
  {
    school: 'Self-directed Design Study',
    degree: 'UI/UX Fundamentals',
    period: 'Ongoing',
    detail: 'Typography, layout, colour, and interaction patterns — enough design literacy to build interfaces well and speak the designers\' language.',
    image: PX('1779487', 900),
  },
];

export interface FlowNode { label: string; detail: string; icon: string; image: string; }

export const ARCHITECTURE_FLOW: FlowNode[] = [
  { label: 'Figma File', detail: 'Design specs, tokens, and prototypes', icon: '◈', image: PX('3585047', 600) },
  { label: 'UX Review', detail: 'Flows, edge cases, and empty states', icon: '☺', image: PX('1779487', 600) },
  { label: 'Design Tokens', detail: 'Colour, type, spacing as CSS variables', icon: '▦', image: PX('196644', 600) },
  { label: 'Angular Components', detail: 'Standalone, typed, and documented', icon: '△', image: PX('11035380', 600) },
  { label: 'State & Data', detail: 'Signals and RxJS against live APIs', icon: '∿', image: PX('1476321', 600) },
  { label: 'Responsive Pass', detail: 'Every breakpoint, real devices', icon: '⇄', image: PX('326502', 600) },
  { label: 'A11y & Performance', detail: 'Audits and budgets before merge', icon: '✓', image: PX('590022', 600) },
];

export const CLOUD_FLOW: FlowNode[] = [
  { label: 'Component', detail: 'Standalone Angular building block', icon: '△', image: PX('11035380', 600) },
  { label: 'Design Tokens', detail: 'Themeable variables, no magic values', icon: '▦', image: PX('196644', 600) },
  { label: 'Storybook Docs', detail: 'Every state visible and reviewable', icon: '▤', image: PX('1181671', 600) },
  { label: 'Accessibility', detail: 'Roles, labels, keyboard paths', icon: '☺', image: PX('3184292', 600) },
  { label: 'Visual Tests', detail: 'Snapshots catch UI regressions', icon: '◎', image: PX('574071', 600) },
  { label: 'Published Library', detail: 'Versioned package teams install', icon: '⬢', image: PX('442150', 600) },
  { label: 'Product Apps', detail: 'Consistent UI across every surface', icon: '◉', image: PX('325229', 600) },
];

export const CODE_QUALITY = [
  { label: 'Standalone Components', icon: '◈', detail: 'Zero NgModule boilerplate' },
  { label: 'Signals', icon: '⚡', detail: 'Fine-grained reactivity' },
  { label: 'RxJS', icon: '∿', detail: 'Declarative async streams' },
  { label: 'OnPush', icon: '↗', detail: 'Predictable change detection' },
  { label: 'Design Tokens', icon: '▦', detail: 'No hard-coded colours' },
  { label: 'Accessibility', icon: '☺', detail: 'WCAG 2.2 AA baseline' },
  { label: 'Responsive First', icon: '⇄', detail: 'Mobile up, not desktop down' },
  { label: 'Lazy Loading', icon: '⇣', detail: 'Route-level code splitting' },
  { label: 'Core Web Vitals', icon: '◎', detail: 'Strict budgets in CI' },
  { label: 'Typed Templates', icon: '✓', detail: 'Strict mode, no implicit any' },
  { label: 'Component Tests', icon: '▤', detail: 'Behaviour over implementation' },
];


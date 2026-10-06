export interface SpacingScaleItem {
  value: number;
  token: string;
  tailwindClass: string;
  role: string;
  description: string;
  commonUseCases: string[];
}

export const BASE_UNIT = 4;

export const INITIAL_SPACING_SCALE: SpacingScaleItem[] = [
  {
    value: 4,
    token: 'spacing.4',
    tailwindClass: 'p-1 / gap-1 / m-1',
    role: 'Micro separation / icon-text adjustment',
    description: 'Minimal quantum gap for optical alignment between inline glyphs, badges, and tight indicators.',
    commonUseCases: ['Icon-to-label inline gap', 'Status dot to label text', 'Badge internal horizontal padding'],
  },
  {
    value: 8,
    token: 'spacing.8',
    tailwindClass: 'p-2 / gap-2 / m-2',
    role: 'Tight internal spacing / label relationships',
    description: 'Compact relationship binding a header to its subtext, form label to its input field, or tag lists.',
    commonUseCases: ['Field label to input field', 'Card title to eyebrow/chip', 'Tag pill cluster gap'],
  },
  {
    value: 12,
    token: 'spacing.12',
    tailwindClass: 'p-3 / gap-3 / m-3',
    role: 'Compact component relationships',
    description: 'Subtle separation for items in dense operational tables, secondary toolbar buttons, and compact alerts.',
    commonUseCases: ['Compact table cell vertical padding', 'Action bar button cluster', 'Dense list item spacing'],
  },
  {
    value: 16,
    token: 'spacing.16',
    tailwindClass: 'p-4 / gap-4 / m-4',
    role: 'Compact component padding / standard small gaps',
    description: 'Boundary padding for dense analytical cards, modal toolbars, and standard UI widget gap.',
    commonUseCases: ['Compact card internal padding', 'Form group vertical spacing', 'Dashboard widget gutter'],
  },
  {
    value: 20,
    token: 'spacing.20',
    tailwindClass: 'p-5 / gap-5 / m-5',
    role: 'Comfortable small grouping',
    description: 'Intermediate spacing providing extra breathing room inside medium-density containers without expanding to full standard.',
    commonUseCases: ['Medium dashboard widget padding', 'Sub-panel header separator', 'KPI block spacing'],
  },
  {
    value: 24,
    token: 'spacing.24',
    tailwindClass: 'p-6 / gap-6 / m-6',
    role: 'Standard component padding / card internal spacing',
    description: 'The baseline default card and container padding across Media Solutions web and enterprise software.',
    commonUseCases: ['Standard card internal padding', 'Grid column gutter (Desktop 12-col)', 'Modal dialog internal body padding'],
  },
  {
    value: 32,
    token: 'spacing.32',
    tailwindClass: 'p-8 / gap-8 / m-8',
    role: 'Section internals / spacious card padding',
    description: 'Generous padding for hero containers, spacious executive cards, and tight section separation.',
    commonUseCases: ['Spacious card internal padding', 'Tight section separation', 'Desktop page side margins'],
  },
  {
    value: 40,
    token: 'spacing.40',
    tailwindClass: 'p-10 / gap-10 / m-10',
    role: 'Major component separation',
    description: 'Distance separating independent modules within a unified workflow (e.g. chart panel from data table).',
    commonUseCases: ['Filter bar to data visualization separation', 'Major tab bar to view content', 'Secondary section gap'],
  },
  {
    value: 48,
    token: 'spacing.48',
    tailwindClass: 'p-12 / gap-12 / m-12',
    role: 'Section separation / major grouping',
    description: 'Standard distance between distinct thematic sections on a standard product or dashboard page.',
    commonUseCases: ['Standard section-to-section gap', 'Dashboard KPI summary to analytical table', 'Drawer header to content'],
  },
  {
    value: 64,
    token: 'spacing.64',
    tailwindClass: 'p-16 / gap-16 / m-16',
    role: 'Large section spacing',
    description: 'Spacious section separation establishing clear visual chapter boundaries on product landing pages.',
    commonUseCases: ['Major section boundary in marketing/editorial views', 'Hero banner to feature matrix', 'Bottom action dock separation'],
  },
  {
    value: 80,
    token: 'spacing.80',
    tailwindClass: 'p-20 / gap-20 / m-20',
    role: 'Major page rhythm / editorial spacing',
    description: 'Expansive breathing room separating long-form narrative arcs and high-impact case study chapters.',
    commonUseCases: ['Editorial narrative chapter transition', 'High-impact case study breakdown', 'Keynote slide narrative blocks'],
  },
  {
    value: 96,
    token: 'spacing.96',
    tailwindClass: 'p-24 / gap-24 / m-24',
    role: 'Exceptional large-scale composition spacing',
    description: 'Maximum system breathing room reserved for hero stage entrances, brand storytelling, and open canvas vistas.',
    commonUseCases: ['Editorial hero section top/bottom padding', 'Annual report feature transition', 'Canvas viewport breathing zone'],
  },
];

export interface ComponentPaddingPreset {
  id: 'compact' | 'standard' | 'spacious';
  name: string;
  paddingPx: number;
  token: string;
  role: string;
  bestFor: string;
  cardAnatomyNote: string;
}

export const COMPONENT_PADDING_PRESETS: ComponentPaddingPreset[] = [
  {
    id: 'compact',
    name: 'Compact',
    paddingPx: 16,
    token: 'padding.compact (16px)',
    role: 'Operational & High-Density Analytical Cards',
    bestFor: 'Data grids, multi-card telemetry dashboards, compact sidebars, and dense monitoring feeds.',
    cardAnatomyNote: 'Maximizes information payload per viewport. Maintains 16px uniform padding with 8-12px internal vertical gaps.',
  },
  {
    id: 'standard',
    name: 'Standard',
    paddingPx: 24,
    token: 'padding.standard (24px)',
    role: 'Default Product Experience',
    bestFor: 'General SaaS workflows, campaign configuration cards, report cards, and modal dialogs.',
    cardAnatomyNote: 'The baseline default for Media Solutions. Provides balanced whitespace without sacrificing content density.',
  },
  {
    id: 'spacious',
    name: 'Spacious',
    paddingPx: 32,
    token: 'padding.spacious (32px)',
    role: 'Executive Briefings & High-Impact Insights',
    bestFor: 'Executive summary scorecards, featured recommendation showcases, and presentation takeaway cards.',
    cardAnatomyNote: 'Generous 32px padding creates an open, commanding presence suitable for high-value strategic takeaways.',
  },
];

export interface ContainerBehavior {
  id: 'full' | 'wide' | 'standard' | 'narrow';
  name: string;
  maxWidth: string;
  description: string;
  typicalContext: string;
}

export const CONTAINER_BEHAVIORS: ContainerBehavior[] = [
  {
    id: 'full',
    name: 'Full Bleed',
    maxWidth: '100% (Edge-to-Edge)',
    description: 'Spans full browser viewport width with controlled outer margin gutter. Reserved for data-dense telemetry tables, interactive map canvases, and media video showcases.',
    typicalContext: 'Real-time campaign telemetry, data grid viewports, video heroes.',
  },
  {
    id: 'wide',
    name: 'Wide Container',
    maxWidth: '1440px / 1600px',
    description: 'Generous container accommodating rich multi-metric dashboard grids (3 or 4 columns) without cramming columns or clipping charts.',
    typicalContext: 'Analytics dashboards, audience segmentation explorers, creative flight matrix.',
  },
  {
    id: 'standard',
    name: 'Standard Container',
    maxWidth: '1200px / 1280px',
    description: 'Default container for structured enterprise product workflows. Ensures 12-column grid spans comfortably at optimal line lengths.',
    typicalContext: 'Form wizards, settings workspaces, project overviews, standard report portals.',
  },
  {
    id: 'narrow',
    name: 'Narrow Editorial',
    maxWidth: '768px / 840px',
    description: 'Restricted measure designed for optimal typographical reading comfort (65–85 characters per line). Content does not stretch across wide desktop monitors.',
    typicalContext: 'Long-form editorial articles, executive briefings, case studies, legal terms.',
  },
];

export interface GridSpanExample {
  label: string;
  spans: number[];
  formula: string;
  description: string;
}

export const COMMON_GRID_SPANS: GridSpanExample[] = [
  { label: '3 + 9 Columns', spans: [3, 9], formula: '3 col + 9 col', description: 'Sidebar navigation / filter panel (3) + Primary workspace / analytical canvas (9).' },
  { label: '4 + 8 Columns', spans: [4, 8], formula: '4 col + 8 col', description: 'Campaign parameter inspector (4) + Interactive charts and live preview (8).' },
  { label: '6 + 6 Columns', spans: [6, 6], formula: '6 col + 6 col', description: 'Balanced side-by-side comparison: Flight Variant A vs Variant B.' },
  { label: '4 + 4 + 4 Columns', spans: [4, 4, 4], formula: '4 col + 4 col + 4 col', description: 'Tri-card KPI summary row (Spend, Reach, Efficiency).' },
  { label: '3 + 3 + 3 + 3 Columns', spans: [3, 3, 3, 3], formula: '3 col + 3 col + 3 col + 3 col', description: 'Quarterly telemetry metrics row or 4-channel attribution breakdown.' },
  { label: '8 + 4 Columns', spans: [8, 4], formula: '8 col + 4 col', description: 'Main story/data chart (8) + Contextual recommendations and quick actions dock (4).' },
  { label: '12 Columns (Full)', spans: [12], formula: '12 col', description: 'Comprehensive data table, hero display statement, or global telemetry banner.' },
];

export interface SectionSpacingPreset {
  id: 'tight' | 'standard' | 'spacious' | 'editorial';
  name: string;
  valuePx: number;
  token: string;
  description: string;
  usageScenario: string;
}

export const SECTION_SPACING_PRESETS: SectionSpacingPreset[] = [
  {
    id: 'tight',
    name: 'Tight',
    valuePx: 32,
    token: 'section.tight (32px / 40px)',
    description: 'Minimal separation between tightly coupled modules within the same conceptual workspace.',
    usageScenario: 'Filter bar to data table, tabs to active tab body, related card rows.',
  },
  {
    id: 'standard',
    name: 'Standard',
    valuePx: 48,
    token: 'section.standard (48px)',
    description: 'Default vertical distance between distinct functional sections on an operational dashboard.',
    usageScenario: 'KPI summary to visualization section, analytics chart to table row.',
  },
  {
    id: 'spacious',
    name: 'Spacious',
    valuePx: 64,
    token: 'section.spacious (64px)',
    description: 'Pronounced breathing room creating unambiguous visual boundaries between major workflow phases.',
    usageScenario: 'Dashboard body to secondary configuration modules, page body to global footer.',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    valuePx: 96,
    token: 'section.editorial (80px / 96px)',
    description: 'Expansive white space engineered for narrative storytelling, keynote presentations, and brand showcases.',
    usageScenario: 'Executive presentation chapters, long-form editorial narrative shifts.',
  },
];

export const SPACING_VALIDATION_QUESTIONS = [
  {
    id: 1,
    question: 'Does spacing create clear hierarchy without requiring additional decoration?',
    guidance: 'Whitespace should define group boundaries and hierarchy naturally. If borders, dividing lines, and drop shadows are needed to separate blocks, spacing is likely miscalibrated.',
  },
  {
    id: 2,
    question: 'Does the 4px-based scale feel coherent across components and pages?',
    guidance: 'All gaps, paddings, margins, and leadings must derive from the 4px base quantum (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96) without arbitrary odd numbers.',
  },
  {
    id: 3,
    question: 'Are 16 / 24 / 32 clearly differentiated as Compact / Standard / Spacious?',
    guidance: 'Compact (16px) feels dense and operational, Standard (24px) feels balanced, and Spacious (32px) feels open and executive without looking bloated.',
  },
  {
    id: 4,
    question: 'Does the system support both spacious editorial experiences and dense analytical products?',
    guidance: 'The same core scale flexes from dense 12px/16px data tools to 64px/96px editorial articles through semantic selection, never by inventing custom off-scale tokens.',
  },
  {
    id: 5,
    question: 'Does Dense remain readable and accessible?',
    guidance: 'Dense reduces white space between components (12-16px) and card padding (16px), but strictly preserves font sizes, hit targets (min 36-40px), and optical contrast.',
  },
  {
    id: 6,
    question: 'Does spacing communicate relationships between content blocks?',
    guidance: '"Spacing communicates relationship." Related elements are closer (4-8px), component internals are moderate (12-16px), and section boundaries are wide (32-48px).',
  },
  {
    id: 7,
    question: 'Does the 12-column grid provide flexibility without becoming restrictive?',
    guidance: 'The grid provides structural alignment across 3, 4, 6, 8, 9, and 12 column spans. Content dictates the span, the grid does not force unnatural layouts.',
  },
  {
    id: 8,
    question: 'Does responsive behavior preserve hierarchy?',
    guidance: 'As viewports shift from Desktop (12 col) to Tablet (6 col) and Mobile (4 col), cards stack gracefully and margins adjust proportionally without losing typographic hierarchy.',
  },
  {
    id: 9,
    question: 'Does the system avoid excessive card padding and excessive empty space?',
    guidance: 'Avoid empty voids where content appears lost in an ocean of padding; card padding should frame content securely.',
  },
  {
    id: 10,
    question: 'Does the system avoid cramped layouts?',
    guidance: 'Ensure elements never crowd each other or bleed against container borders; minimum separation between unrelated content is 24px.',
  },
];

export interface BrandHierarchyLevel {
  level: string;
  name: string;
  entity: string;
  scope: string;
  role: string;
  displayRule: string;
}

export interface HierarchyContextDisplayMode {
  id: 'full' | 'compact' | 'minimal';
  name: string;
  description: string;
  socialExample: string[];
  youtubeExample: string[];
}

export const BRAND_HIERARCHY_LEVELS: BrandHierarchyLevel[] = [
  {
    level: 'LEVEL 01',
    name: 'Ecosystem / Brand',
    entity: 'WPP Media Solutions LATAM',
    scope: 'Primary organizational context and broader digital media solutions ecosystem.',
    role: 'Establishes the highest-level brand context for the digital product ecosystem.',
    displayRule: 'Shown in primary header navigation, global footers, and official corporate reports.',
  },
  {
    level: 'LEVEL 02',
    name: 'Business Unit',
    entity: 'Creative Services LATAM',
    scope: 'Relevant business / capability capability unit within WPP Media Solutions LATAM.',
    role: 'Provides organizational context but does not need to appear in every product experience.',
    displayRule: 'Contextual metadata; omitted in high-density workflow canvases.',
  },
  {
    level: 'LEVEL 03',
    name: 'Product Family',
    entity: 'Creative Intelligence',
    scope: 'Shared product family identity connecting all creative intelligence digital tools.',
    role: 'Represents the common product family identity, not a generic descriptive label.',
    displayRule: 'Always visible as the anchoring product family identity.',
  },
  {
    level: 'LEVEL 04',
    name: 'Product / Application',
    entity: 'Social / YouTube',
    scope: 'Specific operational applications within the Creative Intelligence family.',
    role: 'Identifies which specialized tool the user is actively working in.',
    displayRule: 'Prominent active application identifier in header and workspace canvas.',
  },
];

export const CONTEXTUAL_DISPLAY_MODES: HierarchyContextDisplayMode[] = [
  {
    id: 'full',
    name: 'Full Contextual Expression',
    description: 'Displays all four levels for formal orientation, executive reporting, and cross-business navigation.',
    socialExample: [
      'WPP Media Solutions LATAM',
      'Creative Services LATAM',
      'Creative Intelligence',
      'Social',
    ],
    youtubeExample: [
      'WPP Media Solutions LATAM',
      'Creative Services LATAM',
      'Creative Intelligence',
      'YouTube',
    ],
  },
  {
    id: 'compact',
    name: 'Compact Expression',
    description: 'Omits business unit to balance global brand presence with focused product orientation.',
    socialExample: [
      'WPP Media Solutions LATAM',
      'Creative Intelligence',
      'Social',
    ],
    youtubeExample: [
      'WPP Media Solutions LATAM',
      'Creative Intelligence',
      'YouTube',
    ],
  },
  {
    id: 'minimal',
    name: 'Minimal / In-Tool Expression',
    description: 'Maximizes screen utility inside dense analytical workflows while preserving product family clarity.',
    socialExample: [
      'Creative Intelligence',
      'Social',
    ],
    youtubeExample: [
      'Creative Intelligence',
      'YouTube',
    ],
  },
];

export interface HeaderMasterSlot {
  slot: string;
  name: string;
  requirement: 'Configurable Slot' | 'Standard Slot';
  description: string;
}

export const HEADER_MASTER_SLOTS: HeaderMasterSlot[] = [
  {
    slot: '01',
    name: 'Brand Context',
    requirement: 'Configurable Slot',
    description: 'Slot for Level 01 brand identity (WPP Media Solutions LATAM). Optional text or mark depending on view.',
  },
  {
    slot: '02',
    name: 'Business Unit Context',
    requirement: 'Configurable Slot',
    description: 'Slot for Level 02 business unit (Creative Services LATAM). Included contextually where organizational grouping is helpful.',
  },
  {
    slot: '03',
    name: 'Product Family',
    requirement: 'Configurable Slot',
    description: 'Slot for Level 03 product family (Creative Intelligence). Shared anchor across all CI suite applications.',
  },
  {
    slot: '04',
    name: 'Product / Application',
    requirement: 'Configurable Slot',
    description: 'Slot for Level 04 specialized product (Social or YouTube). Communicates immediate tool context.',
  },
  {
    slot: '05',
    name: 'Navigation',
    requirement: 'Standard Slot',
    description: 'Contextual tabs, views, or filters relevant to the active application.',
  },
  {
    slot: '06',
    name: 'Actions',
    requirement: 'Standard Slot',
    description: 'User actions, export triggers, profile, and system utilities.',
  },
];

export const BRAND_HIERARCHY_PRINCIPLES = [
  {
    title: 'Typographic Expression Over Logo Stacking',
    description: 'Brand hierarchy is communicated through typography, scale, weight, spacing, and position. Multiple stacked logos create visual noise and are prohibited.',
  },
  {
    title: 'Logos Are Not Mandatory at Every Level',
    description: 'Official logos are reserved for official brand identification. Never create artificial logo combinations or redraw logos with styled text.',
  },
  {
    title: 'Contextual Metadata Schema',
    description: 'Treat the hierarchy as structured metadata: brand → businessUnit → productFamily → product. The future Header Master consumes metadata, never hardcoded strings.',
  },
  {
    title: 'Future Product Extensibility',
    description: 'Supports future Creative Intelligence applications (e.g., Creative Intelligence → Connected TV) without redesigning header architecture.',
  },
  {
    title: 'Reusable Brand Lockup — Single Shared Optical Axis',
    description: 'When official marks are combined in headers, use ONE unified horizontal lockup: [ WPP Media Solutions ] / [ Product Family ] / [ Application ]. All elements and separators align to a single shared horizontal optical axis. Supporting institutional identity is smaller (~0.75-0.8× product family), product family is primary scale, and application label is small restrained uppercase. Marks remain solid monochrome black / near-black (opacity-100, brightness-0 dark:invert).',
  },
  {
    title: 'Client Brand Compatibility',
    description: 'Media Solutions products coexist with diverse client brand identities (including strong brand colors like red, orange, yellow). The product system provides the neutral intelligence canvas; client content and branding remain the hero. Atmospheric treatments must remain controlled, subtle, and cool-shifted so they never clash or compete with client branding.',
  },
];

export const BRAND_LOCKUP_SPEC = {
  template: '[ WPP Media Solutions ]  /  [ Product Family ]  /  APPLICATION',
  axis: 'Single shared horizontal optical center line (h-6)',
  ecosystemScale: '0.75–0.8× Product Family scale (quiet, supporting, solid black)',
  productFamilyScale: '1.0× Primary visual scale (prominent, anchoring, solid black)',
  applicationScale: 'Small uppercase tracking-wide label (0.55×, bold, solid black)',
  separators: 'Subtle geometric slashes (strokeWidth 1.4, centered on axis)',
  colorRule: 'Strictly solid black / near-black (#171717 / dark: #FFFFFF). No colored logos.',
};

// ============================================================================
// WPP OPEN ALIGNMENT SPECIFICATION
// ============================================================================
export const WPP_OPEN_ALIGNMENT_SPEC = {
  ecosystemReference: 'WPP Open is the primary visual reference for the broader WPP digital ecosystem.',
  coreEthos: 'Recognizably WPP. Distinctly Media Solutions.',
  visualFormula: 'WPP first (#000050) → Media Solutions second (#AEF366) → Creative Intelligence third.',
  triad: {
    wppOpen: 'WPP Open → WPP visual ecosystem belonging (WPP Navy #000050, light spacious canvas, restrained borders, soft neutral backgrounds)',
    mediaSolutions: 'Media Solutions → product expression (Signature Lime #AEF366, intelligence compositions, editorial dataviz)',
    creativeIntelligence: 'Creative Intelligence → solution identity (solution scoring, progression ramp, modular analysis)',
  },
  primaryStructuralColor: {
    name: 'WPP Navy',
    hex: '#000050',
    role: 'Primary structural UI color replacing black across main navigation, sidebars, structural headers, important titles, navigation states, structural UI elements, and dark contextual surfaces.',
    character: 'Sophisticated, proprietary, intelligent, clean and lightweight. Not simply a mechanical black replacement.',
  },
  blackUsageDiscipline: {
    status: 'No longer a primary structural UI color',
    permitted: [
      'Running text',
      'Editorial body copy',
      'Content where maximum neutral contrast is appropriate',
    ],
    prohibitedAsDefault: [
      'Sidebars',
      'Main navigation',
      'Structural headers',
      'Primary titles',
      'Large UI surfaces',
      'Primary product framing',
    ],
  },
  limeDistinction: {
    name: 'Media Solutions Signature Lime',
    hex: '#AEF366',
    role: 'Intentional product-level distinction within WPP ecosystem. WPP Navy = ecosystem belonging; Media Solutions Lime = Media Solutions distinction.',
    permitted: [
      'Creative Intelligence identity',
      'Active indicators & selected states',
      'Small highlights & intelligence moments',
      'Product accents & important visual emphasis',
      'Approved data visualization contexts',
      'Atmospheric visual treatments when appropriate',
    ],
    prohibited: [
      'Dominant UI color flood',
      'Large surfaces as default',
      'Generic success indicator',
    ],
  },
  colorHierarchy: [
    { tier: 1, name: 'WPP Navy', hex: '#000050', role: 'Primary structural / brand color' },
    { tier: 2, name: 'White & neutral surfaces', hex: '#FFFFFF / #F8F8F7', role: 'Primary interface environment (predominantly light, spacious, clean)' },
    { tier: 3, name: 'WPP Blue', hex: '#5967F6', role: 'Interaction, information and supporting emphasis' },
    { tier: 4, name: 'Media Solutions Lime', hex: '#AEF366', role: 'Distinctive product accent' },
    { tier: 5, name: 'Violet', hex: '#7D72E8', role: 'Intelligence / advanced analysis / Creative Intelligence emphasis' },
    { tier: 6, name: 'Semantic colors', hex: '#35A864 / #D99000 / #D64545', role: 'Functional states (Success, Warning, Error)' },
  ],
  darkContexts: {
    defaultEnvironment: 'WPP Navy (#000050) replaces Black (#000000) as default dark contextual environment',
    scope: 'Intelligence experiences, featured dark sections, product identity moments, Creative Intelligence contexts, dark analytical compositions',
    rule: 'Do not create a separate "black mode." Dark is a contextual composition, not a global theme.',
  },
  typographicExpression: {
    rule: 'Titles and important headings preferentially use WPP Navy rather than Black.',
    preservation: 'Preserve approved typography system, scale and hierarchy. Do not increase font weights simply because the color has changed.',
    character: 'Spacious, light, editorial, intelligent, controlled.',
  },
};

export interface TypoScaleItem {
  id: string;
  context: 'Editorial' | 'Product UI' | 'Data' | 'Presentation';
  role: string;
  sizePx: number;
  lineHeightPx: number;
  defaultWeight: number; // 100 | 300 | 400 | 500 | 700 | 900
  weightLabel: string;
  letterSpacing?: string;
  sampleText: string;
  usageDescription: string;
}

export interface TypoExample {
  id: string;
  context: 'Editorial' | 'Product UI' | 'Data' | 'Presentation';
  role: string;
  sizePx: number;
  lineHeightPx: number;
  weight: number;
  weightName: string;
  tracking?: string;
  category: string;
  title: string;
  description: string;
}

export interface TypoValidationQuestion {
  id: number;
  question: string;
  contextScope: string;
  currentObservation: string;
  calibrationCheck: string;
}

export const INITIAL_EDITORIAL_SCALE: TypoScaleItem[] = [
  {
    id: 'ed-display',
    context: 'Editorial',
    role: 'Display',
    sizePx: 56,
    lineHeightPx: 60,
    defaultWeight: 300,
    weightLabel: '300 Light',
    letterSpacing: '-0.025em',
    sampleText: 'Intelligent Creative Architecture',
    usageDescription: 'Brand storytelling, hero landing statements, and editorial cover titles.',
  },
  {
    id: 'ed-h1',
    context: 'Editorial',
    role: 'H1',
    sizePx: 48,
    lineHeightPx: 56,
    defaultWeight: 300,
    weightLabel: '300 Light',
    letterSpacing: '-0.02em',
    sampleText: 'Media Solutions for Modern Brands',
    usageDescription: 'Primary article titles, narrative headers, and campaign intros.',
  },
  {
    id: 'ed-h2',
    context: 'Editorial',
    role: 'H2',
    sizePx: 40,
    lineHeightPx: 48,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '-0.015em',
    sampleText: 'Synthesizing Audience & Resonance',
    usageDescription: 'Major chapter markers and section dividing headlines.',
  },
  {
    id: 'ed-h3',
    context: 'Editorial',
    role: 'H3',
    sizePx: 32,
    lineHeightPx: 40,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '-0.01em',
    sampleText: 'The Convergence of Data and Craft',
    usageDescription: 'Subsection narrative leads and featured case study subheads.',
  },
  {
    id: 'ed-body-lg',
    context: 'Editorial',
    role: 'Body Large',
    sizePx: 18,
    lineHeightPx: 26,
    defaultWeight: 300,
    weightLabel: '300 Light',
    letterSpacing: '0em',
    sampleText: 'WPP Media powers marketing transformation across global creative ecosystems with rigorous methodology.',
    usageDescription: 'Lead paragraphs, executive summaries, and introductory narrative copy.',
  },
  {
    id: 'ed-body',
    context: 'Editorial',
    role: 'Body',
    sizePx: 16,
    lineHeightPx: 24,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '0em',
    sampleText: 'Editorial typography balances spacious rhythm and open whitespace to let thought and content breathe without excessive weight.',
    usageDescription: 'Standard reading paragraphs and editorial long-form articles.',
  },
];

export const INITIAL_PRODUCT_UI_SCALE: TypoScaleItem[] = [
  {
    id: 'ui-h1',
    context: 'Product UI',
    role: 'H1',
    sizePx: 40,
    lineHeightPx: 48,
    defaultWeight: 500,
    weightLabel: '500 Medium',
    letterSpacing: '-0.02em',
    sampleText: 'Campaign Performance Intelligence',
    usageDescription: 'Top-level workspace titles and primary dashboard page headers.',
  },
  {
    id: 'ui-h2',
    context: 'Product UI',
    role: 'H2',
    sizePx: 32,
    lineHeightPx: 40,
    defaultWeight: 500,
    weightLabel: '500 Medium',
    letterSpacing: '-0.015em',
    sampleText: 'Cross-Channel Audience Cohorts',
    usageDescription: 'Major dashboard module headers and modal view titles.',
  },
  {
    id: 'ui-h3',
    context: 'Product UI',
    role: 'H3',
    sizePx: 24,
    lineHeightPx: 32,
    defaultWeight: 500,
    weightLabel: '500 Medium',
    letterSpacing: '-0.01em',
    sampleText: 'Creative Saturation Velocity',
    usageDescription: 'Section titles inside panels, drawer headers, and card group titles.',
  },
  {
    id: 'ui-h4',
    context: 'Product UI',
    role: 'H4',
    sizePx: 20,
    lineHeightPx: 28,
    defaultWeight: 500,
    weightLabel: '500 Medium',
    letterSpacing: '-0.005em',
    sampleText: 'Active Media Allocations',
    usageDescription: 'Individual card titles, table headers, and container labels.',
  },
  {
    id: 'ui-body',
    context: 'Product UI',
    role: 'Body',
    sizePx: 16,
    lineHeightPx: 24,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '0em',
    sampleText: 'Configure flight schedules, budget caps, and programmatic audience constraints for optimized distribution.',
    usageDescription: 'Product dialogs, informative body copy, and tooltips.',
  },
  {
    id: 'ui-body-sm',
    context: 'Product UI',
    role: 'Body Small',
    sizePx: 14,
    lineHeightPx: 20,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '0em',
    sampleText: 'Real-time telemetry reflects live auction events recorded within the last 15 minutes across verified networks.',
    usageDescription: 'Compact card descriptions, table cell text, and contextual help.',
  },
  {
    id: 'ui-label',
    context: 'Product UI',
    role: 'Label',
    sizePx: 13,
    lineHeightPx: 18,
    defaultWeight: 500,
    weightLabel: '500 Medium',
    letterSpacing: '0.01em',
    sampleText: 'Selected Targeting Segment',
    usageDescription: 'Form field labels, button actions, tab labels, and filter controls.',
  },
  {
    id: 'ui-metadata',
    context: 'Product UI',
    role: 'Metadata',
    sizePx: 12,
    lineHeightPx: 16,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '0.015em',
    sampleText: 'Last synced: 2 mins ago · ID: 948-CTX',
    usageDescription: 'Timestamps, status captions, secondary chips, and system metadata.',
  },
  {
    id: 'ui-caption',
    context: 'Product UI',
    role: 'Caption',
    sizePx: 11,
    lineHeightPx: 14,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '0.02em',
    sampleText: 'CONFIDENTIAL · INTERNAL MEDIA OPERATIONS ONLY',
    usageDescription: 'Legal disclaimers, micro footnotes, and badge indicators.',
  },
];

export const INITIAL_DATA_SCALE: TypoScaleItem[] = [
  {
    id: 'data-metric-lg',
    context: 'Data',
    role: 'Metric Large',
    sizePx: 48,
    lineHeightPx: 52,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '-0.025em',
    sampleText: '$4.82M',
    usageDescription: 'Primary KPI metric values and executive scorecard totals. Calibrated to 400 Regular for optimal optical stem presence and glanceability without excessive weight.',
  },
  {
    id: 'data-metric-md',
    context: 'Data',
    role: 'Metric Medium',
    sizePx: 32,
    lineHeightPx: 38,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '-0.015em',
    sampleText: '+38.4%',
    usageDescription: 'Secondary KPI cards, breakdown cell summaries, and delta benchmarks.',
  },
  {
    id: 'data-label',
    context: 'Data',
    role: 'Data Label',
    sizePx: 13,
    lineHeightPx: 18,
    defaultWeight: 500,
    weightLabel: '500 Medium',
    letterSpacing: '0.01em',
    sampleText: 'Net Effective CPM',
    usageDescription: 'Metric titles, chart axis titles, and table column headers.',
  },
  {
    id: 'data-supporting',
    context: 'Data',
    role: 'Data Supporting',
    sizePx: 12,
    lineHeightPx: 16,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '0.01em',
    sampleText: 'vs. $3.48M target benchmark (-12.4% variance)',
    usageDescription: 'Comparative baseline notes, delta context, and sample size tags.',
  },
];

export const INITIAL_PRESENTATION_SCALE: TypoScaleItem[] = [
  {
    id: 'pres-display',
    context: 'Presentation',
    role: 'Display',
    sizePx: 64,
    lineHeightPx: 68,
    defaultWeight: 300,
    weightLabel: '300 Light',
    letterSpacing: '-0.03em',
    sampleText: 'The Future of Connected Media',
    usageDescription: 'Executive presentation hero titles, keynote cover statements, and billboard narrative.',
  },
  {
    id: 'pres-h1',
    context: 'Presentation',
    role: 'H1',
    sizePx: 48,
    lineHeightPx: 56,
    defaultWeight: 300,
    weightLabel: '300 Light',
    letterSpacing: '-0.02em',
    sampleText: 'Omnichannel Precision at Global Scale',
    usageDescription: 'Slide headlines and presentation section transition statements.',
  },
  {
    id: 'pres-h2',
    context: 'Presentation',
    role: 'H2',
    sizePx: 32,
    lineHeightPx: 40,
    defaultWeight: 400,
    weightLabel: '400 Regular',
    letterSpacing: '-0.01em',
    sampleText: 'Driving measurable value across 32 regional clusters',
    usageDescription: 'Presentation subheaders and slide section takeaway markers.',
  },
  {
    id: 'pres-supporting',
    context: 'Presentation',
    role: 'Supporting',
    sizePx: 18,
    lineHeightPx: 26,
    defaultWeight: 300,
    weightLabel: '300 Light',
    letterSpacing: '0em',
    sampleText: 'Strategic creative intelligence synthesizes live market feedback into deterministic campaign deployment.',
    usageDescription: 'Executive narrative bullets, slide takeaways, and contextual pull quotes.',
  },
];

export const VALIDATION_QUESTIONS: TypoValidationQuestion[] = [
  {
    id: 1,
    question: 'Does WPP still feel light and spacious?',
    contextScope: 'All Contexts',
    currentObservation:
      'WPP retains its distinctive open, airy elegance when default weights are kept to 300 Light and 400 Regular with generous line heights (e.g. 56/60 and 48/56 in Editorial).',
    calibrationCheck: 'Verify that line height ratios remain between 1.15 and 1.50 and letter tracking does not crowd glyphs.',
  },
  {
    id: 2,
    question: 'Is hierarchy being created primarily through scale and spacing rather than weight?',
    contextScope: 'System Wide',
    currentObservation:
      'Scale step ratios (40 → 32 → 24 → 20 → 16 → 14 → 13 → 12) combined with generous margins create unmistakable visual order without needing 700 Bold or 900 Black.',
    calibrationCheck: 'Ensure headlines stay readable and prioritized purely by 8–16px size steps rather than resorting to heavy strokes.',
  },
  {
    id: 3,
    question: 'Are Product UI weights strong enough for clarity without becoming visually heavy?',
    contextScope: 'Product UI',
    currentObservation:
      '500 Medium gives headers (40px, 32px, 24px) and small interactive elements (13px labels, button texts) razor-sharp legibility without dark visual clutter.',
    calibrationCheck: 'Reserve 700 Bold strictly for rare selected states or critical micro-alerts, never default cards.',
  },
  {
    id: 4,
    question: 'Do Data metrics have enough hierarchy without excessive boldness?',
    contextScope: 'Data Context',
    currentObservation:
      'Metric Large (48/52 · 400 Regular) and Metric Medium (32/38 · 400 Regular) command immediate focal attention through physical scale while preserving solid stem presence.',
    calibrationCheck: 'Confirm that large metrics at 400 Regular remain effortlessly readable at glance distance on both light and dark surfaces without becoming heavy.',
  },
  {
    id: 5,
    question: 'Do Editorial and Presentation contexts feel sufficiently distinct from Product UI?',
    contextScope: 'Editorial vs Product UI',
    currentObservation:
      'Editorial & Presentation employ larger display sizes (56px–64px), lighter baseline weights (300 Light), and looser leading, whereas Product UI remains compact, calibrated, and structured.',
    calibrationCheck: 'Observe contrast between an open narrative hero (Editorial) versus a dense KPI matrix (Product UI).',
  },
  {
    id: 6,
    question: 'Does the scale work consistently across the existing Color System and Surface Contexts?',
    contextScope: 'Surface Cross-Validation',
    currentObservation:
      'WPP weights (300, 400, 500) maintain crisp contrast on neutral.0 (Light), neutral.900/1000 (Dark), and against the diffuse Lime→Violet Featured Gradient.',
    calibrationCheck: 'Inspect 16px body copy and 12px metadata across all three surface contexts to confirm zero loss of fidelity.',
  },
  {
    id: 7,
    question: 'Is Sentence Case strictly enforced across all general UI copy?',
    contextScope: 'System Wide',
    currentObservation:
      'Sentence case is the default style across page titles, section headings, card titles, navigation items, tabs, buttons, labels, form fields, metrics, status labels, empty states, and tooltips. Title Case is strictly prohibited for general UI copy.',
    calibrationCheck:
      'Audit interface copy to verify zero Title Case regressions. Confirm that only official proper names, brands, products, platforms, and acronyms retain capitalization (e.g. WPP Media, Creative Intelligence, Meta, YouTube, AI).',
  },
];

export interface CapitalizationRuleSpec {
  principle: string;
  defaultStyle: string;
  prohibitedStyle: string;
  scope: string[];
  exceptions: {
    category: string;
    examples: string;
  }[];
  examples: {
    incorrect: string;
    correct: string;
    explanation?: string;
  }[];
}

export const GLOBAL_CAPITALIZATION_RULE: CapitalizationRuleSpec = {
  principle: 'Sentence case is the default. Title Case is not allowed for general UI copy.',
  defaultStyle: 'Sentence case',
  prohibitedStyle: 'Title Case',
  scope: [
    'Page titles',
    'Section headings',
    'Card titles',
    'Navigation items',
    'Tabs',
    'Buttons',
    'Labels',
    'Form fields',
    'Metrics',
    'Status labels',
    'Supporting UI copy',
    'Product interface copy',
    'Empty states',
    'Tooltips',
    'Messages and notifications',
  ],
  exceptions: [
    { category: 'Brand names', examples: 'WPP Media, WPP Media Solutions' },
    { category: 'Company names', examples: 'WPP' },
    { category: 'Product names', examples: 'Creative Intelligence' },
    { category: 'Platform names', examples: 'Meta, YouTube, TikTok, Instagram' },
    { category: 'Official solution names', examples: 'Creative Intelligence — Social, Creative Intelligence — YouTube' },
    { category: 'Acronyms', examples: 'AI, KPI, CPM, ABCD, VTR, ROAS, CTR, CTV' },
    { category: 'Proper nouns', examples: 'Colombia, México, Brasil, Solaria Activewear' },
  ],
  examples: [
    {
      incorrect: 'Creative Intelligence Dashboard',
      correct: 'Creative Intelligence dashboard',
      explanation: 'Product name capitalized, general UI descriptor in lowercase',
    },
    {
      incorrect: 'Progreso Del Análisis',
      correct: 'Progreso del análisis',
      explanation: 'UI heading converted to sentence case',
    },
    {
      incorrect: 'View All Results',
      correct: 'View all results',
      explanation: 'Button action converted to sentence case',
    },
    {
      incorrect: 'Explore Creative',
      correct: 'Explore creative',
      explanation: 'Action link converted to sentence case',
    },
  ],
};

export const DATA_TYPOGRAPHY_RULE =
  'Data hierarchy begins with scale and spacing. Weight increases only when required for legibility and rapid recognition.';

export interface SystemWeightGuidance {
  weight: number;
  name: string;
  isOperational: boolean;
  status: 'OPERATIONAL SYSTEM WEIGHT' | 'NOT RECOMMENDED FOR SYSTEM USE';
  guidance: string;
  officialLabel?: string;
  rejectionReason?: string;
}

export const TYPOGRAPHY_WEIGHT_PRINCIPLE =
  'Not every available font weight belongs in the design system. The system selects weights based on legibility, hierarchy and functional context.';

export const OPERATIONAL_WEIGHTS: SystemWeightGuidance[] = [
  {
    weight: 300,
    name: 'Light',
    isOperational: true,
    status: 'OPERATIONAL SYSTEM WEIGHT',
    guidance: 'Editorial large-scale typography and spacious storytelling.',
  },
  {
    weight: 400,
    name: 'Regular',
    isOperational: true,
    status: 'OPERATIONAL SYSTEM WEIGHT',
    guidance: 'Default reading and content weight.',
  },
  {
    weight: 500,
    name: 'Medium',
    isOperational: true,
    status: 'OPERATIONAL SYSTEM WEIGHT',
    guidance: 'Product UI, labels, navigation and moderate emphasis.',
  },
  {
    weight: 700,
    name: 'Bold',
    isOperational: true,
    status: 'OPERATIONAL SYSTEM WEIGHT',
    guidance: 'Strong hierarchy, headings and selected UI emphasis.',
  },
  {
    weight: 900,
    name: 'Black',
    isOperational: true,
    status: 'OPERATIONAL SYSTEM WEIGHT',
    guidance: 'Exceptional display moments only. Never default.',
  },
];

export const RESTRICTED_FONT_ASSET: SystemWeightGuidance = {
  weight: 100,
  name: 'Thin',
  isOperational: false,
  status: 'NOT RECOMMENDED FOR SYSTEM USE',
  guidance: 'Excluded from operational typography roles, component options, and presets.',
  officialLabel: 'Official font asset — not recommended for system use due to legibility.',
  rejectionReason:
    'The weight is too fine for reliable legibility across typical product, dashboard, data, navigation, label, and body-text contexts.',
};

// ============================================================================
// WPP NAVY TYPOGRAPHIC EXPRESSION (WPP OPEN ALIGNMENT)
// ============================================================================
export const WPP_NAVY_HEADING_EXPRESSION = {
  rule: 'Titles and important headings should preferentially use WPP Navy (#000050) rather than Black.',
  colorHex: '#000050',
  tokenRef: 'brand.navy.500',
  preservationPrinciple: 'Preserve the existing approved typography system, scale and hierarchy. Do NOT increase font weights simply because the color has changed.',
  typographicCharacter: [
    'Spacious',
    'Light',
    'Editorial',
    'Intelligent',
    'Controlled',
  ],
  scopeOfApplication: [
    'Page titles (H1)',
    'Major chapter & section headings (H2)',
    'Card and analytical section titles (H3)',
    'High-level navigation titles & headers',
    'Executive report headlines & cover statements',
  ],
  bodyTextContrastRule: 'Black (#000000) and high-contrast dark neutrals (neutral.900 #171717) remain reserved primarily for running text and editorial body copy where maximum neutral contrast is appropriate.',
};

// ============================================================================
// GLOBAL MASTER RULE 03: NO TITLE CASE
// ============================================================================
export const NO_TITLE_CASE_SPEC = {
  rule: 'NO TITLE CASE.',
  standard: 'Normal product and report language must use Sentence case.',
  scope: [
    'Page titles and view headers',
    'Section and chapter headings',
    'Card titles, subtitles, and labels',
    'Navigation items, links, and tabs',
    'Buttons and interactive triggers',
    'Form labels, placeholders, and error messages',
    'Metric labels, tooltips, and badges',
    'Empty states and notification banners',
  ],
  preservedExceptions: [
    'Official brand names (e.g., WPP Media Solutions, Media Solutions)',
    'Product family and application names (e.g., Creative Intelligence, Social, YouTube)',
    'Platform names (e.g., Meta, Instagram, Facebook, TikTok, YouTube)',
    'Proper nouns and territory names (e.g., North America, EMEA, Colombia, Mexico)',
    'Established acronyms (e.g., AI, CTV, KPI, CPM, CTR, ROAS, VCR)',
  ],
  examples: {
    correct: [
      'Creative Intelligence dashboard',
      'Progreso del análisis',
      'View all results',
      'Explore creative',
      'Campaign performance intelligence',
      'Active spend pacing',
    ],
    incorrect: [
      'Creative Intelligence Dashboard',
      'Progreso Del Análisis',
      'View All Results',
      'Explore Creative',
      'Campaign Performance Intelligence',
      'Active Spend Pacing',
    ],
  },
};

// ============================================================================
// GLOBAL MASTER RULE 04: NO ROBOTIC TYPOGRAPHY
// ============================================================================
export const ANTI_ROBOTIC_TYPOGRAPHY_SPEC = {
  rule: 'ROBOTIC TYPOGRAPHY IS A MISUSE OF THE SYSTEM.',
  axiom: 'Technology should be communicated through information, data, composition, interaction, and intelligence — not through artificial technical typography.',
  intendedCharacter: [
    'Natural',
    'Human',
    'Editorial',
    'Contemporary',
  ],
  prohibitedPractices: [
    'Monospace as general product visual language',
    'Excessive letter spacing or tracking expansions',
    'Artificial tracking on sentence copy',
    'Decorative uppercase or wide uppercase phrases',
    'Small caps styling for general headings or copy',
    'Terminal-like labels or console prefixes (e.g., [SYS-OK], >> EXEC)',
    'Code-like metadata styling for human editorial findings',
    'Character-by-character artificial spacing',
    'Technical-console or sci-fi UI aesthetics',
  ],
  permittedMonospaceExceptions: [
    'System IDs and unique record hashes',
    'Exact timestamps and date-time strings',
    'Image/video technical dimensions (e.g., 1080x1920)',
    'Exact file names and asset extensions (e.g., video_flight_v2.mp4)',
    'API route references and parameter keys',
    'Actual code-like expressions or developer query snippets',
  ],
};



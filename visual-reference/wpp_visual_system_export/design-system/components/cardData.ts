export interface CardSpec {
  id: string;
  name: string;
  category: 'container' | 'pattern';
  purpose: string;
  anatomy: string[];
  paddingRules: string[];
  radiusRules: string[];
  surfaceRules: string[];
  restrictions: string[];
}

export const CARD_CORE_ARCHITECTURE = {
  title: 'Card Container Architecture',
  definition: 'Card is a container. Content determines the card\'s purpose.',
  rule: 'Do not create separate foundational components for every content combination.',
  principles: [
    'Content owns the Card width. Utility elements adapt around it.',
    'Tags and Status elements support the content hierarchy; they do not define the content column.',
    'Local compositions should not become global columns.',
    'When space becomes constrained, contextual metadata moves into the content flow rather than compressing the primary content.',
    'Content length should influence composition, not force content into a rigid layout.',
    'Surface contrast first. Border second. Shadow last.',
    'No decorative shadows: standard product surfaces must NOT use decorative shadows. The default elevation treatment is box-shadow: none.',
    'No default grey outlines: standard product surfaces should not automatically receive a visible grey border when contrast against background suffices.',
    'Border as function, not decoration: a border communicates focus, selection, active state, structural separation, or semantic state, never decorative completeness.',
    'A card is a container, not automatically a visually elevated object. Visual definition comes from content grouping, spacing, surface contrast, typography, position, and context.',
    'Content may grow. Structure must remain stable.',
    'Not Everything Needs to Be a Card: Content thrives when permitted to exist as open page-level compositions, editorial surfaces, atmospheric environments, and media-led narratives rather than forcing every element into a bounded container.',
    'Page Canvas vs Component Surface: The page canvas governs broad visual atmosphere, editorial rhythm, and large-scale transitions; component surfaces govern localized grouping, scoped interaction, and encapsulated data.',
    'Narrative Visual Hierarchy: Primary Story → Supporting Evidence → Context → Action. Establish visual weight through scale, position, surface context, and spacing before adding containers.',
  ],
  layers: [
    {
      name: 'Surface',
      required: true,
      description: 'The background plane, border, and radius defining the visual boundary. Governed by Surface Contrast First.',
    },
    {
      name: 'Header',
      required: false,
      description: 'Optional top zone for context and scoping. May contain Eyebrow, Title, Description, Icon, Status, and Contextual action.',
    },
    {
      name: 'Content',
      required: true,
      description: 'The required body of the card. May contain Text, Metric, Image, Video, Chart, Insight, Recommendation, or Media Gallery.',
    },
    {
      name: 'Footer',
      required: false,
      description: 'Optional bottom zone for closure and progression. May contain Metadata, Timestamp, Source, CTA button, or Contextual action.',
    },
  ],
};

export const CARD_PADDING_PRESETS = [
  {
    id: 'compact',
    token: 'spacing.16 (16px)',
    px: 16,
    purpose: 'Dense, analytical, operational, or space-constrained data grids and sidebars.',
    context: 'Data-heavy table cells, compact monitoring widgets, multi-column analytics dashboards.',
  },
  {
    id: 'standard',
    token: 'spacing.24 (24px)',
    px: 24,
    purpose: 'Default product experience across standard application workflows.',
    context: 'Main dashboard widgets, insight summaries, campaign configuration steps, feed cards.',
  },
  {
    id: 'spacious',
    token: 'spacing.32 (32px)',
    px: 32,
    purpose: 'Featured, editorial, high-impact, or executive overview cards with breathing room.',
    context: 'Executive hero summaries, high-impact campaign showcases, modal central containers.',
  },
];

export const CARD_RADIUS_PRESETS = [
  {
    id: 'default',
    radius: '16px',
    tailwind: 'rounded-[16px]',
    purpose: 'Standard card containers across 95% of product layouts.',
    rule: 'Provides structured, modern architecture without becoming pill-like or playful.',
  },
  {
    id: 'large',
    radius: '24px',
    tailwind: 'rounded-[24px]',
    purpose: 'Large, featured, or modal cards where strong spatial grouping is required.',
    rule: 'Reserved for prominent viewport anchors and deep featured compositions.',
  },
];

export const CARD_CONTENT_PATTERNS = [
  {
    id: '01',
    name: 'Text Card',
    type: 'Editorial / Narrative / Summary',
    description: 'Long-form narrative, executive brief, campaign overview, or policy notice.',
    elements: ['Eyebrow', 'Headline', 'Paragraph body', 'Source/Author metadata', 'Timestamp'],
  },
  {
    id: '02',
    name: 'Metric Card',
    type: 'Quantitative KPI / Telemetry',
    description: 'Primary numeric indicator accompanied by trajectory, comparison baseline, and pacing.',
    elements: ['Data Label (13px)', 'Metric Large (48px) / Medium (32px)', 'Delta StatusBadge', 'Supporting baseline (12px)', 'Pacing sparkline'],
  },
  {
    id: '03',
    name: 'Image Card',
    type: 'Visual Asset / Creative Creative Asset',
    description: 'Static visual asset container supporting 16:9, 4:3, 1:1, 3:4, or full-bleed ratios.',
    elements: ['Aspect-ratio media container', 'Asset classification tag', 'Headline', 'Dimensions & format specs', 'Download/inspect CTA'],
  },
  {
    id: '04',
    name: 'Video Card',
    type: 'Moving Creative / Ad Flight Stream',
    description: 'Video preview with embedded duration chip, platform tag, play control, and stream metadata.',
    elements: ['Thumbnail', 'Platform badge (YouTube / CTV)', 'Duration chip', 'Play IconButton', 'Title & channel info', 'Flight specs'],
  },
  {
    id: '05',
    name: 'Chart Card',
    type: 'Analytical Visualization',
    description: 'Structured chart frame with header filters, visual series canvas, and legend/summary footer.',
    elements: ['Header with Time Range Tabs', 'Metric roll-up header', 'SVG Chart Canvas', 'Legend series pills', 'Data freshness footer'],
  },
  {
    id: '06',
    name: 'Insight Card',
    type: 'Observation / Pattern Finding',
    description: 'Explains an analytical finding. Content classifications (Finding, Strength, Pattern, Opportunity) are taxonomical—NOT semantic alerts.',
    elements: ['Insight Type Eyebrow', 'Finding Headline', 'Detailed Explanation', 'Evidence Data Callout', 'Source model & confidence tag'],
  },
  {
    id: '07',
    name: 'Recommendation Card',
    type: 'Prescriptive Action Engine',
    description: 'Prescribes an actionable change based on telemetry. Structured rationale with direct action CTA.',
    elements: ['Action Type Tag', 'Recommendation Title', 'Strategic Rationale', 'Estimated Impact metric', 'Execute Action Button (pill)'],
  },
  {
    id: '08',
    name: 'Carousel / Media Card',
    type: 'Multi-Asset Navigable Sequence',
    description: 'Composable Card wrapping sequential media items with navigation controls and position indicators.',
    elements: ['Media canvas (16:9)', 'Slide indicator dots', 'Previous / Next IconButtons (32px)', 'Docked asset summary', 'Direct action link'],
  },
];

export const CALIBRATION_QUESTIONS_CARDS = [
  {
    id: 'C-01',
    title: 'Card Surface Separation vs. Page Canvas',
    question: 'In light mode on #F8F8F7 canvas, should standard cards use a white (#FFFFFF) background with subtle border, or transparent surface with border-only?',
    principle: 'Surface contrast first. Borders delineate boundaries; background delta defines depth.',
  },
  {
    id: 'C-02',
    title: 'Featured Card Gradient Boundary',
    question: 'How should the Featured Gradient (Lime + Violet) be confined within cards to prevent visual distraction from primary content?',
    principle: 'Featured treatment is subtle ambient illumination (max 15% opacity), never an opaque decorative fill.',
  },
  {
    id: 'C-03',
    title: 'Card Header Sub-Element Density',
    question: 'What is the maximum number of metadata items permitted in a Card Header before triggering a layout split?',
    principle: 'Header must stay concise: Eyebrow + Title + 1 contextual action/status badge maximum.',
  },
  {
    id: 'C-04',
    title: 'Interactive Card Affordance Standards',
    question: 'When a card is clickable as a whole, what visual cues are mandatory (e.g., hover border change, focus ring, trailing arrow icon)?',
    principle: 'Clear interactive affordance without excessive scale transforms or dramatic shadow jumps.',
  },
  {
    id: 'C-05',
    title: 'Metric Card Typographic Dominance',
    question: 'Should secondary metrics (e.g., benchmark comparison or prior period delta) reside inline with the metric or in a dedicated supporting slot?',
    principle: 'The KPI must remain visually dominant (48px or 32px regular), with deltas positioned as supporting metadata.',
  },
  {
    id: 'C-06',
    title: 'Insight Card Taxonomy vs. Semantic State',
    question: 'Why must Insight classifications (Finding, Strength, Pattern, Opportunity) avoid automatic Red/Green/Yellow styling?',
    principle: 'Content classification describes analytical nature, not error/success operational alarms.',
  },
  {
    id: 'C-07',
    title: 'Recommendation Card Action Hierarchy',
    question: 'When a Recommendation card contains both "Apply" and "Dismiss", how should the button variants be assigned?',
    principle: 'Exactly one Primary button (Lime) for the affirmative action; Secondary or Tertiary for dismissal.',
  },
  {
    id: 'C-08',
    title: 'Media Card Bleed vs. Contained Padding',
    question: 'When should images/videos bleed to the card edges versus sitting inset with the card’s standard internal padding?',
    principle: 'Top-bleed is approved when media serves as the visual hero; inset is required for technical diagrams and analytical charts.',
  },
  {
    id: 'C-09',
    title: 'Carousel Navigation Affordance & Accessibility',
    question: 'Should carousel next/prev controls sit floating over media or docked in the card header/footer?',
    principle: 'Docked controls ensure 100% legibility and focus visibility without obscuring media content.',
  },
  {
    id: 'C-10',
    title: 'Grid Row Height Synchronization',
    question: 'In multi-card dashboard rows, should cards be forced to stretch to equal height (flex-1/h-full) or adapt to their natural content height?',
    principle: 'Grid alignment should harmonize container heights while allowing content internal spacing to breathe naturally.',
  },
];

export const CARD_COMPOSITION_PRINCIPLES = [
  'Card composition belongs to Layout. Card meaning belongs to Content.',
  'Card height is content-driven by default.',
  'Different Card sizes are a layout decision, not a new Card type.',
  'Featured means higher priority, not more decoration.',
  'Expansion changes Card height, not Card width.',
  'Responsive behavior should reflow the composition, not redesign the Card.',
];

export const CARD_NESTED_SURFACE_PRINCIPLES = [
  'Nested content should feel embedded, not boxed.',
  'Use one separation cue at a time.',
  'Treatment A — Subtle Surface: Background #F8F8F7, Border NONE, Shadow NONE, Radius 12px.',
  'Treatment B — Border Container: Background #FFFFFF, Border 1px solid #D4D4D3, Shadow NONE, Radius 12px.',
  'Surface Treatment uses fill without border.',
  'Border Treatment uses border without fill.',
  'Never combine gray fill and border for nested content.',
  'Parent Card establishes dominant container boundary; nested elements never visually compete with the parent Card.',
  'Monospace is used selectively for metadata, timestamps, and analytical values, not global debug panels.',
];

export const CARD_ACTIONS_FOOTER_PRINCIPLES = [
  'Card actions should support the content hierarchy, not compete with it.',
  'Actions support the Card’s purpose; they do not define its visual hierarchy.',
  'One primary action is usually enough.',
  'Metadata informs. Actions enable.',
  'Expand controls reveal information; primary actions perform tasks.',
  'Footer is optional and content-driven.',
  'Content owns the Card width. Utility adapts around it.',
  'Do not turn the Card Footer into a toolbar.',
  'Do not reserve fixed footer height or empty vertical space.',
  'Media controls belong to the media layer; Card actions belong to the Card hierarchy.',
  'Primary action is visually dominant; secondary action remains quieter.',
  'Actions participate in normal document flow — zero absolute positioning or fixed columns.',
];

export const CARD_ACCESSIBILITY_INTERACTION_PRINCIPLES = [
  'Accessibility is part of the Card architecture, not an additional visual layer.',
  'Interactive behavior must be communicated through more than color or motion.',
  'Semantic controls are preferred over simulated interactions.',
  'Focus must always remain visible across all surface contexts.',
  'Expandable state must be understandable without animation.',
  'Responsive behavior must preserve accessibility.',
  'Do not create accessible variants. Make the system itself accessible.',
  'Tab order must follow visual and semantic reading order.',
  'Touch targets must maintain minimum usable interaction dimensions.',
  'Long content wraps naturally without clipping essential meaning.',
];

export const CARD_SYSTEM_LOCKED_SPECIFICATION = {
  version: 'v1.0',
  status: 'APPROVED · LOCKED',
  sections: [
    '01 · Card Architecture',
    '02 · Structural Resilience',
    '03 · Content Configurations',
    '04 · Metric Card',
    '05 · Insight Card',
    '06 · Recommendation Card',
    '07 · Media Cards',
    '08 · Card States & Behavior',
    '09 · Expandable Card',
    '10 · Card Composition & Layout',
    '11 · Nested Data Surface Treatments',
    '12 · Card Actions & Footer',
    '13 · Accessibility & Interaction',
    '14 · Final Audit & Consolidation',
  ],
  inheritedFoundations: [
    '01 · Color System v1.0',
    '02 · Typography System v1.0',
    '03 · Spacing & Layout v1.0',
    '04 · Core Components v1.0',
  ],
  finalPrinciples: [
    'Card is a container. Content determines its purpose.',
    'Card composition belongs to Layout. Card meaning belongs to Content.',
    'Content owns the Card width. Utility adapts around it.',
    'Card height is content-driven by default.',
    'Expansion changes Card height, not Card width.',
    'Nested content should feel embedded, not boxed.',
    'Use one separation cue at a time.',
    'Featured means higher priority, not more decoration.',
    'Actions support the Card’s purpose; they do not define its visual hierarchy.',
    'Accessibility is part of the Card architecture.',
  ],
  nestedDataSurfaceRule: {
    treatmentA: { surface: '#F8F8F7', border: 'NONE', radius: '12px' },
    treatmentB: { surface: '#FFFFFF', border: '1px solid #D4D4D3', radius: '12px' },
    invariant: 'NEVER combine gray fill + border for neutral nested data surfaces.',
  },
};

// ============================================================================
// MASTER UPDATE — SURFACE, BORDER & ELEVATION PRINCIPLES
// Reusable, product-agnostic evolution promoted from Dashboard validation.
// ============================================================================

export const SURFACE_BORDER_ELEVATION_SPEC = {
  corePhilosophy: 'Surface contrast first. Border second. Shadow last.',
  subPhilosophy: 'No decorative shadow. No automatic grey outline. No unnecessary elevation.',
  summary: 'The goal is not to eliminate borders and shadows completely. The goal is to make them intentional rather than default.',
  
  // 1. Surface Contrast First
  surfaceContrastFirst: {
    rule: 'Surface contrast first. Border second. Shadow last.',
    description: 'Standard product surfaces should primarily be differentiated through surface color, background contrast, spacing, layout, and typography hierarchy. A component should not require a border or shadow simply to communicate that it is a container.',
    primaryDifferentiators: [
      'Surface color',
      'Background contrast',
      'Spacing & padding',
      'Layout & positioning',
      'Typography hierarchy & weight',
    ],
  },

  // 2. No Decorative Shadows
  elevationRules: {
    defaultTreatment: 'box-shadow: none;',
    rule: 'Standard product surfaces must NOT use decorative shadows. Do not use shadows simply to make a card appear more dimensional.',
    prohibitedSurfaces: [
      'Cards',
      'Standard content containers',
      'Dashboard panels',
      'Report sections',
      'Navigation surfaces',
      'Metric containers',
      'Data surfaces',
      'Content groups',
      'Product shells',
    ],
    allowedOverlayExceptions: [
      'Dropdowns',
      'Popovers',
      'Tooltips',
      'Modals & dialogs',
      'Flyout menus',
      'Other transient physical overlays',
    ],
  },

  // 3. No Default Grey Outlines
  borderOutlines: {
    rule: 'Standard product surfaces should not automatically receive a visible grey border.',
    prohibitedDefaults: [
      'Grey outlines around every card',
      'Grey outlines around every section',
      'Borders as a default card treatment',
      'Border + shadow combinations',
    ],
    guidance: 'When a surface already has sufficient contrast against its background (e.g. white #FFFFFF on #F8F8F7 canvas), no border is required. Use borders only when they provide a clear functional or structural purpose.',
  },

  // 4. Border as Function, Not Decoration
  borderFunctionality: {
    rule: 'A border should communicate something. Do not add a border simply because the element is a card.',
    validReasons: [
      { reason: 'Focus', description: 'Keyboard focus ring (2px Blue/Violet ring) for active accessibility.' },
      { reason: 'Selection', description: 'Selected state in multi-item pickers, active tabs, or choices.' },
      { reason: 'Active State', description: 'Interactive trigger, pressed state, or running execution indicator.' },
      { reason: 'Structural Separation', description: 'Boundary definition where background contrast alone is optically insufficient.' },
      { reason: 'Semantic State', description: 'Status notification: Error (Red), Warning (Amber), or Success (Green).' },
      { reason: 'Special Visual Treatment', description: 'Contextual gradient borders for active intelligence or process stages.' },
      { reason: 'Interactive State', description: 'Subtle hover affordance on clickable containers.' },
      { reason: 'Component Boundaries', description: 'Dividers and bounds that genuinely require definition (e.g. table headers).' },
    ],
  },

  // 5. Special Visual Treatments
  specialVisualTreatments: {
    rule: 'Special borders remain allowed when they have intentional meaning. They must remain contextual and NOT become the default border treatment for every card or section.',
    example: 'A Lime → Blue → Violet gradient border may communicate an active intelligence/process state. It should not automatically be applied to standard cards.',
    allowedContexts: [
      'Active intelligence',
      'Process / analysis states',
      'Featured experiences',
      'Product moments',
      'Approved Special Visual Treatments',
    ],
  },

  // 6 & 7. Dashboard & Report Applications
  productApplications: {
    dashboard: {
      defaultSurfaces: 'White / approved light surface (#FFFFFF), neutral page canvas (#F8F8F7), no shadow, no decorative grey outline.',
      specialTreatment: 'The Dashboard may use a special gradient border for an intentional active intelligence / process container. This is a Dashboard-specific application of the global principle, not a global requirement that every product use the same gradient.',
    },
    report: {
      philosophy: 'Client Reports should avoid turning every section into an elevated card.',
      elements: [
        'Page-level composition',
        'Surface contrast',
        'Spacing & white space',
        'Editorial hierarchy',
        'Selective containers',
        'Intentional special treatments',
      ],
      guidance: 'Standard report surfaces should not automatically use shadows or grey outlines. Existing approved atmospheric backgrounds, dark intelligence contexts, and gradient special treatments remain valid when contextual and purposeful.',
    },
  },

  // 8. Card System Relationship
  cardRelationship: {
    axiom: 'A card is a container, not automatically a visually elevated object.',
    viableWithout: ['Shadow', 'Visible border', 'Strong background contrast'],
    definitionFrom: ['Content grouping', 'Spacing', 'Surface contrast', 'Typography', 'Position', 'Context'],
    warning: 'Do not force every content group into a visually heavy card.',
  },
};

// 9. Design Decision Hierarchy
export const DESIGN_DECISION_HIERARCHY = [
  {
    step: 1,
    question: 'Can spacing establish the relationship?',
    guidance: 'Increase or calibrate gap, padding, and layout whitespace before adding visual lines or boxes.',
  },
  {
    step: 2,
    question: 'Can surface contrast establish the relationship?',
    guidance: 'Differentiate via surface background tone (e.g. pure white #FFFFFF on soft neutral #F8F8F7 canvas).',
  },
  {
    step: 3,
    question: 'Is a border actually necessary?',
    guidance: 'Only add a border if it communicates focus, selection, active state, semantic error, or essential structure.',
  },
  {
    step: 4,
    question: 'Is elevation actually necessary?',
    guidance: 'Only add a shadow if the element physically floats over other content (modals, dropdowns, popovers, tooltips).',
  },
];

// 10. AI Guardrails
export const AI_SURFACE_GUARDRAILS = [
  'Do not add shadows or grey borders by default to make containers feel finished or structured.',
  'Do not turn every content group into a visually elevated card.',
  'Prefer surface contrast, spacing, and composition before borders or elevation.',
  'Standard product surfaces must default to box-shadow: none.',
  'When a surface already has sufficient contrast against its background, no border is required.',
];

// 11. Visual QA Checklist
export const SURFACE_ELEVATION_QA_CHECKLIST = [
  {
    id: 'QA-01',
    check: 'Are standard cards free of unnecessary shadows?',
    expected: 'box-shadow: none across all standard cards and dashboard panels.',
  },
  {
    id: 'QA-02',
    check: 'Are grey borders being used only when they communicate a function?',
    expected: 'Borders exist for focus, selection, active state, or necessary separation; zero default decorative outlines.',
  },
  {
    id: 'QA-03',
    check: 'Does the page still have clear hierarchy without decorative elevation?',
    expected: 'Typography, scale, surface contrast, and spacing define clear visual hierarchy.',
  },
  {
    id: 'QA-04',
    check: 'Are special gradient borders contextual rather than repetitive?',
    expected: 'Gradient borders reserved for active intelligence / process containers; not cloned across ordinary cards.',
  },
  {
    id: 'QA-05',
    check: 'Is the interface relying on composition and surface contrast rather than card elevation?',
    expected: 'Editorial layout and open page compositions prevail over heavy card containment.',
  },
  {
    id: 'QA-06',
    check: 'Does the product feel lightweight and spacious?',
    expected: 'Ecosystem character aligned with WPP Open: sophisticated, intelligent, clean, and lightweight.',
  },
];



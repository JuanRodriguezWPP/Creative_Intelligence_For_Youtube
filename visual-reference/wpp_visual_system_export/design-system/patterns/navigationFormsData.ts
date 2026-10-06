export interface NavigationHierarchyLevel {
  level: string;
  scope: string;
  description: string;
  examples: string[];
}

export interface FormFieldSpec {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'toggle' | 'textarea';
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  state?: 'default' | 'focus' | 'error' | 'success' | 'disabled';
  validationMessage?: string;
}

export const NAV_HIERARCHY_LEVELS: NavigationHierarchyLevel[] = [
  {
    level: 'GLOBAL',
    scope: 'Product-level navigation',
    description: 'Persistent across the entire Media Solutions ecosystem. Connects major product suites and global account context.',
    examples: ['Media Solutions Suite Switcher', 'Notification Center', 'Global Settings', 'User Profile'],
  },
  {
    level: 'PRODUCT',
    scope: 'Navigation inside a specific product',
    description: 'Stable primary sidebar or top shell navigation defining the core modules of the current application.',
    examples: ['Dashboard', 'Campaigns', 'Audiences', 'Creatives', 'Reports', 'Settings'],
  },
  {
    level: 'SECTION',
    scope: 'Navigation between related views',
    description: 'In-page or sub-header tabs switching between related perspectives of the current entity or dataset.',
    examples: ['Overview', 'Performance', 'Findings', 'Recommendations', 'Asset History'],
  },
  {
    level: 'CONTEXTUAL',
    scope: 'Navigation related to current content',
    description: 'Orienting anchors and directional controls allowing backward traversal or step-by-step sequential movement.',
    examples: ['Breadcrumbs', 'Back to campaign list', 'Previous / next asset', 'View full ledger'],
  },
];

export const NAV_FORMS_PRINCIPLES_SUMMARY = [
  'Navigation answers: "Where am I? Where can I go?"',
  'Forms answer: "What do I need to provide? What choices can I make?"',
  'Forms are neutral by default. Color appears when interaction or meaning requires it.',
  'Focus should be visible without becoming visually heavy.',
  'Whitespace establishes form hierarchy before color does.',
  'Filters answer: "What part of the information do I want to see?"',
  'Actions answer: "What can I do next?"',
  'Navigation uses color to communicate location, not decoration.',
  'Active navigation may use the approved Blue → Violet gradient as a contextual state treatment; Hover remains restrained.',
  'Checkboxes, Radios, and Toggles possess fixed visual containers and independent label content areas; controls never visually overlap text or adjacent controls.',
  'Buttons are intentionally pill-shaped (radius: 999px); Inputs and Selects are structured rounded (radius: 8px).',
  'Do not put every field inside its own Card. Use hierarchy, grouping, and spacing first.',
  'Existing Core Components provide consistency; composition creates sophistication.',
];

export const ACTIVE_FILTER_TAGS = [
  { id: 'campaign', label: 'Campaign', value: 'Q4 Nike Flight' },
  { id: 'market', label: 'Market', value: 'North America (US/CA)' },
  { id: 'date', label: 'Date', value: 'Last 30 days' },
  { id: 'channel', label: 'Channel', value: 'Connected TV' },
];

export const MOCK_BREADCRUMBS = [
  { label: 'Media Solutions', href: '#' },
  { label: 'Campaign portfolio', href: '#' },
  { label: 'Q4 Omnichannel Push', href: '#' },
  { label: 'Audience targeting', isCurrent: true },
];

export const FORM_DENSITY_SPEC = {
  comfortable: {
    padding: 'p-6',
    gap: 'space-y-6',
    fieldGap: 'space-y-2',
    labelSize: 'text-sm',
    inputHeight: 'h-11',
    description: 'Optimized for high-intent creation, complex onboarding, and multi-step workflows.',
  },
  standard: {
    padding: 'p-5',
    gap: 'space-y-4',
    fieldGap: 'space-y-1.5',
    labelSize: 'text-xs',
    inputHeight: 'h-9',
    description: 'Default product density balancing scanning speed and visual breathing room.',
  },
  dense: {
    padding: 'p-3.5',
    gap: 'space-y-3',
    fieldGap: 'space-y-1',
    labelSize: 'text-[11px]',
    inputHeight: 'h-8',
    description: 'For analytical configuration, advanced filter drawers, and data-dense operational tables.',
  },
};

// ============================================================================
// GLOBAL MASTER PATTERN 06: FLOATING SECTION NAVIGATION PATTERN
// Promoted from approved Dashboard & Report validation
// ============================================================================
export const FLOATING_SECTION_NAVIGATION_SPEC = {
  name: 'Floating Section Navigation Pattern',
  role: 'Reusable product pattern for Dashboards and Reports requiring navigation between major thematic sections.',
  placement: 'Sits laterally within the page composition as independent floating navigation items.',
  contentRule: {
    rule: 'ICON + TEXT (Always include both)',
    rationale: 'Never depend on icon-only navigation when labels are necessary for user comprehension.',
  },
  visualWeight: 'Visually lightweight; avoids heavy continuous sidebar chrome when the product layout does not require one.',
  states: {
    inactive: {
      surface: 'Light / white surface (#FFFFFF)',
      textColor: 'WPP Navy (#000050)',
      iconColor: 'WPP Navy (#000050)',
      shadow: 'box-shadow: none (zero decorative shadow)',
      border: 'No unnecessary grey border (clean surface contrast)',
    },
    active: {
      surface: 'Light Blue / Blue-tinted surface (e.g. #F0F2FD / #E8EBFD)',
      textColor: 'WPP Navy (#000050, bold/medium)',
      iconColor: 'WPP Navy (#000050)',
      indicator: 'Small Signature Lime (#AEF366) indicator pip when appropriate',
      prohibited: 'No heavy saturated block fill, no glow, no shadow',
    },
    hover: {
      surface: 'Subtle light neutral / blue tint hover surface',
      transition: '150ms ease-out',
    },
  },
  architecturalBoundary: 'The navigation is a composition pattern, NOT a mandatory layout for every product.',
};

// ============================================================================
// GLOBAL MASTER PATTERN 07: STICKY NAVIGATION BEHAVIOR
// ============================================================================
export const STICKY_NAVIGATION_BEHAVIOR_SPEC = {
  name: 'Sticky Section Navigation Behavior',
  preferredCSS: 'position: sticky;',
  prohibitedDefault: 'position: fixed; (do NOT default to fixed viewport pinning)',
  behavioralLaws: [
    'Begins within the normal document flow',
    'Follows the page smoothly during natural scrolling',
    'Remains visible while navigating through the relevant section content',
    'Strictly respects the boundaries of its parent content area (stops at container end)',
    'Never covers, overlays, or occludes main content',
  ],
  guardrail: 'Sticky navigation should be a deliberate product pattern, not a global mandatory requirement.',
};

export const VISUAL_QA_CHECKLIST = [
  'Navigation hierarchy clearly distinguishes Global, Product, Section, and Contextual levels',
  'Active navigation state uses restrained Blue → Violet gradient without shadows, glow, or borders; Hover is subtle light surface',
  'Checkboxes, Radios, and Toggles possess fixed visual containers and independent label content areas; controls never visually overlap text',
  'Tabs are used strictly for related in-context views, not primary product navigation',
  'Filter Bar distinguishes primary filters, active filter tags, and advanced filters drawer',
  'Active filters consume approved Core Tags with concise value labels and removal actions',
  'Buttons strictly retain the approved pill geometry (radius: 9999px)',
  'Inputs, Selects, and Textareas retain approved structured rounded geometry (radius: 8px)',
  'Forms avoid "card-in-card" anti-patterns; grouping is achieved via whitespace and typography',
  'Every input has a persistent visible label, never relying on placeholder text alone',
  'Forms are neutral by default; complementary colors appear only when interaction or meaning requires it',
  'Focus uses a subtle 2px Blue/Violet ring without heavy black outlines or double borders',
  'Entered text in inputs remains neutral primary text; placeholder text is neutral and distinct',
  'Multi-select selected tags are restrained and neutral without saturated color pills',
  'File Upload empty dropzone and icon are predominantly neutral without competing with primary CTA',
  'Validation errors are specific, close to the input, and provide actionable resolution steps',
  'Date Range clearly communicates Start Date → End Date without ambiguous formats',
  'Mobile responsive transformation stacks fields and preserves 40px+ touch targets',
  'Primary button remains the strongest visual action on the form (Lime pill)',
  'Whitespace and 4px spacing rhythm establish form hierarchy before color does',
];

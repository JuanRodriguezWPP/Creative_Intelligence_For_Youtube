import { ColorToken } from '../types/tokens';
import { getContrastRatio, hexToRgb } from '../utils/colorMath';

const WHITE = '#FFFFFF';
const BLACK = '#000000';

function createToken(
  id: string,
  tokenName: string,
  family: ColorToken['family'],
  hex: string,
  role: string,
  options: Partial<ColorToken> = {}
): ColorToken {
  const lightContrast = getContrastRatio(hex, WHITE);
  const darkContrast = getContrastRatio(hex, BLACK);
  const rgbObj = hexToRgb(hex);

  // Derive CSS variable name from tokenName (e.g. neutral.500 -> --color-neutral-500)
  const cssVar = `--color-${tokenName.replace(/\./g, '-')}`;

  return {
    id,
    name: tokenName,
    tokenName,
    cssVar,
    family,
    hex: hex.toUpperCase(),
    rgb: `rgb(${rgbObj.r}, ${rgbObj.r}, ${rgbObj.b})`,
    role,
    lightContrastRatio: lightContrast,
    darkContrastRatio: darkContrast,
    accessibleTextOnLight: lightContrast >= 4.5,
    accessibleTextOnDark: darkContrast >= 4.5,
    status: 'approved',
    ...options,
  };
}

// 1. FOUNDATION NEUTRALS
export const FOUNDATION_NEUTRALS: ColorToken[] = [
  createToken('neutral-0', 'neutral.0', 'foundation', '#FFFFFF', 'Pure light canvas, primary card surface, crisp whitespace foundation.', {
    subfamily: 'neutral',
    step: '0',
    usageRule: 'Default base background for light interface environment.',
  }),
  createToken('neutral-50', 'neutral.50', 'foundation', '#F8F8F7', 'Subtle environment background, alternating row surface, secondary viewport canvas.', {
    subfamily: 'neutral',
    step: '50',
    usageRule: 'Default page viewport background in light environment.',
  }),
  createToken('neutral-100', 'neutral.100', 'foundation', '#F2F2F1', 'Secondary surface, subtle inset containers, inactive button surface.', {
    subfamily: 'neutral',
    step: '100',
  }),
  createToken('neutral-200', 'neutral.200', 'foundation', '#E6E6E5', 'Structural hairline dividers, subtle card borders, table column separators.', {
    subfamily: 'neutral',
    step: '200',
    usageRule: 'Primary structural border token for level 1 and 2 surfaces.',
  }),
  createToken('neutral-300', 'neutral.300', 'foundation', '#D4D4D3', 'Interactive input borders, control outlines, hover surface boundaries.', {
    subfamily: 'neutral',
    step: '300',
  }),
  createToken('neutral-500', 'neutral.500', 'foundation', '#8A8A88', 'Secondary metadata, helper text, muted iconography, table column headers.', {
    subfamily: 'neutral',
    step: '500',
  }),
  createToken('neutral-700', 'neutral.700', 'foundation', '#454544', 'Body text secondary, active icons, dark surface soft text.', {
    subfamily: 'neutral',
    step: '700',
  }),
  createToken('neutral-900', 'neutral.900', 'foundation', '#171717', 'Running text, editorial body copy, and secondary headings. Black is no longer a primary structural UI color (replaced by WPP Navy #000050).', {
    subfamily: 'neutral',
    step: '900',
    usageRule: 'Running text and editorial body copy (14.2:1 contrast against neutral.0). Not for sidebars or structural headers.',
  }),
  createToken('neutral-1000', 'neutral.1000', 'foundation', '#000000', 'Absolute black, maximum neutral contrast text anchor.', {
    subfamily: 'neutral',
    step: '1000',
    usageRule: 'Reserved primarily for running text, editorial body copy, and content requiring maximum neutral contrast. Prohibited as default for sidebars, navigation, or structural framing.',
  }),
];

// 2. WPP NAVY — PRIMARY STRUCTURAL COLOR (WPP Open Ecosystem Alignment)
export const WPP_NAVY_TOKENS: ColorToken[] = [
  createToken('brand-navy-50', 'brand.navy.50', 'brand', '#F0F0FA', 'Subtle WPP Navy tint for soft container headers, selected structural items, and hover fills.', {
    subfamily: 'navy',
    step: '50',
    usageRule: 'Lightest structural tint for high-level information framing.',
  }),
  createToken('brand-navy-100', 'brand.navy.100', 'brand', '#E2E2F5', 'Soft navy border, structural divider tone, and inactive structural tabs.', {
    subfamily: 'navy',
    step: '100',
  }),
  createToken('brand-navy-200', 'brand.navy.200', 'brand', '#B8B8E6', 'Supporting navy boundary, structural graphic elements, and subtle borders.', {
    subfamily: 'navy',
    step: '200',
  }),
  createToken('brand-navy-300', 'brand.navy.300', 'brand', '#7070BF', 'Mid-tone structural navy for secondary metadata in dark contexts and interactive borders.', {
    subfamily: 'navy',
    step: '300',
  }),
  createToken('brand-navy-500', 'brand.navy.500', 'brand', '#000050', 'WPP Navy: Primary structural UI color. Replaces black for main navigation, sidebars, structural headers, important titles, navigation states, structural UI elements, and dark contextual surfaces.', {
    subfamily: 'navy',
    step: '500',
    isPrimaryAccent: true,
    usageRule: 'PRIMARY STRUCTURAL COLOR: WPP Navy (#000050) establishes WPP Open ecosystem belonging. Used for main navigation, sidebars, structural headers, primary titles, navigation states, and dark contextual surfaces.',
  }),
  createToken('brand-navy-700', 'brand.navy.700', 'brand', '#00003D', 'Deep structural navy for nested dark panels and high-depth borders in dark contexts.', {
    subfamily: 'navy',
    step: '700',
  }),
  createToken('brand-navy-900', 'brand.navy.900', 'brand', '#000028', 'Deepest navy foundation for immersive analytical environments and dark contrast anchors.', {
    subfamily: 'navy',
    step: '900',
  }),
];

// 3. BRAND LIME (Media Solutions Signature Distinction)
export const BRAND_LIME_TOKENS: ColorToken[] = [
  createToken('brand-lime-100', 'brand.lime.100', 'brand', '#F3FBDD', 'Subtle brand tint, soft highlight background, selected row tint.', {
    subfamily: 'lime',
    step: '100',
    usageRule: 'Subtle brand presence without saturating container.',
  }),
  createToken('brand-lime-300', 'brand.lime.300', 'brand', '#D5F9A0', 'Secondary brand boundary, interactive hover highlight, active indicator border.', {
    subfamily: 'lime',
    step: '300',
  }),
  createToken('brand-lime-500', 'brand.lime.500', 'brand', '#AEF366', 'Media Solutions Signature Lime: Distinctive product accent. Selective usage for Creative Intelligence identity, active indicators, selected states, highlights, and intelligence moments.', {
    subfamily: 'lime',
    step: '500',
    isPrimaryAccent: true,
    usageRule: 'MEDIA SOLUTIONS DISTINCTION: Media Solutions Signature Lime (#AEF366) represents intentional product distinction within the WPP Open ecosystem (WPP Navy = WPP ecosystem belonging; Media Solutions Lime = Media Solutions distinction). Used selectively for Creative Intelligence identity, active indicators, selected states, small highlights, intelligence moments, product accents, and approved dataviz.',
  }),
  createToken('brand-lime-700', 'brand.lime.700', 'brand', '#79B83D', 'High-contrast lime boundary on light surfaces, accessible graphical mark.', {
    subfamily: 'lime',
    step: '700',
  }),
  createToken('brand-lime-900', 'brand.lime.900', 'brand', '#385C19', 'Deep brand tone, text-safe brand label on lime-100 surfaces.', {
    subfamily: 'lime',
    step: '900',
    usageRule: 'Accessible dark lime text on light backgrounds (8.6:1 against white).',
  }),
];

// 3. SUPPORTING BLUE (Supports information & supporting interaction)
export const SUPPORTING_BLUE_TOKENS: ColorToken[] = [
  createToken('blue-100', 'blue.100', 'supporting', '#EEF0FF', 'Subtle information background, interactive hover tint, callout fill.', {
    subfamily: 'blue',
    step: '100',
  }),
  createToken('blue-200', 'blue.200', 'supporting', '#DDE1FF', 'Soft blue surface, informational border, badge boundary.', {
    subfamily: 'blue',
    step: '200',
  }),
  createToken('blue-400', 'blue.400', 'supporting', '#A8B0FA', 'Secondary supporting blue, active tech state, graphical element.', {
    subfamily: 'blue',
    step: '400',
  }),
  createToken('blue-500', 'blue.500', 'supporting', '#5967F6', 'Primary supporting interaction, informational anchor, secondary links, active tech states.', {
    subfamily: 'blue',
    step: '500',
    usageRule: 'Blue supports information and supporting interaction.',
  }),
  createToken('blue-600', 'blue.600', 'supporting', '#4654D9', 'High-contrast technical tone, hover state for blue interactions.', {
    subfamily: 'blue',
    step: '600',
  }),
  createToken('blue-700', 'blue.700', 'supporting', '#3541AE', 'Deep technical blue, accessible text on light backgrounds (6.4:1 against neutral.0).', {
    subfamily: 'blue',
    step: '700',
  }),
];

// 4. SUPPORTING VIOLET (Supports intelligence, analysis and AI-related emphasis)
export const SUPPORTING_VIOLET_TOKENS: ColorToken[] = [
  createToken('violet-100', 'violet.100', 'supporting', '#F2F0FF', 'Subtle intelligence tint, insight card backdrop, AI finding container fill.', {
    subfamily: 'violet',
    step: '100',
  }),
  createToken('violet-200', 'violet.200', 'supporting', '#E3DEFF', 'Soft violet boundary, intelligence tag outline.', {
    subfamily: 'violet',
    step: '200',
  }),
  createToken('violet-400', 'violet.400', 'supporting', '#B7AEF8', 'Secondary violet indicator, analysis chart mark.', {
    subfamily: 'violet',
    step: '400',
  }),
  createToken('violet-500', 'violet.500', 'supporting', '#7D72E8', 'Primary intelligence accent, creative scoring emphasis, algorithmic analysis highlight.', {
    subfamily: 'violet',
    step: '500',
    usageRule: 'Violet supports intelligence, analysis and AI-related emphasis.',
  }),
  createToken('violet-600', 'violet.600', 'supporting', '#665BC8', 'High-contrast intelligence tone, hover state for analysis controls.', {
    subfamily: 'violet',
    step: '600',
  }),
  createToken('violet-700', 'violet.700', 'supporting', '#50479E', 'Deep intelligence violet, accessible text on light backgrounds (5.5:1 against neutral.0).', {
    subfamily: 'violet',
    step: '700',
  }),
];

// 5. SEMANTIC PALETTE
// Success: Green represents semantic success and must remain distinct from brand lime.
export const SEMANTIC_SUCCESS_TOKENS: ColorToken[] = [
  createToken('success-100', 'success.100', 'semantic', '#EAF8EF', 'Subtle success background, completed task fill.', {
    subfamily: 'success',
    step: '100',
  }),
  createToken('success-200', 'success.200', 'semantic', '#D2F0DC', 'Soft success surface, operational outline.', {
    subfamily: 'success',
    step: '200',
  }),
  createToken('success-500', 'success.500', 'semantic', '#35A864', 'Primary semantic success indicator and operational status icon. Distinct from Brand Lime.', {
    subfamily: 'success',
    step: '500',
    usageRule: 'Green represents semantic success and must remain distinct from brand lime.',
  }),
  createToken('success-600', 'success.600', 'semantic', '#27864E', 'Accessible success text on light backgrounds (4.5:1 against neutral.0).', {
    subfamily: 'success',
    step: '600',
  }),
];

// Warning
export const SEMANTIC_WARNING_TOKENS: ColorToken[] = [
  createToken('warning-100', 'warning.100', 'semantic', '#FFF4DE', 'Subtle warning container fill, alert banner background.', {
    subfamily: 'warning',
    step: '100',
  }),
  createToken('warning-200', 'warning.200', 'semantic', '#FFE6B3', 'Soft warning surface, attention boundary.', {
    subfamily: 'warning',
    step: '200',
  }),
  createToken('warning-500', 'warning.500', 'semantic', '#D99000', 'Primary warning alert icon and caution state.', {
    subfamily: 'warning',
    step: '500',
    usageRule: 'Communicates caution or pending requirement.',
  }),
  createToken('warning-600', 'warning.600', 'semantic', '#A96E00', 'Accessible warning text on light backgrounds (4.6:1 against neutral.0).', {
    subfamily: 'warning',
    step: '600',
  }),
];

// Error
export const SEMANTIC_ERROR_TOKENS: ColorToken[] = [
  createToken('error-100', 'error.100', 'semantic', '#FDECEC', 'Subtle error message container fill, failure state background.', {
    subfamily: 'error',
    step: '100',
  }),
  createToken('error-200', 'error.200', 'semantic', '#F8D0D0', 'Soft error boundary, input failure outline ring.', {
    subfamily: 'error',
    step: '200',
  }),
  createToken('error-500', 'error.500', 'semantic', '#D64545', 'Primary error icon, critical alert marker, destructive action.', {
    subfamily: 'error',
    step: '500',
    usageRule: 'Communicates destructive action or system failure.',
  }),
  createToken('error-600', 'error.600', 'semantic', '#B83232', 'Accessible error text on light backgrounds (5.1:1 against neutral.0).', {
    subfamily: 'error',
    step: '600',
  }),
];

// Info (reusing Blue family as requested: "Info should reuse the blue family rather than introducing another independent blue.")
export const SEMANTIC_INFO_TOKENS: ColorToken[] = [
  createToken('info-100', 'info.100', 'semantic', '#EEF0FF', 'Informational container background. Reuses blue.100.', {
    subfamily: 'info',
    step: '100',
    reusedFrom: 'blue.100',
    usageRule: 'Reuses blue.100 per system rule.',
  }),
  createToken('info-200', 'info.200', 'semantic', '#DDE1FF', 'Informational boundary outline. Reuses blue.200.', {
    subfamily: 'info',
    step: '200',
    reusedFrom: 'blue.200',
    usageRule: 'Reuses blue.200 per system rule.',
  }),
  createToken('info-500', 'info.500', 'semantic', '#5967F6', 'Primary informational status indicator. Reuses blue.500.', {
    subfamily: 'info',
    step: '500',
    reusedFrom: 'blue.500',
    usageRule: 'Reuses blue.500 per system rule.',
  }),
  createToken('info-600', 'info.600', 'semantic', '#4654D9', 'High-contrast informational text. Reuses blue.600.', {
    subfamily: 'info',
    step: '600',
    reusedFrom: 'blue.600',
    usageRule: 'Reuses blue.600 per system rule.',
  }),
];

export const ALL_CALIBRATION_TOKENS: ColorToken[] = [
  ...FOUNDATION_NEUTRALS,
  ...WPP_NAVY_TOKENS,
  ...BRAND_LIME_TOKENS,
  ...SUPPORTING_BLUE_TOKENS,
  ...SUPPORTING_VIOLET_TOKENS,
  ...SEMANTIC_SUCCESS_TOKENS,
  ...SEMANTIC_WARNING_TOKENS,
  ...SEMANTIC_ERROR_TOKENS,
  ...SEMANTIC_INFO_TOKENS,
];

// Token lookups by explicit name
export const CALIBRATION_TOKEN_MAP = new Map<string, ColorToken>(
  ALL_CALIBRATION_TOKENS.map(t => [t.tokenName, t])
);

// 6-Tier Conceptual Color Hierarchy per WPP Open Alignment Update
export interface ColorHierarchyLevel {
  tier: number;
  name: string;
  tokenRef: string;
  hex: string;
  role: string;
  ecosystemMeaning: string;
  permittedUsage: string[];
  prohibitedUsage: string[];
}

export const WPP_COLOR_HIERARCHY: ColorHierarchyLevel[] = [
  {
    tier: 1,
    name: 'WPP Navy',
    tokenRef: 'brand.navy.500',
    hex: '#000050',
    role: 'Primary structural / brand color',
    ecosystemMeaning: 'WPP Open ecosystem belonging — replaces black as default structural UI color.',
    permittedUsage: [
      'Main navigation',
      'Sidebars',
      'Structural headers',
      'Important titles & headings',
      'Navigation states',
      'Structural UI elements',
      'Dark contextual surfaces',
      'WPP brand hierarchy',
      'High-level product framing',
    ],
    prohibitedUsage: [
      'Generic data series marks',
      'Body text paragraphs (neutral.900/1000 preferred)',
      'Arbitrary decorative flood',
    ],
  },
  {
    tier: 2,
    name: 'White & neutral surfaces',
    tokenRef: 'neutral.0 / neutral.50',
    hex: '#FFFFFF / #F8F8F7',
    role: 'Primary interface environment',
    ecosystemMeaning: 'Predominantly light, spacious, clean canvas inspired by WPP Open visual language.',
    permittedUsage: [
      'Page canvas background',
      'White content surfaces & cards',
      'Restrained hairline dividers (neutral.200 #E6E6E5)',
      'Running text & body copy (neutral.900 #171717 / neutral.1000 #000000)',
    ],
    prohibitedUsage: [
      'Over-saturating interface with dark backgrounds across default views',
    ],
  },
  {
    tier: 3,
    name: 'WPP Blue',
    tokenRef: 'blue.500',
    hex: '#5967F6',
    role: 'Interaction, information and supporting emphasis',
    ecosystemMeaning: 'Interactive controls, active telemetry, information badges, and single-series data progression.',
    permittedUsage: [
      'Global focus ring (2px blue/violet ring)',
      'Interactive links & secondary actions',
      'Active telemetry curves',
      'Informational chips & badges',
      'Single-series chart baseline',
    ],
    prohibitedUsage: [
      'Overriding WPP Navy as structural brand identity',
      'Decorative container backgrounds',
    ],
  },
  {
    tier: 4,
    name: 'Media Solutions Signature Lime',
    tokenRef: 'brand.lime.500',
    hex: '#AEF366',
    role: 'Distinctive product accent',
    ecosystemMeaning: 'Intentional product distinction: WPP Navy = WPP ecosystem belonging; Media Solutions Lime = Media Solutions distinction.',
    permittedUsage: [
      'Creative Intelligence identity',
      'Active indicators & selected states',
      'Small highlights & pips',
      'Intelligence moments',
      'Product accents',
      'Approved dataviz contexts',
      'Contextual atmospheric treatments',
    ],
    prohibitedUsage: [
      'Dominant UI surface flood',
      'Generic success indicator',
      'Body copy or small label text on white',
    ],
  },
  {
    tier: 5,
    name: 'Supporting Violet',
    tokenRef: 'violet.500',
    hex: '#7D72E8',
    role: 'Intelligence, advanced analysis and Creative Intelligence emphasis',
    ecosystemMeaning: 'AI reasoning, machine intelligence, creative scoring, and deep analytical telemetry.',
    permittedUsage: [
      'Creative scoring metrics',
      'AI recommendation highlights',
      'Predictive curves & heatmaps',
      'Intelligence progression ramp (Blue → Violet)',
    ],
    prohibitedUsage: [
      'Structural shell framing',
      'Generic non-AI UI chrome',
    ],
  },
  {
    tier: 6,
    name: 'Semantic colors',
    tokenRef: 'success.500 / warning.500 / error.500',
    hex: '#35A864 / #D99000 / #D64545',
    role: 'Functional states & operational feedback',
    ecosystemMeaning: 'Unambiguous state communication: Success, Warning, Error.',
    permittedUsage: [
      'Success confirmation (Green #35A864, strictly distinct from Lime)',
      'Warning alerts & caution states (#D99000)',
      'Critical errors & destructive actions (#D64545)',
    ],
    prohibitedUsage: [
      'Brand decoration',
      'Substituting Lime for success',
    ],
  },
];

// Dark Context Principles
export const DARK_CONTEXT_PRINCIPLES = {
  defaultColor: '#000050', // WPP Navy
  tokenRef: 'brand.navy.500',
  title: 'WPP Navy as default dark contextual environment',
  axiom: 'DARK IS A CONTEXT, NOT A MODE.',
  description: 'Dark contexts now use WPP Navy (#000050) rather than Black (#000000). Dark is an intentional contextual composition, not a global mode or product theme.',
  prohibitedRule: 'Do not create a separate "black mode." Do not convert every section into a dark section. Black (#000000) is reserved primarily for running text, typography, content, and imagery, not structural surfaces.',
  useCases: [
    'Intelligence experiences',
    'Analysis environments',
    'Featured dark sections',
    'Hero sections & narrative anchors',
    'Product identity moments',
    'Creative Intelligence contexts',
    'Dark analytical compositions & advanced insights',
  ],
};

// ============================================================================
// GLOBAL MASTER RULE 01: STRUCTURAL DARK COLOR
// ============================================================================
export const STRUCTURAL_DARK_COLOR_SPEC = {
  approvedColor: '#000050',
  name: 'WPP Navy',
  tokenRef: 'brand.navy.500',
  rule: 'WPP Navy #000050 is the approved structural dark color across the Master Visual System.',
  scope: [
    'Dark navigation contexts',
    'Dark intelligence contexts',
    'Dark featured contexts',
    'Dark Hero contexts',
    'Dark analytical surfaces',
    'Other intentional dark product compositions',
  ],
  blackRole: {
    status: 'Black #000000 must NOT be used as a default structural UI surface.',
    permittedRoles: [
      'Body text where appropriate',
      'Content',
      'Typography',
      'Imagery',
      'Genuine content-specific usage',
    ],
    prohibition: 'Do NOT globally eliminate Black from the palette.',
  },
  fundamentalDistinction: {
    black: 'BLACK = content / typography',
    wppNavy: 'WPP NAVY = structural dark context',
  },
};

// ============================================================================
// GLOBAL MASTER RULE 02: LIME AS PRODUCT DIFFERENTIATOR
// ============================================================================
export const LIME_DIFFERENTIATOR_SPEC = {
  hex: '#AEF366',
  name: 'Media Solutions Signature Lime',
  tokenRef: 'brand.lime.500',
  role: 'Intentional product differentiator establishing Media Solutions within WPP.',
  selectiveUses: [
    'Active states & navigation pips',
    'Key emphasis & callouts',
    'Brand accents & signatures',
    'Progress indications & milestones',
    'Intelligence highlights & scores',
    'Important state transitions',
    'Approved special visual treatments',
  ],
  prohibitedUses: [
    'Dominant surface color flood',
    'Large background fills as default',
    'Generic success indicator (Green #35A864 is reserved for success)',
  ],
};

// ============================================================================
// GLOBAL MASTER RULE 08: ATMOSPHERIC DARK VISUAL TREATMENT
// ============================================================================
export const ATMOSPHERIC_DARK_TREATMENT_SPEC = {
  status: 'Approved Special Visual Treatment (Contextual)',
  title: 'Atmospheric Dark Visual Treatment',
  approvedProgression: {
    sequence: 'Dark Blue / Blue Ink → WPP Navy #000050 → Approved Violet',
    colorStops: ['#0A0E2A', '#000050', '#50479E'],
  },
  compositionRules: [
    'Large soft blurred fields (blur 160–200px)',
    'Atmospheric gradients with continuous organic diffusion',
    'Diffused color with deep tonal transitions',
    'Subtle spatial variation that sits at z-0 behind content',
  ],
  character: [
    'Sophisticated',
    'Editorial',
    'Premium',
    'Soft',
    'Controlled',
  ],
  strictlyProhibited: [
    'Hard gradient bands or abrupt edges',
    'Obvious decorative circles inside components',
    'Neon effects or artificial glow-heavy blooms',
    'Fuchsia, Pink, or Magenta hues',
  ],
  legibilityConstraint: 'The strongest color fields must NEVER compromise typography legibility. All typography above the field must maintain WCAG AA text contrast.',
  guardrail: 'This is a contextual treatment. It is NOT the default background of every Dashboard or Report.',
};

// WPP Open Alignment Principles
export const WPP_OPEN_ALIGNMENT = {
  ecosystemReference: 'WPP Open is the primary visual reference for the broader WPP digital ecosystem.',
  coreEthos: 'Recognizably WPP. Distinctly Media Solutions.',
  visualFormula: 'WPP first (#000050). Media Solutions second (#AEF366). Creative Intelligence third.',
  triad: {
    wppOpen: 'WPP Open → WPP visual ecosystem belonging (WPP Navy #000050, light canvas, spacious, restrained)',
    mediaSolutions: 'Media Solutions → product expression (Signature Lime #AEF366, intelligence compositions, editorial dataviz)',
    creativeIntelligence: 'Creative Intelligence → solution identity (scoring telemetry, AI progression ramp, modular analysis)',
  },
  blackUsageRule: 'Black (#000000 / neutral.900/1000) is no longer a primary structural UI color. It is reserved primarily for running text, editorial body copy, and content where maximum neutral contrast is appropriate.',
};


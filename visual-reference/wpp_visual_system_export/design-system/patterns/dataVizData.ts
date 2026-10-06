export interface DataSeriesPoint {
  label: string;
  value: number;
  secondaryValue?: number;
  highlight?: boolean;
  annotation?: string;
}

export interface MultiSeriesDataset {
  seriesName: string;
  colorToken: string;
  strokeColor: string;
  isPrimary?: boolean;
  data: { label: string; value: number }[];
  latestLabel: string;
}

export interface DumbbellItem {
  cohort: string;
  baseline: number;
  current: number;
  delta: string;
}

export interface WaterfallItem {
  label: string;
  amount: number;
  isTotal?: boolean;
  cumulative: number;
  type: 'gain' | 'loss' | 'total';
}

export interface ScatterPoint {
  id: string;
  name: string;
  x: number; // Spend ($K)
  y: number; // Conversion Rate (%)
  volume: number; // Size/weight
  isHighlight?: boolean;
  cluster: string;
}

export interface ConfidenceBandPoint {
  date: string;
  median: number;
  upper: number;
  lower: number;
  actual?: number;
}

export const DATAVIZ_PRINCIPLES_SUMMARY = [
  'ABSOLUTE INVARIANT: Black and gray are structural colors, never data colors.',
  'WPP Navy (#000050) Structural Elements: WPP Navy may be used for structural chart elements, labels, axes, reference elements, and supporting UI structure. WPP Navy is never turned into a generic data series color.',
  'All data representations (lines, bars, areas, dots, radial segments, heatmap cells) must use approved chromatic colors.',
  'Data visualization should make data feel intelligent, contextual and intentional — not merely plotted.',
  'Gradients communicate meaning, movement, intensity, progression or emphasis — never decorative background noise.',
  'Charts should feel dimensional through information depth, without fake 3D or glassmorphism.',
  'Direct labeling should replace unnecessary detached legends when possible.',
  'Use gradients and chromatic tonal contrast before adding more unrelated colors.',
  'Charts should feel designed, not decorated.',
  'WPP Media × Data Intelligence × Contemporary Digital Product.',
];

export const WPP_NAVY_DATAVIZ_SPEC = {
  role: 'Structural chart elements, labels, axes, baseline references, and supporting UI structure',
  colorHex: '#000050',
  tokenRef: 'brand.navy.500',
  invariant: 'Do not turn WPP Navy into a generic data series color unless explicitly justified by the visualization context.',
  chromaticEncodingRule: 'Actual data encoding continues to use approved chromatic colors (Blue #5967F6, Violet #7D72E8, Signature Lime #AEF366) and semantic colors (Success #35A864, Warning #D99000, Error #D64545).',
};

// ============================================================================
// GLOBAL MASTER RULE 10: DATA / METRIC COMPOSITION (METRIC-STRIP PRINCIPLE)
// ============================================================================
export const METRIC_STRIP_COMPOSITION_SPEC = {
  name: 'Metric-Strip & Non-Cardized Data Composition',
  axiom: 'Metrics do NOT need to become individual cards.',
  hierarchyMechanisms: [
    'Scale (large prominent numerical metrics)',
    'Spacing (intentional whitespace rhythm)',
    'Grouping (content proximity)',
    'Alignment (clean baseline and column anchors)',
    'Typography (clear contrast and weights)',
    'Subtle separation (hairline neutral dividers or spatial channels)',
  ],
  antiPatterns: [
    'Automatically turning every single KPI into an elevated mini-card',
    'Adding decorative icons to every metric without functional meaning',
    'Card-in-card nesting for quantitative summaries',
    'Adding drop shadows to numbers and telemetry',
  ],
  governingPrinciple: 'Data visualization and KPI delivery remain meaning-first, information-led, and clean.',
};


export const DATAVIZ_GRADIENT_SYSTEM = [
  {
    name: 'Blue → Violet',
    from: '#5967F6',
    to: '#7D72E8',
    purpose: 'Data progression, cross-channel evolution, multi-stage journeys, primary intelligence.',
    cssGradient: 'linear-gradient(135deg, #5967F6 0%, #7D72E8 100%)',
  },
  {
    name: 'Violet → Lime',
    from: '#7D72E8',
    to: '#AEF366',
    purpose: 'Transformation, optimization milestone, creative intelligence, high-priority insights.',
    cssGradient: 'linear-gradient(135deg, #7D72E8 0%, #AEF366 100%)',
  },
  {
    name: 'Blue → Transparent',
    from: '#5967F6',
    to: 'rgba(89,103,246,0)',
    purpose: 'Area volume, accumulation, density intensity, primary trend support.',
    cssGradient: 'linear-gradient(180deg, rgba(89,103,246,0.22) 0%, rgba(89,103,246,0.01) 100%)',
  },
  {
    name: 'Violet → Transparent',
    from: '#7D72E8',
    to: 'rgba(125,114,232,0)',
    purpose: 'Analytical corridors, predictive confidence bands, secondary trend depth.',
    cssGradient: 'linear-gradient(180deg, rgba(125,114,232,0.18) 0%, rgba(125,114,232,0.01) 100%)',
  },
  {
    name: 'Lime → Transparent',
    from: '#AEF366',
    to: 'rgba(174,243,102,0)',
    purpose: 'Brand emphasis, selected active flight window, critical inflection moment.',
    cssGradient: 'linear-gradient(180deg, rgba(174,243,102,0.25) 0%, rgba(174,243,102,0.01) 100%)',
  },
];

export const DATAVIZ_DATA_LAYERS = [
  {
    layer: 'LAYER 01 · CONTEXT',
    weight: 'Very subtle',
    elements: '1px neutral gridlines (#F0F0EF / dark:white/6), baseline axis, benchmark lines, tolerance range bands.',
    rule: 'Never visually competes with data; serves as the quiet analytical ground.',
  },
  {
    layer: 'LAYER 02 · DATA',
    weight: 'Primary visualization',
    elements: 'Gradient lines, gradient areas, gradient bars, radial tracks, intensity cells.',
    rule: 'Carries primary analytical signal using approved Blue (#5967F6) and Violet (#7D72E8).',
  },
  {
    layer: 'LAYER 03 · SIGNAL',
    weight: 'Highest visual emphasis',
    elements: 'Current value callouts, selected anchor rings, milestone badges, target exceeded indicators.',
    rule: 'Directs the eye within 2 seconds to the most critical business inflection point.',
  },
];

// 01 · Gradient Trend Data
export const SINGLE_SERIES_SAMPLE: DataSeriesPoint[] = [
  { label: 'Day 01', value: 72 },
  { label: 'Day 02', value: 76 },
  { label: 'Day 03', value: 74 },
  { label: 'Day 04', value: 82 },
  { label: 'Day 05', value: 86 },
  { label: 'Day 06', value: 84 },
  { label: 'Day 07', value: 89 },
  { label: 'Day 08', value: 92 },
  { label: 'Day 09', value: 88 },
  { label: 'Day 10', value: 95 },
  { label: 'Day 11', value: 99 },
  { label: 'Day 12', value: 97 },
  { label: 'Day 13', value: 104 },
  { label: 'Day 14', value: 108.4, highlight: true, annotation: '108.4 Index' },
];

// 02 · Gradient Comparison Data (Blue & Violet Progression)
export const MULTI_SERIES_SAMPLE: MultiSeriesDataset[] = [
  {
    seriesName: 'Connected TV',
    colorToken: 'blue.500',
    strokeColor: '#5967F6',
    isPrimary: true,
    latestLabel: 'CTV · 84M',
    data: [
      { label: 'W1', value: 45 },
      { label: 'W2', value: 54 },
      { label: 'W3', value: 62 },
      { label: 'W4', value: 70 },
      { label: 'W5', value: 77 },
      { label: 'W6', value: 84 },
    ],
  },
  {
    seriesName: 'Digital Video',
    colorToken: 'violet.500',
    strokeColor: '#7D72E8',
    isPrimary: false,
    latestLabel: 'Video · 64M',
    data: [
      { label: 'W1', value: 36 },
      { label: 'W2', value: 42 },
      { label: 'W3', value: 48 },
      { label: 'W4', value: 52 },
      { label: 'W5', value: 58 },
      { label: 'W6', value: 64 },
    ],
  },
  {
    seriesName: 'Audio Streaming',
    colorToken: 'lime.700',
    strokeColor: '#385C19',
    isPrimary: false,
    latestLabel: 'Audio · 36M',
    data: [
      { label: 'W1', value: 20 },
      { label: 'W2', value: 24 },
      { label: 'W3', value: 27 },
      { label: 'W4', value: 30 },
      { label: 'W5', value: 33 },
      { label: 'W6', value: 36 },
    ],
  },
];

// 03 · Gradient Target Comparison
export const TARGET_COMPARISON_SAMPLE = {
  actual: 93.4,
  target: 90.0,
  unit: '%',
  label: 'Audience Quality Rate',
  comparisonText: '+3.4% above 90.0% goal',
  history: [
    { label: 'Q1', actual: 86.2, target: 90.0 },
    { label: 'Q2', actual: 88.5, target: 90.0 },
    { label: 'Q3', actual: 91.2, target: 90.0 },
    { label: 'Q4', actual: 93.4, target: 90.0 },
  ],
};

// 04 · Gradient Area (Cumulative Volume)
export const CUMULATIVE_AREA_SAMPLE = [
  { time: '00:00', value: 18 },
  { time: '04:00', value: 28 },
  { time: '08:00', value: 56 },
  { time: '12:00', value: 92 },
  { time: '16:00', value: 124 },
  { time: '20:00', value: 162 },
  { time: '24:00', value: 184.2 },
];

// 05 · Gradient Bar (Ranked Channel Efficiency)
export const GRADIENT_BAR_SAMPLE = [
  { channel: 'Connected TV', value: 18.2, isKey: true, label: '$18.20 (Leader)', gradient: 'from-[#5967F6] to-[#7D72E8]' },
  { channel: 'Digital Audio', value: 22.4, isKey: false, label: '$22.40', gradient: 'from-[#7D72E8] to-[#9D95F0]' },
  { channel: 'Social Video', value: 26.8, isKey: false, label: '$26.80', gradient: 'from-[#9D95F0] to-[#B4ACF8]' },
  { channel: 'Online Video', value: 28.5, isKey: false, label: '$28.50', gradient: 'from-[#5967F6]/70 to-[#7D72E8]/50' },
  { channel: 'Linear TV', value: 34.2, isKey: false, label: '$34.20', gradient: 'from-[#7D72E8]/60 to-[#B4ACF8]/40' },
];

// 06 · Radial KPI Progress
export const RADIAL_KPI_SAMPLE = {
  metric: '92.4%',
  label: 'Inventory Yield Index',
  target: '85.0% Goal',
  delta: '+7.4% over goal',
  subtext: 'Pacing Equilibrium Optimized',
};

// 07 · Segmented Ring Composition
export const SEGMENTED_RING_SAMPLE = {
  totalValue: '$48.2M',
  totalLabel: 'Net Attributed Spend',
  segments: [
    { name: 'Connected TV', share: 48, value: '$23.1M', color: '#5967F6' },
    { name: 'Digital Video', share: 28, value: '$13.5M', color: '#7D72E8' },
    { name: 'Social Video', share: 16, value: '$7.7M', color: '#B4ACF8' },
    { name: 'Digital Audio', share: 8, value: '$3.9M', color: '#385C19' },
  ],
};

// 08 · Heatmap Intensity Matrix (7 days x 6 intervals)
export const HEATMAP_MATRIX_SAMPLE = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  timeSlots: ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24'],
  matrix: [
    [0.12, 0.08, 0.45, 0.68, 0.72, 0.38],
    [0.15, 0.10, 0.52, 0.74, 0.81, 0.42],
    [0.18, 0.14, 0.58, 0.79, 0.86, 0.49],
    [0.16, 0.12, 0.62, 0.84, 0.92, 0.55],
    [0.22, 0.18, 0.71, 0.96, 0.98, 0.68], // Fri peak
    [0.35, 0.22, 0.48, 0.65, 0.76, 0.58],
    [0.28, 0.16, 0.42, 0.58, 0.69, 0.46],
  ],
};

// 09 · Scatter Plot (Relationship with Selected Halo Point)
export const SCATTER_SAMPLE: ScatterPoint[] = [
  { id: '1', name: 'CTV Tier 1', x: 82, y: 4.8, volume: 14, isHighlight: true, cluster: 'High ROI / Scaled' },
  { id: '2', name: 'YouTube TrueView', x: 64, y: 3.9, volume: 10, cluster: 'Balanced' },
  { id: '3', name: 'Programmatic Video', x: 48, y: 3.2, volume: 8, cluster: 'Balanced' },
  { id: '4', name: 'Premium Display', x: 30, y: 2.1, volume: 6, cluster: 'Low Velocity' },
  { id: '5', name: 'Social Video', x: 55, y: 3.5, volume: 9, cluster: 'Balanced' },
  { id: '6', name: 'Digital Audio', x: 25, y: 3.1, volume: 5, cluster: 'Niche Efficiency' },
  { id: '7', name: 'Sponsored Search', x: 72, y: 4.2, volume: 11, cluster: 'High ROI / Scaled' },
];

// 10 · Waterfall Contribution Bridge
export const WATERFALL_SAMPLE: WaterfallItem[] = [
  { label: 'Baseline', amount: 120, cumulative: 120, type: 'total' },
  { label: 'CTV Lift', amount: 48, cumulative: 168, type: 'gain' },
  { label: 'Search Spill', amount: 32, cumulative: 200, type: 'gain' },
  { label: 'Frequency Decay', amount: -28, cumulative: 172, type: 'loss' },
  { label: 'Net Attributed', amount: 172, cumulative: 172, type: 'total' },
];

// 11 · KPI + Sparkline Integration
export const KPI_SPARKLINE_SAMPLE = {
  kpi: 'Observed ROAS',
  value: '4.82x',
  delta: '+18.4% vs 4.07x target',
  status: 'Pacing Equilibrium Attained',
  sparkline: [3.4, 3.6, 3.5, 3.9, 4.2, 4.5, 4.82],
};

// 12 · Data Story Synthesis (Hero Product Moment)
export const DATA_STORY_SAMPLE = {
  primaryValue: '108.4',
  unit: 'Index',
  metricLabel: 'Pacing Velocity Index',
  delta: '+8.4%',
  target: '100.0 Goal Benchmark',
  annotation: 'Target exceeded after algorithm optimization',
  source: 'Audience Graph v4.2 · Live Mesh',
  trajectory: [
    { x: 0, y: 72 },
    { x: 45, y: 76 },
    { x: 90, y: 74 },
    { x: 135, y: 84 },
    { x: 180, y: 92 },
    { x: 225, y: 98 },
    { x: 270, y: 108.4, isPeak: true },
  ],
  channels: [
    { name: 'Connected TV', contribution: 52, share: '$12.9M' },
    { name: 'Digital Video', contribution: 31, share: '$7.7M' },
    { name: 'Digital Audio', contribution: 17, share: '$4.2M' },
  ],
};

export const VISUAL_QA_CHECKLIST = [
  'Gradients communicate data progression, volume, or hierarchy — never decorative clutter',
  'Blue → Violet (#5967F6 → #7D72E8) expresses multi-stage progression and intelligence',
  'Violet → Lime (#7D72E8 → #AEF366) encodes transformation and optimization inflection',
  'Area charts use color → transparent fade with a crisp boundary stroke',
  'Radial visualizations feel editorial and premium without speedometer gauge styling',
  'Segmented rings convey proportion with direct percentages and clear visual hierarchy',
  'Heatmap intensity matrix uses tonal density gradients rather than rainbow tiles',
  'Visual depth is created through foreground/background layers, not fake 3D or bevels',
  'Direct labeling replaces detached legends where composition allows',
  'Scatter plot emphasizes selected anchor point with subtle halo and quadrant guides',
  'Waterfall attribution accurately encodes gains (green), decay (red), and baseline totals',
  'KPI + sparkline integrates into a compact, borderless intelligence summary',
  'The Data Story specimen harmonizes primary metric, gradient trajectory, target line, and context',
  'Inherits Color System v1.0 without introducing unapproved hex values',
  'Inherits Typography System v1.0 without custom typography scale overrides',
  'Inherits Spacing & Layout v1.0 with 4px grid rhythm',
  'Inherits Card System v1.0 with strict Nested Surface rules (Treatment A/B)',
  'Responsive behavior simplifies density cleanly across viewports',
  'Zero glassmorphism, zero neon glow, zero metallic gradients, zero fake 3D',
  'Visual identity feels recognizably Media Solutions and distinctly WPP',
];

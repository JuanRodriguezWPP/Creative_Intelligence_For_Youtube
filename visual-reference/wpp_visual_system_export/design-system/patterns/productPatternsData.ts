export interface PatternHierarchy {
  primary: string;
  secondary: string;
  tertiary: string;
  action: string;
}

export interface PatternDefinition {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  purpose: string;
  userGoal: string;
  hierarchy: PatternHierarchy;
  composition: string[];
  layout: string;
  interaction: string;
  states: string[];
  responsive: string;
  whenToUse: string;
  whenNotToUse: string;
  nextPatterns: string[];
}

export const PATTERN_PRINCIPLES = [
  {
    number: '01',
    title: 'Content first',
    rule: 'User Goal → Primary Info → Supporting Info → Primary Action → Navigation Context.',
    description: 'Visual styling follows information hierarchy. A pattern never starts with decorative containers or arbitrary visual noise.',
  },
  {
    number: '02',
    title: 'Component → pattern → product',
    rule: 'Components provide blocks; Patterns provide compositions; Products combine Patterns.',
    description: 'Do not create one-off bespoke UI when an approved pattern already solves the operational task.',
  },
  {
    number: '03',
    title: 'Information hierarchy',
    rule: 'Primary scale & contrast, secondary context, tertiary metadata, distinct next action.',
    description: 'Hierarchy is established through scale, position, typography weight, and spacing before applying color.',
  },
  {
    number: '04',
    title: 'Layout vs component vs pattern',
    rule: 'Layout arranges; Components behave; Patterns define relationships.',
    description: 'Local compositions must never override system foundations or invent ad-hoc spacing rules.',
  },
  {
    number: '05',
    title: 'Visual density hierarchy',
    rule: 'Comfortable (editorial/insights), Standard (default product), Dense (complex analytics).',
    description: 'Dense does not mean tiny fonts or reduced touch targets; it means reduced ornamental space with tighter alignment.',
  },
  {
    number: '06',
    title: 'Meaningful color behavior',
    rule: 'Neutral by default; Lime = Brand/Primary CTA; Blue = Info; Violet = Intelligence.',
    description: 'Semantic colors are reserved for state communication. Color is never applied merely to decorate cards or tables.',
  },
  {
    number: '07',
    title: 'Contextual gradients',
    rule: 'Gradients require an architectural reason: Active Navigation, Intelligence, or Priority.',
    description: 'Never place gradients behind every card, across full sidebars, or on secondary buttons.',
  },
  {
    number: '08',
    title: 'Chromatic data visualization',
    rule: 'Black and gray are structural colors, NEVER data colors.',
    description: 'Actual data marks consume approved chromatic tokens (Blue, Violet, Lime, Semantic). Grays build axes and grids.',
  },
  {
    number: '09',
    title: 'Card architectural stability',
    rule: 'Card meaning comes from content; container geometry remains stable.',
    description: 'Avoid one-off radii, arbitrary shadow elevations, or card-inside-card visual traps.',
  },
  {
    number: '10',
    title: 'Clear action hierarchy',
    rule: 'One clearly identifiable Lime primary action (radius: 9999px); secondary actions neutral.',
    description: 'Avoid competing primary actions. Every screen or pattern provides an unambiguous next step.',
  },
  {
    number: '11',
    title: 'Narrative visual hierarchy',
    rule: 'Primary Story → Supporting Evidence → Context → Action.',
    description: 'Visual hierarchy reinforces narrative hierarchy. Establish visual weight through scale, typography, position, surface context, and spacing before applying containers or decoration. Content first.',
  },
  {
    number: '12',
    title: 'Page canvas vs component surface',
    rule: 'Page canvas hosts broad atmosphere & editorial transitions; Component surfaces host scoped data & interaction.',
    description: 'The page canvas is responsible for large-scale composition, atmospheric backgrounds, and editorial flow. Components remain strictly responsible for content grouping, interaction, and data encapsulation. This prevents unnecessary over-componentization.',
  },
];

export const CORE_PATTERNS: PatternDefinition[] = [
  {
    id: 'dashboard',
    number: '01',
    title: 'Product Dashboard',
    subtitle: 'High-level operational and executive overview',
    purpose: 'Answers: "What is happening?" → "Why is it happening?" → "What should I do next?"',
    userGoal: 'Scan current operational health, detect anomalies across active flights, and identify high-priority decisions immediately.',
    hierarchy: {
      primary: 'High-impact KPI metric cards (Spend pacing, delivery rate, active performance indicators).',
      secondary: 'Cross-channel pacing trendline, recent campaign telemetry, and anomaly detections.',
      tertiary: 'Period comparison timestamps, flight metadata, and currency benchmarks.',
      action: 'Primary action: "Launch New Flight" or "Resolve Anomaly"; contextual navigation to Detail/Analysis.',
    },
    composition: ['Page Header', 'Filter Bar', 'Metric Cards', 'Primary Visualization', 'Secondary Data Table', 'Recommendation Card', 'Primary Pill Button'],
    layout: 'Asymmetric top KPI grid (4 columns) → Split visualization & insight row (8:4) → Supporting data table.',
    interaction: 'Hovering charts highlights cross-series points; clicking KPI cards filters the dashboard context.',
    states: ['Default', 'Loading (skeleton)', 'Filtered', 'Empty (no campaigns)'],
    responsive: 'Desktop: 4-column metric grid; Tablet: 2-column grid; Mobile: single-column vertical stack with horizontal scroll table.',
    whenToUse: 'Initial entry point for product suites, portfolio overviews, or daily performance monitoring.',
    whenNotToUse: 'When the primary user task is deep multidimensional exploration or line-item configuration.',
    nextPatterns: ['Detail / Analysis', 'Filtered Data View', 'Recommendation'],
  },
  {
    id: 'search-results',
    number: '02',
    title: 'Search & Results',
    subtitle: 'Locating, filtering, and comparing product entities',
    purpose: 'Enables rapid scanning, filtering, and side-by-side evaluation of large asset repositories.',
    userGoal: 'Find specific creative assets, campaign flights, or audience segments with minimal query friction.',
    hierarchy: {
      primary: 'Prominent persistent search input with result count and active filter tags.',
      secondary: 'Card grid or structured list displaying asset thumbnails, format badges, and metrics.',
      tertiary: 'File sizes, upload dates, creator attribution, and storage identifiers.',
      action: 'Quick item inspection, bulk selection, asset preview modal, or export action.',
    },
    composition: ['Search Field', 'Filter Chips', 'Result Header', 'Media Cards', 'Pagination', 'Empty / No Results State'],
    layout: 'Top search & filter toolbar → Result count & sorting bar → Responsive 3-column media card grid → Bottom pagination.',
    interaction: 'Live query filtering, instant clear tag affordance, keyboard arrow navigation across cards.',
    states: ['Default', 'Typing / Active Query', 'Results Found', 'Zero Results (No match empty state)'],
    responsive: 'Desktop: 3-column asset grid; Tablet: 2-column grid; Mobile: single-column list with compact metadata.',
    whenToUse: 'Asset management, creative libraries, audience catalogs, and historical campaign archives.',
    whenNotToUse: 'When users already know the exact singular entity and need deep analytical drilldown.',
    nextPatterns: ['Detail / Analysis', 'Creation Flow'],
  },
  {
    id: 'filtered-data-view',
    number: '03',
    title: 'Filtered Data View',
    subtitle: 'Multidimensional analytical data exploration',
    purpose: 'Empowers media planners to slice performance data across channels, flights, and geographies.',
    userGoal: 'Filter tabular records by market, channel, and date to spot optimization opportunities.',
    hierarchy: {
      primary: 'Filter Bar (Search, Select, Multi-select, Date Range) with persistent Active Tags row.',
      secondary: 'Aggregated totals row reflecting current filter parameters.',
      tertiary: 'Sortable column headers, pagination indices, and data currency timestamps.',
      action: 'Export CSV/Excel button, bulk edit row triggers, and row click for contextual deep-dive.',
    },
    composition: ['Filter Bar', 'Active Filter Tags', 'KPI Summary Strip', 'Data Table', 'Pagination', 'Export Button'],
    layout: 'Stacked filter controls → Active tags strip → Aggregate summary bar → High-density data table.',
    interaction: 'Changing filters immediately recalculates summary totals and re-renders table rows without full reload.',
    states: ['Default', 'Active Filters Applied', 'Loading Query', 'Zero Rows Found'],
    responsive: 'Desktop: Full multi-column table; Mobile: horizontal swipe scroll with sticky entity name column.',
    whenToUse: 'Campaign flight ledgers, financial reconciliations, ad group comparisons, and inventory pacing.',
    whenNotToUse: 'When the user needs an initial executive summary or narrative storytelling.',
    nextPatterns: ['Insight Exploration', 'Detail / Analysis', 'Report / Export'],
  },
  {
    id: 'detail-analysis',
    number: '04',
    title: 'Detail / Analysis',
    subtitle: 'Deep-dive investigation of a single entity',
    purpose: 'Progressively reveals qualitative and quantitative complexity for an individual campaign or asset.',
    userGoal: 'Inspect deep audience composition, conversion funnels, and flight anomalies to make tactical adjustments.',
    hierarchy: {
      primary: 'Entity Header with title, verified status badge, and primary performance metric delta.',
      secondary: 'Multi-series trend visualization with cohort breakdowns and pacing metrics.',
      tertiary: 'Flight configuration parameters, technical specifications, and historical change logs.',
      action: 'Primary action: "Edit Campaign Settings"; secondary: "Pause Flight" or "Export Audit".',
    },
    composition: ['Breadcrumbs', 'Status Badge', 'Metric Cards', 'Area/Line Visualization', 'Tab System', 'Action Footer'],
    layout: 'Contextual breadcrumb header → Entity metadata header → In-page tab bar → Content panels & charts.',
    interaction: 'In-page tabs switch views without changing page scope; chart scrubber inspects historical dates.',
    states: ['Active Flight', 'Paused', 'Completed / Archived', 'Error Pacing'],
    responsive: 'Desktop: 2-column split (Chart 8 cols, Details 4 cols); Mobile: vertically stacked tabs and charts.',
    whenToUse: 'When moving from a high-level table or dashboard into an individual campaign flight or creative.',
    whenNotToUse: 'When comparing 20+ entities simultaneously.',
    nextPatterns: ['Creation Flow', 'Review / Approval', 'Recommendation'],
  },
  {
    id: 'creation-flow',
    number: '05',
    title: 'Creation Flow',
    subtitle: 'Configuring, scaffolding, and staging new campaigns',
    purpose: 'Guides the user step-by-step through setting flight parameters, budget pacing, and assets.',
    userGoal: 'Set up a new omnichannel campaign accurately with immediate validation feedback.',
    hierarchy: {
      primary: 'Step progress header and active field group (Campaign Name, Markets, Assets).',
      secondary: 'Supporting instructions, field requirements, and character counters.',
      tertiary: 'Help tooltips, policy guidelines, and estimated audience reach calculators.',
      action: 'Primary: "Continue to Step 3" (Lime pill); Secondary: "Save Draft" or "Cancel".',
    },
    composition: ['Progress Header', 'Form Sections', 'Text Inputs', 'Multi-Select', 'File Upload', 'Pill Buttons'],
    layout: 'Centered 2-column form structure (max-w-4xl) with clear vertical spacing between field groups.',
    interaction: 'Immediate inline validation on blur; auto-save indicator; dropzone accepts drag-and-drop assets.',
    states: ['Empty Default', 'In Progress', 'Validation Error', 'Uploading Assets', 'Step Complete'],
    responsive: 'Desktop: Clean 2-column layout; Tablet/Mobile: single-column stack with persistent bottom action bar.',
    whenToUse: 'Campaign launch wizards, creative upload workflows, audience builder, and agency onboarding.',
    whenNotToUse: 'For single inline property edits (use inline input or quick drawer instead).',
    nextPatterns: ['Review / Approval'],
  },
  {
    id: 'review-approval',
    number: '06',
    title: 'Review / Approval',
    subtitle: 'Pre-flight safety inspection and governance check',
    purpose: 'Explicitly separates "Review" (inspecting verified facts) from "Edit" (modifying data).',
    userGoal: 'Verify all targeting, budgets, and creative assets meet client brand safety before deployment.',
    hierarchy: {
      primary: 'Flight approval summary with total spend cap and target launch date.',
      secondary: 'Verification checklist (Brand Safety AA+, Budget Validated, Creative Dimensions Verified).',
      tertiary: 'Disclaimers, auditor attribution, and timestamped policy check notes.',
      action: 'Primary: "Approve & Launch Flight" (Lime pill); Secondary: "Request Revisions" (Neutral).',
    },
    composition: ['Summary Card', 'Verification List', 'Warning Alert', 'Deep-Link Edit Triggers', 'Dual Action Footer'],
    layout: 'Executive summary banner → Two-column verification grid (Targeting vs Assets) → Floating/sticky approval bar.',
    interaction: '"Edit" buttons jump back directly to the corresponding step in the creation flow without loss of state.',
    states: ['Pending Review', 'All Checks Passed', 'Warnings Flagged (Requires Override)', 'Approved / Locked'],
    responsive: 'Desktop: Split inspection columns; Mobile: collapsible accordion sections with fixed footer action.',
    whenToUse: 'Prior to financial spend authorization, live ad deployment, or compliance sign-off.',
    whenNotToUse: 'During casual creation or low-stakes exploratory configuration.',
    nextPatterns: ['Dashboard', 'Detail / Analysis'],
  },
  {
    id: 'insight-exploration',
    number: '07',
    title: 'Insight Exploration',
    subtitle: 'AI-assisted pattern discovery and strategic findings',
    purpose: 'Prioritizes narrative understanding and qualitative patterns before supporting quantitative graphs.',
    userGoal: 'Discover unexpected audience behavior, creative wear-out trends, and cross-channel efficiency gains.',
    hierarchy: {
      primary: 'Narrative Insight Banner: The clear strategic takeaway stated in plain language.',
      secondary: 'Evidence Chart: Chromatic data distribution illustrating the underlying phenomenon.',
      tertiary: 'Confidence score, sample size, historical baseline, and methodology footnotes.',
      action: 'Primary: "Apply Strategic Recommendation"; Secondary: "Share Insight" or "Save to Report".',
    },
    composition: ['Insight Banner', 'Chromatic Chart', 'Findings Cards', 'Tag Indicators', 'Action Bar'],
    layout: 'Full-width editorial insight card → Supporting comparative visualization → Grid of 3 related qualitative findings.',
    interaction: 'Toggling cohort dimensions updates the narrative takeaway and recalculates statistical confidence.',
    states: ['High Confidence', 'Emerging Pattern', 'Contradicting Historical Norm', 'Dismissed'],
    responsive: 'Desktop: Wide editorial layout; Mobile: condensed insight pill with tap-to-expand evidence chart.',
    whenToUse: 'Creative Intelligence, audience retention analysis, and quarterly business review synthesis.',
    whenNotToUse: 'For raw operational telemetry without algorithmic or analytical interpretation.',
    nextPatterns: ['Recommendation', 'Report / Export'],
  },
  {
    id: 'recommendation',
    number: '08',
    title: 'Recommendation',
    subtitle: 'Evidence-based algorithmic decision proposal',
    purpose: 'Proposes high-confidence budget or creative shifts with transparent rationale and projected lift.',
    userGoal: 'Evaluate system-suggested campaign improvements and implement them with a single click.',
    hierarchy: {
      primary: 'Recommendation proposal title with strategic category tag and expected lift metric.',
      secondary: 'Transparent rationale: "Why is the system suggesting this?" and supporting evidence.',
      tertiary: 'Projected downside risks, budget reallocation mechanics, and algorithmic confidence.',
      action: 'Primary: "Accept & Reallocate Budget" (Lime pill); Secondary: "Dismiss" or "Remind Me Tomorrow".',
    },
    composition: ['Recommendation Card', 'Tag Category', 'Lift Metric', 'Rationale Text', 'Dual Action Buttons'],
    layout: 'Featured Card with subtle boundary → Primary statement → Rationale & Projected Impact Row → Action bar.',
    interaction: 'Clicking "Accept" opens confirmation with estimated pacing adjustment; "Dismiss" requests brief reason.',
    states: ['Proposed', 'Accepted / Applying', 'Under Performance Review', 'Dismissed'],
    responsive: 'Desktop: Horizontal layout with side-by-side impact cards; Mobile: stacked card with full-width actions.',
    whenToUse: 'Automated bidding adjustments, budget shift recommendations, creative refresh suggestions.',
    whenNotToUse: 'For decorative upsells, promotions, or generic platform advertisements.',
    nextPatterns: ['Detail / Analysis', 'Dashboard'],
  },
  {
    id: 'report-export',
    number: '09',
    title: 'Report / Export',
    subtitle: 'Structured executive summaries and portable deliverables',
    purpose: 'Consolidates multi-channel campaign telemetry into client-ready executive deliverables.',
    userGoal: 'Download a clean, branded PDF/CSV export for client stakeholders with preserved hierarchy.',
    hierarchy: {
      primary: 'Report Header with client branding, campaign scope, and reporting date range.',
      secondary: 'Executive Summary card with top 3 strategic takeaways and primary KPI grid.',
      tertiary: 'Data methodology, sample sizes, margin of error, and agency attribution.',
      action: 'Primary: "Download Full PDF Report" (Lime pill); Secondary: "Export Raw CSV" or "Email Stakeholders".',
    },
    composition: ['Report Header', 'Executive Summary Card', 'KPI Metric Strip', 'Consolidated Charts', 'Methodology Note', 'Export Buttons'],
    layout: 'Document-like editorial layout with clear white margins, structured sections, and print-optimized page breaks.',
    interaction: 'Selecting report sections dynamically toggles their inclusion in the exported package.',
    states: ['Draft Summary', 'Published Report', 'Generating PDF Download', 'Historical Archive'],
    responsive: 'Desktop & Print: Standard 8.5x11 / A4 aspect flow; Mobile: readable vertical document stream.',
    whenToUse: 'Quarterly client presentations, campaign wrap-up reports, and executive stakeholder briefs.',
    whenNotToUse: 'For real-time operational troubleshooting.',
    nextPatterns: ['Dashboard', 'Filtered Data View'],
  },
];

export const MOCK_DASHBOARD_METRICS = [
  { label: 'Active spend pacing', value: '$842,500', change: '+12.4%', trend: 'up', note: '94% on target for Q4', tone: 'success' },
  { label: 'Total verified impressions', value: '48.2M', change: '+8.1%', trend: 'up', note: 'CTV delivered 62%', tone: 'neutral' },
  { label: 'Average effective CPM', value: '$17.48', change: '-6.2%', trend: 'up', note: '$1.15 below benchmark', tone: 'success' },
  { label: 'Brand safety clearance', value: '99.8%', change: '+0.1%', trend: 'neutral', note: 'Zero high-risk flags', tone: 'neutral' },
];

export const MOCK_CHANNELS_PACING = [
  { channel: 'Connected TV', current: 380, target: 400, share: '45%', color: '#5967F6' },
  { channel: 'Digital Video', current: 245, target: 250, share: '29%', color: '#7D72E8' },
  { channel: 'Social Video', current: 155, target: 160, share: '18%', color: '#AEF366' },
  { channel: 'Programmatic Display', current: 62, target: 70, share: '8%', color: '#35A864' },
];

export const MOCK_SEARCH_ASSETS = [
  { id: 'AST-01', title: 'Nike Air Max · 15s CTV Spot', format: '16:9 Video (MP4)', size: '24.2 MB', duration: '15.0s', ctr: '1.84%', status: 'Active', market: 'North America' },
  { id: 'AST-02', title: 'Jordan Retro · Story Vertical', format: '9:16 Video (MP4)', size: '18.6 MB', duration: '10.0s', ctr: '2.42%', status: 'Active', market: 'Latin America' },
  { id: 'AST-03', title: 'Nike Running · Static Billboard', format: '300x250 Display', size: '142 KB', duration: '—', ctr: '0.92%', status: 'Active', market: 'Global' },
  { id: 'AST-04', title: 'Pegasus 41 · YouTube Bumper', format: '16:9 Video (MP4)', size: '12.4 MB', duration: '6.0s', ctr: '3.12%', status: 'Active', market: 'EMEA' },
  { id: 'AST-05', title: 'Winter Apparel · Carousel 01', format: '1:1 Square (JPG)', size: '820 KB', duration: '—', ctr: '1.45%', status: 'Review', market: 'North America' },
  { id: 'AST-06', title: 'Holiday Push · Interactive Lead', format: 'HTML5 Rich Media', size: '1.4 MB', duration: '—', ctr: '4.08%', status: 'Draft', market: 'Global' },
];

export const MOCK_FILTERED_ROWS = [
  { id: 'FLT-801', campaign: 'Q4 Omnichannel Brand Push', market: 'North America', channel: 'Connected TV', spend: '$312,400', conversions: '18,420', roas: '3.42x', status: 'Optimal' },
  { id: 'FLT-802', campaign: 'Nike Pegasus 41 Launch', market: 'Latin America', channel: 'Social Video', spend: '$148,900', conversions: '12,180', roas: '4.18x', status: 'Optimal' },
  { id: 'FLT-803', campaign: 'Jordan Retros Winter Drop', market: 'EMEA', channel: 'Digital Video', spend: '$184,200', conversions: '9,440', roas: '2.85x', status: 'Pacing Slow' },
  { id: 'FLT-804', campaign: 'Nike Training Club Awareness', market: 'North America', channel: 'Display', spend: '$54,300', conversions: '3,890', roas: '1.92x', status: 'Review' },
  { id: 'FLT-805', campaign: 'Global Holiday Gifting', market: 'Global', channel: 'Connected TV', spend: '$142,700', conversions: '7,620', roas: '3.10x', status: 'Optimal' },
];

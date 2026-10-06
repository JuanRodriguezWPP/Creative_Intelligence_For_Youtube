export interface ProductAppModule {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'container-established' | 'inheriting-system' | 'ready';
  inheritedSystemFoundation: string;
  existingMaterial?: string[];
}

export interface ProductApplicationSpec {
  id: string;
  number: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  badge: string;
  channelScope: string[];
  aspectRatios: string[];
  inheritedFoundations: string[];
  modules: ProductAppModule[];
  promotionCriteria: {
    rule: string;
    description: string;
  }[];
}

export const PRODUCT_APPLICATIONS: ProductApplicationSpec[] = [
  {
    id: 'ci-social',
    number: '01',
    name: 'Creative Intelligence — Social',
    slug: 'ci-social',
    headline: 'Social video & creator intelligence engine',
    description: 'Product application dedicated to multi-platform social landscape analysis, vertical video creative wear-out curves, creator attribution, and real-time social actionables.',
    badge: 'APPLICATION · CONTAINER ESTABLISHED',
    channelScope: ['TikTok', 'Instagram Reels', 'Meta Feed', 'Snapchat', 'X / Social Video'],
    aspectRatios: ['9:16 Full Screen Vertical', '1:1 Square Companion', '4:5 Social Feed'],
    inheritedFoundations: [
      'Master Color System v1.0 (Neutral 90%, Brand Lime CTA, Blue info, Violet AI intelligence)',
      'Master Typography System v1.0 (WPP Typeface)',
      'Master Spacing & Layout v1.0 (4px progression, responsive grid)',
      'Master Core Components v1.0 (Pill buttons, Structured icon buttons, Tags, Badges)',
      'Master Card System v1.0 (Section 11 9:16 Overlay Card Treatment)',
      'Master Data Viz System v1.0 (Blue → Violet progression, chromatic data only)',
      'Master Navigation & Forms v1.0 (Blue/Violet active state & focus ring)',
      'Master Product Patterns v1.0 (Dashboard, Detail, Insight, Recommendation)',
    ],
    modules: [
      {
        id: 'foundation',
        name: 'Product foundation',
        category: 'Architecture',
        description: 'Product charter, operational goals, target user personas (Brand Managers, Creative Directors, Social Strategists), and channel scope.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Brand Foundation & Spacing Layout',
        existingMaterial: [
          'Social channel classification taxonomy',
          'Vertical canvas 9:16 operational boundaries',
        ],
      },
      {
        id: 'architecture',
        name: 'Product architecture',
        category: 'Architecture',
        description: 'Information architecture and screen flow: Social Overview → Creator Analysis → Creative Fatigue Telemetry → Campaign Actionables.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Navigation & Forms v1.0 (Shell & 4-Level Nav)',
      },
      {
        id: 'components',
        name: 'Product components',
        category: 'Components',
        description: 'Domain-specific social extensions: Creator Cards, Hook-Rate Chips, Sound-On/Off Indicators, and Social Platform Badges.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Core Components v1.0 & Master Card System v1.0',
        existingMaterial: [
          'Media Card 9:16 Vertical Video with Overlay Content (approved in Card System Sec 11)',
          'Social platform tags (Instagram, TikTok, Meta)',
        ],
      },
      {
        id: 'patterns',
        name: 'Product patterns',
        category: 'Compositions',
        description: 'Application-level compositions: Social Landscape Dashboard, Asset Wear-out Detail, and Dynamic Creative Ingest Flow.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Patterns 01, 04, 05)',
      },
      {
        id: 'data-intelligence',
        name: 'Data & intelligence',
        category: 'Intelligence',
        description: 'Creative fatigue telemetry, first-3-seconds hook retention rate, sound sync scores, and social viral coefficient modeling.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Data Visualization System v1.0 (Progression ramps, chromatic data)',
        existingMaterial: [
          'Hourly impression pacing & delivery completion curves',
          'Social video completion telemetry (Avg VCR 89.2%)',
        ],
      },
      {
        id: 'findings',
        name: 'Findings',
        category: 'Analytics',
        description: 'Algorithmic creative insights: visual hook drop-off analysis, audio sentiment correlation, and audience fatigue thresholds.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Pattern 07 · Insight Exploration)',
      },
      {
        id: 'actionables',
        name: 'Actionables',
        category: 'Operations',
        description: 'Automated creative recommendations: asset refresh alerts, budget reallocations from fatigued creatives, and variant swaps.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Pattern 08 · Recommendation)',
      },
      {
        id: 'reports',
        name: 'Reports',
        category: 'Deliverables',
        description: 'Client-ready social executive briefings, creator performance scorecards, and multi-market social export summaries.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Pattern 09 · Report / Export)',
      },
      {
        id: 'visual-qa',
        name: 'Visual QA',
        category: 'Governance',
        description: 'Compliance verification: strict adherence to Master System tokens, zero custom hex colors, and mobile viewport continuity.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Governance & Visual Verification',
      },
    ],
    promotionCriteria: [
      {
        rule: 'Multi-product reusability',
        description: 'Only promote a component to the Master System if it solves a recurring need in both Social, YouTube, and other Media Solutions tools.',
      },
      {
        rule: 'Domain logic independence',
        description: 'The abstraction must function without depending on social API endpoints or platform-specific algorithms.',
      },
      {
        rule: 'Zero duplicate definitions',
        description: 'Never redefine colors, typography, or core inputs; always inherit from Master Visual System v1.0.',
      },
    ],
  },
  {
    id: 'ci-youtube',
    number: '02',
    name: 'Creative Intelligence — YouTube',
    slug: 'ci-youtube',
    headline: 'YouTube retention, ABCD & flight intelligence',
    description: 'Product application specialized in YouTube video ecosystem telemetry, ABCD framework compliance, TrueView skip curves, bumper effectiveness, and CTV big-screen viewer retention.',
    badge: 'APPLICATION · CONTAINER ESTABLISHED',
    channelScope: ['YouTube TrueView', 'YouTube Shorts', 'YouTube 6s Bumpers', 'YouTube Non-Skip', 'YouTube on CTV'],
    aspectRatios: ['16:9 Landscape High-Definition', '9:16 Shorts Vertical', '21:9 Ultra-Wide Cinematic'],
    inheritedFoundations: [
      'Master Color System v1.0 (Neutral 90%, Brand Lime CTA, Blue info, Violet AI intelligence)',
      'Master Typography System v1.0 (WPP Typeface, tabular numbers for timestamp telemetry)',
      'Master Spacing & Layout v1.0 (4px spatial rhythm)',
      'Master Core Components v1.0 (Buttons, Inputs, Select, Status Badges, Tabs)',
      'Master Card System v1.0 (16:9 Landscape Media Cards with duration chips and hover play)',
      'Master Data Viz System v1.0 (Sparklines, dual-series telemetry, no black/gray data)',
      'Master Navigation & Forms v1.0 (4-level navigation, focus.ring)',
      'Master Product Patterns v1.0 (Dashboard, Filtered Data View, Detail/Analysis)',
    ],
    modules: [
      {
        id: 'foundation',
        name: 'Product foundation',
        category: 'Architecture',
        description: 'Product mission, operational objectives, advertiser audience targets (Brand Marketers, Video Planners, Media Directors).',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Brand Foundation & Spacing Layout',
        existingMaterial: [
          'YouTube TrueView / Bumper / CTV video taxonomy',
          'ABCD (Attention, Branding, Connection, Direction) framework principles',
        ],
      },
      {
        id: 'architecture',
        name: 'Product architecture',
        category: 'Architecture',
        description: 'Screen navigation and hierarchy: Portfolio YouTube Flights → Video Retention Curves → ABCD Diagnostic Telemetry → Export.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Navigation & Forms v1.0 (Product Shell & Tabs)',
      },
      {
        id: 'components',
        name: 'Product components',
        category: 'Components',
        description: 'Domain-specific YouTube elements: ABCD Score Ring, 5s Skip Horizon Markers, Second-by-Second Video Retention Bar, and Duration Chips.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Core Components v1.0 & Master Card System v1.0',
        existingMaterial: [
          '16:9 Landscape Video Card with duration chip and play trigger',
          'YouTube tag categorization (neutral blue/gray tags, never semantic green)',
        ],
      },
      {
        id: 'patterns',
        name: 'Product patterns',
        category: 'Compositions',
        description: 'Composed views: YouTube Flight Dashboard, Second-by-Second Video Retention Detail, and Creative Asset Library.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Patterns 01, 03, 04)',
      },
      {
        id: 'data-intelligence',
        name: 'Data & intelligence',
        category: 'Intelligence',
        description: 'Viewer second-by-second drop-off curve, audio branding timestamp correlation, CTA visibility telemetry, and CTV view-through rates.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Data Visualization System v1.0 (Specimen 02 Dual Line, Specimen 05 Area Fill)',
        existingMaterial: [
          'Verified CPM ($16.80), VCR (89.2%), MRC Viewability (96.8%) telemetry',
          'Hourly pacing curve with endpoint emphasis',
        ],
      },
      {
        id: 'findings',
        name: 'Findings',
        category: 'Analytics',
        description: 'Automated video audits: early logo presence impact on Brand Recall, skip-point drop analysis, and frequency wear-out markers.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Pattern 07 · Insight Exploration)',
      },
      {
        id: 'actionables',
        name: 'Actionables',
        category: 'Operations',
        description: 'Operational interventions: creative trim recommendations, intro pacing fixes, and bumper cut-down generation prompts.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Pattern 08 · Recommendation)',
      },
      {
        id: 'reports',
        name: 'Reports',
        category: 'Deliverables',
        description: 'Executive YouTube flight summaries, ABCD compliance certs, and multi-format video performance comparisons.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Product Patterns v1.0 (Pattern 09 · Report / Export)',
      },
      {
        id: 'visual-qa',
        name: 'Visual QA',
        category: 'Governance',
        description: 'System verification: zero ad-hoc styling, adherence to approved Blue/Violet focus ring, and fluid responsive behavior.',
        status: 'container-established',
        inheritedSystemFoundation: 'Master Governance & Visual Verification',
      },
    ],
    promotionCriteria: [
      {
        rule: 'Generalizable video analytics',
        description: 'Video retention scrubbers or timeline markers may be promoted to Master System if CTV or linear video tools require them.',
      },
      {
        rule: 'Strict token discipline',
        description: 'Must consume Master Color System tokens; YouTube branding tags must remain neutral and never hijack semantic success green.',
      },
      {
        rule: 'Reusable component separation',
        description: 'Keep domain ABCD algorithms in the Product Application, but consume Master Cards and Core Buttons for UI containers.',
      },
    ],
  },
];

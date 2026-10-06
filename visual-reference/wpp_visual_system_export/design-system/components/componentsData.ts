export interface ComponentSpec {
  id: string;
  name: string;
  number: string;
  purpose: string;
  anatomy: string[];
  variants: string[];
  sizes: string[];
  states: string[];
  tokensConsumed: {
    color: string[];
    typography: string[];
    spacing: string[];
  };
  usageRules: string[];
  restrictions: string[];
  accessibility: string[];
  calibrationQuestions: string[];
}

export const CORE_COMPONENTS_SPECS: ComponentSpec[] = [
  {
    id: 'button',
    number: '01',
    name: 'Button',
    purpose: 'Triggers an immediate functional action or workflow progression within the interface.',
    anatomy: ['Fully Rounded Container (999px Pill)', 'Action Verb Label', 'Optional Leading/Trailing Icon', 'Focus Ring Indicator', 'Loading Spinner'],
    variants: ['Primary (Brand Lime)', 'Secondary (Neutral Outline)', 'Tertiary (Text-Only / Minimal)', 'Destructive (Contained Semantic Red)'],
    sizes: ['Small (32px / text-xs)', 'Medium (40px / text-sm)', 'Large (48px / text-base)'],
    states: ['Default', 'Hover', 'Active', 'Focus', 'Disabled', 'Loading'],
    tokensConsumed: {
      color: ['brand.lime.500 (#AEF366)', 'neutral.900 (#171717)', 'neutral.200 (#E6E6E5)', 'neutral.50 (#F8F8F7)', 'error.500 (#D9383A)', 'error.100 (#FDF0F0)'],
      typography: ['WPP 500 Medium (12px, 14px, 16px)'],
      spacing: ['8px, 12px, 16px, 20px, 24px padding tokens; 4px quantum gaps'],
    },
    usageRules: [
      'Buttons use a fully rounded / pill-shaped geometry (999px / rounded-full) across all sizes as part of the Media Solutions interaction language.',
      'Prefer exactly one Primary button per major visual hierarchy or section.',
      'Button labels must begin with clear action verbs (e.g., "Export Campaign", "Schedule Flight", "Apply Filter").',
      'Secondary buttons are the default for non-primary positive actions.',
      'Destructive buttons must use contained, subtle treatment—never saturated neon alarms.',
    ],
    restrictions: [
      'Do NOT use Lime for every button. Lime is reserved strictly for the single primary intention.',
      'Do NOT apply pill treatment universally to inputs or containers; Inputs and Selects retain structured 8px radii.',
      'Do NOT use ambiguous labels such as "Click Here", "OK", or "Go".',
      'Do NOT use drop shadows as the sole boundary in light mode; rely on clean surface contrast first.',
    ],
    accessibility: [
      'Maintains 4.5:1 minimum text contrast in all enabled states.',
      'Focus indicator uses high-contrast 2px outline with 2px offset.',
      'Minimum touch target of 32px height (Small) up to 48px (Large).',
      'Disabled state sets aria-disabled="true" and reduces optical opacity to 40% while preserving legibility.',
    ],
    calibrationQuestions: [
      'Should Destructive buttons have a Secondary outline variant (e.g. Cancel vs Delete Flight)?',
      'Is 40px the universal default for desktop SaaS, reserving 32px for data tables and 48px for modal actions?',
    ],
  },
  {
    id: 'icon-button',
    number: '02',
    name: 'Icon Button',
    purpose: 'Provides functional icon-only triggers where space is constrained or iconography is globally recognized.',
    anatomy: ['Symmetric Square Container', 'Optical Scaled Icon (16px, 20px, 24px)', 'Accessible Tooltip Label', 'Focus Ring'],
    variants: ['Standard Neutral', 'Subtle Ghost', 'Contained Surface', 'Destructive Ghost'],
    sizes: ['Small (32x32px)', 'Medium (40x40px)', 'Large (48x48px)'],
    states: ['Default', 'Hover', 'Active', 'Focus', 'Disabled'],
    tokensConsumed: {
      color: ['neutral.900', 'neutral.700', 'neutral.200', 'neutral.100', 'error.500'],
      typography: ['Tooltip: WPP 400 Regular 12px/16px'],
      spacing: ['4px, 8px padding, 32px/40px/48px hit boxes'],
    },
    usageRules: [
      'Always accompany with an accessible tooltip and aria-label attribute.',
      'Use only for standardized actions (e.g., Close, Settings, Search, Download, Refresh, Filter).',
      'Ensure the optical center of the icon aligns with the geometric center of the bounding box.',
    ],
    restrictions: [
      'Do NOT use icon-only controls when the user intent would be ambiguous or domain-specific.',
      'Do NOT invent decorative or cryptic iconography; stick to approved Lucide functional glyphs.',
      'Never omit aria-label on an icon-only button.',
    ],
    accessibility: [
      'Mandatory aria-label announcing exact action.',
      'Keyboard focusable with Tab key, triggers on Enter and Space.',
    ],
    calibrationQuestions: [
      'Should table row actions always use 32px Icon Buttons while toolbar utilities use 40px?',
    ],
  },
  {
    id: 'input',
    number: '03',
    name: 'Input (Text Field)',
    purpose: 'Captures alphanumeric data entries, filters, search queries, and parameter inputs.',
    anatomy: ['Label Header', 'Required Indicator', 'Field Container', 'Leading Icon / Prefix', 'Input Value', 'Trailing Action', 'Supporting / Error Message'],
    variants: ['Default (Outlined)', 'Filled (Subtle Surface)', 'Read-Only (Uneditable)'],
    sizes: ['Small (32px)', 'Medium (40px)', 'Large (48px)'],
    states: ['Default', 'Hover', 'Focus', 'Disabled', 'Error', 'Success'],
    tokensConsumed: {
      color: ['neutral.0', 'neutral.50', 'neutral.200', 'neutral.700', 'neutral.900', 'error.500', 'success.500'],
      typography: ['Label: WPP 500 Medium 12px/16px', 'Input: WPP 400 Regular 14px/20px', 'Helper: WPP 400 Regular 12px/16px'],
      spacing: ['8px vertical gap, 12px/16px horizontal internal padding'],
    },
    usageRules: [
      'Always associate labels with inputs programmatically (htmlFor / id).',
      'Focus state must be instantly distinct from hover state using a crisp double-boundary or accent ring.',
      'Error messages must explain exactly what was wrong and how to fix it (e.g., "Enter a valid budget exceeding $5,000").',
    ],
    restrictions: [
      'Do NOT rely on color alone to indicate error; always include descriptive text and an error icon.',
      'Do NOT use placeholder text as a replacement for a formal label.',
      'Do NOT use rounded pill shapes for enterprise text inputs.',
    ],
    accessibility: [
      'Aria-describedby links input directly to helper/error text.',
      'Aria-invalid="true" flagged upon validation failure.',
      'Visible contrast exceeds 3:1 for input borders and 4.5:1 for input text.',
    ],
    calibrationQuestions: [
      'Should dark mode inputs use neutral.900 background with neutral.700 border, or neutral.800 with 1px border?',
    ],
  },
  {
    id: 'select',
    number: '04',
    name: 'Select (Dropdown)',
    purpose: 'Allows users to choose one or multiple options from a predefined list of valid values.',
    anatomy: ['Label', 'Control Trigger', 'Selected Text Value', 'Dropdown Chevron Indicator', 'Floating Popover Panel', 'Options List', 'Error / Supporting Text'],
    variants: ['Single Select', 'Searchable Select', 'Multi-Select with Chips'],
    sizes: ['Small (32px)', 'Medium (40px)', 'Large (48px)'],
    states: ['Default', 'Hover', 'Focus', 'Open (Expanded)', 'Disabled', 'Error'],
    tokensConsumed: {
      color: ['neutral.0', 'neutral.50', 'neutral.200', 'neutral.900', 'neutral.700'],
      typography: ['WPP 400 Regular 14px/20px', 'Label: 12px/16px 500'],
      spacing: ['8px list padding, 12px item horizontal padding, 4px gap'],
    },
    usageRules: [
      'Closed state should maintain minimal elevation (surface contrast over heavy shadows).',
      'Floating dropdown menu uses subtle surface border (#E6E6E5) and controlled elevation.',
      'Highlight the currently selected item cleanly without overpowering contrast.',
    ],
    restrictions: [
      'Do NOT add heavy dropped shadows to the closed control.',
      'Do NOT use select menus for binary yes/no choices; use Toggle or Checkbox instead.',
    ],
    accessibility: [
      'Follows WAI-ARIA Listbox design pattern with role="combobox" and aria-expanded.',
      'Full keyboard navigation: ArrowUp, ArrowDown, Enter, Escape.',
    ],
    calibrationQuestions: [
      'Should options list max-height be capped at 240px (6 items) before triggering internal scrolling?',
    ],
  },
  {
    id: 'checkbox',
    number: '05',
    name: 'Checkbox',
    purpose: 'Enables selection of one or more independent options, or a parent state in batch selections.',
    anatomy: ['Box Boundary (16x16px or 18x18px)', 'Check Icon / Dash Indicator', 'Label Text', 'Optional Helper Description'],
    variants: ['Standalone Checkbox', 'Checkbox with Description', 'Card-Enclosed Selection'],
    sizes: ['Small (16px box / 12px text)', 'Standard (18px box / 14px text)'],
    states: ['Unchecked', 'Checked', 'Indeterminate', 'Hover', 'Focus', 'Disabled', 'Error'],
    tokensConsumed: {
      color: ['neutral.900 (#171717)', 'neutral.200 (#E6E6E5)', 'neutral.0 (#FFFFFF)', 'error.500 (#D9383A)'],
      typography: ['Label: WPP 400 Regular 14px/20px', 'Helper: WPP 400 Regular 12px/16px'],
      spacing: ['8px gap between box and label, 4px micro alignment'],
    },
    usageRules: [
      'Use for non-mutually exclusive selections.',
      'Indeterminate state indicates partial selection of subordinate nested items.',
      'Checked box uses solid neutral.900 background with white check mark in light mode.',
    ],
    restrictions: [
      'Do NOT use Lime as a generic "checked = success" color. Checkboxes represent user selection, not operational success.',
      'Do NOT trigger immediate unconfirmed page changes upon clicking a checkbox.',
    ],
    accessibility: [
      'Native input type="checkbox" underlying structure.',
      'Aria-checked="mixed" for indeterminate state.',
      'Full click target expands to include entire label line.',
    ],
    calibrationQuestions: [
      'Is 18px the preferred desktop size to balance clickability with table row density?',
    ],
  },
  {
    id: 'radio',
    number: '06',
    name: 'Radio Button',
    purpose: 'Allows user to select exactly one option from a mutually exclusive list of two or more choices.',
    anatomy: ['Outer Circular Ring (18px)', 'Inner Dot Indicator (8px)', 'Label Text', 'Optional Supporting Note'],
    variants: ['Vertical Radio Group', 'Horizontal Inline Group', 'Radio Option Card'],
    sizes: ['Small (16px circle / 12px text)', 'Standard (18px circle / 14px text)'],
    states: ['Unselected', 'Selected', 'Hover', 'Focus', 'Disabled', 'Error'],
    tokensConsumed: {
      color: ['neutral.900', 'neutral.200', 'neutral.50', 'neutral.0'],
      typography: ['Label: WPP 400 Regular 14px/20px'],
      spacing: ['8px gap between radio and text, 12px vertical spacing between options'],
    },
    usageRules: [
      'Exactly one radio button in a group should be selected at all times.',
      'Use when all available choices should be visible simultaneously for direct comparison.',
    ],
    restrictions: [
      'Never allow unchecking a radio button by clicking it again (use Checkbox for toggleable states).',
      'Do NOT use radio buttons if there are more than 6 mutually exclusive options; use a Select instead.',
    ],
    accessibility: [
      'Group wrapped in fieldset with legend or role="radiogroup" with aria-labelledby.',
      'Arrow keys cycle selection within the group.',
    ],
    calibrationQuestions: [
      'Should Radio option cards be elevated to a primary selection pattern in onboarding wizards?',
    ],
  },
  {
    id: 'toggle',
    number: '07',
    name: 'Toggle (Switch)',
    purpose: 'Controls an immediate, binary setting or feature activation without requiring form submission.',
    anatomy: ['Pill Track (38x22px)', 'Moving Handle Thumb (18x18px)', 'Label Text', 'Optional State Label (On/Off)'],
    variants: ['Standalone Switch', 'Switch with Trailing Label', 'Row-Aligned Setting Item'],
    sizes: ['Standard (38px width / 22px height)', 'Compact (32px width / 18px height)'],
    states: ['Off (Unchecked)', 'On (Checked)', 'Hover', 'Focus', 'Disabled'],
    tokensConsumed: {
      color: ['neutral.900 (#171717)', 'neutral.200 (#E6E6E5)', 'neutral.0 (#FFFFFF)', 'brand.lime.500 (#AEF366)'],
      typography: ['Label: WPP 400 Regular 14px/20px'],
      spacing: ['2px internal thumb margin, 12px gap to label'],
    },
    usageRules: [
      'Use ONLY when the state change takes effect immediately (e.g. "Auto-refresh: On", "Telemetry Logging: Active").',
      'Active state uses high-contrast solid neutral.900 or controlled Brand Lime accent.',
    ],
    restrictions: [
      'Do NOT use Toggle within forms that require an explicit "Save" or "Submit" button; use Checkbox.',
      'Do NOT use ambiguous state labels; the visual position of the thumb already indicates state.',
    ],
    accessibility: [
      'Implemented with role="switch" and aria-checked attribute.',
      'Triggers on Space and Enter.',
    ],
    calibrationQuestions: [
      'Should active toggle use Brand Lime (#AEF366) with black thumb, or solid Neutral.900 with white thumb?',
    ],
  },
  {
    id: 'tag',
    number: '08',
    name: 'Tag (Category / Descriptor)',
    purpose: 'Classifies, labels, and describes content items by topic, channel, format, or capability.',
    anatomy: ['Container Capsule / Rectangle', 'Descriptor Text Label', 'Optional Leading Channel Icon', 'Optional Dismiss Button'],
    variants: ['Neutral Descriptor', 'Brand Media Tag', 'Supporting Colored Category (Blue, Violet)', 'Removable Tag'],
    sizes: ['Small (20px height / 11px font)', 'Medium (24px height / 12px font)'],
    states: ['Default', 'Hover', 'Focus (if interactive)', 'Dismissible'],
    tokensConsumed: {
      color: ['neutral.100 (#F2F2F1)', 'neutral.700 (#454544)', 'blue.100 (#EDF4FD)', 'blue.500 (#2470DF)', 'violet.100 (#F4F0FD)', 'violet.500 (#7B4DDB)'],
      typography: ['WPP 500 Medium 11px/14px or 12px/16px'],
      spacing: ['4px vertical, 8px horizontal padding, 4px gap'],
    },
    usageRules: [
      'Tags describe. Tags do NOT communicate status.',
      'Use for channel categorization (e.g. "YouTube", "Advanced TV", "CTV", "Social", "Creative Intelligence").',
      'Use subtle supporting or neutral tints to avoid visual competition with primary UI actions.',
    ],
    restrictions: [
      'Do NOT automatically use semantic Success/Warning/Error colors for ordinary tags.',
      'Do NOT use tags as primary call-to-action buttons.',
      'Do NOT overload cards with more than 3-4 category tags simultaneously.',
    ],
    accessibility: [
      'High contrast text on tinted background (minimum 4.5:1 ratio).',
      'If dismissible, close button has distinct aria-label (e.g., "Remove YouTube tag").',
    ],
    calibrationQuestions: [
      'Should category tags use slightly rounded corners (2px) or full capsule pills?',
    ],
  },
  {
    id: 'badge-status',
    number: '09',
    name: 'Badge / Status Indicator',
    purpose: 'Communicates the real-time operational or business state of an entity.',
    anatomy: ['Semantic Status Dot', 'State Text Label', 'Subtle Tinted Background Container'],
    variants: ['Success (On Track / Active)', 'Warning (Needs Attention)', 'Error (Below Target / Failed)', 'Info (Processing / Queued)', 'Neutral (Draft / Inactive)'],
    sizes: ['Compact (18px height / 10px font)', 'Standard (22px height / 11px font)'],
    states: ['Static Display', 'Live Pulse (for ongoing sync or live ingest)'],
    tokensConsumed: {
      color: ['success.100/500', 'warning.100/500', 'error.100/500', 'blue.100/500', 'neutral.100/500'],
      typography: ['WPP 700 Bold / 500 Medium 10px or 11px, Uppercase tracking +0.05em'],
      spacing: ['2px vertical, 6px horizontal padding, 4px gap to dot'],
    },
    usageRules: [
      'Status badges communicate. Tags describe.',
      'Must be subtle, compact, and effortlessly scannable across dense tabular views.',
      'Always combine a color indicator with a textual state label.',
    ],
    restrictions: [
      'Do NOT make status badges large solid neon color blocks.',
      'Do NOT use status badges without textual labels (color alone violates WCAG 1.4.1).',
      'Do NOT use semantic warning/error badges for neutral informational categories.',
    ],
    accessibility: [
      'Never relies solely on the colored dot; the text explicitly communicates the status.',
      'All text-to-background combinations meet or exceed WCAG 2.1 AA 4.5:1 contrast.',
    ],
    calibrationQuestions: [
      'Should live pulsing dots be reserved exclusively for actively running streaming campaigns?',
    ],
  },
  {
    id: 'tabs',
    number: '10',
    name: 'Tabs',
    purpose: 'Organizes related content views within the same hierarchy level and container without navigating away.',
    anatomy: ['Tab Bar Track', 'Tab Trigger', 'Optional Badge Count', 'Active Bottom Indicator Line', 'Hover State Background'],
    variants: ['Line Tabs (Underline Indicator)', 'Pill / Segmented Tabs', 'Contained Panel Tabs'],
    sizes: ['Standard (40px height / 14px font)', 'Compact (32px height / 12px font)'],
    states: ['Default', 'Hover', 'Active (Selected)', 'Focus', 'Disabled'],
    tokensConsumed: {
      color: ['neutral.900 (#171717)', 'neutral.700 (#454544)', 'neutral.500 (#8A8A88)', 'neutral.200 (#E6E6E5)'],
      typography: ['WPP 500 Medium 13px/18px or 14px/20px'],
      spacing: ['8px vertical, 16px horizontal padding, 24px gap between tabs'],
    },
    usageRules: [
      'Use tabs for alternate views of the same context (e.g. "Overview", "Audience Breakdown", "Creative Flights").',
      'Active tab is highlighted with a crisp 2px border and font weight shift, keeping layout stable.',
    ],
    restrictions: [
      'Do NOT use tabs for sequential multi-step forms; use a Stepper pattern instead.',
      'Do NOT turn every tab into a giant heavy button.',
      'Do NOT use multiple rows of tabs.',
    ],
    accessibility: [
      'Follows ARIA Tabbed Interface: role="tablist", role="tab", aria-selected="true/false", role="tabpanel".',
      'ArrowLeft and ArrowRight navigate between active tabs.',
    ],
    calibrationQuestions: [
      'Should active tab line indicator be 2px Neutral.900 or 2px Brand Lime on dark backgrounds?',
    ],
  },
  {
    id: 'tooltip',
    number: '11',
    name: 'Tooltip',
    purpose: 'Provides concise, high-value contextual explanation upon hover or keyboard focus of an interactive element.',
    anatomy: ['Floating Popover Surface', 'Micro Text Content', 'Optional Arrow Pointer', 'Subtle Boundary Border'],
    variants: ['Standard Dark Tooltip', 'High-Contrast White Tooltip', 'Keyboard Shortcut Tooltip'],
    sizes: ['Compact (Max width 240px / 11px font)', 'Standard (Max width 320px / 12px font)'],
    states: ['Visible', 'Dismissed / Hidden'],
    tokensConsumed: {
      color: ['neutral.900 (#171717)', 'neutral.0 (#FFFFFF)', 'neutral.700 (#454544)'],
      typography: ['WPP 400 Regular 11px/16px or 12px/16px'],
      spacing: ['6px vertical, 10px horizontal padding, 4px quantum offset'],
    },
    usageRules: [
      'Use only when information is genuinely supplementary (e.g., explaining an acronym or calculation basis).',
      'Must appear on hover AND keyboard focus.',
      'Lightweight floating elevation with high contrast.',
    ],
    restrictions: [
      'Do NOT use tooltips to hide essential information needed to complete a task.',
      'Do NOT include interactive controls, links, or buttons inside a simple tooltip.',
      'Do NOT let tooltips obscure the target element itself.',
    ],
    accessibility: [
      'role="tooltip" linked via aria-describedby on the trigger element.',
      'Dismissible with Escape key.',
      'Does not disappear abruptly when pointer moves slightly.',
    ],
    calibrationQuestions: [
      'Should tooltips render inverted (dark on light surfaces, light on dark surfaces) or universally dark (#171717)?',
    ],
  },
  {
    id: 'dropdown-menu',
    number: '12',
    name: 'Dropdown / Menu',
    purpose: 'Provides a contextual floating list of actions, options, or navigation destinations triggered by a button, icon button, or contextual element.',
    anatomy: [
      'Interactive Trigger (Button / Icon Button / Text)',
      'Floating Popover Surface (8px Radius)',
      'Actionable Menu Items (Label + Optional Icon)',
      'Optional Shortcut / Metadata Badges',
      'Optional Structural Dividers & Group Labels',
    ],
    variants: [
      'Action Menu (Contextual workflows)',
      'Selection Menu (Filter / Single pick with Checkmarks)',
      'Icon & Shortcut Menu (High-density power user tools)',
      'Destructive Action Menu (Contained semantic red item)',
    ],
    sizes: ['Compact (min-w 180px)', 'Standard (min-w 220px)', 'Content-Aware (auto wrap, max-w 340px)'],
    states: ['Closed', 'Open', 'Hover Item', 'Selected Item', 'Disabled Item', 'Keyboard Focus'],
    tokensConsumed: {
      color: [
        'neutral.900 (#171717)',
        'neutral.200 (#E6E6E5)',
        'neutral.50 (#F8F8F7)',
        'brand.lime.500 (#AEF366)',
        'error.500 (#D9383A)',
      ],
      typography: ['WPP 400 Regular & 500 Medium (12px / 16px)'],
      spacing: ['8px vertical & 12px horizontal item padding; 8px structured radius; 4px popover padding'],
    },
    usageRules: [
      'Dropdown / Menu is floating interaction UI, not a Card.',
      'Surface contrast first. Shadow second. Subtle elevation separates menu from underlying content without dramatic shadows.',
      'Positioning adapts dynamically relative to the trigger: opens downward by default, flips upward when vertical space is constrained.',
      'Selected items display a clean checkmark icon and subtle surface accent, distinguishable without relying exclusively on color.',
      'Disabled items remain readable (opacity-40) with interactions suppressed.',
    ],
    restrictions: [
      'Do NOT treat Dropdown / Menu as a Card container; it is an ephemeral floating interaction surface.',
      'Do NOT force all menus to the same width; width is content-aware with natural text wrapping.',
      'Do NOT use large, blurry or aggressive drop shadows.',
      'Do NOT truncate labels prematurely when natural wrapping preserves comprehension.',
    ],
    accessibility: [
      'role="menu" and role="menuitem" structure with aria-haspopup="menu" and aria-expanded on trigger.',
      'Supports full keyboard navigation: ArrowUp/ArrowDown, Enter, Space, and Escape dismiss.',
      'Visible focus ring on keyboard navigation.',
      'Maintains minimum 4.5:1 text contrast across light, dark, and featured surfaces.',
    ],
    calibrationQuestions: [
      'Should Dropdown / Menu open downward by default and flip upward automatically near the viewport bottom?',
      'How should content-aware width balance minimum tap widths (180px) against long programmatic flight names?',
    ],
  },
];

export const CALIBRATION_QUESTIONS_COMPONENTS = [
  {
    id: 1,
    title: 'Brand Lime Restraint & Primary Button Isolation',
    question: 'How do we enforce in code and review that exactly one Primary Lime CTA appears per major viewport view, preventing "Lime visual fatigue"?',
    principle: 'Lime is an intentional attention beacon, not an ambient wallpaper color.',
  },
  {
    id: 2,
    title: 'Destructive Button Surface Treatment',
    question: 'Should destructive actions (e.g., Delete Campaign Flight) use a neutral outline with red text until confirmation, avoiding overly aggressive solid red boxes?',
    principle: 'Surface contrast first. Contained semantic red signals consequence without decorative panic.',
  },
  {
    id: 3,
    title: 'Tag vs. Status Badge Semantic Division',
    question: 'How do we prevent engineers and designers from using semantic success green for neutral platform tags (e.g. YouTube, Google DV360)?',
    principle: 'Tags describe. Status badges communicate state. Ordinary categories must use neutral or supporting tones.',
  },
  {
    id: 4,
    title: 'Checkbox and Radio Color Invariance',
    question: 'Why must Checkbox and Radio NOT turn Brand Lime when checked?',
    principle: 'Checked represents user selection, not operational system success. Selection uses solid neutral contrast.',
  },
  {
    id: 5,
    title: 'Focus Ring Specification Across Surfaces',
    question: 'What is the exact mathematical focus ring formula across Light, Dark, and Featured surfaces?',
    principle: '2px solid outline with 2px offset: #171717 on light canvas; #FFFFFF or #AEF366 on dark canvas.',
  },
  {
    id: 6,
    title: 'Density Scaling Mechanics',
    question: 'How does Dense mode reduce layout footprint without violating the 32px minimum touch target or compromising typography legibility?',
    principle: 'Dense mode reduces internal padding (16px to 8/12px) and gap tokens, never font size or legibility.',
  },
  {
    id: 7,
    title: 'Select Control Shadow vs. Surface Contrast',
    question: 'Should closed dropdown selects have zero shadow in light mode, relying purely on 1px #E6E6E5 border?',
    principle: 'Surface contrast first. Shadow second. Closed controls are flat; only expanded popovers float.',
  },
  {
    id: 8,
    title: 'Toggle vs. Checkbox Boundary in Enterprise Settings',
    question: 'When is a Toggle strictly prohibited in favor of a Checkbox?',
    principle: 'Toggle is strictly for instant runtime effects. Forms requiring "Save Changes" must use Checkboxes.',
  },
  {
    id: 9,
    title: 'Dark Mode Surface Nuance for Inputs',
    question: 'Should Dark mode text inputs use #171717 surface with #333333 border, or slightly elevated #222222?',
    principle: 'Dark is a composition, not simply an inverted light mode. Contrast must ensure legible boundaries.',
  },
  {
    id: 10,
    title: 'Tooltip Inversion vs. Universal Theme',
    question: 'Should tooltips always be dark (#171717) with white text, even in dark mode?',
    principle: 'Tooltips are micro-overlays requiring maximum immediate contrast against their parent canvas.',
  },
];

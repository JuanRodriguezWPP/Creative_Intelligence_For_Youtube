# Color Palette Specification

> **WPP Media Solutions — Color System v1.0**  
> Status: Approved & Locked  
> Source Reference: `src/data/colorTokens.ts`

---

## 1. Core Palette Ramps

### 1.1. WPP Navy (`#000050`) — Primary Structural Color
- `brand.navy.50`: `#F0F0FA` (Subtle header fills, soft container surfaces)
- `brand.navy.100`: `#E2E2F5` (Soft dividers, inactive structural tabs)
- `brand.navy.200`: `#B8B8E6` (Supporting graphic boundaries)
- `brand.navy.300`: `#7070BF` (Mid-tone metadata in dark contexts)
- `brand.navy.400`: `#33338A` (High-contrast structural headers)
- **`brand.navy.500`**: **`#000050`** (Primary structural anchor: navigation, headers, dark analytical surfaces)
- `brand.navy.600`: `#00003D` (Inset dark cards, deep header bands)
- `brand.navy.700`: `#00002E` (Terminal panels, deepest dark backdrop)

### 1.2. Media Solutions Signature Lime (`#AEF366`) — Intentional Product Accent
- `brand.lime.50`: `#F7FDE8` (Selected row background)
- `brand.lime.100`: `#EDFCCE` (Active badge fill)
- `brand.lime.200`: `#DCFA9D` (Progress completion bar)
- `brand.lime.300`: `#C8F76B` (Secondary chart endpoint highlight)
- **`brand.lime.500`**: **`#AEF366`** (Signature product accent: primary button CTA background, active indicator pip)
- `brand.lime.600`: `#93D64B` (Hover state for primary Lime button)
- `brand.lime.700`: `#6FAF30` (Active focus border)
- `brand.lime.900`: `#355C11` (High-contrast lime text on light background)

### 1.3. WPP Blue (`#5967F6`) — Interaction & Telemetry
- `brand.blue.50`: `#EEF0FF` (Light Blue tint for active navigation `#F0F2FD`)
- `brand.blue.100`: `#DDE1FF` (Active tab border)
- **`brand.blue.500`**: **`#5967F6`** (Single-series charts, global focus ring, info badges)
- `brand.blue.600`: `#3B49DF` (Deep blue hover)

### 1.4. Creative Intelligence Violet (`#7D72E8`) — Machine Intelligence
- `brand.violet.50`: `#F4F3FD` (Soft AI card surface)
- **`brand.violet.500`**: **`#7D72E8`** (AI identifier, wear-out curves, algorithmic recommendations)
- `brand.violet.600`: `#6357D2` (High-contrast AI marks)

### 1.5. Foundation Neutrals
- `neutral.0`: `#FFFFFF` (Pure white container surface)
- `neutral.50`: `#F8F8F7` (Default light viewport canvas)
- `neutral.100`: `#F2F2F1` (Inset surface)
- `neutral.200`: `#E6E6E5` (Hairline dividers, subtle borders)
- `neutral.300`: `#D4D4D3` (Input borders)
- `neutral.500`: `#8A8A88` (Muted metadata, secondary text)
- `neutral.700`: `#454544` (Secondary body text)
- `neutral.900`: `#171717` (Primary running text, body copy)
- `neutral.1000`: `#000000` (Maximum contrast typography anchor)

---

## 2. Invariant Color Rules

1. **Black Discipline**: Black (`#000000` / `#171717`) is reserved for running body text and editorial copy. Never use Black as the default background for sidebars, navigation, or structural containers.
2. **Lime Discipline**: Lime is used selectively for active indicators, key emphasis, brand accents, and primary action buttons. Never flood large background areas with Lime or use it as generic green success.
3. **Data Visualization Invariant**: Black and gray are structural neutrals (axes, grids, labels), **never** data marks. Data representations must be chromatic (Blue, Violet, Lime, Semantic).
4. **Dark Contexts**: Dark environments use WPP Navy (`#000050`), not pure black or dark gray.

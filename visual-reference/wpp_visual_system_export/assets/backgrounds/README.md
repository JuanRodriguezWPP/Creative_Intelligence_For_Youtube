# Atmospheric Backgrounds Specification

> **WPP Media Solutions — Special Visual Treatment 17**  
> Status: Approved & Calibrated

---

## 1. Architectural Philosophy

Atmospheric backgrounds behave as **page-level or section-level visual environments**, NEVER as decorative elements attached to individual components or clipped inside card border-radii.

- Sits at `z-0` on the viewport canvas, directly behind white or neutral content containers (`z-10`).
- Provides subtle emotional depth, technical intelligence, and modern editorial presence without competing with text legibility or data marks.
- Client brand compatible: Remains neutral enough to pair cleanly with any third-party client color palette (including warm reds, oranges, or yellows) without visual dissonance.

---

## 2. Approved Chromatic Progression

The color progression across the blurred fields is strictly controlled:

1. **Media Solutions Lime / Signature Green**: `#AEF366` & `#26C76A` (Top right halo)
2. **WPP Intelligent Blue**: `#5967F6` & `#3B49DF` (Mid-workspace depth)
3. **Creative Intelligence Cool Violet**: `#7D72E8` (Lower page presence)

**Strict Prohibition**: Zero fuchsia, pink, magenta, warm red, or orange in atmospheric layers.

---

## 3. Included Vector Assets

- `atmospheric_background_light.svg`: Full SVG vector representation calibrated for light interface canvases (`#F8F8F7`).
- `atmospheric_background_dark.svg`: Full SVG vector representation calibrated for dark WPP Navy environments (`#000050`).

---

## 4. Live CSS / React Implementation

In production, rather than loading a heavy image file, the background is achieved through high-performance CSS `radial-gradient` divs with high blur:

```tsx
<div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
  {/* Halo 1: Soft Lime / Green */}
  <div
    className="absolute top-[80px] -right-[160px] w-[950px] h-[850px] rounded-full opacity-45 blur-[170px]"
    style={{
      background: 'radial-gradient(ellipse at center, rgba(174,243,102,0.48) 0%, rgba(38,199,106,0.28) 38%, rgba(89,103,246,0.12) 65%, transparent 75%)',
    }}
  />

  {/* Halo 2: Intelligent Blue */}
  <div
    className="absolute top-[520px] -left-[180px] w-[900px] h-[900px] rounded-full opacity-40 blur-[180px]"
    style={{
      background: 'radial-gradient(ellipse at center, rgba(89,103,246,0.38) 0%, rgba(59,73,223,0.26) 40%, rgba(125,114,232,0.12) 65%, transparent 75%)',
    }}
  />

  {/* Halo 3: Cool Blue-Violet */}
  <div
    className="absolute top-[1000px] -right-[140px] w-[850px] h-[850px] rounded-full opacity-35 blur-[180px]"
    style={{
      background: 'radial-gradient(ellipse at center, rgba(125,114,232,0.38) 0%, rgba(89,103,246,0.22) 42%, transparent 72%)',
    }}
  />

  {/* Micro Canvas Grain */}
  <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
</div>
```

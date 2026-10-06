# Iconography Integration Guide

> **Functional UI Icon Library Specification**  
> Package: `lucide-react` (version `^0.546.0`)

---

## 1. Installation

Install the approved icon dependency:

```bash
npm install lucide-react@^0.546.0
```

---

## 2. Standard Usage Rules

- **Import style**: Top-level named import from `lucide-react`:
  ```tsx
  import { ArrowRight, BarChart3, Sparkles } from 'lucide-react';
  ```
- **Optical stroke weight**: `1.75px` or `2px` standard.
- **Sizing standards**:
  - `w-3.5 h-3.5` (14px): Micro indicators, small buttons, metadata chips.
  - `w-4 h-4` (16px): Standard navigation icons, input leading icons, table triggers.
  - `w-5 h-5` (20px): Section headers, callout icons.
  - `w-6 h-6` (24px): Empty state illustrations and large featured anchors.
- **Color inheritance**:
  Icons should inherit text color (`text-[#000050]` in headers, `text-[#AEF366]` on active indicators, or `text-[#8A8A88]` for muted metadata).

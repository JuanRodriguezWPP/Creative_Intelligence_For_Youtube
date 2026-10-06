# Spacing & Grid Specification

> **WPP Media Solutions — Spacing & Layout v1.0**  
> Status: Approved & Locked  
> Source Reference: `src/data/spacingData.ts`

---

## 1. 4px Base Progression

All margins, paddings, gaps, and offsets strictly adhere to the 4px geometric scale:

| Token | Size | Common Use Case |
| :--- | :--- | :--- |
| `space.1` | 4px | Micro gap between icon and label, compact border radius. |
| `space.2` | 8px | Standard component padding, badge gap, structured icon button radius. |
| `space.3` | 12px | Compact container padding, input horizontal padding, card internal gap. |
| `space.4` | 16px | Standard card padding, section gap, stage container radius (`rounded-[16px]`). |
| `space.5` | 20px | Comfortable card padding, modal header padding. |
| `space.6` | 24px | Major section gap, grid gutter on desktop. |
| `space.8` | 32px | Large stage separation, editorial chapter spacing. |
| `space.10`| 40px | Hero section vertical padding. |
| `space.12`| 48px | Major document section dividing whitespace. |
| `space.16`| 64px | Page-level executive header breathing room. |

---

## 2. Density Modes

1. **Standard (Default Product)**:
   - Card padding: `p-5` (20px) or `p-6` (24px)
   - Input height: `h-9` (36px) or `h-10` (40px)
   - Balancing scanning speed and visual breathing room.
2. **Comfortable (Editorial & Client Reports)**:
   - Card padding: `p-6` (24px) to `p-8` (32px)
   - Vertical section rhythm: `space-y-12` (48px) to `space-y-16` (64px)
   - Prioritizes executive readability and dignity.
3. **Dense (Tabular Analytics)**:
   - Table cell padding: `py-2 px-3` (8px / 12px)
   - Compact input height: `h-8` (32px)
   - For high-density ledgers and filter drawers.

---

## 3. Responsive Breakpoints & Grid

- **Desktop (>1280px)**:
  - Max container width: 1440px / 1600px
  - 12 columns, 24px gutters
- **Tablet (768px–1279px)**:
  - Max container width: 1024px
  - 8 columns, 16px gutters
- **Mobile (<768px)**:
  - 4 columns, 12px gutters
  - 100% fluid vertical reflow, minimum 44px touch targets.

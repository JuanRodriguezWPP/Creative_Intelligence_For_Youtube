# Theme Configuration Guide

> **Theme & Global CSS Instructions**  
> Location: `/config/theme/`

---

## 1. Tailwind CSS Integration

- **Tailwind v4**: Uses `@import "tailwindcss";` and `@theme` block.
- **Tailwind v3**: Use the included `tailwind.config.js` to extend colors, fonts, radii, and spacing.

---

## 2. Default Surface Elevation Law

In this design system:
```css
/* Standard surface elevation */
box-shadow: none;
```
Shadows are strictly reserved for true transient overlay elements:
- Dropdowns
- Popovers
- Tooltips
- Modals
- Menus

Standard cards, content panels, metric containers, and navigation items do **NOT** use drop shadows.

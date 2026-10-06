# Favicons & Brand Icons

> **Browser Metadata & Application Icons**  
> Location: `/assets/icons/`

---

## 1. Icon Inventory

| Filename | Format | Dimensions | Purpose & Placement |
| :--- | :--- | :--- | :--- |
| `CreativeIntelligence_Favicon.svg` | SVG | Scalable vector | Primary browser tab icon for the Creative Intelligence application suite. Displays the distinctive solution graphic mark with high legibility at 16×16 and 32×32 pixels. |
| `favicon.svg` | SVG | Scalable vector | Default ecosystem favicon for WPP digital applications. |

---

## 2. HTML Implementation Snippet

In the `<head>` of your application HTML entry point (e.g. `index.html`):

```html
<!-- Primary Vector Favicon -->
<link rel="icon" type="image/svg+xml" href="/assets/icons/CreativeIntelligence_Favicon.svg" />

<!-- Ecosystem Fallback -->
<link rel="alternate icon" type="image/svg+xml" href="/assets/icons/favicon.svg" />
```

---

## 3. UI Icon Library Reference

The project uses **Lucide React** (`lucide-react` version `^0.546.0`) for functional UI iconography (arrows, controls, telemetry badges, search, filter, video indicators). See `/config/icons/` for complete integration specifications.

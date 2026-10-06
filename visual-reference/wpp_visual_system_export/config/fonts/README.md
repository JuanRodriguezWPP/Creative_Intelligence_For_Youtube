# Typography Setup & Font Weight Mapping

> **Technical Font Configuration**  
> Family: `WPP`  
> Assets Directory: `/assets/fonts/`

---

## 1. File to Weight Mapping

| File Name | Format | Weight Number | Weight Name | System Status & Usage |
| :--- | :--- | :--- | :--- | :--- |
| `WPP-Thin.woff2` | WOFF2 | 100 | Thin | **RESTRICTED**: Preserved as official brand asset, but excluded from operational UI roles due to legibility thresholds. |
| `WPP-ThinItalic.woff2` | WOFF2 | 100 | Thin Italic | **RESTRICTED**: Excluded from operational UI roles. |
| `WPP-Light.woff2` | WOFF2 | 300 | Light | **OPERATIONAL**: Editorial headlines, large metric values, display intros. |
| `WPP-LightItalic.woff2` | WOFF2 | 300 | Light Italic | **OPERATIONAL**: Sub-headings and editorial excerpts. |
| `WPP-Regular.woff2` | WOFF2 | 400 | Regular | **OPERATIONAL**: Standard body copy, descriptions, table cells. |
| `WPP-RegularItalic.woff2`| WOFF2 | 400 | Regular Italic | **OPERATIONAL**: Microcopy annotations, footnotes. |
| `WPP-Medium.woff2` | WOFF2 | 500 | Medium | **OPERATIONAL**: Form labels, table headers, active navigation tabs. |
| `WPP-MediumItalic.woff2` | WOFF2 | 500 | Medium Italic | **OPERATIONAL**: Selected state accents. |
| `WPP-Bold.woff2` | WOFF2 | 700 | Bold | **OPERATIONAL**: Section eyebrows, emphasis badges, primary KPI labels. |
| `WPP-BoldItalic.woff2` | WOFF2 | 700 | Bold Italic | **OPERATIONAL**: Rare high-emphasis callouts. |
| `WPP-Black.woff2` | WOFF2 | 900 | Black | **OPERATIONAL**: Display moments only. Never used as default bold. |
| `WPP-BlackItalic.woff2` | WOFF2 | 900 | Black Italic | **OPERATIONAL**: Display moments only. |

---

## 2. CSS Integration Guide

To include in your project:
```html
<link rel="stylesheet" href="/config/fonts/fonts.css" />
```
Or in your main stylesheet:
```css
@import "./config/fonts/fonts.css";

body {
  font-family: 'WPP', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

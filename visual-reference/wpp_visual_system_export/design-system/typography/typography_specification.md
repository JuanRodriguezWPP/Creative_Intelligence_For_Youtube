# Typography Specification

> **WPP Media Solutions — Typography System v1.0**  
> Status: Approved & Locked  
> Source Reference: `src/data/typographyData.ts`

---

## 1. Primary Typeface

- **Name**: WPP (Local WOFF2 web fonts)
- **Fallback stack**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Monospace stack**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

---

## 2. Operational Weights

| Weight | Name | Recommended Roles & Contexts |
| :--- | :--- | :--- |
| `300` | Light | Editorial cover titles, `Display` headlines, large single metric numbers. |
| `400` | Regular | Primary body copy, narrative explanations, table text, descriptions. |
| `500` | Medium | In-page tab labels, table column headers, form labels, active navigation. |
| `700` | Bold | Section category eyebrows, operational status tags, metric unit deltas. |
| `900` | Black | Rare cover moments only. Prohibited as general bold. |

**Restricted Weight**: `100 Thin` is loaded for brand compliance but strictly disqualified from system UI roles due to legibility thresholds.

---

## 3. Typographic Scale (Product UI & Editorial)

| Step / Role | Size | Line Height | Tracking | Default Weight | Sample Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Display` | 56px | 60px | `-0.025em` | 300 Light | Hero cover headlines |
| `H1` | 40px | 48px | `-0.02em` | 300 Light | Report & Dashboard main title |
| `H2` | 32px | 40px | `-0.015em` | 300 / 400 | Major chapter headers |
| `H3` | 24px | 32px | `-0.01em` | 400 Regular | Card titles, stage headers |
| `Body Large` | 18px | 26px | `0em` | 300 / 400 | Lead summary paragraphs |
| `Body` | 14px | 20px | `0em` | 400 Regular | Standard UI text, descriptions |
| `Body Small` | 12px | 16px | `0em` | 400 Regular | Supporting copy, form hints |
| `Caption / Micro`| 10px / 11px| 14px | `+0.01em` | 500 Medium | Eyebrows, badges, timestamps |

---

## 4. Global Invariant Rules

### Rule 01 · WPP Navy Heading Expression
Titles and important headings preferentially use **WPP Navy (`#000050`)** rather than Black (`#000000`). This aligns with WPP Open while preserving light, spacious editorial dignity. Do NOT thicken font weights because the color has changed.

### Rule 02 · Sentence Case Default (No Title Case)
All normal product and report language must use **Sentence case**.
- **Correct**: *"Creative Intelligence dashboard"*, *"Progreso del análisis"*, *"View all results"*, *"Campaña activa de Meta Social"*.
- **Incorrect**: *"Creative Intelligence Dashboard"*, *"Progreso Del Análisis"*, *"View All Results"*.
- **Preserved Exceptions**: Official proper nouns, company names, product brands, platform names, and acronyms (WPP, Media Solutions, Creative Intelligence, Meta, TikTok, YouTube, AI, CTV, CPM, ROAS).

### Rule 03 · Anti-Robotic Typography Law
*"Robotic typography is a misuse of the system."*
- Prohibits monospace as general product visual language, excessive letter spacing, artificial tracking, decorative uppercase, small caps, terminal labels (`[SYS-OK]`), and sci-fi console styling.
- Monospace is permitted **exclusively** for genuine technical metadata: system IDs, timestamps, image dimensions, and asset filenames.

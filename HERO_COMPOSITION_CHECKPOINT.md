# HERO COMPOSITION CHECKPOINT — CI YOUTUBE
**Fecha:** Octubre 2026  
**Objetivo:** Composición final en 3 columnas del Hero (1 Col Intro + 2 Cols Video 16:9) + Metadata Card a ancho completo inferior.  
**Estado:** Implementación Completa & Validada (Build 100% Exitoso)

---

## 1. Arquitectura de Composición del Hero

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1 COLUMNA (1fr)               2 COLUMNAS (2fr)               │
│  INTRO / TITLE                 VIDEO 16:9                    │
│                                                              │
│  REPORTE                       ┌────────────────────────────┐│
│  Creative                      │                            ││
│  Intelligence                  │         VIDEO              ││
│                                │         16:9               ││
│  Supporting copy               │                            ││
│  + description                 └────────────────────────────┘│
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                  CAMPAIGN METADATA (Full Width)              │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Implementación de Grid y Proporciones

* **Top Grid (`.v2-hero-top-grid`):**
  * `grid-template-columns: 1fr 2fr;` (1/3 Intro + 2/3 Video).
  * `gap: 36px;` con alineación vertical centrada.
  * Ocupa el 100% del ancho del área principal de reporte.
* **Columna 1 — Intro (`.v2-hero-text`):**
  * **Kicker:** `REPORTE` en WPP Navy (`#000050`), `font-weight: 800`, `letter-spacing: 2px`, uppercase.
  * **Heading Principal:** `Creative Intelligence` en WPP Navy (`#000050`), `font-size: 40px`, `font-weight: 900`, `letter-spacing: -0.03em`.
  * **Supporting Copy:** `De las señales a decisiones creativas.` en near-black (`#111111`), `font-size: 16px`, `font-weight: 600`.
  * **Description:** `Analizamos tu contenido, entendemos el contexto de activación, identificamos oportunidades por territorio y las convertimos en adaptaciones creativas.` en near-black (`#111111`), `font-size: 13px`, `line-height: 1.55`.
* **Columna 2 + 3 — Video (`.v2-hero-video`):**
  * `aspect-ratio: 16 / 9;`
  * `width: 100%; height: 100%;`
  * `border-radius: 16px;`
  * `object-fit: cover;`
  * Sin deformación, sin recortes cuadrados, sin bordes grises ni sombras.

---

## 3. Campaign Metadata Card (Full Width)

* **Superficie:** `#FFFFFF` (`.v2-card-light`), `border: none`, `box-shadow: none`, `border-radius: 16px`, `padding: 20px 24px`.
* **Disposición Horizontal:** Grid fluido de 7 columnas (`.v2-meta-grid`).
* **Campos e Iconografía Integrada:**
  1. **Cliente:** [icon `business`] `{{ brandName || '—' }}`
  2. **Campaña:** [icon `campaign`] `{{ campaignName || '—' }}` + descripción secundaria
  3. **Mercado:** [icon `public`] `{{ country || '—' }}`
  4. **Objetivo:** [icon `ads_click`] `{{ campaignObjective || '—' }}`
  5. **Período:** [icon `calendar_today`] `{{ activationDate || '—' }}`
  6. **Formato:** [icon `smart_display`] `Video`
  7. **Duración:** [icon `schedule`] `{{ selectedFileDurationStr || '—' }}`

---

## 4. Transición Editorial Hero $\to$ Section 01

* **Separación:** Espacio vertical generoso (`margin-bottom: 56px; padding-bottom: 56px;`).
* **Delimitación Editorial Sutil:** `border-bottom: 1px solid var(--ci-border-subtle, #EDEDEC);`.
* **Secuencia de Entrada a Capítulo 01:**
  $$\text{Hero (Intro + Video 16:9 + Meta)} \longrightarrow \text{Breathing Room} \longrightarrow \text{Editorial Divider} \longrightarrow \text{01 / 04 Creative Evaluation}$$

---

## 5. Comportamiento Responsive

* **Desktop ($\ge 1200\text{px}$):** 1 col Intro + 2 cols Video (16:9) $\to$ Metadata 7 cols full-width.
* **Laptop / Medium ($901\text{px} - 1200\text{px}$):** 1 col Intro + 2 cols Video $\to$ Metadata 4 cols.
* **Tablet / Mobile ($\le 900\text{px}$):** Intro $\to$ Video 16:9 (proporción preservada) $\to$ Metadata 2 cols (1 col en $\le 480\text{px}$).

---

## 6. Verificación de Integridad

* $\checkmark$ NO se alteró ninguna sección posterior (Section 01, 02, 03, 04).
* $\checkmark$ NO se modificaron APIs, contratos, adapters ni datos.
* $\checkmark$ Sidebar y logos oficiales preservados.
* $\checkmark$ Atmospheric background global (Tratamiento 17) preservado.
* $\checkmark$ Build de Frontend (`ui/src/ui`): **0 errores**.
* $\checkmark$ Build de Backend (`api-server`): **0 errores**.

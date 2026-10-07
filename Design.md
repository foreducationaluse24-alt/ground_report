web application/stitch/projects/3167495445862053652/screens/9fde72b3dec44f1091d8808975d2a569
# Design System: The Investigative Analyst

A design specification and implementation guideline for building news aggregation and automated news article analysis platforms.

---

## 1. Visual Identity & Brand Philosophy

- **Personality**: Authoritative, investigative, objective, analytical, and credible.
- **Visual Tone**: Traditional broadsheet authority meets modern algorithmic intelligence. Dense information display balanced by generous editorial typography and breathing room.
- **Reading Comfort**: Built for sustained reading sessions without eye fatigue, utilizing crisp contrast and distinct chromatic markers for data signals (sentiment, fact-checking, bias scores).

---

## 2. Color Tokens & Semantic Hierarchy

### 2.1 Core Palette (Hex Codes)

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| `color-primary-navy` | `#0F172A` | Slate Navy — Main headers, top navigation, brand anchors, high-priority buttons. |
| `color-surface-paper` | `#F8FAFC` | Cool Off-White / Paper — Default page canvas background and reading surfaces. |
| `color-surface-card` | `#FFFFFF` | Pure White — Card backgrounds, modular widgets, elevated data sheets. |
| `color-border-subtle` | `#E2E8F0` | Hairline card outlines, divider lines, table cell borders. |
| `color-border-medium` | `#CBD5E1` | Input focus rings, interactive toggles, active tab borders. |
| `color-text-primary` | `#0F172A` | Primary headlines, article titles, lead copy. |
| `color-text-secondary` | `#475569` | Slate Gray — Metadata, author bylines, source attributions, timestamps. |
| `color-text-tertiary` | `#94A3B8` | Muted tags, disabled elements, footnote captions. |

### 2.2 Semantic & Analytical Accent Tokens

| Semantic Token | Hex Code | Visual Meaning & UI Role |
| :--- | :--- | :--- |
| `color-accent-amber` | `#D97706` | **Investigation / Alert / High Sentiment**: Used for breaking alerts, bull/bear sentiment highlights, volatility warnings, and key takeaway badges. |
| `color-status-verified` | `#16A34A` | **Emerald Trust / Fact-Check High**: 90%+ source consensus, verified claims, high credibility indicators, bullish/positive metrics. |
| `color-status-warning` | `#EA580C` | **Developing / Inconclusive**: Mixed consensus, pending verification, potential bias flag. |
| `color-status-disputed` | `#DC2626` | **Crimson Alert / Debunked**: Contradictory reporting, unverified claims, retractions, negative/bearish sentiment warnings. |
| `color-status-neutral` | `#64748B` | **Context / Baseline**: Balanced coverage, neutral sentiment (45–55%), general entity chips. |

### 2.3 Tint & Background Alpha Rules (Badges & Pills)

For tags, chips, and data indicators, pair colored text with a 10%–15% tinted container:
- **Verified / Credibility Tag**: Text `#15803D`, Background `#DCFCE7` (or `rgba(22, 163, 74, 0.12)`).
- **Amber Alert / Sentiment Tag**: Text `#B45309`, Background `#FEF3C7` (or `rgba(217, 119, 6, 0.12)`).
- **Disputed / Flagged Tag**: Text `#B91C1C`, Background `#FEE2E2` (or `rgba(220, 38, 38, 0.12)`).
- **Entity / Neutral Tag**: Text `#334155`, Background `#F1F5F9`.

---

## 3. Typography Rules

### 3.1 Typeface Families
- **Editorial Headlines & Lead Paragraphs**: Serif font with high x-height and clear editorial dignity (e.g., `Newsreader`, `Merriweather`, or `Source Serif 4`).
- **UI Elements, Metadata, & Analytics**: Clean humanist or neutral sans-serif (e.g., `Inter`, `Geist`, or `-apple-system`).
- **Data Points, Consensus Percentages, Tickers**: Monospace for metric values (e.g., `JetBrains Mono` or `Roboto Mono`).

### 3.2 Type Scale
- **Display / Masthead**: `32px` / `2rem` — Bold (`font-weight: 700`), Tracking `-0.02em`.
- **Article Card Headline**: `18px`–`20px` — Semibold (`font-weight: 600`), Serif, Line Height `1.35`.
- **Article Body**: `16px` — Regular (`font-weight: 400`), Serif or Sans, Line Height `1.65` for optimal scannability.
- **Section Headers & Metric Labels**: `13px`–`14px` — Medium (`font-weight: 500`), Sans, Tracking `+0.02em`.
- **Micro-Copy & Timestamps**: `11px`–`12px` — Regular (`font-weight: 400`), Slate (`#475569`).

---

## 4. Spacing, Elevation & Component Styling

### 4.1 Spacing & Radius
- **Base Grid**: 4px / 8px incremental scale (`p-2`, `p-4`, `p-6`).
- **Corner Radius**:
  - Cards & Containers: `8px` (`rounded-lg`) to `12px` (`rounded-xl`).
  - Badges & Metric Pills: `4px` (`rounded`) or `9999px` (`rounded-full`) for status indicators.
  - Action Buttons: `6px`–`8px`.

### 4.2 Elevation & Borders
- **Card Styling**: Default to flat white `#FFFFFF` surface bordered by subtle `1px solid #E2E8F0` with minimal soft shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.05)`.
- **Hover / Active State**: Border darkens slightly to `#CBD5E1`, shadow transitions to `0 4px 6px -1px rgba(15, 23, 42, 0.08)`.

---

## 5. UI Component Guidelines for AI Coders

### 5.1 News Card Structure
Every news aggregator card should consist of:
1. **Metadata Ribbon**: Source name (e.g., Reuters, Bloomberg) + publication delta (e.g., "6m ago") + Top-right Credibility or Sentiment Pill.
2. **Editorial Headline**: `#0F172A`, serif font, high legibility.
3. **Synthesis / Analysis Snippet**: 1–2 sentences summarizing multiple source reports with italicized quotes or key data highlights.
4. **Data Strip**:
   - Source consensus meter (e.g., `94% source consensus across 18 publications`).
   - Actionable triggers: `Read Full Analysis →` button styled with Navy primary background `#0F172A` and Amber `#D97706` hover accent.

### 5.2 Sentiment & Bias Visualization
- Use horizontal progress bars or segmented meters where:
  - Left / Bearish or Negative: Red `#DC2626`
  - Center / Neutral or Balanced: Slate `#64748B`
  - Right / Bullish or Positive: Emerald `#16A34A`
- Current consensus pointer highlighted in Amber `#D97706`.

---

## 6. CSS / Tailwind Configuration Snippet

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        investigative: {
          navy: '#0F172A',
          paper: '#F8FAFC',
          card: '#FFFFFF',
          amber: '#D97706',
          emerald: '#16A34A',
          crimson: '#DC2626',
          slate: '#475569',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Merriweather', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
```

# Kamensec — Portfolio site

[![Lighthouse A11y](https://img.shields.io/badge/Lighthouse_A11y-100-success)](https://kamensec.xyz)
[![Lighthouse Best Practices](https://img.shields.io/badge/Lighthouse_BP-100-success)](https://kamensec.xyz)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse_SEO-100-success)](https://kamensec.xyz)

Personal portfolio for **Dimitri Kamenski (`kamensec`)** — independent
smart-contract security researcher specializing in EVM protocols. Live at
[kamensec.xyz](https://kamensec.xyz).

---

## Stack

- **[React 18](https://react.dev)** + **[Vite 5](https://vitejs.dev)** (modules + CSS modules)
- **[EmailJS](https://www.emailjs.com/)** for the contact form (no backend)
- **Vanilla JS** for the Hero animation (custom lerp + RAF)
- **No design framework** — custom design tokens in [`src/vars.css`](src/vars.css)

---

## Quick start

```bash
# install deps
npm install

# copy env template and fill in EmailJS credentials
cp .env.example .env
# then edit .env

# run dev server (HMR at http://localhost:5173/kamensec.github.io/)
npm run dev

# production build (outputs to /dist)
npm run build

# preview production build locally
npm run preview

# lint
npm run lint
```

---

## Environment variables

Required in `.env` (see [`.env.example`](.env.example)):

| Variable                     | What it's for                              |
| ---------------------------- | ------------------------------------------ |
| `VITE_EMAILJS_SERVICE_ID`    | EmailJS service ID (from dashboard)        |
| `VITE_EMAILJS_TEMPLATE_ID`   | EmailJS template ID for the contact form  |
| `VITE_EMAILJS_PUBLIC_KEY`    | EmailJS public key                         |

All `VITE_*` prefixed vars are exposed to the client at build time.
The contact form silently fails in dev if these aren't set.

---

## Project structure

```
src/
├── App.jsx                       — top-level layout
├── main.jsx                      — entry point
├── vars.css                      — design tokens (colors, spacing, type scale)
├── index.css                     — global reset
├── utils.js
└── components/
    ├── Navbar/                   — top nav with IntersectionObserver active state
    ├── Hero/
    │   ├── Hero.jsx              — h1 + dual CTA
    │   └── HeroAnimation.jsx     — vanilla JS mouse-follow + mobile orbit
    ├── Projects/
    │   ├── Projects.jsx          — 3-tab UI (audits / contests / judging)
    │   ├── AuditCard.jsx         — terminal-style card for audits
    │   └── ContestCard.jsx       — card with collapsible findings (mobile)
    ├── About/                    — bio + rabbit-through-hole visual
    ├── Contact/                  — terminal-styled form + alt methods
    ├── Footer/                   — single-line signature
    ├── Socials/                  — fixed sidebar with social links
    └── data/
        ├── projects.json         — audit work
        ├── contests.json         — contest findings
        └── judging.json          — empty array, ready to populate

public/
└── assets/
    ├── Icon.png                  — source for favicons
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png      — 180x180
    └── white-rabbit.png          — used in Hero + About
```

---

## Design system

All tokens live in [`src/vars.css`](src/vars.css):

- **Colors** — One Dark Pro-inspired palette (`--color-bg`, `--color-blue-highlight`, etc.) plus status colors (`--color-success`, `--color-warning`, `--color-error`, `--color-purple`)
- **Typography** — Fira Code, escala `--text-xs` → `--text-3xl`
- **Spacing** — 8pt grid, `--space-1` → `--space-24`
- **Radius** — `--radius-sm`, `--radius`, `--radius-lg`, `--radius-full`
- **Transitions** — `--transition-fast`, `--transition`, `--transition-slow`
- **Breakpoints** — referenced in comments; px values used in `@media` queries (`480` / `768` / `1024` / `1280`)

All components import vars via `@import "../../vars.css";` at the top of their `.module.css`.

---

## Deployment

The site auto-deploys to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
on every push to `main`:

1. `npm run build` produces `/dist`
2. A `CNAME` file is written with `kamensec.xyz`
3. The contents of `/dist` are pushed to `gh-pages` and served from there

**Important:** `vite.config.js` has `base: "/kamensec.github.io/"` because the
repo lives on `jenncrypted`'s GitHub and mirrors to `kamensec.github.io`.
If you change deploy targets and assets 404, this is the first place to look.

The `VITE_EMAILJS_*` env vars must be configured as GitHub Actions secrets
(or whatever pipeline you use) for the contact form to work in production.

---

## Accessibility & performance

The site targets Lighthouse 100 in Accessibility, Best Practices, SEO, and Agentic Browsing.

Highlights:

- Skip-link to `<main>` for keyboard users
- Semantic landmarks (`<nav>`, `<main>`, `<footer>`)
- All animations respect `prefers-reduced-motion`
- All interactive elements have visible focus states
- WCAG AA color contrast on every text element
- All images have explicit `width`/`height` (no CLS)
- Hero rabbit uses `fetchpriority="high"` (LCP); About rabbit is `loading="lazy"`

---

## Notes for future work

- `projects.json` has `year` and `tags` that were inferred — verify with Dimitri before any major reshuffles. `firm` is definitive (from the PDF URLs).
- `judging.json` is `[]` and the UI shows a `pending` placeholder until it's filled. When populating, mirror the `contests.json` schema (or define a new one and adapt `Projects.jsx`).
- The contact form uses a publicly-scoped EmailJS public key — that's fine (it's how EmailJS is designed) but enable abuse protection in their dashboard (rate limiting / origin whitelisting).
- `white-rabbit.png` is 142 KB; run it through [TinyPNG](https://tinypng.com) for a free ~70% reduction.

---

## Credits

Made with ♥ by [jenncrypted.io](https://jenncrypted.io).

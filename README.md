# FUM Landing Page

New Next.js App Router implementation of the FUM landing page.

## Content preservation

The root `index.html` remains the source of truth for the original Vietnamese copy and section markup. The homepage extracts the original inline styles and body markup at render time, while replacing only the legacy navigation and countdown script with accessible React components. The original `assets/` directory is also exposed through `public/assets` without duplicating binary files in Git history.

## Stack

- Next.js 16 + React 19 + TypeScript
- `@vepando/liquid-glass-react` for SVG-based Liquid Glass refraction
- Three.js + React Three Fiber + Drei for the optional hero 3D scene

## Local development

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## UI Lab

Open `/ui-lab` to inspect Liquid Glass components separately from the public-facing landing page.

## Deployment

The project is intended for Vercel. This branch is a preview implementation only; production deployment and domain changes require explicit approval.

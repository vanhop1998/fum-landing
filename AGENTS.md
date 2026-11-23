# FUM Landing Page — Project Instructions

## Product and content source of truth
- The original FUM landing page content is kept in the root `index.html`.
- `app/page.tsx` reads the original file at build/render time and reuses its body markup. Do not rewrite, summarize, translate, reorder, or silently correct FUM copy.
- The original image library remains in `assets/`; use its existing paths. Do not replace FUM photography with generated stock imagery.
- The original header is replaced by `components/GlassNavbar.tsx`. Keep the same navigation labels and anchor destinations.
- The 2027 countdown is implemented in `components/Countdown.tsx` to preserve the original behavior without injecting an inline script.

## Stack
- Next.js App Router, React, TypeScript.
- Liquid Glass: `@vepando/liquid-glass-react` (MIT; SVG displacement refraction; CSS fallback).
- 3D: Three.js, React Three Fiber and Drei. The hero scene is dynamically imported and must remain optional.
- Keep the primary page content server-rendered. Keep WebGL and browser-only interactions behind client boundaries.

## Visual direction
- FUM's existing identity remains red, near-black and white with Be Vietnam Pro.
- Use real glass only for navigation/controls and selected surfaces. Do not apply glass indiscriminately to long-form content.
- Keep body copy readable and contrast high. Keep 3D decorative and behind content.
- Respect `prefers-reduced-motion`; mobile should use a reduced 3D footprint.
- Do not introduce paid libraries, paid templates or proprietary demo assets.

## Performance and accessibility
- Lazy-load the WebGL scene with `next/dynamic`, cap device pixel ratio, use low-power rendering and avoid per-frame React state updates.
- Use semantic HTML, keyboard-visible focus, accessible names and native dialog behavior.
- Test route rendering, responsive layouts, hydration, TypeScript, lint and production build before declaring completion.

## Agent skills consulted
- Liquid Glass Design: https://github.com/xinlingfeiwu/liquid-glass-design-skill
- Three.js R3F: https://github.com/cesartevisual/threejs-skills/tree/main/skills/threejs-r3f
- Three.js Performance: https://github.com/cesartevisual/threejs-skills/tree/main/skills/threejs-performance
- Frontend Design: https://github.com/anthropics/skills/tree/main/skills/frontend-design
- Vercel React Best Practices: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices

## Working rules
- Work on `redesign/nextjs-liquid-glass`; never push redesign work directly to `main`.
- Do not deploy to production or change Vercel project settings without explicit approval.
- Preserve existing routes and fragment anchors.

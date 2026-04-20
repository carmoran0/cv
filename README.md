# Carlos Moreno CV

Personal CV website built with React, TypeScript, Tailwind CSS, and i18next.

## Stack

- **Frontend:** React 19 + TypeScript
- **Build tool:** Vite 8
- **Styling:** Tailwind CSS 3 + PostCSS + Autoprefixer
- **i18n:** i18next + react-i18next
- **Testing:** Vitest + Testing Library
- **Deploy:** GitHub Pages (`gh-pages` branch)

## Compatibility baseline

- **Node.js:** `20.19.0` (LTS baseline used in CI)
- **npm:** `10.x`
- **OS for local development:** macOS, Linux, or Windows (WSL recommended)
- **Browser targets:**
  - Production: `>0.2%`, `not dead`, `not op_mini all`
  - Development: last 1 Chrome/Firefox/Safari

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`.

## Quality checks

```bash
npm run test
npm run build
npm run typecheck
```

## Deployment

- CI validates install, test, and build on PRs and pushes.
- Deploy workflow runs on `main` and publishes `dist/` to GitHub Pages.

Manual deployment (if needed):

```bash
npm run deploy
```

## Maintenance policy

- **Monthly:** dependency update and `npm audit` review.
- **Quarterly:** tooling/runtime review (Node, Vite, React, test stack).
- **Ownership:** repository maintainers review and merge upgrade PRs after CI passes.

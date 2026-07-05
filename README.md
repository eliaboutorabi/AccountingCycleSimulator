# Accounting Cycle Simulator

An editorial, interactive accounting education app that follows one company close from source evidence to journal entries, ledgers, statements, controls, audit support, and filing.

<p>
  <a href="https://svelte.dev/docs/kit"><img alt="SvelteKit" src="https://img.shields.io/badge/SvelteKit-2-ff3e00?style=for-the-badge&logo=svelte&logoColor=white"></a>
  <a href="https://svelte.dev/"><img alt="Svelte 5" src="https://img.shields.io/badge/Svelte-5-ff3e00?style=for-the-badge&logo=svelte&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178c6?style=for-the-badge&logo=typescript&logoColor=white"></a>
  <a href="https://tailwindcss.com/"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white"></a>
  <a href="https://vite.dev/"><img alt="Vite" src="https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white"></a>
  <a href="https://vitest.dev/"><img alt="Vitest" src="https://img.shields.io/badge/Vitest-4-6e9f18?style=for-the-badge&logo=vitest&logoColor=white"></a>
  <a href="https://playwright.dev/"><img alt="Playwright" src="https://img.shields.io/badge/Playwright-tested-2ead33?style=for-the-badge&logo=playwright&logoColor=white"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub_Pages-static-222?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

![Accounting Cycle Simulator landing page](./static/images/accounting-cycle-simulator-screenshot.png)

## Live App

The app is configured for GitHub Pages:

[https://eliaboutorabi.github.io/AccountingCycleSimulator/](https://eliaboutorabi.github.io/AccountingCycleSimulator/)

If the link is not live yet, the Pages workflow may still be finishing its first deployment.

## What It Teaches

Accounting Cycle Simulator is designed as a single-page learning experience: lesson content stays on the left, while the right side shows the actual accounting artifact being discussed. The goal is to make accounting feel less like isolated definitions and more like a traceable operating system for business evidence.

The current flow covers:

- Company setup and accounting architecture
- Business event triage
- Evidence packets and source documents
- Accounting judgment and revenue treatment
- Subledgers, journal entries, matching, and ledgers
- Cutoff, adjustments, reconciliations, trial balance, and consolidation
- Statement mapping, financial statements, cash flows, and disclosures
- Tie-outs, controls, audit requests, mock filing, and close debrief

## Product Direction

This is being built as an educational simulator, not a static article. The interface is intentionally editorial, but the long-term target is deeply interactive:

- Watch mode: see each accounting artifact update step by step.
- Do mode: let learners perform the accounting move themselves.
- Traceability: follow a reported number backward to evidence and forward to filing.
- Real-world artifacts: invoices, journals, ledgers, workpapers, statement binders, disclosure schedules, and filing tie-outs should look like the objects accountants actually use.

## Tech Stack

- SvelteKit with static adapter
- Svelte 5 runes
- TypeScript
- Tailwind CSS 4
- Lucide icons
- Vite
- Vitest
- Playwright
- GitHub Actions deployment to GitHub Pages

## Local Development

Install dependencies:

```sh
npm install
```

Start the dev server:

```sh
npm run dev
```

Run checks:

```sh
npm run check
npm run lint
```

Build for production:

```sh
npm run build
```

Preview the static build:

```sh
npm run preview
```

## GitHub Pages Deployment

Deployment is handled by [.github/workflows/deploy.yml](./.github/workflows/deploy.yml). The workflow:

- Installs dependencies with `npm ci`
- Runs Svelte/TypeScript checks
- Builds the static site
- Sets `BASE_PATH` to the repository name so asset paths work under `/AccountingCycleSimulator`
- Uploads the `build/` artifact
- Deploys through GitHub Pages

In GitHub, set **Settings -> Pages -> Build and deployment -> Source** to **GitHub Actions**.

## Suggested Repository Description

```txt
An editorial SvelteKit accounting-cycle simulator that traces business events from source evidence through journals, close, statements, controls, audit support, and filing.
```

Suggested topics:

```txt
sveltekit, svelte, typescript, accounting, education, simulator, finance, github-pages, playwright, tailwindcss
```

## Author

Built by [Eli Aboutorabi](https://eliaboutorabi.github.io/).

- GitHub: [eliaboutorabi](https://github.com/eliaboutorabi)
- LinkedIn: [Elham Aboutorabi](https://www.linkedin.com/in/elham-aboutorabi/)

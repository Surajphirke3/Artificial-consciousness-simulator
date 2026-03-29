# Contributing to Artificial Consciousness Simulator

Thank you for your interest in contributing! Contributions of all kinds are welcome — bug fixes, new features, documentation improvements, and more.

Please take a moment to read this guide before submitting any changes.

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Fork & Clone the Repo](#fork--clone-the-repo)
  - [Set Up Your Development Environment](#set-up-your-development-environment)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Opening a Pull Request](#opening-a-pull-request)
- [Code Style & Linting](#code-style--linting)
- [Reporting Issues](#reporting-issues)

---

## Getting Started

### Fork & Clone the Repo

1. **Fork** the repository by clicking the "Fork" button on [GitHub](https://github.com/Surajphirke3/Artificial-consciousness-simulator).

2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/Artificial-consciousness-simulator.git
   cd Artificial-consciousness-simulator
   ```

3. **Add the upstream remote** so you can keep your fork up to date:

   ```bash
   git remote add upstream https://github.com/Surajphirke3/Artificial-consciousness-simulator.git
   ```

### Set Up Your Development Environment

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Sync with upstream** before starting any work:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

---

## Branch Naming Conventions

Create a new branch for every change. Use the following naming pattern:

```
<type>/<short-description>
```

| Type | Description | Example |
|---|---|---|
| `feat` | A new feature | `feat/model-comparison-export` |
| `fix` | A bug fix | `fix/thought-log-overflow` |
| `docs` | Documentation updates | `docs/update-readme` |
| `style` | Code style / formatting changes | `style/tailwind-cleanup` |
| `refactor` | Code refactoring (no functional change) | `refactor/simulation-store` |
| `test` | Adding or updating tests | `test/control-panel-unit` |
| `chore` | Build, tooling, or dependency updates | `chore/upgrade-nextjs` |

**Examples:**

```bash
git checkout -b feat/database-integration
git checkout -b fix/slider-accessibility
git checkout -b docs/api-reference
```

---

## Commit Message Guidelines

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. All commit messages must adhere to the following format:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer(s)]
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Refactoring production code |
| `test` | Adding or correcting tests |
| `chore` | Updating build scripts, dependencies, etc. |
| `perf` | Performance improvements |
| `ci` | Changes to CI/CD configuration |

### Scope (optional)

Use the scope to indicate which part of the codebase is affected:

- `simulator` — Simulator components
- `store` — Zustand stores
- `api` — API routes
- `ui` — UI components
- `i18n` — Internationalization
- `education` — Education page
- `dashboard` — Dashboard

### Examples

```
feat(simulator): add CSV export to ControlPanel

fix(store): prevent duplicate model IDs on creation

docs: update installation instructions in README

style(ui): reformat slider component with Prettier

chore(deps): upgrade next.js to 16.1.0
```

### Rules

- Use the **imperative, present tense**: "add" not "added" or "adds"
- Do **not** capitalize the first letter of the summary
- Do **not** add a period at the end of the summary
- Keep the summary under **72 characters**
- Reference issues in the footer: `Closes #42` or `Fixes #7`

---

## Opening a Pull Request

1. **Push your branch** to your fork:

   ```bash
   git push origin feat/your-feature-name
   ```

2. **Open a Pull Request** on [GitHub](https://github.com/Surajphirke3/Artificial-consciousness-simulator/pulls) from your fork's branch to the `main` branch of the upstream repo.

3. **Fill in the PR template** with:
   - A clear title following the commit message format
   - A description of what changed and why
   - Screenshots or screen recordings for UI changes
   - Reference to any related issues (e.g., `Closes #42`)

4. **Ensure all checks pass** — the CI pipeline will run linting and build checks automatically.

5. **Request a review** — A maintainer will review your PR and may request changes.

### PR Checklist

Before submitting, confirm that:

- [ ] My code follows the project's code style and linting rules
- [ ] I have run `npm run lint` and there are no errors
- [ ] I have run `npm run build` and the build succeeds
- [ ] My changes do not break existing functionality
- [ ] I have added or updated documentation where necessary
- [ ] My commits follow the Conventional Commits format

---

## Code Style & Linting

This project uses **ESLint** (via Next.js) for code quality and **Prettier** (via Tailwind CSS integration) for formatting.

### Run the linter

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint -- --fix
```

### Run a production build check

```bash
npm run build
```

### Style Guidelines

- **TypeScript** — Use strict typing. Avoid `any` unless absolutely necessary.
- **Component naming** — Use PascalCase for React components (`ConsciousnessGraph.tsx`).
- **File naming** — Use camelCase for utilities and hooks (`useSimulation.ts`, `model-utils.ts`).
- **Imports** — Use path aliases (`@/components/...`) instead of relative paths where possible.
- **State** — Prefer Zustand stores for shared state; keep local state in `useState` for component-scoped data.
- **Styling** — Use Tailwind CSS utility classes. Avoid inline styles and custom CSS unless necessary.
- **Accessibility** — Always include ARIA attributes, keyboard navigation, and semantic HTML.

---

## Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/Surajphirke3/Artificial-consciousness-simulator/issues/new) on GitHub.

### Bug Reports

When filing a bug report, please include:

1. **A clear and descriptive title**
2. **Steps to reproduce** the issue
3. **Expected behavior** — what you expected to happen
4. **Actual behavior** — what actually happened
5. **Screenshots or screen recordings** (if applicable)
6. **Environment info:**
   - OS (e.g., macOS 14, Windows 11, Ubuntu 22.04)
   - Node.js version (`node --version`)
   - Browser and version
   - npm version (`npm --version`)

### Feature Requests

When suggesting a feature:

1. **Describe the problem** you are trying to solve
2. **Describe your proposed solution** in detail
3. **Explain why** this feature would benefit the project
4. **Add any relevant examples** or references

---

Thank you for contributing to the Artificial Consciousness Simulator! 🧠✨

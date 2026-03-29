# 🧠 Artificial Consciousness Simulator

> Explore the frontier of AI, Mind, and Awareness — an interactive platform for simulating and studying theories of artificial consciousness.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/suraj-jayant-phirkes-projects/v0-artificial-consciousness-simulator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Folder Structure](#folder-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## About the Project

The **Artificial Consciousness Simulator** is a research and education platform that lets users interactively explore leading theories of consciousness through multi-model simulation. Whether you're a researcher, student, or simply curious about the mind, this tool provides hands-on visualizations and comparative analytics to help you understand how consciousness might emerge in artificial systems.

**Problems it solves:**

- Makes abstract consciousness theories (GWT, IIT, Predictive Processing) tangible through interactive simulation
- Enables side-by-side comparison of multiple AI consciousness models with adjustable parameters
- Provides educators and researchers with a visual, data-driven environment for studying awareness and cognition

**Live Demo:** [https://vercel.com/suraj-jayant-phirkes-projects/v0-artificial-consciousness-simulator](https://vercel.com/suraj-jayant-phirkes-projects/v0-artificial-consciousness-simulator)

---

## ✨ Features

- 🤖 **Multi-Model Simulation** — Create, configure, and run multiple consciousness models simultaneously
- 🎛️ **Parameter Control** — Adjust four key consciousness parameters: Memory, Attention, Emotion, and Learning Rate
- 📊 **Real-Time Visualization** — 3D point-cloud graphs and live line charts displaying consciousness levels over time
- 💬 **Thought Log** — Real-time stream of simulated "thoughts" generated during each model run
- 📚 **Educational Modules** — In-depth learning content covering Global Workspace Theory (GWT), Integrated Information Theory (IIT), and Predictive Processing
- 🧩 **Interactive Diagrams & Quizzes** — Hands-on exercises to reinforce theory understanding
- 💼 **Business Insights** — Analytics and use-case showcase for research organizations
- 📤 **Data Export** — Export simulation runs to CSV or JSON for further analysis
- 🌐 **Multilingual Support** — Available in English, Hindi (हिंदी), and Marathi (मराठी)
- ♿ **Accessibility** — WCAG-compliant with ARIA labels, skip links, and keyboard navigation
- 🌙 **Dark / Light Theme** — Full theme switching support

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, React 19) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Component Library** | [Shadcn UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **3D Graphics** | [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Internationalization** | Custom i18n (EN, HI, MR) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Package Manager** | npm |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.17 or later — [Download](https://nodejs.org/)
- **npm** v9 or later (comes with Node.js)
- **Git** — [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Surajphirke3/Artificial-consciousness-simulator.git
cd Artificial-consciousness-simulator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (see [Configuration & Environment Variables](#configuration--environment-variables)).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 📖 Usage Guide

### Starting a Simulation

1. **Navigate to the Dashboard** — Click "Start Simulation" on the landing page or visit `/dashboard`.
2. **Create a Model** — Click "Add Model" and configure its initial parameters.
3. **Adjust Parameters** — Use the sliders in the Model Parameters panel:
   - **Memory** (0–100): Influences how much past context is retained
   - **Attention** (0–100): Controls focus intensity on incoming signals
   - **Emotion** (0–100): Modulates the emotional weighting of responses
   - **Learning Rate** (0–100): Determines how quickly the model adapts
4. **Run the Simulation** — Click the ▶️ **Play** button in the Control Panel.
5. **Observe** — Watch the Consciousness Graph and Thought Log update in real time.
6. **Compare Models** — Use the Model Comparison panel to view multiple models side-by-side.

### Exporting Data

```bash
# Export options are available in the Control Panel:
# - "Export CSV" → downloads simulation data as a .csv file
# - "Export JSON" → downloads full simulation state as .json
```

### Example: Programmatic API Usage

```typescript
// Save a simulation run via the API
const response = await fetch('/api/simulation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    modelId: 'model-abc123',
    params: { memory: 75, attention: 90, emotion: 50, learningRate: 60 },
    results: {
      finalConsciousnessLevel: 82,
      averageStability: 0.91,
      peakActivity: 95,
    },
  }),
});
const data = await response.json();
console.log(data); // { success: true, id: '...' }
```

### Exploring Educational Content

Visit `/education` to access:
- **Theory tabs** — Global Workspace Theory, IIT, Predictive Processing
- **Interactive Diagram** — Adjust inputs and observe system responses
- **Quiz Module** — Test your understanding of each theory

---

## 📸 Screenshots

> _Screenshots will be added once the live deployment UI is captured._

| Dashboard | Model Simulation | Education |
|---|---|---|
| _(coming soon)_ | _(coming soon)_ | _(coming soon)_ |

---

## 🔌 API Documentation

All API routes are located under `app/api/`. They follow REST conventions.

### `GET /api/models`

Returns all saved consciousness models.

**Response:**
```json
[
  {
    "id": "model-abc123",
    "name": "Model A",
    "params": {
      "memory": 50,
      "attention": 70,
      "emotion": 40,
      "learningRate": 60
    }
  }
]
```

### `POST /api/models`

Creates a new consciousness model.

**Request body:**
```json
{
  "name": "My Model",
  "params": { "memory": 60, "attention": 80, "emotion": 55, "learningRate": 45 }
}
```

### `GET /api/simulation`

Returns all saved simulation runs.

### `POST /api/simulation`

Saves a completed simulation run with parameters and results.

**Request body:**
```json
{
  "modelId": "model-abc123",
  "params": { "memory": 75, "attention": 90, "emotion": 50, "learningRate": 60 },
  "results": {
    "finalConsciousnessLevel": 82,
    "averageStability": 0.91,
    "peakActivity": 95
  }
}
```

### `GET /api/user`

Returns the current user profile.

> **Note:** API routes currently use in-memory placeholder data. Database integration (Supabase / PostgreSQL) is planned for a future release.

---

## ⚙️ Configuration & Environment Variables

Create a `.env.local` file in the project root based on the following:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Base URL of the application | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL / Supabase connection string | _(not set)_ |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics ID | _(auto-set by Vercel)_ |

> Most features work without any environment variables in local development.

---

## 📁 Folder Structure

```
Artificial-consciousness-simulator/
├── app/                      # Next.js App Router pages & API routes
│   ├── api/                  # REST API endpoints (models, simulation, user)
│   ├── business/             # Business insights & analytics page
│   ├── dashboard/            # Dashboard & per-model simulation views
│   │   └── [modelId]/        # Dynamic route for individual model detail
│   ├── education/            # Educational learning modules
│   ├── profile/              # User profile page
│   ├── theory/               # Theory detail pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # Reusable React components
│   ├── accessibility/        # WCAG accessibility helpers
│   ├── layout/               # Navbar, Sidebar, Footer, Header
│   ├── simulator/            # Core simulation UI
│   │   ├── ConsciousnessGraph.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── ModelComparison.tsx
│   │   ├── ModelParameters.tsx
│   │   └── ThoughtLog.tsx
│   └── ui/                   # Shadcn UI primitives
├── hooks/                    # Custom React hooks
│   ├── useSimulation.ts
│   └── useModelManager.ts
├── lib/                      # Utilities and helpers
│   ├── api-client.ts
│   ├── i18n.tsx              # Internationalization
│   ├── model-utils.ts
│   └── utils.ts
├── public/                   # Static assets (images, icons)
├── store/                    # Zustand state stores
│   ├── model-store.ts
│   └── simulation-store.ts
├── styles/                   # Additional global stylesheets
├── .env.example              # Example environment variables
├── .gitignore
├── components.json           # Shadcn UI configuration
├── next.config.mjs           # Next.js configuration
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 🗺️ Roadmap

- [x] Multi-model simulation with adjustable parameters
- [x] Real-time 3D consciousness visualization
- [x] Educational content (GWT, IIT, Predictive Processing)
- [x] Data export (CSV / JSON)
- [x] Multilingual support (EN, HI, MR)
- [x] Dark / Light theme
- [x] Accessibility (WCAG compliance)
- [ ] Database integration (Supabase / PostgreSQL)
- [ ] User authentication and persistent profiles
- [ ] Collaborative simulation sessions (multi-user)
- [ ] Additional consciousness theories (HOT, Global Neuronal Workspace)
- [ ] AI-generated insights and recommendations
- [ ] Mobile app (React Native)
- [ ] REST API public access with API key management

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on:
- How to fork and clone the repo
- Branch naming conventions
- Commit message guidelines
- How to open a pull request
- Code style requirements
- Issue reporting

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — React framework powering the application
- [Shadcn UI](https://ui.shadcn.com/) — Beautiful and accessible component library
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) — 3D rendering in React
- [Recharts](https://recharts.org/) — Composable charting library
- [Zustand](https://zustand-demo.pmnd.rs/) — Lightweight state management
- [Framer Motion](https://www.framer.com/motion/) — Animations and transitions
- [Vercel](https://vercel.com/) — Hosting and deployment platform
- [v0.app](https://v0.app/) — AI-assisted UI generation
- [Lucide](https://lucide.dev/) — Icon library
- Consciousness theory references: [Global Workspace Theory](https://en.wikipedia.org/wiki/Global_workspace_theory), [Integrated Information Theory](https://en.wikipedia.org/wiki/Integrated_information_theory), [Predictive Processing](https://en.wikipedia.org/wiki/Predictive_coding)

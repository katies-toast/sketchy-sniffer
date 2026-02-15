# SketchySniffer

Sniff out scams before you meet up.

SketchySniffer is an AI-powered decision reflection tool for online marketplace listings. Paste a Kijiji listing link and get an instant risk analysis with red flags, cognitive bias detection, a sketch score, and a short quiz to help you think critically before committing.

We don't make decisions for you. We help you think through them.

## How It Works

1. **Paste a listing link** - Copy a Kijiji listing URL into SketchySniffer.
2. **We sniff it out** - The listing is scraped and run through two layers of detection: instant rule-based checks and AI-powered analysis.
3. **Review the results** - You get a risk score (0-100), a breakdown of red flags and cognitive biases, and a quiz to reinforce what you've learned.

## Features

- **Sketch Score** - A 0-100 risk score with low / moderate / high risk levels
- **Red Flag Detection** - 17+ checks across price, description, seller, image, and payment categories
- **Cognitive Bias Flagging** - Identifies psychological tricks like scarcity, urgency, anchoring, authority, and loss aversion
- **Interactive Quiz** - Multiple choice questions tied to the specific red flags found in your listing
- **Decision Prompt** - A moment to decide what you want to do: proceed, ask questions, or walk away

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (with SWC) for build tooling and dev server
- **Tailwind CSS** for utility-first styling with a custom hand-drawn/sketchy theme
- **shadcn/ui** (Radix UI) for accessible component primitives
- **React Router v6** for client-side routing
- **React Query** for async state management
- **Vitest** + **Testing Library** for testing
- **Bun** as the package manager

## Backend

The frontend calls a backend API hosted on Railway that handles listing scraping and AI-powered analysis. The API accepts a listing URL and returns a structured response containing the risk score, findings, and quiz questions.

## Getting Started

Prerequisites: [Bun](https://bun.sh/) (or Node.js + npm)

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project
cd sketchy-sniffer

# Install dependencies
bun install

# Start the dev server
bun run dev
```

## Project Structure

```
src/
├── pages/           # Route pages (Index, HowItWorks, About, Login)
├── components/      # App components (Navbar, ScoreRadialChart, RedFlagAccordion, etc.)
├── components/ui/   # shadcn/ui primitives
├── lib/             # API client and utilities
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
└── test/            # Test files
```

## Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `bun run dev`    | Start dev server                     |
| `bun run build`  | Production build                     |
| `bun run preview`| Preview production build             |
| `bun run test`   | Run tests                            |
| `bun run lint`   | Lint with ESLint                     |

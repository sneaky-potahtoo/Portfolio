# Pranjal — The Digital Cabin Portfolio

A modern, high-craft developer portfolio inspired by *"The Digital Cabin / A Quiet Workspace for Deep Focus"*. Built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

---

## 🌲 Highlights & Features

- **5-Second Customization:** Everything is driven by a single source of truth in [`src/config.ts`](./src/config.ts). No hunting through JSX files to change text, bio, links, or skills.
- **Architectural Minimalism:** 3 focused sections:
  1. **Hero**: Kinetic 3-line headline (*"Broken Gears. Cleaner Codes. Happy Accidents."*), left-hand bio, vacant center for cabin atmosphere, and right-hand glassmorphic card with large bold name focus.
  2. **Tech Stack**: Interactive categorized pills grid (Frontend, Backend, Tools) with 18 type-safe technologies.
  3. **Contact**: 3 glassmorphic interactive channels (GitHub, LinkedIn, and Gmail with instant clipboard copy & toast).
- **Cinematic Experience:**
  - Precision SVG perimeter border-draw preloader with live percentage counter.
  - Multi-layer scroll parallax camera moving through the misty pine forest.
  - Interactive 3D physics tilt cards with dynamic cursor radial spotlight.
  - Ambient particle canvas with floating embers and drifting mist wisps.

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   ├── cabin-bg.png            # 4K master background photograph
│   └── favicon.svg             # Warm amber cabin pine favicon
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   ├── GithubIcon.tsx   # Centralized GitHub SVG icon
│   │   │   ├── LinkedInIcon.tsx # Centralized LinkedIn SVG icon
│   │   │   └── SkillIcon.tsx    # Dynamic icon resolver for skills
│   │   ├── AboutSection.tsx    # Section 2: Tech stack grid with filters
│   │   ├── AmbientAtmosphere.tsx # Canvas ember & mist particle layer
│   │   ├── ContactSection.tsx  # Section 3: Contact cards & minimal footer
│   │   ├── HeroSection.tsx     # Section 1: Kinetic headline & card
│   │   ├── Navbar.tsx          # Floating glass header & mobile drawer
│   │   ├── Preloader.tsx       # SVG perimeter border draw & counter
│   │   ├── ScrollProgressBar.tsx # Smooth viewport scroll progress indicator
│   │   ├── TiltCard.tsx        # Reusable 3D tilt component with cursor spotlight
│   │   └── Toast.tsx           # Floating feedback toast for email copying
│   ├── App.tsx                 # Root layout & parallax camera orchestration
│   ├── config.ts               # SINGLE SOURCE OF TRUTH (Profile, Skills, Copy, Links)
│   ├── index.css               # Tailwind CSS v4 base, glassmorphism, utilities
│   └── main.tsx                # React root mount
├── package.json
└── vite.config.ts
```

---

## 🛠️ Quick Start & Commands

### Prerequisites
- Node.js 18+
- npm 9+

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

---

## ⚡ How to Customize (For Collaborators)

Open [`src/config.ts`](./src/config.ts). All content is organized cleanly into typed blocks:

1. **Profile Info:** Change your name, brand, role, and location.
2. **Hero Copy:** Update headline lines, bio, featured tech badges, and button text.
3. **Skills & Tech Stack:** Add or remove items from the `skills.items` array. Each item takes `{ name, category, icon, color }`.
4. **Contact Channels:** Update your GitHub URL, LinkedIn profile, or email address.
5. **Navigation:** Customize menu links and top-right CTA button.

No code modifications in component files are needed for content updates!

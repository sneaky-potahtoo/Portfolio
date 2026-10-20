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
  - One-time cabin light startup: a masked layer from the supplied bright photograph flickers over the dim master frame, then stays on until reload. Reduced-motion visitors see the steady light without flicker.
  - Interactive 3D physics tilt cards with dynamic cursor radial spotlight.
  - Ambient particle canvas with floating embers and drifting mist wisps.

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   ├── cabin-dim.png           # stationary background master frame
│   ├── cabin-light-layer.png   # photograph-derived light pixels with transparency
│   ├── cabin-bg.png            # original background kept as a legacy asset
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
├── assets/cabin/               # original dim and bright reference frames
├── scripts/build-cabin-light.py # regenerates the transparent light layer
├── scripts/test-cabin-light.py  # checks the mask and final cabin brightness
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

### Cabin light adjustment

The startup begins after the preloader completes and both cabin images decode. Change `STARTUP_DELAY_MS` and `FLICKER_DURATION_MS` in `src/components/CabinLightBackground.tsx` to adjust its schedule; keep the CSS animation duration in `src/index.css` in sync. Edit the percentages in `@keyframes cabin-light-startup` to change flicker intensity and timing. The final `on` state remains steady for the rest of the document load.

The selective mask is baked into `public/cabin-light-layer.png` by `scripts/build-cabin-light.py` using the source images in `assets/cabin/`. The script aligns the bright image one pixel left, selects warm changes within the windows, porch, and nearby ground, and leaves the surrounding scene transparent. Install Pillow and NumPy if you need to regenerate the layer, then run `python scripts/build-cabin-light.py` and `python scripts/test-cabin-light.py`.

---

## ⚡ How to Customize (For Collaborators)

Open [`src/config.ts`](./src/config.ts). All content is organized cleanly into typed blocks:

1. **Profile Info:** Change your name, brand, role, and location.
2. **Hero Copy:** Update headline lines, bio, featured tech badges, and button text.
3. **Skills & Tech Stack:** Add or remove items from the `skills.items` array. Each item takes `{ name, category, icon, color }`.
4. **Contact Channels:** Update your GitHub URL, LinkedIn profile, or email address.
5. **Navigation:** Customize menu links and top-right CTA button.

No code modifications in component files are needed for content updates!

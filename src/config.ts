export type SkillCategory = "frontend" | "backend" | "tools";

export interface SkillItem {
  name: string;
  category: SkillCategory;
  icon: string;
  color: string;
}

export interface ContactChannel {
  id: "github" | "linkedin" | "email";
  title: string;
  description: string;
  categoryLabel: string;
  metaLabel: string;
  metaValue: string;
  url: string;
  actionText: string;
  badge?: string;
  isPrimary?: boolean;
}

export interface PortfolioConfig {
  profile: {
    name: string;
    brand: string;
    role: string;
    location: string;
    tagline: string;
  };
  navigation: {
    items: Array<{ label: string; id: string }>;
    ctaText: string;
  };
  preloader: {
    statusText: string;
    subtitle: string;
  };
  hero: {
    titleSolid1: string;
    titleOutline: string;
    titleSolid2: string;
    bio: string;
    featuredPills: Array<{ label: string; icon: string }>;
    ctaText: string;
  };
  skills: {
    badge: string;
    headingSolid: string;
    headingOutline: string;
    title: string;
    subtitle: string;
    items: SkillItem[];
  };
  contact: {
    badge: string;
    titleSolid: string;
    titleOutline: string;
    subtitle: string;
    channels: ContactChannel[];
  };
  footer: {
    copyright: string;
    backToTopText: string;
  };
  // Direct shortcuts for backward compatibility and quick edits
  name: string;
  brand: string;
  role: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const GITHUB_URL = "https://github.com/sneaky-potahtoo";
const LINKEDIN_URL = "https://www.linkedin.com/in/pranjalsinghpokhariya";
const EMAIL_ADDRESS = "themonkemode@gmail.com";

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  // 1. Profile Information
  profile: {
    name: "Pranjal",
    brand: "Pranjal.dev",
    role: "Full-Stack Developer & Problem Solver",
    location: "India (IST)",
    tagline: "A Quiet Workspace for Deep Focus",
  },

  // Direct top-level shortcuts
  name: "Pranjal",
  brand: "Pranjal.dev",
  role: "Full-Stack Developer & Problem Solver",
  links: {
    github: GITHUB_URL,
    linkedin: LINKEDIN_URL,
    email: EMAIL_ADDRESS,
  },

  // 2. Navigation
  navigation: {
    items: [
      { label: "Home", id: "hero" },
      { label: "About", id: "about" },
      { label: "Contact", id: "contact" },
    ],
    ctaText: "Let's Connect",
  },

  // 3. Preloader Sequence
  preloader: {
    statusText: "INITIALIZING",
    subtitle: "CALIBRATING DEEP FOCUS WORKSPACE",
  },

  // 4. Hero Section
  hero: {
    titleSolid1: "Broken Gears.",
    titleOutline: "Cleaner Codes.",
    titleSolid2: "Happy Accidents.",
    bio: "Welcome to my quiet corner of the internet, where I build full-stack projects, dodge existential dread, and confidently rebrand questionable choices as happy accidents.",
    featuredPills: [
      { label: "React & TS", icon: "terminal" },
      { label: "C++ & Node.js", icon: "cpu" },
    ],
    ctaText: "Explore My Craft",
  },

  // 5. Skills & Tech Stack (Single Source of Truth)
  skills: {
    badge: "ABOUT ME",
    headingSolid: "The Architect ",
    headingOutline: "Behind The Screen",
    title: "Tech Stack",
    subtitle:
      "Core technologies & tools for engineering scalable, high-craft systems.",
    items: [
      // Frontend
      {
        name: "HTML5",
        category: "frontend",
        icon: "globe",
        color: "text-orange-400",
      },
      {
        name: "CSS3",
        category: "frontend",
        icon: "palette",
        color: "text-blue-400",
      },
      {
        name: "JavaScript",
        category: "frontend",
        icon: "code",
        color: "text-yellow-400",
      },
      {
        name: "TypeScript",
        category: "frontend",
        icon: "filecode",
        color: "text-blue-400",
      },
      {
        name: "React",
        category: "frontend",
        icon: "code2",
        color: "text-cyan-400",
      },
      {
        name: "Tailwind CSS",
        category: "frontend",
        icon: "layers",
        color: "text-teal-400",
      },

      // Backend
      {
        name: "Node.js",
        category: "backend",
        icon: "terminal",
        color: "text-emerald-400",
      },
      {
        name: "Express.js",
        category: "backend",
        icon: "server",
        color: "text-slate-300",
      },
      {
        name: "C++",
        category: "backend",
        icon: "cpu",
        color: "text-indigo-400",
      },
      {
        name: "PostgreSQL",
        category: "backend",
        icon: "database",
        color: "text-sky-400",
      },
      {
        name: "MongoDB",
        category: "backend",
        icon: "database",
        color: "text-emerald-400",
      },
      {
        name: "Firebase",
        category: "backend",
        icon: "flame",
        color: "text-amber-400",
      },

      // Tools
      {
        name: "Git",
        category: "tools",
        icon: "gitbranch",
        color: "text-orange-400",
      },
      {
        name: "GitHub",
        category: "tools",
        icon: "github",
        color: "text-white",
      },
      {
        name: "Postman",
        category: "tools",
        icon: "send",
        color: "text-orange-400",
      },
      {
        name: "Vite",
        category: "tools",
        icon: "zap",
        color: "text-purple-400",
      },
      {
        name: "Vercel",
        category: "tools",
        icon: "triangle",
        color: "text-white",
      },
      {
        name: "Figma",
        category: "tools",
        icon: "layout",
        color: "text-pink-400",
      },
    ],
  },

  // 5. Contact Section
  contact: {
    badge: "CONTACT ME",
    titleSolid: "The Light's ",
    titleOutline: "Always On.",
    subtitle:
      "Whether you want to collaborate on a project, talk tech, or just say hi - reach out directly through any of the three channels below.",
    channels: [
      {
        id: "github",
        title: "GitHub",
        description:
          "Explore my repositories, open-source contributions, and code architecture.",
        categoryLabel: "CODEBASE",
        metaLabel: "Status",
        metaValue: "Active Commits",
        url: GITHUB_URL,
        actionText: "View GitHub",
      },
      {
        id: "linkedin",
        title: "LinkedIn",
        description:
          "Connect professionally for internships, collaborations, and tech discussions.",
        categoryLabel: "CAREER",
        metaLabel: "Network",
        metaValue: "Let's Connect",
        url: LINKEDIN_URL,
        actionText: "Connect on LinkedIn",
      },
      {
        id: "email",
        title: "Gmail",
        description: "Drop a direct email straight to my inbox.",
        categoryLabel: "DIRECT LINE",
        metaLabel: "Response",
        metaValue: "Within 24 Hours",
        url: `mailto:${EMAIL_ADDRESS}`,
        actionText: "Send an Email",
        badge: "Priority",
        isPrimary: true,
      },
    ],
  },

  // 6. Minimal Footer
  footer: {
    copyright: "© 2026 Pranjal",
    backToTopText: "Back to Top",
  },
};

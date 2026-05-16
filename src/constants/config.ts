// ============================================
// Baseline — App Configuration
// ============================================

export const APP_CONFIG = {
  name: "Baseline",
  description: "A premium mobile-first web app foundation",
  version: "1.0.0",
  author: "Baseline Team",
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.2,
    slow: 0.3,
    page: 0.25,
  },
  ease: {
    default: [0.25, 0.1, 0.25, 1.0],
    spring: { type: "spring", stiffness: 300, damping: 30 },
    out: [0.0, 0.0, 0.2, 1.0],
    in: [0.4, 0.0, 1.0, 1.0],
  },
  stagger: {
    fast: 0.03,
    normal: 0.05,
    slow: 0.08,
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const LIMITS = {
  recentActivity: 8,
  recentProjects: 6,
  searchResults: 20,
  notificationsPreview: 5,
  fileUploadMaxMB: 25,
} as const;

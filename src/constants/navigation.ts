// ============================================
// Baseline — Navigation Constants
// ============================================

export const MAIN_NAV = [
  { href: "/dashboard", icon: "home", label: "Home" },
  { href: "/search", icon: "search", label: "Search" },
  { href: "/dashboard", icon: "layout-grid", label: "Projects" },
] as const;

export const BOTTOM_NAV = [
  { href: "/dashboard", icon: "home", label: "Home" },
  { href: "/search", icon: "search", label: "Search" },
  { href: "/dashboard", icon: "folder", label: "Projects" },
  { href: "/settings", icon: "settings", label: "Settings" },
] as const;

export const SETTINGS_NAV = [
  { href: "/settings", icon: "settings", label: "Settings" },
] as const;

export const ROUTES = {
  home: "/",
  onboarding: "/onboarding",
  dashboard: "/dashboard",
  search: "/search",
  settings: "/settings",
  detail: (id: string) => `/detail?id=${id}`,
} as const;

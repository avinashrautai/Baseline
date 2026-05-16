// ============================================
// Baseline — Route Definitions
// ============================================

export const ROUTES = {
  home: "/",
  onboarding: "/onboarding",
  dashboard: "/dashboard",
  search: "/search",
  settings: "/settings",
  detail: (id: string) => `/detail?id=${id}`,
} as const;

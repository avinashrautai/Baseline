# Baseline

A premium mobile-first web app foundation built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

Designed to feel like a polished real-world product — calm, tactile, focused, and highly usable.

## Design Philosophy

- **Minimal & warm** — grounded, professional, natural
- **Editorial-inspired** — strong hierarchy, comfortable spacing
- **Mobile-first** — touch-friendly, responsive, fast
- **Accessibility-aware** — focus states, screen reader support, semantic HTML

Inspired by: Linear, Notion, Raycast, Vercel.

## Quick Start

```bash
# Clone and install
git clone https://github.com/avinashrautai/Baseline.git
cd Baseline
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## Architecture

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, meta, viewport)
│   ├── page.tsx                # Root redirect → onboarding
│   ├── onboarding/page.tsx     # 3-step animated onboarding
│   ├── dashboard/              # Main dashboard (layout + page)
│   ├── detail/                 # Project detail with tabs
│   ├── search/                 # Search with live filtering
│   └── settings/               # Full settings with sections
├── components/
│   ├── ui/                     # 23 reusable UI primitives
│   ├── shared/                 # 6 composite data-bound components
│   └── layout/                 # 4 structural layout components
├── data/                       # Sample data layer with queries
│   ├── users.ts                # 6 team members
│   ├── projects.ts             # 6 projects with full metadata
│   ├── tasks.ts                # 14 tasks across projects
│   ├── activity.ts             # 10 activity entries + 5 notifications
│   └── files.ts                # 5 file attachments
├── types/                      # TypeScript interfaces
│   └── index.ts                # All shared type definitions
├── constants/                  # App constants
│   ├── config.ts               # Animation, breakpoints, limits
│   └── navigation.ts           # Route definitions, nav items
├── hooks/                      # Custom React hooks
│   └── use-media-query.ts      # useIsMobile, useIsDesktop
├── lib/                        # Utilities
│   ├── utils.ts                # cn() class merge utility
│   └── format.ts               # Date, number, status formatters
└── styles/
    └── globals.css             # Tailwind + custom utilities
```

## UI Components (23)

### Primitives (`src/components/ui/`)

| Component | Description |
|-----------|-------------|
| `Button` | 6 variants × 5 sizes, touch-active scaling |
| `Card` | 4 variants with composable sub-components |
| `Input` | Optional leading icon, focus ring, disabled state |
| `Textarea` | Auto-height text area with consistent styling |
| `Tabs` | Radix-based with animated active indicator |
| `Switch` | Accessible toggle with smooth thumb transition |
| `Dropdown` | Full menu with labels, groups, separators |
| `Modal` | Dual mode: centered dialog + bottom sheet |
| `SearchBar` | Two variants, clear button, auto-focus |
| `StatWidget` | Number display with change indicator |
| `SectionHeader` | Title + subtitle + action slot |
| `ListItem` | Icon + text + trailing + chevron navigation |
| `Badge` | 7 semantic color variants |
| `Avatar` | Image with initials fallback |
| `IconButton` | 3 variants × 3 sizes with a11y label |
| `Tooltip` | 4 directional positions, hover-triggered |
| `Chip` | Removable tag with active state |
| `StatusDot` | Online/away/offline/busy indicators |
| `ProgressBar` | Animated fill with label option |
| `NotificationBadge` | Counter overlay for icons |
| `Divider` | With optional centered label |
| `Loading` | Spinner, screen loader, skeletons |
| `EmptyState` | Icon + title + description + CTA |

### Shared Composites (`src/components/shared/`)

| Component | Description |
|-----------|-------------|
| `ProjectCard` | Full project display with progress and members |
| `ActivityItem` | User avatar + action text + timestamp |
| `TaskRow` | Status icon + title + priority + assignee |
| `MemberRow` | Avatar + status dot + name + role |
| `FileRow` | Type icon + name + metadata + actions |
| `NotificationItem` | Type-based icon + unread indicator |

### Layout (`src/components/layout/`)

| Component | Description |
|-----------|-------------|
| `AppShell` | Responsive wrapper (sidebar + main + bottom nav) |
| `Sidebar` | Desktop nav with projects list + user section |
| `MobileNav` | Bottom tab bar with active indicators |
| `PageHeader` | Back button + title + subtitle + actions |

## Screens

### 1. Onboarding (`/onboarding`)
3-step animated introduction with feature highlights, progress dots, and skip option.

### 2. Dashboard (`/dashboard`)
Stats grid, active project cards, task list, activity feed, and weekly summary in responsive 2-column layout.

### 3. Project Detail (`/detail`)
Project metadata strip, animated progress bar, and 4 tabbed sections (Tasks grouped by status, Members with online status, Files with type icons, Activity feed).

### 4. Settings (`/settings`)
Profile editor, appearance toggles, notification preferences, general settings, security options, support links, and danger zone.

### 5. Search (`/search`)
Live filtering across projects/tasks/people with category tabs showing counts, recent search history, trending tags, and quick access grid.

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#141414` | App background |
| `surface` | `#1E1E1B` | Cards, panels, sidebar |
| `layer` | `#2A2A26` | Elevated surfaces, hover states |
| `primary` | `#76836A` | Primary actions, active states |
| `accent` | `#B89B72` | Secondary emphasis, highlights |
| `foreground` | `#F4EFE6` | Primary text |
| `muted` | `#A39B90` | Secondary text, icons |
| `border` | `#3A3A35` | Visible borders |
| `border-subtle` | `#2E2E2A` | Subtle dividers |
| `danger` | `#C45D4F` | Destructive actions |
| `success` | `#6B9E6B` | Positive indicators |
| `warning` | `#D4A853` | Caution states |

### Typography Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `display` | 2.5rem | 600 | Hero text |
| `heading-1` | 1.875rem | 600 | Page titles |
| `heading-2` | 1.5rem | 600 | Section titles |
| `heading-3` | 1.25rem | 500 | Card titles |
| `body-lg` | 1.0625rem | 400 | Emphasized body |
| `body` | 0.9375rem | 400 | Default text |
| `body-sm` | 0.8125rem | 400 | Secondary info |
| `caption` | 0.75rem | 500 | Metadata, timestamps |
| `overline` | 0.6875rem | 600 | Section labels |

### Spacing

4px base grid: `0.5` `1` `1.5` `2` `2.5` `3` `4` `5` `6` `8` `10` `12` `16` `20` `24`

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `sm` | 6px | Small elements, chips |
| `md` | 8px | Inputs, buttons |
| `lg` | 12px | Cards, list items |
| `xl` | 16px | Modals, large cards |
| `2xl` | 20px | Sheets, containers |

## Data Layer

The `src/data/` directory provides a complete sample dataset for development:

- **6 users** with roles, statuses, and initials
- **6 projects** with progress, members, tags, and dates
- **14 tasks** with priorities, assignees, and status tracking
- **10 activity** entries with user attribution
- **5 notifications** with read/unread states
- **5 files** with type metadata

Each module exports query helpers (e.g., `getTasksByProject`, `getActiveProjects`, `getUsersByIds`).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 |
| Primitives | Radix UI |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge, class-variance-authority |

## Interaction Principles

- One clear primary action per screen
- Subtle transitions only (opacity, translate, scale)
- Touch-friendly tap targets (min 44px)
- Consistent visual rhythm and balance
- Prioritize usability over decoration
- Staggered animations for list reveals
- Immediate feedback on all interactions

## License

MIT

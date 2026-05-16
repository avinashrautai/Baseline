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
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── onboarding/         # Onboarding flow
│   ├── dashboard/          # Main dashboard
│   ├── detail/             # Project detail page
│   ├── settings/           # Settings & preferences
│   └── search/             # Search interface
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx      # Button with variants
│   │   ├── card.tsx        # Card system
│   │   ├── input.tsx       # Form input
│   │   ├── tabs.tsx        # Tab navigation
│   │   ├── switch.tsx      # Toggle switch
│   │   ├── dropdown.tsx    # Dropdown menu
│   │   ├── modal.tsx       # Modal & sheet system
│   │   ├── search-bar.tsx  # Search input
│   │   ├── stat-widget.tsx # Statistics display
│   │   ├── section-header.tsx
│   │   ├── list-item.tsx   # List row component
│   │   ├── badge.tsx       # Status badges
│   │   ├── avatar.tsx      # User avatar
│   │   ├── loading.tsx     # Loading states & skeletons
│   │   └── empty-state.tsx # Empty state displays
│   └── layout/             # Layout components
│       ├── app-shell.tsx   # Responsive app wrapper
│       ├── sidebar.tsx     # Desktop sidebar navigation
│       ├── mobile-nav.tsx  # Mobile bottom navigation
│       └── page-header.tsx # Page title headers
├── lib/
│   └── utils.ts            # Utility functions (cn)
└── styles/
    └── globals.css         # Global styles & Tailwind
```

## Design Tokens

### Colors

| Token       | Hex       | Usage                    |
|-------------|-----------|--------------------------|
| background  | `#141414` | App background           |
| surface     | `#1E1E1B` | Cards, panels            |
| layer       | `#2A2A26` | Elevated surfaces, hover |
| primary     | `#76836A` | Primary actions          |
| accent      | `#B89B72` | Secondary emphasis       |
| foreground  | `#F4EFE6` | Primary text             |
| muted       | `#A39B90` | Secondary text           |

### Typography

- **Display**: 2.5rem — hero text
- **Heading 1**: 1.875rem — page titles
- **Heading 2**: 1.5rem — section titles
- **Heading 3**: 1.25rem — card titles
- **Body Large**: 1.0625rem — emphasized body
- **Body**: 0.9375rem — default text
- **Body Small**: 0.8125rem — secondary info
- **Caption**: 0.75rem — metadata
- **Overline**: 0.6875rem — labels

### Spacing System

4px base grid: 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24

### Border Radius

- `sm`: 6px — small elements
- `md`: 8px — inputs, small cards
- `lg`: 12px — cards, buttons
- `xl`: 16px — modals, panels
- `2xl`: 20px — large containers

## Components

### Button

```tsx
<Button variant="default" size="md">Primary</Button>
<Button variant="secondary" size="sm">Secondary</Button>
<Button variant="ghost" size="icon">...</Button>
<Button variant="accent" size="lg">Accent</Button>
<Button variant="danger" size="md">Delete</Button>
```

Variants: `default`, `secondary`, `ghost`, `accent`, `danger`, `link`
Sizes: `sm`, `md`, `lg`, `icon`, `icon-sm`

### Card

```tsx
<Card variant="interactive" padding="md">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

Variants: `default`, `elevated`, `interactive`, `subtle`

### Modal / Sheet

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button>Open</Button>
  </ModalTrigger>
  <ModalContent variant="sheet"> {/* or "modal" */}
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
      <ModalDescription>Description</ModalDescription>
    </ModalHeader>
    Content
    <ModalFooter>
      <Button>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Loading States

```tsx
<LoadingSpinner size="md" />
<LoadingScreen message="Loading..." />
<Skeleton className="h-4 w-full" />
<CardSkeleton />
<ListSkeleton rows={4} />
```

### Empty State

```tsx
<EmptyState
  icon={<Inbox className="h-7 w-7" />}
  title="No projects yet"
  description="Create your first project to get started."
  action={{ label: "Create Project", onClick: () => {} }}
/>
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI primitives
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Screens

1. **Onboarding** — Animated step-through introduction
2. **Dashboard** — Stats, projects, activity feed
3. **Detail** — Project view with tabs (tasks, members, files)
4. **Settings** — Profile, preferences, toggles
5. **Search** — Full-text search with categories and recent history

## Interaction Principles

- One clear primary action per screen
- Subtle transitions only (opacity, translate, scale)
- Touch-friendly tap targets (min 44px)
- Consistent visual rhythm and balance
- Prioritize usability over decoration

## License

MIT

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
```

No test runner or linter is configured.

## Architecture

This is a **Persian/Farsi** storefront + admin panel built with React 18, React Router 7, Vite 5, and Tailwind CSS 3. The app is RTL (`lang="fa" dir="rtl"` in `index.html`). There is currently **no backend API** — all data lives as mock state in components.

### Folder structure

```
src/
├── assets/fonts/          # Ravi-VF.ttf (custom Persian font)
├── assets/images/         # All SVGs/PNGs organized by admin/, front/, social-icons/
├── components/ui/         # Generic reusable components (Button, TextInput, Dropdown, etc.)
├── components/admin/      # Admin-specific components; shared/ for layout pieces
├── components/front/      # Consumer-facing components
├── screens/admin/         # One file per route: onboarding, dashboard, categories, products, etc.
├── screens/front/         # Consumer auth flows
├── App.jsx                # All route definitions
└── main.jsx               # Entry point
```

### Routing

All routes are defined in `src/App.jsx`. Admin routes are nested under `/admin/*` and handled inside `AdminDashboardScreen`, which acts as the nested routing hub. Consumer routes live under `/user/*`.

### State management

No external state library. `AdminDashboardScreen` owns all mock data (categories, products, orders, attributes, banners, galleries, notifications) as `useState` arrays and passes state + setter callbacks down to child screens and components via props.

### Styling conventions

- **Always use Tailwind named tokens** from `tailwind.config.js` — never arbitrary hex values or arbitrary font sizes.
- Custom semantic color names: `primary`, `menu-accent`, `success`, `danger`, `text-strong`, `text-moderate`, `text-heading`, `text-weak`, `text-placeholder`, `bg-main`, `bg-base`, `bg-soft`, `header-from`, `header-to`.
- Custom font sizes: `text-xs` (11px), `text-sm` (13px), `text-base` (16px), `text-lg` (19px), `text-xl` (23px).
- SVG icon tinting via utility classes in `index.css`: `.icon-moderate`, `.icon-strong`, `.icon-success`, `.icon-accent`.
- When adding new design tokens, add them to `tailwind.config.js` first.

### Component conventions (from Figma workflow)

- **UI components** (`components/ui/`) accept props for all variable content — no hardcoded screen-specific text.
- **Screen files** (`screens/`) own state and assemble components; pass data down, callbacks up.
- One Figma component → one React component file; one Figma screen → one route + one screen file.
- All image assets are local files imported from `src/assets/images/` — never external URLs.
- Persian numbers are formatted with `Intl.NumberFormat('fa-IR')`.
- Use `dir="rtl"` on main containers.

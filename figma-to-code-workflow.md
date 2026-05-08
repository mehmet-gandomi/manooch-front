# Figma → Code Workflow

---

## What the user provides

To build a screen or component, the user will give you one or more of:

| Input | How to use it |
|---|---|
| **Screenshot** | Primary visual reference — trust this over any generated code |
| **Figma node URL** | Extract the node ID (after `node-id=`) and call `get_design_context` + `get_variable_defs` |
| **Assets** | Files placed in `src/assets/images/` — import locally, never use Figma CDN URLs |

If the user gives a screenshot, **use it as the source of truth** and skip fetching another one.

---

## Step 0 — Ask before building

Before writing any code, if anything about the screen or component is unclear, **ask the user**. Do not guess.

Good reasons to ask:
- The screenshot shows a state or variant but it's unclear which one to build (e.g. empty state vs. filled, error vs. default)
- An asset is ambiguous — same icon used in two contexts
- The component behavior is unclear (e.g. does this dropdown filter in-place or navigate?)
- It's unclear whether to update an existing component or create a new one

Ask all your questions in **one message** — list them clearly and wait for answers before starting.

---

## Step 1 — Discover new assets

When the user says they added new assets, run:

```bash
git ls-files --others --exclude-standard src/assets/
```

This lists all untracked (new) files in the assets folder. Then:

1. Look at the filenames and infer their purpose
2. Move or organize them into the right subfolder under `src/assets/images/`:

| Subfolder | What goes there |
|---|---|
| `src/assets/images/admin/` | Admin panel icons, illustrations, UI assets |
| `src/assets/images/front/` | Consumer-facing icons and images |
| `src/assets/images/social-icons/` | Social media brand icons |
| `src/assets/images/icons/` | General-purpose icons used across both apps |

3. If a file's purpose is ambiguous, **ask the user** which folder it belongs to before moving it
4. Report back a summary: what was found, where it was placed, and what screen/component you think it belongs to

---

## Step 2 — Read design tokens

Call `get_variable_defs` on the node ID.

- Map token names → real hex values
- Add any **new** colors or font sizes to `tailwind.config.js` using meaningful names
- Never use raw hex values in component classes — only named Tailwind tokens

```js
// tailwind.config.js — add resolved tokens here
colors: {
  primary: '#0068ff',
  'menu-accent': '#4b45e6',
  'text-strong': '#16161d',
  'text-moderate': '#737377',
  'text-placeholder': '#a3a9b6',
  'bg-main': '#fefefe',
  'bg-base': '#fafafa',
  success: '#22c55e',
  danger: '#ff3b3b',
}
fontSize: {
  xs: '11px', sm: '13px', base: '16px', lg: '19px', xl: '23px',
}
```

> **Warning:** hex fallbacks in Figma-generated code are often wrong (e.g. `#202a37` instead of `#0068ff`). Always use `get_variable_defs`.

---

## Step 3 — Handle assets

- Identify required images/icons from the screenshot or `get_design_context`
- Cross-check against what the user already placed in `src/assets/images/`
- Import locally:

```jsx
// ❌ Never
<img src="https://www.figma.com/api/mcp/asset/..." />

// ✅ Always
import logo from '../assets/images/admin/logo.svg'
<img src={logo} />
```

- If an asset is missing, use the closest existing local asset temporarily and tell the user the exact filename needed.
- Never hand-draw missing icons in code (no `BurgerMenuIcons.jsx`-style workarounds).

---

## Step 4 — Check existing components first

Before creating anything new, check `src/components/ui/` and `src/components/admin/shared/`:

| Already exists | Action |
|---|---|
| Component matches the design | Use it as-is, pass the right props |
| Component is close but needs changes | Update it — add a prop/variant |
| Nothing matches | Create a new file in the right folder |

**Existing UI components:** `Button`, `TextInput`, `PhoneInput`, `OtpInput`, `Dropdown`, `BottomSheet`, `StepIndicator`, `TextAreaInput`

**Existing admin shared:** `AdminMenuBar`, `AdminScreenHeader`, `AdminStatBox`, `AdminBanner`, `AdminAssetUploader`, `AdminSingleImageUploader`, `AdminToggleSettingRow`

---

## Step 5 — Build the component or screen

**Components** (`src/components/ui/` or `src/components/admin/`):
- Accept props for all variable content — no hardcoded text
- Use only named Tailwind tokens
- No business logic or state (except internal UI state like open/closed)

**Screens** (`src/screens/admin/` or `src/screens/front/`):
- Import and assemble components
- Own state (`useState`)
- Pass data down, callbacks up
- Add a route in `src/App.jsx` if it's a new screen

**Layout fix for mobile-to-web:** Figma mobile screens have a Status Bar that web doesn't need. Removing it breaks `justify-between` layouts — the content collapses to the top. Fix:

```jsx
<div className="min-h-screen flex flex-col px-4 py-10">
  {/* replaces the removed status bar space */}
  <div className="flex-1 flex flex-col justify-center">
    <PhoneInput ... />
  </div>
  <Button>ادامه</Button>  {/* stays pinned at bottom */}
</div>
```

---

## RTL Flex Adaptation (Critical)

The app uses `dir="rtl"`. Figma generates code in **LTR order** (first DOM child = visual left). In RTL flex, **first DOM child = visual right**. Every `flex justify-between` row you copy from Figma must have its children **reversed** in the DOM.

### The Rule

| Desired visual position | DOM position (RTL) |
|---|---|
| Far RIGHT | **First** child |
| Far LEFT | **Last** child |

### Example — Figma (LTR) vs React (RTL)

```jsx
// ❌ Figma-generated order (LTR): [share LEFT] [chips RIGHT]
<div className="flex justify-between">
  <button>share</button>   {/* first → goes to RIGHT in RTL ✗ */}
  <div>chips</div>         {/* second → goes to LEFT in RTL ✗ */}
</div>

// ✅ Correct for RTL: [chips RIGHT] [share LEFT]
<div className="flex justify-between">
  <div>chips</div>         {/* first → visual RIGHT ✓ */}
  <button>share</button>   {/* second → visual LEFT ✓ */}
</div>
```

### Applies at every nesting level

Each nested flex container independently reverses order. For a row like  
`[cart LEFT] [follow] [name] [avatar] [menu RIGHT]`:

```jsx
<div className="flex justify-between">
  {/* FIRST → RIGHT cluster */}
  <div className="flex gap-2">
    <button>menu</button>    {/* first in group → rightmost */}
    <img>avatar</img>
    <span>name</span>
    <button>follow</button>  {/* last in group → leftmost of right cluster */}
  </div>
  {/* SECOND → LEFT */}
  <button>cart</button>
</div>
```

### Scrollable rows

For horizontally-scrollable product rows, RTL starts scroll from the right. Use `overflow-x-auto` without `justify-end` — RTL flex handles direction automatically:

```jsx
// ✅ Items start from RIGHT, scroll reveals more on the LEFT
<div className="flex gap-2 overflow-x-auto no-scrollbar">
  {items.map(...)}
</div>
```

### Pagination dots

Dots inside an `absolute`-positioned container still inherit RTL. Use `dir="ltr"` on the dots wrapper to keep the active dot on the left:

```jsx
<div dir="ltr" className="absolute bottom-3 left-3 flex gap-1.5">
  {dots}
</div>
```

---

## Hard rules

- **Ask first** — if anything is unclear, ask before coding; one message, all questions at once
- **Colors** — only named classes (`bg-primary`, `text-text-strong`), never `bg-[#hex]`
- **Font sizes** — only named classes (`text-base`, `text-sm`), never `text-[16px]`
- **Assets** — local imports only, never Figma CDN URLs (they expire in 7 days)
- **RTL** — `dir="rtl"` on containers; text is right-aligned by default; reverse Figma DOM order
- **Font** — Ravi loaded via `@font-face` in `index.css`, never Google Fonts
- **One screen = one route = one file** in `src/screens/`
- **One Figma component = one file** in `src/components/`
- **Screens own state, components own UI**
- Remove `data-node-id` attributes before production

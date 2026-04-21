# Figma → React/Vite/Tailwind Workflow Guide

A clear set of rules for how to read Figma files and turn them into clean, production-ready React code.

---

## Step 1 — Read the File Structure First

Before touching any node, get a high-level map of the file using `get_metadata` on the page root (e.g. `0:1`).

**Why:** This tells you all the frames/screens that exist, their node IDs, and their names — so you can plan the full route structure before writing a single line of code.

**What to look for:**
- Each top-level frame = one screen = one route
- Nested frames = layout sections (header, body, footer)
- Component instances = reusable UI pieces

```
Example output:
  Frame "Register" → node 2:49   → route /register
  Frame "OTP"      → node 5:120  → route /otp
  Frame "Home"     → node 8:300  → route /home
```

---

## Step 2 — Fetch Design Context for Each Screen

For every screen frame, call `get_design_context` with that node ID.

**This returns:**
- A **screenshot** of the screen → use this as the visual reference
- **Generated React + Tailwind code** → use as a starting point, not final output
- **Asset URLs** (images, icons, flags, SVGs) → download or reference directly

**Rules when reading the generated code:**
- Color hex values in code may be **wrong fallbacks** — always cross-check with design tokens (Step 3)
- Asset URLs expire in **7 days** — always download them immediately and save to `src/assets/`. Never reference the `figma.com/api/mcp/asset/...` URLs directly in code
- `data-node-id` attributes in the code are useful for tracing back to Figma — keep them during development, remove before production

**Asset download rule:**
```js
// ❌ Never do this — URL will expire
<img src="https://www.figma.com/api/mcp/asset/bf369f9d-..." />

// ✅ Always do this — download first, import locally
import iranFlag from '../assets/iran-flag.png'
<img src={iranFlag} />
```

---

## Step 3 — Resolve Design Tokens

After `get_design_context`, always call `get_variable_defs` on the same node.

**Why:** The generated code uses token names like `token/background/default/primary` with a hex fallback that is often wrong. The variable defs give you the **real resolved color values**.

**What to do with them:**
- Map token names → real hex values
- Define them as **CSS variables** in `index.css` — do NOT add arbitrary hex values directly in Tailwind classes or in `tailwind.config.js`
- Reference CSS variables via Tailwind's `var()` support in component classes

```css
/* index.css — single source of truth for all design tokens */
:root {
  --color-primary: #0068ff;        /* Token/Background/Default/Primary */
  --color-text-strong: #16161d;    /* Token/Text/Default/Strong */
  --color-text-moderate: #737377;  /* Token/Text/Default/Moderate */
  --color-text-placeholder: #a3a9b6;
  --color-bg-main: #fefefe;        /* Token/Background/Frame/Main */
  --color-bg-base: #fafafa;        /* Token/Background/Frame/Base */
  --color-text-white: #fafafa;
}
```

```js
// tailwind.config.js — map names to CSS variables, not raw hex
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      'text-strong': 'var(--color-text-strong)',
      'text-moderate': 'var(--color-text-moderate)',
      'text-placeholder': 'var(--color-text-placeholder)',
      'bg-main': 'var(--color-bg-main)',
      'bg-base': 'var(--color-bg-base)',
    }
  }
}
```

```jsx
// ❌ Never hardcode hex in Tailwind classes
<button className="bg-[#0068ff] text-[#fafafa] hover:bg-[#0057d6]">

// ✅ Always use the named token class
<button className="bg-primary text-text-white hover:opacity-90">
```

---

## Step 4 — Identify Reusable Components

Look at the screenshot and the code structure to find elements that appear across multiple screens.

**Signals of a reusable component:**
- Named layers in Figma (e.g. "Button", "Input", "Card")
- Same visual pattern appearing in more than one screen
- Figma component instances (node names starting with a capital letter or containing `↳`)

**Component extraction rules:**
- One Figma component → one React file in `src/components/`
- Accept props for all variable parts (label, placeholder, value, onChange, variant)
- Never hardcode screen-specific text inside a component
- Keep styling purely in Tailwind classes — no inline styles unless unavoidable

**Common components to always extract:**
| Figma Layer Name | React Component | Props |
|---|---|---|
| Button | `Button.jsx` | `children`, `variant`, `onClick`, `disabled` |
| Input / Phone Input | `PhoneInput.jsx` | `label`, `placeholder`, `helperText`, `value`, `onChange` |
| Text Field | `TextInput.jsx` | `label`, `placeholder`, `type`, `value`, `onChange` |
| Card | `Card.jsx` | `children`, `className` |
| Header / Nav Bar | `Header.jsx` | `title`, `onBack` |
| OTP Input | `OtpInput.jsx` | `length`, `value`, `onChange` |

---

## Step 5 — Build Screens Using Components

Each Figma screen frame → one file in `src/screens/`.

**Rules:**
- Screens import and assemble components — they do NOT contain raw HTML/Tailwind themselves
- Screens own the state (useState, form values, API calls)
- Screens pass data down to components as props
- Never put business logic inside a component

```jsx
// src/screens/RegisterScreen.jsx
import PhoneInput from '../components/PhoneInput'
import Button from '../components/Button'

const RegisterScreen = () => {
  const [phone, setPhone] = useState('')
  return (
    <div className="min-h-screen bg-bg-main flex flex-col justify-between px-4 py-10">
      <PhoneInput value={phone} onChange={e => setPhone(e.target.value)} />
      <Button onClick={handleSubmit}>ثبت نام</Button>
    </div>
  )
}
```

---

## Step 6 — Create a Route per Screen

Use `react-router-dom` to wire screens to URL paths.

**Naming convention:**
- Route path = screen name in kebab-case
- Component = screen name in PascalCase

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'
import OtpScreen from './screens/OtpScreen'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
```

---

## Step 7 — Font & RTL Setup

For Persian/Arabic projects:

1. Set `dir="rtl"` on `<html>` in `index.html`
2. If the project has a **local font** (e.g. Ravi), reference it via `@font-face` in `index.css` — do NOT load it from Google Fonts
3. Set `font-family` globally in `index.css`
4. All text containers should use `text-right` unless overridden

```css
/* index.css — local font setup */
@font-face {
  font-family: 'Ravi';
  src: url('/fonts/Ravi-VF.ttf') format('truetype');
  font-weight: 100 900;
}

* {
  font-family: 'Ravi', sans-serif;
}

body {
  background-color: #fefefe;
  direction: rtl;
}
```

```html
<!-- index.html — no Google Fonts link needed when font is local -->
<html lang="fa" dir="rtl">
```

---

## Full Project Structure

```
src/
├── assets/
│   ├── fonts/            ← local font files (e.g. Ravi-Regular.woff2)
│   └── images/           ← downloaded Figma images/icons (never use expiring URLs)
├── components/       ← one file per reusable Figma component
│   ├── Button.jsx
│   ├── PhoneInput.jsx
│   └── ...
├── screens/          ← one file per Figma screen frame
│   ├── RegisterScreen.jsx
│   ├── OtpScreen.jsx
│   └── HomeScreen.jsx
├── App.jsx           ← router lives here
├── main.jsx          ← ReactDOM.createRoot
└── index.css         ← global font + tailwind directives
```

---

## Quick Reference — Figma API Tools

| Tool | When to use |
|---|---|
| `get_metadata` | First call — map all screens and node IDs |
| `get_design_context` | Per screen — get screenshot + generated code |
| `get_variable_defs` | Per screen — resolve real token color values |
| `get_code_connect_suggestions` | When mapping existing components to Figma |

---

## Rules Summary

1. **Always look at the screenshot** — generated code can lie, the image doesn't
2. **Always resolve tokens** — never trust hex fallbacks in generated code
3. **Download assets immediately** — Figma asset URLs expire after 7 days, save to `src/assets/images/`
4. **Use local fonts** — reference via `@font-face` in `index.css`, not Google Fonts
5. **Colors live in CSS variables** — defined in `index.css`, mapped by name in `tailwind.config.js`, never hardcoded as `[#hex]` in classes
6. **One screen = one route = one file** in `src/screens/`
7. **One Figma component = one file** in `src/components/`
8. **Screens own state, components own UI**
9. **No mobile frame, status bar, or home indicator** in web builds

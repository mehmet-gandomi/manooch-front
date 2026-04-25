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

## Step 2.5 — Let the User Provide Assets

**Critical:** Asset URLs from `get_design_context` expire in 7 days. Do not wire those URLs directly into the app. Instead, identify the required assets, let the user export them, and use the local files they place in `src/assets/images/`.

**Process:**
1. Identify all image URLs in the design context response (look for `figma.com/api/mcp/asset/...`)
2. Turn them into a short asset checklist for the user with descriptive filenames
3. The user exports those assets and saves them in `src/assets/images/` (the project's `assets/images/` folder)
4. Once the files exist locally, import them into the code from local paths
5. If an asset is still missing, use the closest existing local asset as a temporary fallback and explicitly tell the user which asset is missing
6. Do not create one-off replacement icon files/components (for example `BurgerMenuIcons.jsx`) to redraw missing assets

```jsx
// ❌ Never reference expiring URLs
<img src="https://www.figma.com/api/mcp/asset/..." />

// ✅ Use the local file the user placed in assets/images
import iranFlag from '../assets/images/iran-flag.png'
<img src={iranFlag} />
```

## Step 2 — Fetch Design Context for Each Screen/Node

For every screen frame — or any node the user explicitly gives you — call `get_design_context` with that node ID.

**This returns:**
- A **screenshot** of the screen/node → inspect it first and use it as the visual source of truth
- **Generated React + Tailwind code** → use as a starting point, not final output
- **Asset URLs** (images, icons, flags, SVGs) → turn these into a checklist for the user to export locally

**Rules when reading the generated code:**
- If the user already provided a screenshot for the node, use that screenshot as the primary visual reference instead of spending time trying to fetch another one
- Always look at the screenshot for the exact node you are building before trusting spacing, layout, or hierarchy
- Color hex values in code may be **wrong fallbacks** — always cross-check with design tokens (Step 3)
- Asset URLs expire in **7 days** — use them only to identify what the user should export to `src/assets/images/`. Never reference the `figma.com/api/mcp/asset/...` URLs directly in code
- If a needed icon/image has not been added locally yet, temporarily use the closest existing local asset and report the missing filename to the user
- Do not create custom replacement icon components/files just to mimic missing assets
- `data-node-id` attributes in the code are useful for tracing back to Figma — keep them during development, remove before production

**Asset handoff rule:**
```js
// ❌ Never do this — URL will expire
<img src="https://www.figma.com/api/mcp/asset/bf369f9d-..." />

// ✅ Always do this — user provides the file, then import locally
import iranFlag from '../assets/images/iran-flag.png'
<img src={iranFlag} />
```

---

## Step 3 — Resolve Design Tokens

After `get_design_context`, always call `get_variable_defs` on the same node.

**Why:** The generated code uses token names like `token/background/default/primary` with a hex fallback that is often wrong. The variable defs give you the **real resolved color values**.

**What to do with them:**
- Map token names → real hex values
- Add each resolved color as a **named entry in `tailwind.config.js`** — do NOT paste raw hex values directly into component class strings
- Use those names everywhere in components and screens

```js
// tailwind.config.js — map resolved token values to meaningful names
theme: {
  extend: {
    colors: {
      primary: '#0068ff',              // token/background/default/primary
      'text-strong': '#16161d',        // token/text/default/strong
      'text-moderate': '#737377',      // token/text/default/moderate
      'text-placeholder': '#a3a9b6',   // token/text/default/placeholder
      'bg-main': '#fefefe',            // token/background/frame/main
      'bg-base': '#fafafa',            // token/background/frame/base
      'text-white': '#fafafa',         // token/text/default/white
    }
    fontSize: {
      base: '16px',   // Default body text
      sm: '13px',     // Helper text, captions
      lg: '18px',     // Headings, emphasis
    }
  }
}
```

**When adding new Figma nodes, always check and update `tailwind.config.js`:**

1. **New colors** — If `get_variable_defs` returns new token colors not in the config, add them with meaningful names
2. **New font sizes** — If the design uses font sizes not in the config (e.g., `20px`, `24px`), add them:
   ```js
   fontSize: {
     base: '16px',
     sm: '13px',
     lg: '18px',
     xl: '20px',    // ← Add new sizes as needed
     '2xl': '24px',
   }
   ```
3. **New spacing/border radius** — If the design uses consistent values not in Tailwind defaults, add them to `theme.extend`

**Workflow for each new Figma node:**
```
1. Call get_design_context on the node
2. If the user already sent a screenshot for that node, use it; otherwise inspect the screenshot returned by the design context
3. List the required assets and filenames for the user
4. Use the local files the user places in src/assets/images/
5. If something is missing, use the closest existing local asset temporarily and tell the user exactly what is missing
6. Never create one-off icon recreation files/components to replace missing exported assets
7. If fetching raw Figma node JSON via shell `curl` hangs, truncates, or returns an empty file, use `python3` with `requests` as the fallback way to fetch/save the node JSON locally
8. Call get_variable_defs on the node
9. Check tailwind.config.js:
   - Add any new colors from variable defs
   - Add any new font sizes used in the design
   - Add any new spacing/radius values if they're consistent patterns
10. Update components to use:
   - Named color classes (bg-primary, text-text-strong)
   - Named font size classes (text-base, text-sm)
   - Never arbitrary values like text-[16px] or bg-[#hex]
11. Import assets from local paths only, never use figma.com URLs
```

**Node JSON fetch fallback:**
```bash
# If curl is unreliable for a large Figma node response, use python3 instead
python3 - <<'PY'
import requests

url = 'https://api.figma.com/v1/files/FILE_KEY/nodes?ids=NODE_ID'
headers = {'X-Figma-Token': 'YOUR_TOKEN'}
response = requests.get(url, headers=headers, timeout=30)
response.raise_for_status()

with open('/tmp/node.json', 'w', encoding='utf-8') as f:
    f.write(response.text)
PY
```

> **Watch out — Figma fallback colors are often wrong.** The generated code writes hex fallbacks like `var(--token/background/default/primary, #202a37)` where `#202a37` is dark navy, but the real resolved value is `#0068ff` (blue). Always use `get_variable_defs` to get the true value — never copy the fallback hex.

```jsx
// ❌ Never hardcode hex in Tailwind classes
<button className="bg-[#0068ff] text-[#fafafa] hover:bg-[#0057d6]">
<p className="text-[16px] text-[#737377]">

// ✅ Always use the named token class
<button className="bg-primary text-text-white hover:brightness-90">
<p className="text-base text-text-moderate">
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

> **Layout trap — Figma's 3-section screen becomes 2-section in web:**
> Figma mobile screens typically use `justify-between` with three children: **Status Bar** (top) → **Content** (middle) → **CTA Button** (bottom). In web builds the Status Bar is removed (Rule #9), leaving only Content and Button. With `justify-between` and two items, Content snaps to the top — the form appears at the very top instead of centered.
>
> **Fix:** Wrap the content section in `flex-1 flex flex-col justify-center` so it fills the available space and stays vertically centered, while the button stays pinned at the bottom.

```jsx
// src/screens/RegisterScreen.jsx
import PhoneInput from '../components/PhoneInput'
import Button from '../components/Button'

const RegisterScreen = () => {
  const [phone, setPhone] = useState('')
  return (
    <div className="min-h-screen bg-bg-main flex flex-col px-4 py-10 max-w-sm mx-auto">
      {/* flex-1 + justify-center = vertically centered, replacing the removed status bar space */}
      <div className="flex-1 flex flex-col justify-center">
        <PhoneInput value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      {/* Button stays pinned at the bottom */}
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
  src: url('./assets/fonts/Ravi-VF.ttf') format('truetype');
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
│   ├── fonts/            ← local font files (e.g. Ravi-VF.ttf) — referenced via url('./assets/fonts/...')
│   └── images/           ← user-exported Figma images/icons (never use expiring URLs)
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
| `get_design_context` | Per screen/node — get screenshot + generated code + asset list |
| `get_variable_defs` | Per screen — resolve real token color values |
| `get_code_connect_suggestions` | When mapping existing components to Figma |

---

## Rules Summary

1. **Always look at the screenshot for the exact node** — generated code can lie, the image doesn't
2. **Always resolve tokens** — never trust hex fallbacks in generated code; call `get_variable_defs` on every new node
3. **If the user sends the node screenshot, use it directly** — do not waste time trying to fetch another screenshot unless something is unclear
4. **The user provides assets** — identify the needed files from `get_design_context`, have the user place them in `src/assets/images/`, then use those local files
5. **If an asset is missing, use a local fallback and report it** — choose the closest existing local asset temporarily and tell the user the exact missing filename
6. **Do not hand-draw missing icons in code** — do not create custom icon recreation files/components such as `BurgerMenuIcons.jsx`
7. **Use `python3` as a fallback for Figma node JSON** — if shell `curl` is unreliable for a node response, fetch/save the JSON with Python `requests`
8. **Use local fonts** — save to `src/assets/fonts/` and reference via `@font-face` in `index.css` with `url('./assets/fonts/...')`, not Google Fonts
9. **Update `tailwind.config.js` for each new node** — add new colors from variable defs, new font sizes from the design, and any consistent spacing patterns
10. **Colors are named in `tailwind.config.js`** — map resolved token values to meaningful names there; never hardcode `[#hex]` in component classes
11. **Font sizes are named in `tailwind.config.js`** — use `text-base`, `text-sm`, `text-lg` instead of arbitrary values like `text-[16px]`
12. **Import assets locally** — never reference `figma.com/api/mcp/asset/...` URLs directly in code; always import from `src/assets/images/`
13. **One screen = one route = one file** in `src/screens/`
14. **One Figma component = one file** in `src/components/`
15. **Screens own state, components own UI**
16. **No mobile frame, status bar, or home indicator** in web builds

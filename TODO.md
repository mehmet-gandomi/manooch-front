# Manooch — Build TODO

Design source: `reference/src/` — copy the design exactly, rebuild with clean architecture.

---

## Phase 0 — Project Setup ✅
- [x] NestJS API scaffold (`api/`)
- [x] React + Vite + Tailwind client scaffold (`client/`)
- [x] npm workspaces root `package.json`
- [x] Prisma schema (all models)
- [x] Auth module (request-otp, verify-otp, JWT)
- [x] Shop, Categories, Attributes, Products, Gallery, Uploads, Public modules
- [x] Axios client + AuthContext + ProtectedRoute
- [x] AdminLayout (pure router shell)
- [x] Onboarding screens (Register, Otp, Profile, ShopReady)
- [ ] Fix asset path: copy `reference/src/assets/` → `client/src/assets/`
- [ ] Run `npx prisma migrate dev --name init` and verify DB

---

## Phase 1 — UI Atoms
> Reference: `reference/src/components/ui/`

- [ ] `components/ui/Button.jsx` ← `ui/Button.jsx`
- [ ] `components/ui/TextInput.jsx` ← `ui/TextInput.jsx`
- [ ] `components/ui/TextAreaInput.jsx` ← `ui/TextAreaInput.jsx`
- [ ] `components/ui/Dropdown.jsx` ← `ui/Dropdown.jsx`
- [ ] `components/ui/PhoneInput.jsx` ← `ui/PhoneInput.jsx`
- [ ] `components/ui/OtpInput.jsx` ← `ui/OtpInput.jsx`
- [ ] `components/ui/StepIndicator.jsx` ← `ui/StepIndicator.jsx`
- [ ] `components/ui/BottomSheet.jsx` ← `ui/BottomSheet.jsx`
- [ ] `components/ui/AdminAssetUploader.jsx` ← `admin/shared/AdminAssetUploader.jsx`
- [ ] `components/ui/AdminSingleImageUploader.jsx` ← `admin/shared/AdminSingleImageUploader.jsx`

---

## Phase 2 — Layout Components
> Reference: `reference/src/components/admin/shared/` + `reference/src/components/front/`

- [ ] `components/layout/AdminMenuBar.jsx` ← `AdminMenuBar.jsx` + `AdminMenuItem.jsx`
- [ ] `components/layout/AdminScreenHeader.jsx` ← `AdminScreenHeader.jsx`
- [ ] `components/layout/AdminBanner.jsx` ← `AdminBanner.jsx`
- [ ] `components/layout/AdminToggleSettingRow.jsx` ← `AdminToggleSettingRow.jsx`
- [ ] `components/layout/FrontStoreHeader.jsx` ← `FrontStoreHeader.jsx`
- [ ] `components/layout/FrontBottomNav.jsx` ← `FrontBottomNav.jsx`
- [ ] `components/layout/BurgerMenuDrawer.jsx` ← `BurgerMenuDrawer.jsx`
- [ ] Update `components/layout/AdminLayout.jsx` — wire real routes + `AdminMenuBar`
- [ ] `components/layout/FrontLayout.jsx` — shell with `FrontStoreHeader` + `FrontBottomNav`

---

## Phase 3 — API Layer + Hooks
> No reference equivalent — new architecture

- [ ] `src/api/auth.js` — `requestOtp`, `verifyOtp`
- [ ] `src/api/shop.js` — `getShop`, `updateShop`
- [ ] `src/api/categories.js` — full CRUD
- [ ] `src/api/attributes.js` — full CRUD
- [ ] `src/api/products.js` — full CRUD
- [ ] `src/api/gallery.js` — full CRUD
- [ ] `src/api/uploads.js` — `uploadImage`
- [ ] `src/api/public.js` — `getPublicShop`, `getPublicProducts`, `getPublicProduct`, `getPublicGallery`
- [ ] `src/hooks/useShop.js`
- [ ] `src/hooks/useCategories.js`
- [ ] `src/hooks/useAttributes.js`
- [ ] `src/hooks/useProducts.js`
- [ ] `src/hooks/useGallery.js`

---

## Phase 4 — Admin Onboarding Screens
> Reference: `reference/src/screens/admin/onboarding/`

- [ ] `screens/admin/onboarding/RegisterScreen.jsx` ← `RegisterScreen.jsx` (wire `PhoneInput` + API)
- [ ] `screens/admin/onboarding/OtpScreen.jsx` ← `OtpScreen.jsx` (wire `OtpInput` + API)
- [ ] `screens/admin/onboarding/SuccessScreen.jsx` ← `SuccessScreen.jsx`
- [ ] `screens/admin/onboarding/ProfileFormScreen.jsx` ← `ProfileFormScreen.jsx` (wire shop PATCH)
- [ ] `screens/admin/onboarding/ShopReadyScreen.jsx` ← `ShopReadyScreen.jsx`

---

## Phase 5 — Admin Dashboard
> Reference: `reference/src/screens/admin/dashboard/`

- [ ] `components/shop/AdminStatBox.jsx` ← `AdminStatBox.jsx`
- [ ] `components/shop/AdminReportRow.jsx` ← `AdminReportRow.jsx`
- [ ] `screens/admin/dashboard/AdminDashboardScreen.jsx` ← `AdminDashboardScreen.jsx` (fetch real shop stats)

---

## Phase 6 — Admin Categories
> Reference: `reference/src/screens/admin/categories/` + `reference/src/components/admin/categories/`

- [ ] `components/category/AdminCategoryRow.jsx` ← `AdminCategoryRow.jsx`
- [ ] `components/category/AdminCategoryStatusChip.jsx` ← `AdminCategoryStatusChip.jsx`
- [ ] `screens/admin/categories/AdminCategoryListScreen.jsx` ← `AdminCategoryListScreen.jsx` (use `useCategories`)
- [ ] `screens/admin/categories/AdminCategoryFormScreen.jsx` ← `AdminCategoryFormScreen.jsx` (create + edit)

---

## Phase 7 — Admin Attributes
> Reference: `reference/src/screens/admin/attributes/` + `reference/src/components/admin/attributes/`

- [ ] `components/attribute/AdminAttributeRow.jsx` ← `AdminAttributeRow.jsx`
- [ ] `components/attribute/AdminAttributeValueChip.jsx` ← `AdminAttributeValueChip.jsx`
- [ ] `screens/admin/attributes/AdminAttributeListScreen.jsx` ← `AdminAttributeListScreen.jsx`
- [ ] `screens/admin/attributes/AdminAttributeFormScreen.jsx` ← `AdminAttributeFormScreen.jsx`

---

## Phase 8 — Admin Products
> Reference: `reference/src/screens/admin/products/` + `reference/src/components/admin/products/`

- [ ] `components/product/AdminProductRow.jsx` ← `AdminProductRow.jsx`
- [ ] `components/product/AdminProductImageUploader.jsx` ← `AdminProductImageUploader.jsx`
- [ ] `screens/admin/products/AdminProductListScreen.jsx` ← `AdminProductListScreen.jsx`
- [ ] `screens/admin/products/AdminProductFormScreen.jsx` ← `AdminProductFormScreen.jsx`
  - Basic fields (name, description, code, price, inventory)
  - Category dropdown (from `useCategories`)
  - Attribute variants (from `useAttributes`)
  - Image uploader (calls `/uploads/image`, stores URLs)
  - Unit sales section

---

## Phase 9 — Admin Gallery
> Reference: `reference/src/screens/admin/gallery/` + `reference/src/components/admin/gallery/`

- [ ] `components/gallery/AdminGalleryRow.jsx` ← `AdminGalleryRow.jsx`
- [ ] `screens/admin/gallery/AdminGalleryListScreen.jsx` ← `AdminGalleryListScreen.jsx`
- [ ] `screens/admin/gallery/AdminGalleryFormScreen.jsx` ← `AdminGalleryFormScreen.jsx`

---

## Phase 10 — Admin Settings
> Reference: `reference/src/screens/admin/settings/` + `reference/src/screens/admin/business/`

- [ ] `screens/admin/settings/AdminEditScreen.jsx` ← `AdminEditScreen.jsx`
- [ ] `screens/admin/settings/AdminBusinessInfoScreen.jsx` ← `AdminBusinessInfoScreen.jsx`

---

## Phase 11 — Consumer Storefront
> Reference: `reference/src/screens/front/` + `reference/src/components/front/`

### Dashboard
- [ ] `components/shop/DashboardHeader.jsx` ← `DashboardHeader.jsx`
- [ ] `components/product/FilterBar.jsx` ← `FilterBar.jsx`
- [ ] `components/product/ProductCardV.jsx` ← `ProductCardV.jsx`
- [ ] `components/product/ProductCardH.jsx` ← `ProductCardH.jsx`
- [ ] `components/product/ProductCardGrid.jsx` ← `ProductCardGrid.jsx`
- [ ] `components/product/ProductSection.jsx` ← `ProductSection.jsx`
- [ ] `components/shop/ShareSheet.jsx` ← `ShareSheet.jsx`
- [ ] `screens/front/dashboard/FrontDashboardScreen.jsx` ← `FrontDashboardScreen.jsx` (fetch from `GET /public/:slug/products`)

### Product Detail
- [ ] `components/product/ProductGallery.jsx` ← `ProductGallery.jsx`
- [ ] `components/product/ProductSpecs.jsx` ← `ProductSpecs.jsx`
- [ ] `components/product/ProductVariants.jsx` ← `ProductVariants.jsx`
- [ ] `components/product/PdpBottomBar.jsx` ← `PdpBottomBar.jsx`
- [ ] `components/product/DiscountTimer.jsx` ← `DiscountTimer.jsx`
- [ ] `components/product/VoicePlayer.jsx` ← `VoicePlayer.jsx`
- [ ] `screens/front/pdp/FrontPdpScreen.jsx` ← `FrontPdpScreen.jsx`

### Gallery
- [ ] `components/gallery/GalleryCard.jsx` ← `GalleryCard.jsx`
- [ ] `components/gallery/GalleryLightbox.jsx` ← `GalleryLightbox.jsx`
- [ ] `screens/front/gallery/GalleryScreen.jsx` ← `GalleryScreen.jsx`

### About
- [ ] `components/shop/MapSection.jsx` ← `MapSection.jsx`
- [ ] `screens/front/about/AboutScreen.jsx` ← `AboutScreen.jsx`

### Linkdoone
- [ ] `components/shop/LinkButton.jsx` ← `LinkButton.jsx`
- [ ] `components/shop/LinkSection.jsx` ← `LinkSection.jsx`
- [ ] `screens/front/linkdoone/LinkdooneScreen.jsx` ← `LinkdooneScreen.jsx`

### Billing (Phase 2 — skip for now)
- [ ] `components/shop/BillingOrderCard.jsx` ← `BillingOrderCard.jsx`
- [ ] `components/shop/BillingOrderDetail.jsx` ← `BillingOrderDetail.jsx`
- [ ] `screens/front/billing/BillingScreen.jsx` ← `BillingScreen.jsx`

---

## Rules

1. **Design must match reference exactly** — same colors, fonts, spacing, icons, layout
2. **No prop drilling** — each screen fetches its own data via React Query hooks
3. **AdminLayout is a pure router** — no state, no data fetching
4. **All API calls through `src/api/client.js`** only
5. **All backend queries scoped by `shopId`** from JWT
6. **Images are URLs** — uploader calls API first, stores returned URL
7. **Use Tailwind named tokens only** — never arbitrary hex values
8. **Persian numbers** via `Intl.NumberFormat('fa-IR')`

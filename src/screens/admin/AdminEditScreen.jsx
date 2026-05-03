// src/screens/admin/AdminEditScreen.jsx
// Admin personalization section for editing the public page appearance.

import { useMemo, useState } from 'react'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import BottomSheet from '../../components/BottomSheet'
import Button from '../../components/Button'
import arrowDownIcon from '../../assets/images/admin/arrow-down.svg'
import arrowLeftIcon from '../../assets/images/admin/arrow-left-1.svg'
import callForwardingIcon from '../../assets/images/admin/call-forwarding.svg'
import cartAddIcon from '../../assets/images/admin/cart-add.svg'
import chefHatIcon from '../../assets/images/admin/Chef Hat.svg'
import cloudIcon from '../../assets/images/admin/cloud.svg'
import goldBarsIcon from '../../assets/images/admin/gold-bars.svg'
import heartIcon from '../../assets/images/admin/heart-2.svg'
import moonIcon from '../../assets/images/admin/moon.svg'
import paintRollersIcon from '../../assets/images/admin/paint-rollers.svg'
import telegramIcon from '../../assets/images/admin/telegram-2.svg'
import productImage from '../../assets/images/admin/Banner.png'

const editTabs = [
  { key: 'settings', label: 'تنظیمات' },
  { key: 'display', label: 'نوع نمایش' },
  { key: 'shop', label: 'فروشگاه' },
]

const patternOptions = [
  { key: 'sparkle', icon: goldBarsIcon, label: 'درخشش' },
  { key: 'chef', icon: chefHatIcon, label: 'آشپز' },
  { key: 'moon', icon: moonIcon, label: 'ماه' },
  { key: 'cloud', icon: cloudIcon, label: 'ابر' },
  { key: 'heart', icon: heartIcon, label: 'قلب' },
  { key: 'heart-soft', icon: heartIcon, label: 'قلب دوم' },
]

const fontOptions = [
  { value: 'ravi', label: 'راوی' },
  { value: 'vazirmatn', label: 'وزیرمتن' },
  { value: 'shabnam', label: 'شبنم' },
  { value: 'samim', label: 'صمیم' },
]

const categoryModeOptions = [
  { value: 'with-icon', label: 'با ایکن' },
  { value: 'without-icon', label: 'بدون ایکن' },
]

const tabDisplayOptions = [
  { value: 'shop', label: 'فروشگاه' },
  { value: 'services', label: 'خدمات' },
  { value: 'file', label: 'فایل' },
]

const scrollDisplayOptions = [
  { value: 'shop', label: 'فروشگاه' },
  { value: 'services', label: 'خدمات' },
  { value: 'file', label: 'فایل' },
]

const saleTypeOptions = [
  { value: 'cart', label: 'افزودن به سبد', icon: cartAddIcon },
  { value: 'order', label: 'ثبت سفارش', icon: telegramIcon },
  { value: 'support', label: 'تماس با پشتیبان', icon: callForwardingIcon },
]

const productCards = [
  { id: 'single', title: 'دستبند برلیانکسی', price: '۷۰۰,۰۰۰ تومان' },
  { id: 'grid-1', title: 'دستبند برلیانکسی', price: '۷۰۰,۰۰۰ تومان' },
  { id: 'grid-2', title: 'دستبند برلیانکسی', price: '۷۰۰,۰۰۰ تومان' },
  { id: 'grid-3', title: 'دستبند برلیانکسی', price: '۷۰۰,۰۰۰ تومان' },
]

const normalizeEditTab = (value) =>
  editTabs.some((tab) => tab.key === value) ? value : 'settings'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const componentToHex = (value) =>
  Math.round(value).toString(16).padStart(2, '0')

const hsvToRgb = (hue, saturation, value) => {
  const chroma = value * saturation
  const huePrime = hue / 60
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1))
  const match = value - chroma
  const [red, green, blue] =
    huePrime < 1
      ? [chroma, x, 0]
      : huePrime < 2
        ? [x, chroma, 0]
        : huePrime < 3
          ? [0, chroma, x]
          : huePrime < 4
            ? [0, x, chroma]
            : huePrime < 5
              ? [x, 0, chroma]
              : [chroma, 0, x]

  return {
    red: (red + match) * 255,
    green: (green + match) * 255,
    blue: (blue + match) * 255,
  }
}

const hsvToHex = (hue, saturation, value) => {
  const { red, green, blue } = hsvToRgb(hue, saturation, value)
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`.toUpperCase()
}

const hueToRgb = (hue) => hsvToRgb(hue, 1, 1)

const rgbToCss = ({ red, green, blue }) =>
  `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`

const normalizeHexColor = (value) => {
  const normalized = value.trim().replace(/^#?/, '#').toUpperCase()
  return /^#[0-9A-F]{6}$/.test(normalized) ? normalized : value
}

const AdminSwitch = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={onChange}
    className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${
      checked ? 'bg-header-from' : 'bg-border-light'
    }`}
  >
    <span
      className={`absolute top-1 h-4 w-4 rounded-full bg-bg-main shadow-sm transition-all ${
        checked ? 'left-1' : 'left-5'
      }`}
    />
  </button>
)

const RadioMark = ({ selected }) => (
  <span
    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
      selected ? 'border-header-from' : 'border-border-light'
    }`}
  >
    {selected ? <span className="h-2.5 w-2.5 rounded-full bg-header-from" /> : null}
  </span>
)

const CategoryModeSelector = ({ value, onChange }) => (
  <div className="flex gap-2">
    {categoryModeOptions.map((option) => {
      const selected = value === option.value

      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className="flex h-10 min-w-[104px] flex items-center justify-center gap-2 rounded-lg bg-bg-base px-3 text-sm font-normal leading-6 text-text-strong"
        >
          <RadioMark selected={selected} />
          <span>{option.label}</span>
          {option.value === 'with-icon' ? (
            <img src={chefHatIcon} alt="" className="h-5 w-5 icon-strong" />
          ) : null}
        </button>
      )
    })}
  </div>
)

const SectionTitle = ({ title, description, action, switchProps }) => (
  <div className="flex items-start justify-between gap-3">
    {switchProps ? <AdminSwitch {...switchProps} label={title} /> : null}
    {action ? (
      <button
        type="button"
        className="shrink-0 text-sm font-normal leading-6 text-menu-accent"
      >
        {action}
      </button>
    ) : null}
    
    <div className="min-w-0 flex-1 text-right">
      <h2 className="text-sm font-semibold leading-6 text-text-strong">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm font-normal leading-6 text-text-moderate">
          {description}
        </p>
      ) : null}
    </div>
  </div>
)

const PreviewLink = () => (
  <button
    type="button"
    className="text-sm font-normal leading-6 text-menu-accent"
  >
    پیش نمایش
  </button>
)

const EditHeader = ({ onBack }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex flex-1 flex-row items-center gap-3 text-right">
      <img src={paintRollersIcon} alt="" className="h-8 w-8 shrink-0 icon-strong" />

      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-base font-bold leading-8 text-text-strong">
            شخصی سازی
          </h1>
          <span className="rounded-lg bg-menu-accent/10 px-2 py-0.5 text-xs font-normal leading-5 text-menu-accent">
            ویدئو آموزشی
          </span>
        </div>
        <p className="text-xs font-normal leading-5 text-text-moderate">
          صفحه کاربرتان را شخصی سازی کنید
        </p>
      </div>
    </div>

    <button
      type="button"
      onClick={onBack}
      aria-label="بازگشت"
      className="flex h-8 w-8 items-center justify-center"
    >
      <img src={arrowLeftIcon} alt="" className="h-6 w-6 icon-strong" />
    </button>
  </div>
)

const EditTabs = ({ activeTab, onChange }) => (
  <div className="mt-6 flex rounded-2xl bg-bg-base p-1">
    {editTabs.map((tab) => (
      <button
        key={tab.key}
        type="button"
        onClick={() => onChange(tab.key)}
        className={`flex-1 rounded-xl px-3 py-2 text-center text-sm font-normal leading-6 ${
          activeTab === tab.key
            ? 'bg-bg-soft text-text-heading'
            : 'text-text-placeholder'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
)

const SegmentedControl = ({ options, value, onChange }) => (
  <div className="flex rounded-2xl bg-bg-base p-1">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={`flex-1 rounded-xl py-2 text-center text-xs font-normal leading-5 ${
          value === option.value
            ? 'bg-bg-soft text-text-heading'
            : 'text-text-placeholder'
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
)

const PatternPreview = ({ selectedPattern, onSelectPattern }) => (
  <div>
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-semibold leading-6 text-text-strong">پترن</h2>
      <PreviewLink />
    </div>

    <div className="grid grid-cols-5 gap-2">
      {patternOptions.map((item) => {
        const selected = item.key === selectedPattern

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelectPattern(item.key)}
            aria-label={item.label}
            className={`flex h-16 w-16 items-center justify-center rounded-2xl border bg-bg-base shadow-sm transition-colors ${
              selected ? 'border-menu-accent' : 'border-border-light'
            }`}
          >
            <img
              src={item.icon}
              alt=""
              className={`h-7 w-7 ${selected ? 'fill-blue' : 'icon-moderate'}`}
            />
          </button>
        )
      })}
    </div>
  </div>
)

const MiniProductCard = ({ dense = false }) => (
  <div
    className={
      dense
        ? 'min-w-0 rounded-xl bg-bg-main p-1.5'
        : 'rounded-2xl border border-border-light bg-bg-main p-2'
    }
  >
    <img
      src={productImage}
      alt="دستبند برلیانکسی"
      className={`${dense ? 'h-16 rounded-lg' : 'h-20 rounded-xl'} w-full object-cover`}
    />
    <h3
      className={`${dense ? 'mt-1 text-[9px] leading-4' : 'mt-2 text-xs leading-5'} truncate font-semibold text-text-strong`}
    >
      دستبند برلیانکسی
    </h3>
    <p
      className={`${dense ? 'text-[9px] leading-4' : 'text-xs leading-5'} truncate font-normal text-text-moderate`}
    >
      دستبند طلا - زنانه
    </p>
    <p
      className={`mt-1 ${dense ? 'text-[9px] leading-4' : 'text-xs leading-5'} font-semibold text-text-strong`}
    >
      ۷۰۰,۰۰۰ تومان
    </p>
    {dense ? (
      <button
        type="button"
        className="mt-1 flex h-6 w-full items-center justify-center gap-1 rounded-lg bg-bg-soft text-[9px] font-normal leading-4 text-text-strong"
      >
        <span>افزودن به سبد</span>
        <img src={cartAddIcon} alt="" className="h-3.5 w-3.5 icon-strong" />
      </button>
    ) : null}
  </div>
)

const ProductLayoutPreview = ({ selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className="w-full rounded-2xl border border-border-light bg-bg-main p-3"
  >
    <div className="flex items-center justify-between gap-3">
      <RadioMark selected={selected} />
      <div className="min-w-0 flex-1 text-right">
        <h3 className="text-sm font-semibold leading-6 text-text-strong">
          پیشرفته
        </h3>
        <p className="text-sm font-normal leading-6 text-text-moderate">
          انتخاب نوع نمایش به عهده کاربر است
        </p>
      </div>

      <div className="flex h-12 items-center gap-1 rounded-2xl bg-bg-base p-1">
        <span className="flex h-10 w-12 items-center justify-center rounded-xl bg-bg-soft">
          <span className="flex flex-col gap-1">
            <span className="h-1.5 w-5 rounded-sm border border-text-placeholder" />
            <span className="h-1.5 w-5 rounded-sm border border-text-placeholder" />
          </span>
        </span>
        <span className="flex h-10 w-12 items-center justify-center rounded-xl">
          <span className="flex gap-1">
            <span className="h-5 w-1.5 rounded-sm border border-text-placeholder" />
            <span className="h-5 w-1.5 rounded-sm border border-text-placeholder" />
          </span>
        </span>
      </div>
    </div>
  </button>
)

const ProductListPreview = ({ selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className="w-full rounded-2xl border border-border-light bg-bg-main p-3"
  >
    <div className="flex items-center gap-3">
      <RadioMark selected={selected} />
      <img
        src={productImage}
        alt="دستبند برلیانکسی"
        className="h-20 w-24 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1 text-right">
        <h4 className="truncate text-sm font-semibold leading-6 text-text-strong">
          دستبند برلیانکسی
        </h4>
        <p className="truncate text-xs font-normal leading-5 text-text-moderate">
          دستبند طلا - زنانه
        </p>
      </div>
      <div className="flex h-full min-h-20 shrink-0 flex-col items-start justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-soft">
          <img src={cartAddIcon} alt="" className="h-5 w-5 icon-success" />
        </span>
        <p className="text-xs font-semibold leading-5 text-text-strong">
          ۷۰۰,۰۰۰ تومان
        </p>
      </div>
    </div>
  </button>
)

const ProductGridPreview = ({ selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className="w-full rounded-2xl border border-border-light bg-bg-main p-3"
  >
    <div className="flex items-center gap-3">
      <RadioMark selected={selected} />
      <div className="grid min-w-0 flex-1 grid-cols-3 gap-2">
        {productCards.slice(1).map((item) => (
          <MiniProductCard key={item.id} dense />
        ))}
      </div>
    </div>
  </button>
)

const ColorPickerSheet = ({
  isOpen,
  onClose,
  hue,
  saturation,
  value,
  hexColor,
  onPickerChange,
  onHexChange,
  onSubmit,
}) => {
  const hueColor = rgbToCss(hueToRgb(hue))
  const selectedColor = hsvToHex(hue, saturation, value)

  const updateColorArea = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const nextSaturation = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    const nextValue = clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1)

    onPickerChange({ saturation: nextSaturation, value: nextValue })
  }

  const updateHue = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const nextHue = clamp((event.clientX - rect.left) / rect.width, 0, 1) * 360

    onPickerChange({ hue: nextHue })
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} ariaLabel="انتخاب رنگ">
      <div className="px-4 pb-10">
        <div>
          <div
            className="relative h-40 overflow-hidden rounded-xl"
            style={{ backgroundColor: hueColor }}
          >
            <div
              role="slider"
              aria-label="ناحیه انتخاب رنگ"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={Math.round(saturation * 100)}
              tabIndex={0}
              onPointerDown={updateColorArea}
              onPointerMove={(event) => {
                if (event.buttons === 1) {
                  updateColorArea(event)
                }
              }}
              className="h-full touch-none"
              style={{
                backgroundImage:
                  'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)), linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
              }}
            />
            <span
              className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
              style={{
                left: `${saturation * 100}%`,
                top: `${(1 - value) * 100}%`,
                backgroundColor: selectedColor,
              }}
            />
          </div>
        </div>

        <div
          role="slider"
          aria-label="نوار انتخاب طیف رنگ"
          aria-valuemin="0"
          aria-valuemax="360"
          aria-valuenow={Math.round(hue)}
          tabIndex={0}
          onPointerDown={updateHue}
          onPointerMove={(event) => {
            if (event.buttons === 1) {
              updateHue(event)
            }
          }}
          className="relative mt-3 h-3 touch-none rounded-full bg-[linear-gradient(90deg,#ff0000,#ff9800,#ffee00,#37ff00,#00d1ff,#001eff,#ff00e5,#ff0000)]"
        >
          <span
            className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
            style={{
              left: `${(hue / 360) * 100}%`,
              backgroundColor: hueColor,
            }}
          />
        </div>

        <div className="mt-4 flex w-full flex-col gap-1">
          <label className="w-full text-right text-base font-semibold text-text-strong">
            کد رنگ
          </label>
          <div className="relative w-full">
            <input
              type="text"
              value={hexColor}
              onChange={(event) => onHexChange(event.target.value)}
              dir="ltr"
              placeholder="#FFFFFF"
              className="w-full rounded-2xl bg-bg-base py-4 pl-4 pr-16 text-left text-base font-normal uppercase text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary"
            />
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <span
                className="h-8 w-8 rounded-xl border border-border-light shadow-sm"
                style={{ backgroundColor: hexColor }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="admin" onClick={onSubmit}>
            انتخاب رنگ
          </Button>
        </div>
      </div>
    </BottomSheet>
  )
}

const FontSelectSheet = ({
  isOpen,
  onClose,
  selectedFont,
  onSelectFont,
}) => (
  <BottomSheet isOpen={isOpen} onClose={onClose} ariaLabel="انتخاب فونت">
    <div dir="rtl" className="px-4 pb-10">
      <div className="mb-4 text-right">
        <h2 className="text-base font-semibold leading-8 text-text-strong">
          انتخاب فونت
        </h2>
        <p className="text-sm font-normal leading-6 text-text-moderate">
          یکی از فونت ها را برای محصولتان انتخاب کنید.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {fontOptions.map((option) => {
          const selected = selectedFont === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectFont(option.value)}
              className={`flex h-12 w-full items-center justify-between rounded-2xl px-4 text-right text-base font-normal transition-colors ${
                selected ? 'bg-bg-soft text-text-strong' : 'bg-bg-base text-text-moderate'
              }`}
            >
              <span>{option.label}</span>
              <RadioMark selected={selected} />
            </button>
          )
        })}
      </div>
    </div>
  </BottomSheet>
)

const SettingsContent = ({ state, setState, onOpenColorPicker, onOpenFontSelect }) => (
  <div className="mt-6 flex flex-col gap-5 pb-6">
    <div>
      <label className="mb-2 block text-sm font-semibold leading-6 text-text-strong">
        رنگ برند
      </label>
      <div
        role="button"
        tabIndex={0}
        onClick={onOpenColorPicker}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onOpenColorPicker()
          }
        }}
        className="relative block w-full text-right"
      >
        <input
          value={state.brandColor}
          dir="ltr"
          readOnly
          className="h-12 w-full rounded-2xl bg-bg-base px-4 pr-14 text-left text-sm font-normal text-text-placeholder outline-none focus:ring-2 focus:ring-primary"
        />
        <span
          className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(state.brandColor)
              ? state.brandColor
              : '#00E043',
          }}
        />
      </div>
      <p className="mt-2 text-sm font-normal leading-6 text-text-moderate">
        کد رنگ برند خودتان را وارد کنید.
      </p>
    </div>

    <div>
      <label className="mb-2 block text-sm font-semibold leading-6 text-text-strong">
        فونت
      </label>
      <button
        type="button"
        onClick={onOpenFontSelect}
        className="relative flex h-12 w-full items-center justify-between rounded-2xl bg-bg-base px-4 text-sm font-normal text-text-placeholder"
      >
        <span>
          {fontOptions.find((option) => option.value === state.font)?.label ?? 'راوی'}
        </span>
        <img src={arrowDownIcon} alt="" className="h-5 w-5 icon-moderate" />
      </button>
      <p className="mt-2 text-sm font-normal leading-6 text-text-moderate">
        یکی از فونت ها را برای محصولتان انتخاب کنید
      </p>
    </div>

    <PatternPreview
      selectedPattern={state.pattern}
      onSelectPattern={(pattern) =>
        setState((current) => ({
          ...current,
          pattern,
        }))
      }
    />
  </div>
)

const DisplayContent = ({ state, setState }) => (
  <div className="mt-6 flex flex-col gap-5 pb-6">
    <SectionTitle
      title="صفحه دسته بندی"
      description="این گزینه یک صفحه مجزا برای دسته بندی دارید."
      switchProps={{
        checked: state.categoryPage,
        onChange: () =>
          setState((current) => ({
            ...current,
            categoryPage: !current.categoryPage,
          })),
      }}
    />

    <p className="text-xs font-semibold leading-5 text-menu-accent">
      درصورتی که فروشگاه پیشرفته فعال باشد نمی توانید صفحه دسته بندی جدا داشته باشید
    </p>

    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-right">
          <h2 className="text-sm font-semibold leading-6 text-text-strong">
            نوع نمایش دسته بندی
          </h2>
          <p className="text-xs font-normal leading-5 text-text-moderate">
            دسته بندی شما با ایکن و یا بدون ایکن نمایش داده شود.
          </p>
        </div>
      </div>
      <CategoryModeSelector
        value={state.categoryMode}
        onChange={(categoryMode) =>
          setState((current) => ({
            ...current,
            categoryMode,
          }))
        }
      />
    </div>

    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold leading-6 text-text-strong">
          فروشگاه پیشرفته
        </h2>
        <PreviewLink />
      </div>

      <div className="flex flex-col gap-4">
        <SectionTitle
          title="خدمات"
          description="این گزینه یک صفحه مجزا برای دسته بندی دارید."
          switchProps={{
            checked: state.services,
            onChange: () =>
              setState((current) => ({
                ...current,
                services: !current.services,
              })),
          }}
        />
        <SectionTitle
          title="فایل"
          description="این گزینه یک صفحه مجزا برای دسته بندی دارید."
          switchProps={{
            checked: state.file,
            onChange: () =>
              setState((current) => ({
                ...current,
                file: !current.file,
              })),
          }}
        />
      </div>
    </div>

    <div className="rounded-2xl border border-border-light bg-bg-main p-3">
      <div className="mb-3 flex items-center">
        <RadioMark selected />
        <h2 className="text-sm font-semibold leading-6 text-text-strong mr-2">
          نوع نمایش تب
        </h2>
      </div>
      <SegmentedControl
        options={tabDisplayOptions}
        value={state.tabDisplay}
        onChange={(tabDisplay) =>
          setState((current) => ({
            ...current,
            tabDisplay,
          }))
        }
      />
    </div>

    <div>
      <div className="rounded-2xl border border-border-light bg-bg-main p-3">
        <div className="mb-3 flex items-center">
          <RadioMark />
          <h2 className="text-sm font-semibold leading-6 text-text-strong mr-2">
           نوع نمایش اسکرول
          </h2>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold leading-6 text-text-strong">
            فروشگاه
          </h3>
          <button
            type="button"
            className="text-xs font-semibold leading-5 text-menu-accent"
          >
            مشاهده همه
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {productCards.slice(0, 3).map((item) => (
            <MiniProductCard key={item.id} />
          ))}
        </div>
      </div>
    </div>
  </div>
)

const ShopContent = ({ state, setState }) => (
  <div className="mt-6 flex flex-col gap-4 pb-6">
    <SectionTitle
      title="جستجو"
      description="این گزینه باکس جستجو را به محصول اضافه میکند."
      switchProps={{
        checked: state.search,
        onChange: () =>
          setState((current) => ({
            ...current,
            search: !current.search,
          })),
      }}
    />

    <p className="text-xs font-semibold leading-5 text-menu-accent border-b pb-2">
      در حال پیش فرض ویژگی جستجو در محصول شما فعال است
    </p>

    <div className='border-b pb-3'>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-right">
          <h2 className="text-sm font-semibold leading-6 text-text-strong">
            نوع فروش
          </h2>
          <p className="text-xs font-normal leading-5 text-text-moderate">
            کدام روش را برای ثبت سفارش مد نظر دارید
          </p>
        </div>
        <PreviewLink />
      </div>

      <div className="flex flex-col gap-3">
        {saleTypeOptions.map((option) => {
          const selected = state.saleType === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setState((current) => ({
                  ...current,
                  saleType: option.value,
                }))
              }
              className="flex items-center gap-3 rounded-2xl border border-border-light bg-bg-main p-2"
            >
              <RadioMark selected={selected} />
              <span
                className={`flex h-9 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-normal leading-6 ${
                  selected ? 'bg-border-light text-text-strong' : 'bg-bg-soft text-text-moderate'
                }`}
              >
                <img src={option.icon} alt="" className="h-5 w-5 icon-strong" />
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>

    <div className='pb-3 border-b'>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-right">
          <h2 className="text-sm font-semibold leading-6 text-text-strong">
            نمایش محصولات
          </h2>
          <p className="text-xs font-normal leading-5 text-text-moderate">
            کدام روش را برای ثبت سفارش مد نظر دارید
          </p>
        </div>
        <PreviewLink />
      </div>

      <div className="flex flex-col gap-3">
        <ProductLayoutPreview
          selected={state.productDisplay === 'advanced'}
          onSelect={() =>
            setState((current) => ({
              ...current,
              productDisplay: 'advanced',
            }))
          }
        />
        <ProductListPreview
          selected={state.productDisplay === 'list'}
          onSelect={() =>
            setState((current) => ({
              ...current,
              productDisplay: 'list',
            }))
          }
        />
        <ProductGridPreview
          selected={state.productDisplay === 'grid'}
          onSelect={() =>
            setState((current) => ({
              ...current,
              productDisplay: 'grid',
            }))
          }
        />
      </div>
    </div>

    <SectionTitle
      title="فیلتر"
      description="فیلتر محصولات برای کاربر قابل نمایش باشد؟"
      switchProps={{
        checked: state.filter,
        onChange: () =>
          setState((current) => ({
            ...current,
            filter: !current.filter,
          })),
      }}
    />
  </div>
)

const AdminEditScreen = ({
  activeTab = 'settings',
  onEditTabChange,
  onTabChange,
  onBack,
}) => {
  const currentTab = normalizeEditTab(activeTab)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [isFontSelectOpen, setIsFontSelectOpen] = useState(false)
  const [pickerHue, setPickerHue] = useState(38)
  const [pickerSaturation, setPickerSaturation] = useState(0.42)
  const [pickerValue, setPickerValue] = useState(0.96)
  const [pickerHex, setPickerHex] = useState('#F6D08F')
  const [state, setState] = useState({
    brandColor: '#43b3214',
    font: 'ravi',
    pattern: 'cloud',
    categoryPage: false,
    categoryMode: 'with-icon',
    services: false,
    file: false,
    tabDisplay: 'shop',
    search: true,
    saleType: 'cart',
    productDisplay: 'advanced',
    filter: true,
  })

  const handleOpenColorPicker = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(state.brandColor)) {
      setPickerHex(state.brandColor.toUpperCase())
    }

    setIsColorPickerOpen(true)
  }

  const handlePickerChange = (nextValue) => {
    const nextHue = nextValue.hue ?? pickerHue
    const nextSaturation = nextValue.saturation ?? pickerSaturation
    const nextPickerValue = nextValue.value ?? pickerValue

    setPickerHue(nextHue)
    setPickerSaturation(nextSaturation)
    setPickerValue(nextPickerValue)
    setPickerHex(hsvToHex(nextHue, nextSaturation, nextPickerValue))
  }

  const handleSubmitColor = () => {
    setState((current) => ({
      ...current,
      brandColor: normalizeHexColor(pickerHex),
    }))
    setIsColorPickerOpen(false)
  }

  const content = useMemo(() => {
    if (currentTab === 'display') {
      return <DisplayContent state={state} setState={setState} />
    }

    if (currentTab === 'shop') {
      return <ShopContent state={state} setState={setState} />
    }

    return (
      <SettingsContent
        state={state}
        setState={setState}
        onOpenColorPicker={handleOpenColorPicker}
        onOpenFontSelect={() => setIsFontSelectOpen(true)}
      />
    )
  }, [currentTab, state])

  return (
    <>
      <div
        dir="rtl"
        className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main"
      >
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <EditHeader onBack={onBack} />
          <EditTabs activeTab={currentTab} onChange={onEditTabChange} />
          {content}
        </div>

        <div className="px-4 py-4">
          <Button variant="admin">ذخیره اطلاعات</Button>
        </div>

        <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
      </div>

      <ColorPickerSheet
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        hue={pickerHue}
        saturation={pickerSaturation}
        value={pickerValue}
        hexColor={pickerHex}
        onPickerChange={handlePickerChange}
        onHexChange={(value) => setPickerHex(normalizeHexColor(value))}
        onSubmit={handleSubmitColor}
      />

      <FontSelectSheet
        isOpen={isFontSelectOpen}
        onClose={() => setIsFontSelectOpen(false)}
        selectedFont={state.font}
        onSelectFont={(font) => {
          setState((current) => ({
            ...current,
            font,
          }))
          setIsFontSelectOpen(false)
        }}
      />
    </>
  )
}

export default AdminEditScreen

import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'

// Icons
import arrowLeftIcon from '../../../assets/images/front/pdp/arrow-left-1.svg'
import cartIcon from '../../../assets/images/front/pdp/cart-1.svg'
import verifyIcon from '../../../assets/images/front/pdp/verify.svg'
import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import avatarImg from '../../../assets/images/front/pdp/Avatar.png'
import bookmarkIcon from '../../../assets/images/front/pdp/bookmark.svg'
import shareIcon from '../../../assets/images/front/pdp/share-1.svg'
import playCircleIcon from '../../../assets/images/front/pdp/play-circle.svg'
import checkIcon from '../../../assets/images/front/pdp/check.svg'
import cartShopIcon from '../../../assets/images/front/pdp/cart-shop.svg'
import addIcon from '../../../assets/images/front/pdp/add.svg'
import minusIcon from '../../../assets/images/front/pdp/minus.svg'

// Bottom nav icons
import locationLoveIcon from '../../../assets/images/front/pdp/location-love-2.svg'
import linkIcon from '../../../assets/images/front/pdp/link.svg'
import albumImageIcon from '../../../assets/images/front/pdp/album-image-4.svg'
import messages2Icon from '../../../assets/images/front/pdp/messages-2.svg'
import brochureIcon from '../../../assets/images/front/pdp/brochure.svg'

// Color swatches (shirt)
import ellipseBlue from '../../../assets/images/front/pdp/Ellipse 1.svg'
import ellipseRed from '../../../assets/images/front/pdp/Ellipse 1-1.svg'
import ellipseGreen from '../../../assets/images/front/pdp/Ellipse 1-2.svg'
import ellipseBlack from '../../../assets/images/front/pdp/Ellipse 1-3.svg'

// Shirt product images
import shirtMain from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb1 from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb2 from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb3 from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb4 from '../../../assets/images/front/pdp/product-image.png'

// Clip product images
import clipMain from '../../../assets/images/front/pdp/product-image.png'
import clipThumb1 from '../../../assets/images/front/pdp/product-image.png'
import clipThumb2 from '../../../assets/images/front/pdp/product-image.png'
import clipThumb3 from '../../../assets/images/front/pdp/product-image.png'
import clipThumb4 from '../../../assets/images/front/pdp/product-image.png'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)
const pad2 = (n) => new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 }).format(n)

const WAVEFORM_HEIGHTS = [6, 16, 12, 12, 20, 20, 14, 14, 14, 18, 14, 24, 20, 14, 18, 10, 10]

// Discount end is fixed from page load so the timer doesn't reset on re-render
const SHIRT_DISCOUNT_END = Date.now() + (1 * 3600 + 7 * 60 + 12) * 1000

const PRODUCTS = {
  shirt: {
    type: 'clothing',
    headerVariant: 'dark',
    name: 'پیرهن آستین بلند',
    description: 'پیراهن آستین بلند سبک پلو با پارچه تمام نخ و ابریشمی',
    code: '32476-bd',
    category: 'پیراهن',
    price: 300000,
    originalPrice: 380000,
    discount: { label: 'شگفت انگیز هیجانی', endsAt: SHIRT_DISCOUNT_END },
    breadcrumb: ['داشبورد'],
    images: [shirtMain, shirtThumb1, shirtThumb2, shirtThumb3, shirtThumb4],
    colors: [
      { name: 'آبی', ellipse: ellipseBlue },
      { name: 'قرمز', ellipse: ellipseRed },
      { name: 'سبز', ellipse: ellipseGreen },
      { name: 'مشکی', ellipse: ellipseBlack },
    ],
    sizes: ['XXXL', 'XXL', 'XL', 'L'],
    specs: [
      { label: 'قد', value: 'روی کمر' },
      { label: 'جنس', value: 'الیاف طبیعی' },
      { label: 'مناسب برای فصل', value: 'بهار, تابستان' },
    ],
  },
  clip: {
    type: 'wholesale',
    headerVariant: 'primary',
    name: 'کلیپس شمعی حلزونی',
    description: 'پیراهن آستین بلند سبک پلو با پارچه تمام نخ و ابریشمی',
    code: '32476-bd',
    category: 'کلیپس',
    breadcrumb: ['محصولات', 'کلیپس شمعی'],
    images: [clipMain, clipThumb1, clipThumb2, clipThumb3, clipThumb4],
    units: [
      { name: 'جین', packSize: 12, packUnit: 'عددی', price: 300000 },
      { name: 'کارتن', packSize: 96, packUnit: 'عددی', price: 2200000 },
    ],
    specs: [
      { label: 'قد', value: 'روی کمر' },
      { label: 'جنس', value: 'الیاف طبیعی' },
      { label: 'مناسب برای فصل', value: 'بهار, تابستان' },
    ],
  },
}

function Checkbox({ checked }) {
  return (
    <div
      className={`w-3 h-3 rounded-[6px] shrink-0 flex items-center justify-center border transition-colors ${
        checked ? 'bg-text-strong border-text-strong' : 'bg-bg-main border-border-light'
      }`}
    >
      {checked && <img src={checkIcon} alt="" className="w-2 h-2" />}
    </div>
  )
}

function PrimaryCheckbox({ checked }) {
  return (
    <div
      className={`w-4 h-4 rounded-[4px] shrink-0 flex items-center justify-center border transition-colors ${
        checked ? 'bg-primary border-primary' : 'bg-bg-main border-border-light'
      }`}
    >
      {checked && <img src={checkIcon} alt="" className="w-2.5 h-2.5" />}
    </div>
  )
}

function Waveform({ animated }) {
  return (
    <div className={`flex items-center gap-0.5 ${animated ? 'animate-pulse' : ''}`}>
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full shrink-0 bg-primary"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}

function DiscountTimer({ discount }) {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, discount.endsAt - Date.now()))

  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        const next = Math.max(0, t - 1000)
        if (next === 0) clearInterval(id)
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const totalSec = Math.floor(timeLeft / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60

  return (
    <div className="flex items-center justify-between bg-order-new-soft rounded-tl-xl rounded-tr-xl px-3 py-2 mt-2 border-t border-menu-warning">
      {/* Label (right in RTL = first in DOM) */}
      <div className="flex items-center gap-1.5">
        {/* orange clock icon — drawn inline since no asset available */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="12" cy="12" r="9" stroke="#ff7b06" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="#ff7b06" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-menu-warning text-sm font-semibold">{discount.label}</span>
      </div>
      
      {/* Timer (left in RTL = second in DOM) */}
      <span className="text-menu-warning text-sm font-bold tracking-widest" dir="ltr">
        {pad2(h)} : {pad2(m)} : {pad2(s)}
      </span>
    </div>
  )
}

const FrontPdpScreen = () => {
  const navigate = useNavigate()
  const { type = 'shirt' } = useParams()
  const product = PRODUCTS[type] || PRODUCTS.shirt

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Voice — playback only (admin pre-recorded)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const playTimerRef = useRef(null)

  const handleVoicePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause()
      clearTimeout(playTimerRef.current)
      setIsPlaying(false)
      return
    }
    if (product.audioSrc) {
      const audio = new Audio(product.audioSrc)
      audioRef.current = audio
      audio.onended = () => setIsPlaying(false)
      audio.play().catch(() => {})
    } else {
      // Mock: animate for 4 s when no audio file is wired up yet
      playTimerRef.current = setTimeout(() => setIsPlaying(false), 4000)
    }
    setIsPlaying(true)
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      clearTimeout(playTimerRef.current)
    }
  }, [])

  // Clothing variants
  const [selectedColor, setSelectedColor] = useState(
    product.type === 'clothing' ? product.colors.length - 1 : 0
  )
  const [selectedSize, setSelectedSize] = useState(
    product.type === 'clothing' ? product.sizes.length - 1 : 0
  )

  // Wholesale unit quantities
  const [unitQty, setUnitQty] = useState({})

  const toggleUnit = (unitName) => {
    setUnitQty((prev) => {
      if (prev[unitName]) {
        const next = { ...prev }
        delete next[unitName]
        return next
      }
      return { ...prev, [unitName]: 1 }
    })
  }

  const changeQty = (unitName, delta) => {
    setUnitQty((prev) => ({
      ...prev,
      [unitName]: Math.max(1, (prev[unitName] || 1) + delta),
    }))
  }

  const selectedUnits =
    product.type === 'wholesale' ? (product.units || []).filter((u) => unitQty[u.name]) : []
  const hasSelection = product.type === 'wholesale' ? selectedUnits.length > 0 : true

  // Price calculation
  const totalPrice =
    product.type === 'wholesale'
      ? selectedUnits.reduce((sum, u) => sum + (unitQty[u.name] || 0) * u.price, 0)
      : product.price

  const headerGradient =
    product.headerVariant === 'dark'
      ? 'from-header-from to-header-to'
      : 'from-primary to-primary-deep'
  const accentColor =
    product.headerVariant === 'dark' ? 'text-text-strong' : 'text-primary'

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return
    const total = product.images.length
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i + 1) % total)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, product.images.length])

  // Gallery helpers
  const THUMBS_SHOWN = 2
  const extraCount = product.images.length - 1 - THUMBS_SHOWN // images not shown in column

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      {/* ── Header ── */}
      <div className={`bg-gradient-to-b ${headerGradient} rounded-b-xl px-4 pb-4 shrink-0`}>
        <div className="flex items-center justify-between pt-4 pb-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMenuOpen(true)}>
              <img src={menuIcon} alt="منو" className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img src={avatarImg} alt="آواتار" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-text-white text-sm font-bold leading-6">رستوران ژیوان</span>
                <img src={verifyIcon} alt="" className="w-4 h-4" />
              </div>
              <span className="text-text-disable-weak text-sm leading-6">کافه رستوران</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button>
              <img src={cartIcon} alt="سبد خرید" className="w-6 h-6" />
            </button>
            <button onClick={() => navigate(-1)}>
              <img src={arrowLeftIcon} alt="بازگشت" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-0.5 px-4 py-2">
          {product.breadcrumb.map((crumb, i) => (
            <div key={i} className="flex items-center gap-0.5">
              {i > 0 && <span className="text-text-weak text-sm">/</span>}
              <span
                className={`text-sm leading-6 ${
                  i === product.breadcrumb.length - 1 ? accentColor : 'text-text-weak'
                }`}
              >
                {crumb}
              </span>
            </div>
          ))}
        </div>

        {/* ── Image Gallery — grid layout ── */}
        {/* RTL flex: main image (first in DOM) appears on the right */}
        <div dir="rtl" className="flex gap-2 px-4">
          {/* Main image — rightmost */}
          <button
            onClick={() => setLightboxIndex(0)}
            className="flex-1 rounded-xl overflow-hidden"
            style={{ height: `${THUMBS_SHOWN * 80 + (THUMBS_SHOWN - 1) * 8 + 80}px` }}
          >
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </button>

          {/* Thumbnail column — leftmost */}
          <div className="flex flex-col gap-2">
            {product.images.slice(1, 1 + THUMBS_SHOWN).map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i + 1)}
                className="w-20 h-20 rounded-xl overflow-hidden shrink-0"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}

            {/* "+N more" slot or plain third thumbnail */}
            {extraCount > 0 ? (
              <button
                onClick={() => setLightboxIndex(1 + THUMBS_SHOWN)}
                className="w-20 h-20 rounded-xl bg-bg-soft flex items-center justify-center shrink-0"
              >
                <span className="text-text-strong text-base font-bold">
                  +{formatFarsi(extraCount)}
                </span>
              </button>
            ) : product.images[1 + THUMBS_SHOWN] ? (
              <button
                onClick={() => setLightboxIndex(1 + THUMBS_SHOWN)}
                className="w-20 h-20 rounded-xl overflow-hidden shrink-0"
              >
                <img
                  src={product.images[1 + THUMBS_SHOWN]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ) : null}
          </div>
        </div>

        {/* Discount timer (shirt only) */}
        {product.discount && <DiscountTimer discount={product.discount} />}

        {/* ── Product Info Card ── */}
        <div className="bg-bg-main rounded-t-xl shadow-[-30px_20px_30px_rgba(41,45,53,0.2)] mt-2 px-4 py-3 flex flex-col gap-4">
          {/* Drag handle */}
          <div className="flex justify-center">
            <div className="w-12 h-1 rounded-full bg-bg-soft" />
          </div>

          {/* Name + voice player */}
          <div className="border-b border-dashed border-border-light pb-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-text-strong text-sm font-semibold leading-6 flex-1 text-right pl-2">
                {product.name}
              </span>

              {/* Admin voice playback */}
              <button
                onClick={handleVoicePlay}
                className="bg-bg-base rounded-xl px-2 py-1 flex items-center gap-2"
                title={isPlaying ? 'توقف پخش' : 'پخش صدا'}
              >
                <img src={playCircleIcon} alt="پخش" className="w-5 h-5 shrink-0" />
                <Waveform animated={isPlaying} />
              </button>
            </div>

            <p className="text-text-weak text-xs leading-5 text-right w-full">
              {product.description}
            </p>

            <div className="flex items-center justify-between px-1 py-1.5">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-text-heading/10">
                  <span className="text-text-heading text-xs leading-5">{product.category}</span>
                </div>
                <div
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg ${
                    product.headerVariant === 'dark' ? 'bg-header-from/10' : 'bg-primary/10'
                  }`}
                >
                  <span className={`text-xs leading-5 ${accentColor}`}>{product.code}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button>
                  <img src={shareIcon} alt="اشتراک‌گذاری" className="w-4 h-4" />
                </button>
                <button>
                  <img src={bookmarkIcon} alt="ذخیره" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Variants ── */}
          <div className="flex flex-col gap-1.5">
            {product.type === 'clothing' && (
              <>
                <div className="flex flex-col gap-1.5">
                  <span className="text-text-strong text-sm font-semibold leading-6 text-right">
                    رنگ : {product.colors[selectedColor]?.name}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(i)}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg transition-colors ${
                          selectedColor === i ? 'bg-text-heading/15' : 'bg-text-heading/10'
                        }`}
                      >
                        <Checkbox checked={selectedColor === i} />
                        <img src={color.ellipse} alt={color.name} className="w-3 h-3" />
                        <span className="text-text-heading text-xs leading-5">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-text-strong text-sm font-semibold leading-6 text-right">
                    سایز : {product.sizes[selectedSize]}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(i)}
                        className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-text-heading/10"
                      >
                        <Checkbox checked={selectedSize === i} />
                        <span className="text-text-heading text-xs leading-5">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {product.type === 'wholesale' && (
              <div className="flex flex-col gap-0">
                <span className="text-text-strong text-sm font-semibold leading-6 text-right mb-1.5">
                  واحد فروش
                </span>
                {product.units.map((unit) => {
                  const isChecked = !!unitQty[unit.name]
                  const qty = unitQty[unit.name] || 0
                  return (
                    <div
                      key={unit.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleUnit(unit.name)}
                      onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && toggleUnit(unit.name)
                      }
                      className="flex items-center gap-2 border border-border-light rounded-lg px-3 py-1.5 bg-bg-main mb-2 cursor-pointer"
                    >
                      <PrimaryCheckbox checked={isChecked} />

                      <div className="flex-1 flex flex-col items-start gap-0.5 text-right">
                        <span className="text-text-weak text-xs leading-5">{unit.name}</span>
                        <span className="text-text-strong text-sm font-semibold leading-6">
                          {formatFarsi(unit.packSize)} {unit.packUnit}
                        </span>
                      </div>

                      {isChecked && (
                        <div className="flex items-center gap-1 rounded-lg px-1 py-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); changeQty(unit.name, 1) }}
                            className="w-5 h-5 flex items-center justify-center"
                          >
                            <img src={addIcon} alt="+" className="w-5 h-5" />
                          </button>
                          <span className="text-primary text-sm font-semibold leading-6 min-w-[20px] text-center">
                            {formatFarsi(qty)}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); changeQty(unit.name, -1) }}
                            className="w-5 h-5 flex items-center justify-center"
                          >
                            <img src={minusIcon} alt="−" className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Product Specs */}
          <div className="flex flex-col gap-1.5">
            <span className="text-text-strong text-sm font-semibold leading-6 text-right">
              مشخصات کالا
            </span>
            <div className="flex gap-2 items-center flex-wrap">
              {product.specs.map((spec, i) => (
                <div key={i} className="bg-bg-base flex flex-col px-3 py-1.5 rounded-lg gap-0.5">
                  <span className="text-text-weak text-xs leading-5">{spec.label}</span>
                  <span className="text-text-strong text-sm font-semibold leading-6">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-20" />
        </div>
      </div>

      {/* ── Sticky Bottom Bar ── */}
      <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Action button */}
          {product.type === 'clothing' ? (
            <button className="bg-header-from text-text-white text-sm rounded-xl px-4 py-3">
              افزودن به سبد
            </button>
          ) : hasSelection ? (
            <div className="flex items-center gap-2">
              <button className="rounded-xl p-1">
                <img src={cartShopIcon} alt="افزودن به سبد" className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-1.5">
                {selectedUnits.map((unit, i) => (
                  <div key={unit.name} className="flex items-center gap-1">
                    {i > 0 && <span className="text-text-weak text-sm">|</span>}
                    <span className="text-text-heading text-sm font-bold leading-6">
                      {formatFarsi(unitQty[unit.name])}
                    </span>
                    <span className="text-text-weak text-sm leading-6">{unit.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Price */}
          <div className="flex flex-col items-end">
            {product.type === 'clothing' && product.originalPrice && (
              <span className="text-text-weak text-xs line-through leading-4">
                {formatFarsi(product.originalPrice)} هزارتومان
              </span>
            )}
            <div className="flex items-center gap-1">
              <span className={`text-base font-bold leading-8 ${accentColor}`}>
                {product.type === 'wholesale' && hasSelection
                  ? formatFarsi(totalPrice)
                  : formatFarsi(product.price)}
              </span>
              <span className="text-text-weak text-sm leading-6">هزارتومان</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex border-t border-border-light">
          {[
            { icon: brochureIcon, alt: 'کاتالوگ', active: true },
            { icon: messages2Icon, alt: 'پیام‌ها' },
            { icon: albumImageIcon, alt: 'گالری' },
            { icon: linkIcon, alt: 'لینک' },
            { icon: locationLoveIcon, alt: 'علاقه‌مندی‌ها' },
          ].map(({ icon, alt, active }) => (
            <button key={alt} className="flex-1 flex flex-col items-center py-4">
              <img src={icon} alt={alt} className={`w-8 h-8 ${active ? 'icon-accent' : ''}`} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Burger Menu Drawer ── */}
      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* ── Image Lightbox — full-width, dots only ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white text-2xl w-8 h-8 flex items-center justify-center z-10"
          >
            ×
          </button>

          {/* Full-width image */}
          <div className="flex-1 flex items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={product.images[lightboxIndex]}
              alt={product.name}
              className="w-full object-contain"
            />
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5 pb-8 pt-4">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                className={`rounded-full transition-all ${
                  i === lightboxIndex ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FrontPdpScreen

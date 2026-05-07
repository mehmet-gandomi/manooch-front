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
import shirtMain from '../../../assets/images/front/pdp/Rectangle 2.png'
import shirtThumb1 from '../../../assets/images/front/pdp/Rectangle 3.png'
import shirtThumb2 from '../../../assets/images/front/pdp/Rectangle 3-1.png'
import shirtThumb3 from '../../../assets/images/front/pdp/Rectangle 4.png'
import shirtThumb4 from '../../../assets/images/front/pdp/Rectangle 4-1.png'

// Clip product images
import clipMain from '../../../assets/images/front/pdp/3ff07cee-dd00-308e-a51e-a3a86eb4603a.jpg'
import clipThumb1 from '../../../assets/images/front/pdp/01bb1f4933961704c04894b8a35297937b275131_1766234239.png'
import clipThumb2 from '../../../assets/images/front/pdp/09f64bf10ccfa3ff8364bb197b70bb89b78945ff_1766234156.png'
import clipThumb3 from '../../../assets/images/front/pdp/3f65144e907b2878a17cd3774b64513865a7f940_1766233965.png'
import clipThumb4 from '../../../assets/images/front/pdp/8519d788d573d5744b18e5605060e4eefe522b04_1766233974.png'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

const WAVEFORM_HEIGHTS = [6, 16, 12, 12, 20, 20, 14, 14, 14, 18, 14, 24, 20, 14, 18, 10, 10]

const PRODUCTS = {
  shirt: {
    type: 'clothing',
    headerVariant: 'dark',
    name: 'پیرهن آستین بلند',
    description: 'پیراهن آستین بلند سبک پلو با پارچه تمام نخ و ابریشمی',
    code: '32476-bd',
    category: 'پیراهن',
    price: 300000,
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
    price: 300000,
    breadcrumb: ['محصولات', 'کلیپس شمعی'],
    images: [clipMain, clipThumb1, clipThumb2, clipThumb3, clipThumb4],
    units: [
      { name: 'جین', packSize: 12, packUnit: 'عددی' },
      { name: 'کارتن', packSize: 96, packUnit: 'عددی' },
    ],
    specs: [
      { label: 'قد', value: 'روی کمر' },
      { label: 'جنس', value: 'الیاف طبیعی' },
      { label: 'مناسب برای فصل', value: 'بهار, تابستان' },
    ],
  },
}

// Visual-only checkbox — click handled by parent
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

function Waveform({ variant, animated }) {
  const barColor =
    variant === 'recording'
      ? 'bg-danger'
      : variant === 'dark'
      ? 'bg-text-strong'
      : 'bg-primary'
  return (
    <div className={`flex items-center gap-0.5 ${animated ? 'animate-pulse' : ''}`}>
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className={`w-0.5 rounded-full shrink-0 ${barColor}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}

const FrontPdpScreen = () => {
  const navigate = useNavigate()
  const { type = 'shirt' } = useParams()
  const product = PRODUCTS[type] || PRODUCTS.shirt

  // Burger menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Gallery lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Voice recording / playback
  const [voiceBlob, setVoiceBlob] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const audioRef = useRef(null)

  // Clothing variant state
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

  const selectedUnits = product.type === 'wholesale'
    ? (product.units || []).filter((u) => unitQty[u.name])
    : []
  const hasSelection = product.type === 'wholesale' ? selectedUnits.length > 0 : true

  const headerGradient =
    product.headerVariant === 'dark'
      ? 'from-header-from to-header-to'
      : 'from-primary to-primary-deep'
  const accentColor =
    product.headerVariant === 'dark' ? 'text-text-strong' : 'text-primary'

  // ── Voice ──────────────────────────────────────────────────────────────────
  const handleVoiceClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
      return
    }
    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
      return
    }
    if (voiceBlob) {
      const url = URL.createObjectURL(voiceBlob)
      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => setIsPlaying(false)
      audio.play()
      setIsPlaying(true)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []
      const mr = new MediaRecorder(stream)
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setVoiceBlob(blob)
        stream.getTracks().forEach((t) => t.stop())
      }
      mediaRecorderRef.current = mr
      mr.start()
      setIsRecording(true)
    } catch {
      // microphone permission denied — silently ignore
    }
  }

  // cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  // ── Lightbox keyboard navigation ──────────────────────────────────────────
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

  const waveformVariant = isRecording ? 'recording' : product.headerVariant

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      {/* ── Header ── */}
      <div className={`bg-gradient-to-b ${headerGradient} rounded-b-xl px-4 pb-4 shrink-0`}>
        <div className="flex items-center justify-between pt-4 pb-2">
          {/* Shop identity (right side in RTL) */}
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
          {/* Back + cart (left side in RTL) */}
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

        {/* ── Image Gallery (horizontal scroll, RTL: main image visible first) ── */}
        <div dir="rtl" className="overflow-x-auto pb-2">
          <div className="flex gap-3 px-4 w-max">
            {/* Main image — first in RTL = rightmost = initially visible */}
            <button
              onClick={() => setLightboxIndex(0)}
              className="shrink-0 rounded-lg overflow-hidden w-64 h-64"
            >
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </button>
            {/* Thumbnails — scroll left to reveal */}
            {product.images.slice(1).map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i + 1)}
                className="shrink-0 rounded-lg overflow-hidden w-20 h-20"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product Info Card ── */}
        <div className="bg-bg-main rounded-t-xl shadow-[-30px_20px_30px_rgba(41,45,53,0.2)] mt-2 px-4 py-3 flex flex-col gap-4">
          {/* Drag handle */}
          <div className="flex justify-center">
            <div className="w-12 h-1 rounded-full bg-bg-soft" />
          </div>

          {/* Name + voice waveform */}
          <div className="border-b border-dashed border-border-light pb-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-text-strong text-sm font-semibold leading-6 flex-1 text-right pl-2">
                {product.name}
              </span>
              {/* Voice player/recorder */}
              <button
                onClick={handleVoiceClick}
                className="bg-bg-base rounded-xl px-2 py-1 flex items-center gap-2"
                title={
                  isRecording
                    ? 'توقف ضبط'
                    : isPlaying
                    ? 'توقف پخش'
                    : voiceBlob
                    ? 'پخش صدا'
                    : 'ضبط صدا'
                }
              >
                {isRecording ? (
                  <div className="w-5 h-5 rounded-full bg-danger shrink-0" />
                ) : (
                  <img src={playCircleIcon} alt="پخش/ضبط" className="w-5 h-5 shrink-0" />
                )}
                <Waveform
                  variant={waveformVariant}
                  animated={isRecording || isPlaying}
                />
              </button>
            </div>

            {/* Description */}
            <p className="text-text-weak text-xs leading-5 text-right w-full">
              {product.description}
            </p>

            {/* Actions + Tags */}
            <div className="flex items-center justify-between px-1 py-1.5">
              {/* Tags */}
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
              {/* Bookmark + share */}
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
            {/* Clothing: color + size chips */}
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

            {/* Wholesale: unit rows — outer is a div to allow inner buttons */}
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

                      {/* Quantity stepper — inner buttons are safe here since parent is div */}
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
          <div className="flex items-center gap-1">
            <span className={`text-base font-bold leading-8 ${accentColor}`}>
              {formatFarsi(product.price)}
            </span>
            <span className="text-text-weak text-sm leading-6">هزارتومان</span>
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

      {/* ── Image Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-text-white text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>

          {/* Prev (scroll toward start in RTL = move right visually) */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((i) => (i - 1 + product.images.length) % product.images.length)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-white text-4xl w-10 h-10 flex items-center justify-center"
          >
            ›
          </button>

          {/* Current image */}
          <img
            src={product.images[lightboxIndex]}
            alt={product.name}
            className="max-w-[85vw] max-h-[80vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((i) => (i + 1) % product.images.length)
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-white text-4xl w-10 h-10 flex items-center justify-center"
          >
            ‹
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 flex gap-1.5 items-center">
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

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import FrontStoreHeader from '../../../components/front/FrontStoreHeader'
import FrontBottomNav from '../../../components/front/FrontBottomNav'
import ProductGallery from '../../../components/front/pdp/ProductGallery'
import VoicePlayer from '../../../components/front/pdp/VoicePlayer'
import DiscountTimer from '../../../components/front/pdp/DiscountTimer'

import checkIcon from '../../../assets/images/front/pdp/check.svg'
import cartShopIcon from '../../../assets/images/front/pdp/cart-shop.svg'
import addIcon from '../../../assets/images/front/pdp/add.svg'
import minusIcon from '../../../assets/images/front/pdp/minus.svg'
import bookmarkIcon from '../../../assets/images/front/pdp/bookmark.svg'
import shareIcon from '../../../assets/images/front/pdp/share-1.svg'

import ellipseBlue from '../../../assets/images/front/pdp/Ellipse 1.svg'
import ellipseRed from '../../../assets/images/front/pdp/Ellipse 1-1.svg'
import ellipseGreen from '../../../assets/images/front/pdp/Ellipse 1-2.svg'
import ellipseBlack from '../../../assets/images/front/pdp/Ellipse 1-3.svg'

import shirtMain from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb1 from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb2 from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb3 from '../../../assets/images/front/pdp/product-image.png'
import shirtThumb4 from '../../../assets/images/front/pdp/product-image.png'

import clipMain from '../../../assets/images/front/pdp/product-image.png'
import clipThumb1 from '../../../assets/images/front/pdp/product-image.png'
import clipThumb2 from '../../../assets/images/front/pdp/product-image.png'
import clipThumb3 from '../../../assets/images/front/pdp/product-image.png'
import clipThumb4 from '../../../assets/images/front/pdp/product-image.png'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

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

const FrontPdpScreen = () => {
  const { type = 'shirt' } = useParams()
  const product = PRODUCTS[type] || PRODUCTS.shirt

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('brochure')

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

  const totalPrice =
    product.type === 'wholesale'
      ? selectedUnits.reduce((sum, u) => sum + (unitQty[u.name] || 0) * u.price, 0)
      : product.price

  const accentColor =
    product.headerVariant === 'dark' ? 'text-text-strong' : 'text-primary'

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      <FrontStoreHeader
        gradient={product.headerVariant}
        onMenuOpen={() => setIsMenuOpen(true)}
      />

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

        <ProductGallery images={product.images} productName={product.name} />

        {/* Product Info Card */}
        <div className="bg-bg-main rounded-t-xl shadow-[-30px_20px_30px_rgba(41,45,53,0.2)] mt-2 px-4 py-3 flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="w-12 h-1 rounded-full bg-bg-soft" />
          </div>

          {product.discount && (
            <DiscountTimer label={product.discount.label} endsAt={product.discount.endsAt} />
          )}

          {/* Name + voice player */}
          <div className="border-b border-dashed border-border-light pb-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-text-strong text-sm font-semibold leading-6 flex-1 text-right pl-2">
                {product.name}
              </span>
              <VoicePlayer audioSrc={product.audioSrc} />
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

          {/* Variants */}
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

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
        <div className="flex items-center justify-between px-4 py-2">
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

        <FrontBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default FrontPdpScreen

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import FrontStoreHeader from '../../../components/front/FrontStoreHeader'
import ProductGallery from '../../../components/front/pdp/ProductGallery'
import VoicePlayer from '../../../components/front/pdp/VoicePlayer'
import DiscountTimer from '../../../components/front/pdp/DiscountTimer'
import ProductSpecs from '../../../components/front/pdp/ProductSpecs'
import { ClothingVariants, WholesaleUnits } from '../../../components/front/pdp/ProductVariants'
import PdpBottomBar from '../../../components/front/pdp/PdpBottomBar'

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

const FrontPdpScreen = () => {
  const { type = 'shirt' } = useParams()
  const product = PRODUCTS[type] || PRODUCTS.shirt

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('brochure')

  const [selectedColor, setSelectedColor] = useState(
    product.type === 'clothing' ? product.colors.length - 1 : 0
  )
  const [selectedSize, setSelectedSize] = useState(
    product.type === 'clothing' ? product.sizes.length - 1 : 0
  )

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

          {product.type === 'clothing' && (
            <ClothingVariants
              colors={product.colors}
              sizes={product.sizes}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
            />
          )}

          {product.type === 'wholesale' && (
            <WholesaleUnits
              units={product.units}
              unitQty={unitQty}
              onToggle={toggleUnit}
              onChangeQty={changeQty}
            />
          )}

          <ProductSpecs specs={product.specs} />

          <div className="h-20" />
        </div>
      </div>

      <PdpBottomBar
        productType={product.type}
        price={totalPrice}
        originalPrice={product.originalPrice}
        accentColor={accentColor}
        hasSelection={hasSelection}
        selectedUnits={selectedUnits}
        unitQty={unitQty}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default FrontPdpScreen

import { useState } from 'react'
import { useParams } from 'react-router-dom'

import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import FrontBottomNav from '../../../components/front/FrontBottomNav'
import DashboardHeader from '../../../components/front/dashboard/DashboardHeader'
import FilterBar from '../../../components/front/dashboard/FilterBar'
import ProductCardH from '../../../components/front/dashboard/ProductCardH'
import ProductCardGrid from '../../../components/front/dashboard/ProductCardGrid'
import ProductSection from '../../../components/front/dashboard/ProductSection'

import productImg from '../../../assets/images/front/pdp/product-image.png'

const STORES = {
  jewelry: {
    gradientFrom: '#2fa04e',
    gradientTo: '#0b431c',
    name: 'بدلیجات تاج محل',
    category: 'بورس کالاهای خاص',
    layout: 'list',
    categories: ['دستبند', 'انگشتر', 'گوشواره', 'گردنبند'],
    products: [
      { id: 1, name: 'دستبند النگویی', subtitle: 'فروشگاه تاج محل', price: 300000, originalPrice: 380000, image: productImg },
      { id: 2, name: 'دستبند النگویی', subtitle: 'فروشگاه تاج محل', price: 300000, originalPrice: 380000, image: productImg },
      { id: 3, name: 'گوشواره طلایی', subtitle: 'فروشگاه تاج محل', price: 450000, originalPrice: null, image: productImg },
      { id: 4, name: 'انگشتر نقره', subtitle: 'فروشگاه تاج محل', price: 250000, originalPrice: 300000, image: productImg },
      { id: 5, name: 'گردنبند بهاری', subtitle: 'فروشگاه تاج محل', price: 180000, originalPrice: null, image: productImg },
    ],
    defaultFollowing: true,
  },
  restaurant: {
    gradientFrom: '#ed1944',
    gradientTo: '#a81230',
    name: 'رستوران ژیوان',
    category: 'کافه رستوران',
    layout: 'sections',
    sections: [
      {
        title: 'فروشگاه',
        products: [
          { id: 1, name: 'وگنو پیتزا', subtitle: 'گوجه + زیتون + ریحون', price: 300000, originalPrice: 380000, image: productImg },
          { id: 2, name: 'پپرونی سالسا', subtitle: 'پپرونی + قارچ + فلفل دلمه', price: 300000, originalPrice: 380000, image: productImg },
          { id: 3, name: 'مارگاریتا', subtitle: 'گوجه + پنیر + ریحون', price: 280000, originalPrice: null, image: productImg },
        ],
      },
      {
        title: 'خدمات',
        products: [
          { id: 4, name: 'وگنو پیتزا', subtitle: 'گوجه + زیتون + ریحون', price: 300000, originalPrice: 380000, image: productImg },
          { id: 5, name: 'پپرونی سالسا', subtitle: 'پپرونی + قارچ + فلفل دلمه', price: 300000, originalPrice: 380000, image: productImg },
          { id: 6, name: 'فونگی پیتزا', subtitle: 'قارچ + پنیر + ریحون', price: 320000, originalPrice: null, image: productImg },
        ],
      },
      {
        title: 'فایل',
        products: [
          { id: 7, name: 'وگنو پیتزا', subtitle: 'گوجه + زیتون + ریحون', price: 300000, originalPrice: 380000, image: productImg },
          { id: 8, name: 'پپرونی سالسا', subtitle: 'پپرونی + قارچ + فلفل دلمه', price: 300000, originalPrice: 380000, image: productImg },
          { id: 9, name: 'مارگاریتا', subtitle: 'گوجه + پنیر + ریحون', price: 280000, originalPrice: null, image: productImg },
        ],
      },
    ],
    defaultFollowing: false,
  },
}

const FrontDashboardScreen = () => {
  const { storeType = 'restaurant' } = useParams()
  const store = STORES[storeType] || STORES.restaurant

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(store.defaultFollowing)
  const [activeCategory, setActiveCategory] = useState(0)
  const [viewMode, setViewMode] = useState('list')
  const [activeTab, setActiveTab] = useState('brochure')

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      <div className="flex-1 overflow-y-auto">
        <DashboardHeader
          gradientFrom={store.gradientFrom}
          gradientTo={store.gradientTo}
          storeName={store.name}
          storeCategory={store.category}
          isFollowing={isFollowing}
          onToggleFollow={() => setIsFollowing((v) => !v)}
          onMenuOpen={() => setIsMenuOpen(true)}
        />

        {store.layout === 'list' ? (
          <>
            <FilterBar
              categories={store.categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {viewMode === 'list' ? (
              <div className="flex flex-col">
                {store.products.map((product) => (
                  <ProductCardH key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-4 pt-2">
                {store.products.map((product) => (
                  <ProductCardGrid key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col pt-2">
            {store.sections.map((section) => (
              <ProductSection key={section.title} title={section.title} products={section.products} />
            ))}
          </div>
        )}

        <div className="h-20" />
      </div>

      <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
        <FrontBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default FrontDashboardScreen

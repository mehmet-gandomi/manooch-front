// src/screens/admin/AdminDashboardScreen.jsx
// Admin panel main dashboard screen

import { useMemo, useState } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminMenuItem from '../../components/admin/AdminMenuItem'
import AdminStatBox from '../../components/admin/AdminStatBox'
import AdminBanner from '../../components/admin/AdminBanner'
import AdminReportRow from '../../components/admin/AdminReportRow'
import BurgerMenuDrawer from '../../components/burger-menu/BurgerMenuDrawer'
import AdminBusinessInfoScreen from './AdminBusinessInfoScreen'
import AdminPluginsScreen from './AdminPluginsScreen'
import AdminCategoryListScreen from './AdminCategoryListScreen'
import AdminCategoryFormScreen from './AdminCategoryFormScreen'
import AdminAttributeListScreen from './AdminAttributeListScreen'
import AdminAttributeFormScreen from './AdminAttributeFormScreen'
import AdminProductListScreen from './AdminProductListScreen'
import AdminProductFormScreen from './AdminProductFormScreen'
import AdminBannerListScreen from './AdminBannerListScreen'
import AdminBannerFormScreen from './AdminBannerFormScreen'

import bellIcon from '../../assets/images/admin/bell-shake-1.svg'
import menuIcon from '../../assets/images/admin/menu.svg'
import userIcon from '../../assets/images/admin/user.svg'
import timerIcon from '../../assets/images/admin/timer.svg'
import usersIcon from '../../assets/images/admin/users.svg'
import arrowLeftIcon from '../../assets/images/admin/arrow-left.svg'
import categoryPreviewImage from '../../assets/images/admin/product/pizza.jpg'
import categoryPreviewIcon from '../../assets/images/category.svg'
import bannerPreviewImage from '../../assets/images/admin/admin-banner.jpg'

import linkIcon from '../../assets/images/admin/link.svg'
import colorsSquareIcon from '../../assets/images/admin/colors-square.svg'
import categoryIcon from '../../assets/images/admin/category.svg'
import wrenchIcon from '../../assets/images/admin/wrench.svg'
import addToBoxIcon from '../../assets/images/admin/add-to-box.svg'
import panoramaIcon from '../../assets/images/admin/panorama-image-1.svg'
import qrCodeIcon from '../../assets/images/admin/QR-code.svg'
import albumIcon from '../../assets/images/admin/album-image-1.svg'
import bellShakeIcon from '../../assets/images/admin/bell-shake-1.svg'
import creditCardsIcon from '../../assets/images/admin/credit-cards.svg'
import addIcon from '../../assets/images/admin/add.svg'
import chatIcon from '../../assets/images/admin/chat-bubble-circle-pen.svg'

import messageFavoriteIcon from '../../assets/images/admin/message-favorite.svg'
import ticketIcon from '../../assets/images/admin/ticket.svg'

const menuItems = [
  { icon: linkIcon, label: 'لینکدونی', key: 'link' },
  { icon: colorsSquareIcon, label: 'ویژگی‌ها', key: 'attributes' },
  { icon: categoryIcon, label: 'دسته‌بندی', key: 'category' },
  { icon: wrenchIcon, label: 'خدمات', key: 'services' },
  { icon: addToBoxIcon, label: 'کالا', key: 'product' },
  { icon: panoramaIcon, label: 'بنر', key: 'banner' },
  { icon: qrCodeIcon, label: 'QR Code', key: 'qr' },
  { icon: albumIcon, label: 'گالری', key: 'gallery' },
  { icon: bellShakeIcon, label: 'اخبار', key: 'news' },
  { icon: creditCardsIcon, label: 'کارت بانکی', key: 'card' },
  { icon: chatIcon, label: 'سوالات', key: 'faq' },
  { icon: addIcon, label: 'افزونه', key: 'plugin', dashed: true },
]

const initialCategories = [
  {
    id: 'pizza-italian',
    name: 'پیتزا ایتالیایی',
    description: 'انواع پیتزا های ایتالیایی',
    order: '1',
    hasImage: true,
    hasDescription: true,
    hasIcon: true,
    imageSrc: categoryPreviewImage,
    imageAlt: 'پیتزا ایتالیایی',
    iconSrc: categoryPreviewIcon,
    iconAlt: 'ایکن دسته بندی',
  },
  {
    id: 'iranian-food',
    name: 'غذای ایرانی',
    description: 'غذاهای اصیل ایرانی',
    order: '2',
    hasImage: true,
    hasDescription: true,
    hasIcon: true,
    imageSrc: categoryPreviewImage,
    imageAlt: 'غذای ایرانی',
    iconSrc: categoryPreviewIcon,
    iconAlt: 'ایکن دسته بندی',
  },
  {
    id: 'smashed-burger',
    name: 'اسمش برگر',
    description: 'برگرهای دست ساز',
    order: '3',
    hasImage: true,
    hasDescription: true,
    hasIcon: true,
    imageSrc: categoryPreviewImage,
    imageAlt: 'اسمش برگر',
    iconSrc: categoryPreviewIcon,
    iconAlt: 'ایکن دسته بندی',
  },
  {
    id: 'pasta',
    name: 'پاستا',
    description: 'پاستاهای خانگی',
    order: '4',
    hasImage: true,
    hasDescription: true,
    hasIcon: true,
    imageSrc: categoryPreviewImage,
    imageAlt: 'پاستا',
    iconSrc: categoryPreviewIcon,
    iconAlt: 'ایکن دسته بندی',
  },
]

const initialAttributes = [
  {
    id: 'color-clothes',
    type: 'color',
    typeLabel: 'رنگ',
    name: 'رنگ لباس',
    title: 'رنگ لباس',
    order: '1',
    hasDetails: true,
    values: [
      { name: 'سبز', hex: '#37FF00' },
      { name: 'مشکی', hex: '#16161D' },
      { name: 'قرمز', hex: '#FF0000' },
      { name: 'آبی', hex: '#1F3C88' },
      { name: 'سفید', hex: '#FFFFFF' },
      { name: 'ذغال سنگی', hex: '#4B5563' },
    ],
  },
  {
    id: 'size-clothes',
    type: 'size',
    typeLabel: 'سایز',
    name: 'سایز لباس',
    title: 'سایز لباس',
    order: '2',
    hasDetails: true,
    values: ['XXL', 'XL', 'L', 'MD', 'SM'],
  },
  {
    id: 'weight',
    type: 'text',
    typeLabel: 'متن',
    name: 'وزن',
    title: 'وزن',
    order: '3',
    hasDetails: true,
    values: [],
  },
  {
    id: 'height',
    type: 'text',
    typeLabel: 'متن',
    name: 'قد',
    title: 'قد',
    order: '4',
    hasDetails: true,
    values: [],
  },
]

const initialProducts = [
  {
    id: 'pizza-vagano-1',
    name: 'پیتزا وگنو',
    description: 'پیتزا مخصوص با سس دست ساز، پنیر موزارلا و سبزیجات تازه',
    hasVoiceDescription: true,
    categoryId: 'pizza-italian',
    categoryName: 'پیتزا ایتالیایی',
    code: '45435768',
    inventory: '200',
    priceInquiry: false,
    basePrice: '700000',
    hasDiscount: false,
    discountedPrice: '',
    hasFeatures: true,
    featureEntries: [
      {
        id: 'pizza-vagano-1-color',
        attributeId: 'color-clothes',
        attributeName: 'رنگ لباس',
        hasDifferentPrice: false,
        selections: [
          {
            key: 'pizza-vagano-1-green',
            name: 'سبز',
            hex: '#37FF00',
            inventory: '12',
            price: '',
          },
          {
            key: 'pizza-vagano-1-red',
            name: 'قرمز',
            hex: '#FF0000',
            inventory: '24',
            price: '',
          },
          {
            key: 'pizza-vagano-1-blue',
            name: 'آبی',
            hex: '#1F3C88',
            inventory: '12',
            price: '',
          },
        ],
      },
    ],
    hasUnitSale: true,
    unitSales: [
      {
        id: 'pizza-vagano-1-box',
        name: 'جین',
        price: '256000',
        quantity: '12',
        inventory: '300',
      },
    ],
    imageGallery: [
      {
        id: 'pizza-vagano-1-image-1',
        src: categoryPreviewImage,
        alt: 'پیتزا وگنو',
      },
      {
        id: 'pizza-vagano-1-image-2',
        src: categoryPreviewImage,
        alt: 'پیتزا وگنو',
      },
    ],
    price: 700000,
    discountPrice: null,
    imageSrc: categoryPreviewImage,
    imageAlt: 'پیتزا وگنو',
  },
  {
    id: 'pizza-vagano-2',
    name: 'پیتزا وگنو',
    description: 'پیتزا ایتالیایی همراه با قارچ، ژامبون و پنیر دوبل',
    hasVoiceDescription: false,
    categoryId: 'pizza-italian',
    categoryName: 'پیتزا ایتالیایی',
    code: '45435769',
    inventory: '180',
    priceInquiry: false,
    basePrice: '700000',
    hasDiscount: true,
    discountedPrice: '690000',
    hasFeatures: false,
    featureEntries: [],
    hasUnitSale: false,
    unitSales: [],
    imageGallery: [
      {
        id: 'pizza-vagano-2-image-1',
        src: categoryPreviewImage,
        alt: 'پیتزا وگنو',
      },
      {
        id: 'pizza-vagano-2-image-2',
        src: categoryPreviewImage,
        alt: 'پیتزا وگنو',
      },
    ],
    price: 690000,
    discountPrice: 700000,
    imageSrc: categoryPreviewImage,
    imageAlt: 'پیتزا وگنو',
  },
  {
    id: 'pizza-vagano-3',
    name: 'پیتزا وگنو',
    description: 'پیتزا سبزیجات تازه با خمیر دست ساز',
    hasVoiceDescription: false,
    categoryId: 'pizza-italian',
    categoryName: 'پیتزا ایتالیایی',
    code: '45435770',
    inventory: '90',
    priceInquiry: false,
    basePrice: '700000',
    hasDiscount: false,
    discountedPrice: '',
    hasFeatures: false,
    featureEntries: [],
    hasUnitSale: false,
    unitSales: [],
    imageGallery: [
      {
        id: 'pizza-vagano-3-image-1',
        src: categoryPreviewImage,
        alt: 'پیتزا وگنو',
      },
    ],
    price: 700000,
    discountPrice: null,
    imageSrc: categoryPreviewImage,
    imageAlt: 'پیتزا وگنو',
  },
  {
    id: 'pizza-vagano-4',
    name: 'پیتزا وگنو',
    description: 'پیتزا مخصوص منوچ با ترکیب پنیر و پپرونی',
    hasVoiceDescription: true,
    categoryId: 'pizza-italian',
    categoryName: 'پیتزا ایتالیایی',
    code: '45435771',
    inventory: '140',
    priceInquiry: false,
    basePrice: '720000',
    hasDiscount: false,
    discountedPrice: '',
    hasFeatures: false,
    featureEntries: [],
    hasUnitSale: false,
    unitSales: [],
    imageGallery: [
      {
        id: 'pizza-vagano-4-image-1',
        src: categoryPreviewImage,
        alt: 'پیتزا وگنو',
      },
    ],
    price: 720000,
    discountPrice: null,
    imageSrc: categoryPreviewImage,
    imageAlt: 'پیتزا وگنو',
  },
]

const initialBanners = [
  {
    id: 'pizza-campaign-1',
    name: 'بنر تبلیغاتی پیتزا',
    priority: '1',
    imageSrc: bannerPreviewImage,
    imageAlt: 'بنر تبلیغاتی پیتزا',
  },
  {
    id: 'pizza-campaign-2',
    name: 'بنر تبلیغاتی پیتزا',
    priority: '2',
    imageSrc: bannerPreviewImage,
    imageAlt: 'بنر تبلیغاتی پیتزا',
  },
  {
    id: 'pizza-campaign-3',
    name: 'بنر تبلیغاتی پیتزا',
    priority: '3',
    imageSrc: bannerPreviewImage,
    imageAlt: 'بنر تبلیغاتی پیتزا',
  },
]

const adminReports = [
  { icon: messageFavoriteIcon, label: 'نظرات دریافت شده', value: '۱۴۳' },
  {
    icon: ticketIcon,
    label: 'تیکت‌های ارسالی به پشتیبانی منوچ',
    value: '۳',
    showDivider: false,
  },
]

const createCategoryId = (value) => {
  const normalizedValue = value.trim().replace(/\s+/g, '-')

  if (normalizedValue) {
    return normalizedValue
  }

  return `category-${Date.now()}`
}

const createAttributeId = (value) => {
  const normalizedValue = value.trim().replace(/\s+/g, '-').toLowerCase()

  if (normalizedValue) {
    return normalizedValue
  }

  return `attribute-${Date.now()}`
}

const createProductId = (value) => {
  const normalizedValue = value.trim().replace(/\s+/g, '-').toLowerCase()

  if (normalizedValue) {
    return normalizedValue
  }

  return `product-${Date.now()}`
}

const createBannerId = (value) => {
  const normalizedValue = value.trim().replace(/\s+/g, '-').toLowerCase()

  if (normalizedValue) {
    return normalizedValue
  }

  return `banner-${Date.now()}`
}

const normalizeBusinessTab = (value) => {
  switch (value) {
    case 'contact':
    case 'links':
      return value
    case 'details':
    default:
      return 'details'
  }
}

const mapMenuBarPath = (key) => {
  switch (key) {
    case 'dashboard':
      return '/admin'
    case 'business':
      return '/admin/business'
    case 'plugin':
      return '/admin/plugin'
    case 'edit':
    case 'list':
      return '/admin/categories'
    default:
      return '/admin'
  }
}

const AdminDashboardScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [categories, setCategories] = useState(initialCategories)
  const [attributes, setAttributes] = useState(initialAttributes)
  const [products, setProducts] = useState(initialProducts)
  const [banners, setBanners] = useState(initialBanners)
  const [productCount, setProductCount] = useState(230)

  const routeState = useMemo(() => {
    const businessTabMatch = matchPath('/admin/business/:businessTab', location.pathname)
    if (businessTabMatch) {
      return {
        screen: 'business',
        businessTab: normalizeBusinessTab(businessTabMatch.params.businessTab),
      }
    }

    if (matchPath('/admin/business', location.pathname)) {
      return { screen: 'business', businessTab: 'details' }
    }

    if (matchPath('/admin/plugin', location.pathname)) {
      return { screen: 'plugin' }
    }

    if (matchPath('/admin/categories/new', location.pathname)) {
      return { screen: 'category-form', mode: 'create', categoryId: null }
    }

    const categoryEditMatch = matchPath('/admin/categories/:categoryId', location.pathname)
    if (categoryEditMatch) {
      return {
        screen: 'category-form',
        mode: 'edit',
        categoryId: categoryEditMatch.params.categoryId,
      }
    }

    if (matchPath('/admin/categories', location.pathname)) {
      return { screen: 'category-list' }
    }

    if (matchPath('/admin/attributes/new', location.pathname)) {
      return { screen: 'attribute-form', mode: 'create', attributeId: null }
    }

    const attributeEditMatch = matchPath('/admin/attributes/:attributeId', location.pathname)
    if (attributeEditMatch) {
      return {
        screen: 'attribute-form',
        mode: 'edit',
        attributeId: attributeEditMatch.params.attributeId,
      }
    }

    if (matchPath('/admin/attributes', location.pathname)) {
      return { screen: 'attribute-list' }
    }

    if (matchPath('/admin/products/new', location.pathname)) {
      return { screen: 'product-form', mode: 'create', productId: null }
    }

    const productEditMatch = matchPath('/admin/products/:productId', location.pathname)
    if (productEditMatch) {
      return {
        screen: 'product-form',
        mode: 'edit',
        productId: productEditMatch.params.productId,
      }
    }

    if (matchPath('/admin/products', location.pathname)) {
      return { screen: 'product-list' }
    }

    if (matchPath('/admin/banners/new', location.pathname)) {
      return { screen: 'banner-form', mode: 'create', bannerId: null }
    }

    const bannerEditMatch = matchPath('/admin/banners/:bannerId', location.pathname)
    if (bannerEditMatch) {
      return {
        screen: 'banner-form',
        mode: 'edit',
        bannerId: bannerEditMatch.params.bannerId,
      }
    }

    if (matchPath('/admin/banners', location.pathname)) {
      return { screen: 'banner-list' }
    }

    return { screen: 'dashboard' }
  }, [location.pathname])

  const activeCategory = useMemo(
    () =>
      categories.find((category) => category.id === routeState.categoryId) ?? null,
    [categories, routeState.categoryId]
  )

  const activeAttribute = useMemo(
    () =>
      attributes.find((item) => item.id === routeState.attributeId) ?? null,
    [attributes, routeState.attributeId]
  )

  const activeProduct = useMemo(
    () => products.find((item) => item.id === routeState.productId) ?? null,
    [products, routeState.productId]
  )

  const activeBanner = useMemo(
    () => banners.find((item) => item.id === routeState.bannerId) ?? null,
    [banners, routeState.bannerId]
  )

  const nextProductCode = useMemo(() => {
    const highestCode = products.reduce((maxValue, item) => {
      const numericCode = Number(item.code) || 0
      return Math.max(maxValue, numericCode)
    }, 0)

    return highestCode + 1
  }, [products])

  const handleTabChange = (nextTab) => {
    navigate(mapMenuBarPath(nextTab))
  }

  const handleBusinessTabChange = (nextTab) => {
    navigate(
      nextTab === 'details'
        ? '/admin/business'
        : `/admin/business/${normalizeBusinessTab(nextTab)}`
    )
  }

  const openCategoryList = () => {
    navigate('/admin/categories')
  }

  const openAttributeList = () => {
    navigate('/admin/attributes')
  }

  const handleAddCategory = () => {
    navigate('/admin/categories/new')
  }

  const handleEditCategory = (categoryId) => {
    navigate(`/admin/categories/${categoryId}`)
  }

  const handleDeleteCategories = (ids) => {
    setCategories((current) =>
      current.filter((category) => !ids.includes(category.id))
    )
  }

  const handleSubmitCategory = (payload) => {
    const nextId = routeState.mode === 'create'
      ? createCategoryId(payload.name)
      : payload.id

    const nextCategory = {
      ...payload,
      id: nextId,
    }

    setCategories((current) => {
      if (routeState.mode === 'create') {
        return [...current, nextCategory]
      }

      return current.map((category) =>
        category.id === payload.id ? nextCategory : category
      )
    })

    navigate('/admin/categories')
  }

  const handleAddAttribute = () => {
    navigate('/admin/attributes/new')
  }

  const handleEditAttribute = (attributeId) => {
    navigate(`/admin/attributes/${attributeId}`)
  }

  const handleDeleteAttributes = (ids) => {
    setAttributes((current) =>
      current.filter((attribute) => !ids.includes(attribute.id))
    )
  }

  const openProductList = () => {
    navigate('/admin/products')
  }

  const openBannerList = () => {
    navigate('/admin/banners')
  }

  const handleAddProduct = () => {
    navigate('/admin/products/new')
  }

  const handleEditProduct = (productId) => {
    navigate(`/admin/products/${productId}`)
  }

  const handleDeleteProducts = (ids) => {
    setProducts((current) =>
      current.filter((product) => !ids.includes(product.id))
    )
    setProductCount((current) => Math.max(0, current - ids.length))
  }

  const handleDeleteProduct = (productId) => {
    if (!productId) {
      return
    }

    setProducts((current) =>
      current.filter((product) => product.id !== productId)
    )
    setProductCount((current) => Math.max(0, current - 1))
    navigate('/admin/products')
  }

  const handleAddBanner = () => {
    navigate('/admin/banners/new')
  }

  const handleEditBanner = (bannerId) => {
    navigate(`/admin/banners/${bannerId}`)
  }

  const handleDeleteBanners = (ids) => {
    setBanners((current) =>
      current.filter((banner) => !ids.includes(banner.id))
    )
  }

  const handleSubmitBanner = (payload) => {
    const fallbackId = routeState.mode === 'create'
      ? createBannerId(payload.name)
      : payload.id
    const nextId =
      routeState.mode === 'create' && banners.some((item) => item.id === fallbackId)
        ? `${fallbackId}-${Date.now()}`
        : fallbackId
    const nextBanner = {
      ...payload,
      id: nextId,
      imageSrc: payload.imageSrc || bannerPreviewImage,
      imageAlt: payload.imageAlt || payload.name || 'تصویر بنر',
    }

    setBanners((current) => {
      if (routeState.mode === 'create') {
        return [...current, nextBanner]
      }

      return current.map((item) => (item.id === payload.id ? nextBanner : item))
    })

    navigate('/admin/banners')
  }

  const handleSubmitAttribute = (payload) => {
    const nextId = routeState.mode === 'create'
      ? createAttributeId(payload.name)
      : payload.id

    const nextAttribute = {
      ...payload,
      id: nextId,
    }

    setAttributes((current) => {
      if (routeState.mode === 'create') {
        return [...current, nextAttribute]
      }

      return current.map((attribute) =>
        attribute.id === payload.id ? nextAttribute : attribute
      )
    })

    navigate('/admin/attributes')
  }

  const handleSubmitProduct = (payload) => {
    const fallbackId = routeState.mode === 'create'
      ? createProductId(payload.name)
      : payload.id
    const nextId =
      routeState.mode === 'create' && products.some((item) => item.id === fallbackId)
        ? `${fallbackId}-${Date.now()}`
        : fallbackId
    const activeCategory = categories.find(
      (category) => category.id === payload.categoryId
    )
    const basePrice = Number(payload.basePrice || 0)
    const discountedPrice = Number(payload.discountedPrice || 0)
    const hasDiscount =
      !payload.priceInquiry &&
      payload.hasDiscount &&
      discountedPrice > 0 &&
      basePrice > 0
    const nextPrice = payload.priceInquiry
      ? 0
      : hasDiscount
        ? discountedPrice
        : basePrice
    const nextProduct = {
      ...payload,
      id: nextId,
      categoryName: activeCategory?.name ?? '',
      imageSrc: payload.imageGallery?.[0]?.src ?? categoryPreviewImage,
      imageAlt:
        payload.imageGallery?.[0]?.alt ?? payload.name ?? 'تصویر کالا',
      priceLabel: payload.priceInquiry ? 'استعلام قیمت' : '',
      price: nextPrice,
      discountPrice: hasDiscount ? basePrice : null,
    }

    setProducts((current) => {
      if (routeState.mode === 'create') {
        return [...current, nextProduct]
      }

      return current.map((item) => (item.id === payload.id ? nextProduct : item))
    })

    if (routeState.mode === 'create') {
      setProductCount((current) => current + 1)
    }

    navigate('/admin/products')
  }

  if (routeState.screen === 'business') {
    return (
      <AdminBusinessInfoScreen
        activeTab="business"
        initialBusinessTab={routeState.businessTab}
        onBusinessTabChange={handleBusinessTabChange}
        onTabChange={handleTabChange}
        onBack={() => navigate('/admin')}
      />
    )
  }

  if (routeState.screen === 'plugin') {
    return (
      <AdminPluginsScreen
        activeTab="plugin"
        onTabChange={handleTabChange}
        onBack={() => navigate('/admin')}
      />
    )
  }

  if (routeState.screen === 'attribute-list') {
    return (
      <AdminAttributeListScreen
        attributes={attributes}
        onBack={() => navigate('/admin')}
        onTabChange={handleTabChange}
        onAddAttribute={handleAddAttribute}
        onEditAttribute={handleEditAttribute}
        onDeleteAttributes={handleDeleteAttributes}
      />
    )
  }

  if (routeState.screen === 'product-list') {
    return (
      <AdminProductListScreen
        products={products}
        totalCount={productCount}
        onBack={() => navigate('/admin')}
        onTabChange={handleTabChange}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProducts={handleDeleteProducts}
      />
    )
  }

  if (routeState.screen === 'product-form') {
    return (
      <AdminProductFormScreen
        mode={routeState.mode}
        product={activeProduct}
        categories={categories}
        attributes={attributes}
        nextCode={nextProductCode}
        onBack={openProductList}
        onTabChange={handleTabChange}
        onSubmit={handleSubmitProduct}
        onDelete={() => handleDeleteProduct(activeProduct?.id)}
      />
    )
  }

  if (routeState.screen === 'banner-list') {
    return (
      <AdminBannerListScreen
        banners={banners}
        onBack={() => navigate('/admin')}
        onTabChange={handleTabChange}
        onAddBanner={handleAddBanner}
        onEditBanner={handleEditBanner}
        onDeleteBanners={handleDeleteBanners}
      />
    )
  }

  if (routeState.screen === 'banner-form') {
    return (
      <AdminBannerFormScreen
        mode={routeState.mode}
        banner={activeBanner}
        nextPriority={banners.length + 1}
        onBack={openBannerList}
        onTabChange={handleTabChange}
        onSubmit={handleSubmitBanner}
      />
    )
  }

  if (routeState.screen === 'attribute-form') {
    return (
      <AdminAttributeFormScreen
        mode={routeState.mode}
        attribute={activeAttribute}
        nextOrder={attributes.length + 1}
        onBack={openAttributeList}
        onTabChange={handleTabChange}
        onSubmit={handleSubmitAttribute}
      />
    )
  }

  if (routeState.screen === 'category-list') {
    return (
      <AdminCategoryListScreen
        categories={categories}
        onBack={() => navigate('/admin')}
        onTabChange={handleTabChange}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategories={handleDeleteCategories}
      />
    )
  }

  if (routeState.screen === 'category-form') {
    return (
      <AdminCategoryFormScreen
        mode={routeState.mode}
        category={activeCategory}
        nextOrder={categories.length + 1}
        onBack={openCategoryList}
        onTabChange={handleTabChange}
        onSubmit={handleSubmitCategory}
      />
    )
  }

  return (
    <>
      <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
        <div className="rounded-b-2xl bg-gradient-to-b from-header-from to-header-to px-4 pb-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex flex-row-reverse items-center gap-2">

              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-6 text-text-white">
                  امیر رضا قائمی
                </span>
                <span className="text-sm font-normal leading-6 text-text-disable-weak">
                  فروشگاه تاج محل
                </span>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-disable">
                <img src={userIcon} alt="avatar" className="h-5 w-5" />
              </div>

              <button type="button" onClick={() => setIsBurgerMenuOpen(true)}>
                <img src={menuIcon} alt="menu" className="h-6 w-6" />
              </button>
            </div>
            <button type="button">
              <img src={bellIcon} alt="notifications" className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-3 flex gap-2">
            <AdminStatBox icon={usersIcon} value="۶۰۰" label="مشتریان" />
            <AdminStatBox
              icon={timerIcon}
              value="۶۰ روز"
              label="اعتبار باقی مانده"
              showArrow
              arrowIcon={arrowLeftIcon}
            />
          </div>

          <AdminBanner />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
          <div className="mb-4 flex flex-wrap gap-2 gap-y-3">
            {menuItems.map((item) => (
              <AdminMenuItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                dashed={item.dashed}
                onClick={() => {
                  if (item.key === 'link') {
                    navigate('/admin/business/links')
                    return
                  }

                  if (item.key === 'plugin') {
                    navigate('/admin/plugin')
                    return
                  }

                  if (item.key === 'category') {
                    openCategoryList()
                    return
                  }

                  if (item.key === 'product') {
                    openProductList()
                    return
                  }

                  if (item.key === 'banner') {
                    openBannerList()
                    return
                  }

                  if (item.key === 'attributes') {
                    openAttributeList()
                  }
                }}
              />
            ))}
          </div>

          <div className="flex flex-col">
            {adminReports.map((report) => (
              <AdminReportRow
                key={report.label}
                icon={report.icon}
                label={report.label}
                value={report.value}
                showDivider={report.showDivider}
              />
            ))}
          </div>
        </div>

        <AdminMenuBar activeTab="dashboard" onTabChange={handleTabChange} />
      </div>

      <BurgerMenuDrawer
        isOpen={isBurgerMenuOpen}
        onClose={() => setIsBurgerMenuOpen(false)}
      />
    </>
  )
}

export default AdminDashboardScreen

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

import bellIcon from '../../assets/images/admin/bell-shake-1.svg'
import menuIcon from '../../assets/images/admin/menu.svg'
import userIcon from '../../assets/images/admin/user.svg'
import timerIcon from '../../assets/images/admin/timer.svg'
import usersIcon from '../../assets/images/admin/users.svg'
import arrowLeftIcon from '../../assets/images/admin/arrow-left.svg'
import categoryPreviewImage from '../../assets/images/admin/Banner.png'
import categoryPreviewIcon from '../../assets/images/category.svg'

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

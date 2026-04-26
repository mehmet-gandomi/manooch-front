// src/screens/admin/AdminDashboardScreen.jsx
// Admin panel main dashboard screen

import { useMemo, useState } from 'react'
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
    values: ['سبز', 'مشکی'],
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

const mapMenuBarTab = (key) => {
  switch (key) {
    case 'business':
    case 'plugin':
    case 'dashboard':
      return key
    case 'edit':
    case 'list':
      return 'category-list'
    default:
      return 'dashboard'
  }
}

const AdminDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [categories, setCategories] = useState(initialCategories)
  const [attributes, setAttributes] = useState(initialAttributes)
  const [categoryEditor, setCategoryEditor] = useState({
    mode: 'edit',
    categoryId: initialCategories[0].id,
  })
  const [attributeEditor, setAttributeEditor] = useState({
    mode: 'create',
    attributeId: null,
  })

  const activeCategory = useMemo(
    () =>
      categories.find((category) => category.id === categoryEditor.categoryId) ??
      null,
    [categories, categoryEditor.categoryId]
  )

  const activeAttribute = useMemo(
    () =>
      attributes.find((item) => item.id === attributeEditor.attributeId) ?? null,
    [attributes, attributeEditor.attributeId]
  )

  const handleTabChange = (nextTab) => {
    setActiveTab(mapMenuBarTab(nextTab))
  }

  const openCategoryList = () => {
    setActiveTab('category-list')
  }

  const openAttributeList = () => {
    setActiveTab('attribute-list')
  }

  const handleAddCategory = () => {
    setCategoryEditor({
      mode: 'create',
      categoryId: null,
    })
    setActiveTab('category-form')
  }

  const handleEditCategory = (categoryId) => {
    setCategoryEditor({
      mode: 'edit',
      categoryId,
    })
    setActiveTab('category-form')
  }

  const handleDeleteCategories = (ids) => {
    setCategories((current) =>
      current.filter((category) => !ids.includes(category.id))
    )
  }

  const handleSubmitCategory = (payload) => {
    const nextId = categoryEditor.mode === 'create'
      ? createCategoryId(payload.name)
      : payload.id

    const nextCategory = {
      ...payload,
      id: nextId,
    }

    setCategories((current) => {
      if (categoryEditor.mode === 'create') {
        return [...current, nextCategory]
      }

      return current.map((category) =>
        category.id === payload.id ? nextCategory : category
      )
    })

    setCategoryEditor({
      mode: 'edit',
      categoryId: nextId,
    })
    setActiveTab('category-list')
  }

  const handleAddAttribute = () => {
    setAttributeEditor({
      mode: 'create',
      attributeId: null,
    })
    setActiveTab('attribute-form')
  }

  const handleEditAttribute = (attributeId) => {
    setAttributeEditor({
      mode: 'edit',
      attributeId,
    })
    setActiveTab('attribute-form')
  }

  const handleDeleteAttributes = (ids) => {
    setAttributes((current) =>
      current.filter((attribute) => !ids.includes(attribute.id))
    )
  }

  const handleSubmitAttribute = (payload) => {
    const nextId = attributeEditor.mode === 'create'
      ? createAttributeId(payload.name)
      : payload.id

    const nextAttribute = {
      ...payload,
      id: nextId,
    }

    setAttributes((current) => {
      if (attributeEditor.mode === 'create') {
        return [...current, nextAttribute]
      }

      return current.map((attribute) =>
        attribute.id === payload.id ? nextAttribute : attribute
      )
    })

    setAttributeEditor({
      mode: 'edit',
      attributeId: nextId,
    })
    setActiveTab('attribute-list')
  }

  if (activeTab === 'business') {
    return (
      <AdminBusinessInfoScreen
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onBack={() => setActiveTab('dashboard')}
      />
    )
  }

  if (activeTab === 'plugin') {
    return (
      <AdminPluginsScreen
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onBack={() => setActiveTab('dashboard')}
      />
    )
  }

  if (activeTab === 'attribute-list') {
    return (
      <AdminAttributeListScreen
        attributes={attributes}
        onBack={() => setActiveTab('dashboard')}
        onTabChange={handleTabChange}
        onAddAttribute={handleAddAttribute}
        onEditAttribute={handleEditAttribute}
        onDeleteAttributes={handleDeleteAttributes}
      />
    )
  }

  if (activeTab === 'attribute-form') {
    return (
      <AdminAttributeFormScreen
        mode={attributeEditor.mode}
        attribute={activeAttribute}
        nextOrder={attributes.length + 1}
        onBack={openAttributeList}
        onTabChange={handleTabChange}
        onSubmit={handleSubmitAttribute}
      />
    )
  }

  if (activeTab === 'category-list') {
    return (
      <AdminCategoryListScreen
        categories={categories}
        onBack={() => setActiveTab('dashboard')}
        onTabChange={handleTabChange}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategories={handleDeleteCategories}
      />
    )
  }

  if (activeTab === 'category-form') {
    return (
      <AdminCategoryFormScreen
        mode={categoryEditor.mode}
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
                  if (item.key === 'plugin') {
                    setActiveTab('plugin')
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

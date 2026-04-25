// src/screens/admin/AdminDashboardScreen.jsx
// Admin panel main dashboard screen

import { useState } from 'react'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminMenuItem from '../../components/admin/AdminMenuItem'
import AdminStatBox from '../../components/admin/AdminStatBox'
import AdminBanner from '../../components/admin/AdminBanner'
import AdminReportRow from '../../components/admin/AdminReportRow'
import BurgerMenuDrawer from '../../components/burger-menu/BurgerMenuDrawer'
import AdminBusinessInfoScreen from './AdminBusinessInfoScreen'
import AdminPluginsScreen from './AdminPluginsScreen'

// Header icons
import bellIcon from '../../assets/images/admin/bell-shake-1.svg'
import menuIcon from '../../assets/images/admin/menu.svg'
import userIcon from '../../assets/images/admin/user.svg'
import timerIcon from '../../assets/images/admin/timer.svg'
import usersIcon from '../../assets/images/admin/users.svg'
import arrowLeftIcon from '../../assets/images/admin/arrow-left.svg'

// Menu item icons
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

// Report icons
import messageFavoriteIcon from '../../assets/images/admin/message-favorite.svg'
import ticketIcon from '../../assets/images/admin/ticket.svg'

const menuItems = [
  { icon: linkIcon,        label: 'لینکدونی',   key: 'link' },
  { icon: colorsSquareIcon,label: 'ویژگی‌ها',   key: 'features' },
  { icon: categoryIcon,    label: 'دسته‌بندی',  key: 'category' },
  { icon: wrenchIcon,      label: 'خدمات',      key: 'services' },
  { icon: addToBoxIcon,    label: 'کالا',       key: 'product' },
  { icon: panoramaIcon,    label: 'بنر',        key: 'banner' },
  { icon: qrCodeIcon,      label: 'QR Code',    key: 'qr' },
  { icon: albumIcon,       label: 'گالری',      key: 'gallery' },
  { icon: bellShakeIcon,   label: 'اخبار',      key: 'news' },
  { icon: creditCardsIcon, label: 'کارت بانکی', key: 'card' },
  { icon: chatIcon,        label: 'سوالات',     key: 'faq' },
  { icon: addIcon,         label: 'افزونه',     key: 'plugin', dashed: true },
]

const AdminDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

  if (activeTab === 'business') {
    return (
      <AdminBusinessInfoScreen
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => setActiveTab('dashboard')}
      />
    )
  }

  if (activeTab === 'plugin') {
    return (
      <AdminPluginsScreen
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={() => setActiveTab('dashboard')}
      />
    )
  }

  return (
    <>
      <div
        dir="rtl"
        className="min-h-screen bg-bg-main flex flex-col max-w-sm mx-auto"
      >
        {/* ── Dark gradient header ── */}
        <div className="bg-gradient-to-b from-header-from to-header-to rounded-b-2xl px-4 pb-4">
          {/* Profile row */}
          <div className="flex items-center justify-between py-4">
            {/* Avatar + name + hamburger — right */}
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-text-white leading-6">
                  امیر رضا قائمی
                </span>
                <span className="text-sm font-normal text-text-disable-weak leading-6">
                  فروشگاه تاج محل
                </span>
              </div>

              <div className="w-10 h-10 rounded-full bg-bg-disable flex items-center justify-center shrink-0">
                <img src={userIcon} alt="avatar" className="w-5 h-5" />
              </div>

              <button type="button" onClick={() => setIsBurgerMenuOpen(true)}>
                <img src={menuIcon} alt="menu" className="w-6 h-6" />
              </button>
            </div>

            <button type="button">
              <img src={bellIcon} alt="notifications" className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 mb-3">
            <AdminStatBox
              icon={usersIcon}
              value="۶۰۰"
              label="مشتریان"
            />
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

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
          <div className="flex flex-wrap gap-2 gap-y-3 mb-4">
            {menuItems.map((item) => (
              <AdminMenuItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                dashed={item.dashed}
                onClick={
                  item.key === 'plugin' ? () => setActiveTab('plugin') : undefined
                }
              />
            ))}
          </div>

          <div className="flex flex-col">
            <AdminReportRow
              icon={messageFavoriteIcon}
              label="نظرات دریافت شده"
              value="۱۴۳"
              showDivider
            />
            <AdminReportRow
              icon={ticketIcon}
              label="تیکت‌های ارسالی به پشتیبانی منوچ"
              value="۳"
              showDivider={false}
            />
          </div>
        </div>

        <AdminMenuBar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <BurgerMenuDrawer
        isOpen={isBurgerMenuOpen}
        onClose={() => setIsBurgerMenuOpen(false)}
      />
    </>
  )
}

export default AdminDashboardScreen

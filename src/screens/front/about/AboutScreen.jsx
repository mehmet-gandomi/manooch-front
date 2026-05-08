import { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'

import FrontBottomNav from '../../../components/front/FrontBottomNav'
import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import MapSection from '../../../components/front/about/MapSection'

import menuIcon   from '../../../assets/images/front/pdp/menu.svg'
import avatarImg  from '../../../assets/images/front/pdp/Avatar.png'
import bellIcon   from '../../../assets/images/front/bell-shake-1.svg'
import verifyIcon from '../../../assets/images/front/pdp/verify.svg'

import neshanMapImg    from '../../../assets/images/admin/admin-banner.jpg'
import googleMapImg    from '../../../assets/images/admin/Banner.png'

const CallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#0068ff"/>
  </svg>
)

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="#4b45e6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const LocationOutlineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="#737377" fill="none" strokeWidth="0"/>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#737377"/>
  </svg>
)

const Divider = () => <div className="h-px w-full bg-border-light" />

const STORE_DATA = {
  restaurant: {
    name: 'رستوران ژیوان',
    category: 'کافه رستوران',
    about: 'ژیوان بهترین رستوران ایتالیایی شرق کشور که با بهترین مواد اولیه غذا های خودمان را اماده',
    phones: ['۰۹۱۲ ۲۲۲ ۳۳۴۴', '۰۹۳۳ ۴۴۴ ۲۲۳۳'],
    address: 'مشهد، بلوار سجاد، حامد جنوبی۱۲',
  },
  jewelry: {
    name: 'بدلیجات تاج محل',
    category: 'بورس کالاهای خاص',
    about: 'تاج محل بهترین فروشگاه بدلیجات و جواهرات در قلب بازار بورس کالاهای خاص تهران',
    phones: ['۰۹۳۳ ۴۴۴ ۲۲۳۳'],
    address: 'تهران، بازار بزرگ، راسته جواهرفروشان',
  },
}

const AboutScreen = () => {
  const { storeType = 'restaurant' } = useParams()
  const store = STORE_DATA[storeType] || STORE_DATA.restaurant

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab]   = useState('favorites')

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      {/* Dark gradient header */}
      <div className="bg-gradient-to-b from-header-from to-header-to rounded-b-xl px-4 pt-4 pb-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMenuOpen(true)}>
              <img src={menuIcon} alt="منو" className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <img src={avatarImg} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-text-white text-sm font-semibold leading-6">{store.name}</span>
              <span className="text-text-disable-weak text-sm leading-6">{store.category}</span>
            </div>
          </div>
          <button className="p-1">
            <img src={bellIcon} alt="" />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 pt-6 pb-6">

          {/* Store logo + name + category */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border-light shadow-lg shrink-0">
              <img src={avatarImg} alt={store.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1">
                <span className="text-text-strong text-sm font-bold leading-6">{store.name}</span>
                <img src={verifyIcon} alt="" className="w-4 h-4" />
              </div>
              <span className="text-text-weak text-sm leading-6">{store.category}</span>
            </div>
          </div>

          <Divider />

          {/* درباره ما */}
          <div className="flex flex-col gap-1.5 items-end">
            <span className="text-text-strong text-sm font-semibold leading-6">درباره ما</span>
            <p className="text-text-moderate text-sm leading-6 text-right w-full">{store.about}</p>
          </div>

          <Divider />

          {/* Support buttons */}
          <div className="flex gap-3">
            {/* پشتیبانی آنلاین — purple outline, FIRST → visual RIGHT in RTL */}
            <button className="flex-1 flex items-center justify-center gap-2 border border-menu-accent rounded-xl py-2 px-4">
              <span className="text-menu-accent text-sm leading-6">پشتیبانی آنلاین</span>
              <SendIcon />
            </button>
            {/* پشتیبانی تلفنی — blue outline */}
            <button className="flex-1 flex items-center justify-center gap-2 border border-primary rounded-xl py-2 px-4">
              <span className="text-primary text-sm leading-6">پشتیبانی تلفنی</span>
              <CallIcon />
            </button>
          </div>

          <Divider />

          {/* Address */}
          <div className="flex flex-col gap-1.5 items-end">
            <span className="text-text-strong text-sm font-semibold leading-6">آدرس</span>
            <div className="flex items-center gap-1.5 w-full justify-end">
              <p className="text-text-moderate text-sm leading-6 text-right flex-1">{store.address}</p>
              <LocationOutlineIcon />
            </div>
          </div>

          <Divider />

          {/* Phone number(s) */}
          {store.phones.length === 1 ? (
            <div className="flex items-center justify-center gap-2">
              <CallIcon />
              <span className="text-primary text-sm leading-6" dir="ltr">{store.phones[0]}</span>
            </div>
          ) : (
            <div className="flex items-center">
              {store.phones.map((phone, idx) => (
                <Fragment key={phone}>
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <CallIcon />
                    <span className="text-primary text-sm leading-6" dir="ltr">{phone}</span>
                  </div>
                  {idx < store.phones.length - 1 && (
                    <div className="w-px h-6 bg-border-light" />
                  )}
                </Fragment>
              ))}
            </div>
          )}

          <Divider />

          {/* نشان map */}
          <MapSection
            title="نشان"
            mapImage={neshanMapImg}
            viewLabel="مشاهده در نشان"
          />

          <Divider />

          {/* گوگل مپ */}
          <MapSection
            title="گوگل مپ"
            mapImage={googleMapImg}
            viewLabel="مشاهده در گوگل مپ"
          />

        </div>
        <div className="h-20" />
      </div>

      {/* Bottom nav — favorites active */}
      <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
        <FrontBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default AboutScreen

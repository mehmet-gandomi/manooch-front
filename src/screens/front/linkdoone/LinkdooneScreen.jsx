import { useState } from 'react'
import { useParams } from 'react-router-dom'

import FrontBottomNav from '../../../components/front/FrontBottomNav'
import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import LinkSection from '../../../components/front/linkdoone/LinkSection'

import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import avatarImg from '../../../assets/images/front/pdp/Avatar.png'
import bellIcon from '../../../assets/images/front/bell-shake-1.svg'

import instagramIcon from '../../../assets/images/social-icons/Platform=Instagram, Color=Brand, State=Default.svg'
import telegramIcon from '../../../assets/images/social-icons/Platform=Telegram, Color=Brand, State=Default.svg'
import youtubeIcon from '../../../assets/images/social-icons/Platform=YouTube, Color=Brand, State=Default.svg'
import baleIcon from '../../../assets/images/social-icons/Platform=bale, Color=Brand, State=Default.svg'
import eitaaIcon from '../../../assets/images/social-icons/Platform=Eitaa, Color=Brand, State=Default.svg'
import aparatIcon from '../../../assets/images/social-icons/Platform=Aparat, Color=Brand, State=Default.svg'
import rubikaIcon from '../../../assets/images/social-icons/Platform=Rubika, Color=Brand, State=Default.svg'
import githubIcon from '../../../assets/images/social-icons/Platform=GitHub, Color=Brand, State=Default.svg'
import dribbbleIcon from '../../../assets/images/social-icons/Platform=Dribbble, Color=Brand, State=Default.svg'
import linkedinIcon from '../../../assets/images/social-icons/Platform=LinkedIn, Color=Brand, State=Default.svg'
import torobIcon from '../../../assets/images/social-icons/torob-logo 1.svg'
import basalamIcon from '../../../assets/images/social-icons/Basalam-Logo 1.svg'

// Inline SVG for globe/website icon — no local asset available
const WebsiteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#202a37" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#202a37" strokeWidth="1.5" />
    <path d="M3 12h18" stroke="#202a37" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3.5 8h17M3.5 16h17" stroke="#202a37" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// Wrap SVG icon as an img-compatible data URL img src (use a wrapper component instead)
const WEBSITE_ICON_SRC = `data:image/svg+xml,${encodeURIComponent(
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="%23202a37" strokeWidth="1.5"/>
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke="%23202a37" strokeWidth="1.5"/>
    <path d="M3 12h18" stroke="%23202a37" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3.5 8h17M3.5 16h17" stroke="%23202a37" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>`
)}`

const STORE_DATA = {
  restaurant: {
    name: 'رستوران ژیوان',
    category: 'کافه رستوران',
    isEmpty: false,
    sections: [
      {
        title: 'فروشگاه آنلاین',
        subtitle: 'فروشگاه آنلاین های این بیزینس را اینجا مشاهده کنید',
        links: [
          { label: 'وبسایت', icon: WEBSITE_ICON_SRC, bgColor: 'rgba(32,42,55,0.2)', textColor: '#202a37' },
          { label: 'ترب', icon: torobIcon, bgColor: 'rgba(235,0,0,0.2)', textColor: '#eb0000' },
          { label: 'باسلام', icon: basalamIcon, bgColor: 'rgba(227,118,0,0.2)', textColor: '#e37600' },
        ],
      },
      {
        title: 'شبکه های بین المللی',
        subtitle: 'سوشال مدیا های بین المللی این کسب و کار.',
        links: [
          { label: 'اینستاگرام', icon: instagramIcon, bgColor: 'rgba(75,69,230,0.2)', textColor: '#4b45e6' },
          { label: 'تلگرام', icon: telegramIcon, bgColor: 'rgba(0,104,255,0.2)', textColor: '#0068ff' },
          { label: 'یوتوب', icon: youtubeIcon, bgColor: 'rgba(235,0,0,0.2)', textColor: '#eb0000' },
        ],
      },
      {
        title: 'شبکه های داخلی',
        subtitle: 'سکو های بومی این کسب و کار',
        links: [
          { label: 'بله', icon: baleIcon, bgColor: 'rgba(2,146,122,0.2)', textColor: '#02927a' },
          { label: 'ایتا', icon: eitaaIcon, bgColor: 'rgba(227,118,0,0.2)', textColor: '#e37600' },
          { label: 'آپارات', icon: aparatIcon, bgColor: 'rgba(237,20,91,0.2)', textColor: '#ed145b' },
          { label: 'روبیکا', icon: rubikaIcon, bgColor: 'rgba(15,104,160,0.2)', textColor: '#0f68a0' },
        ],
      },
    ],
  },
  jewelry: {
    name: 'بدلیجات تاج محل',
    category: 'بورس کالاهای خاص',
    isEmpty: false,
    sections: [
      {
        title: 'فروشگاه آنلاین',
        subtitle: 'فروشگاه آنلاین های این بیزینس را اینجا مشاهده کنید',
        links: [
          { label: 'وبسایت', icon: WEBSITE_ICON_SRC, bgColor: 'rgba(32,42,55,0.2)', textColor: '#202a37' },
          { label: 'ترب', icon: torobIcon, bgColor: 'rgba(235,0,0,0.2)', textColor: '#eb0000' },
          { label: 'باسلام', icon: basalamIcon, bgColor: 'rgba(227,118,0,0.2)', textColor: '#e37600' },
        ],
      },
      {
        title: 'پورتفولیو',
        subtitle: 'پرتفلیو های ما را اینجا مشاهده کنید.',
        links: [
          { label: 'گیت هاب', icon: githubIcon, bgColor: 'rgba(32,42,55,0.2)', textColor: '#202a37' },
          { label: 'دریبل', icon: dribbbleIcon, bgColor: 'rgba(234,76,137,0.2)', textColor: '#ea4c89' },
          { label: 'لینکدین', icon: linkedinIcon, bgColor: 'rgba(0,119,181,0.2)', textColor: '#0077b5' },
        ],
      },
      {
        title: 'شبکه های بین المللی',
        subtitle: 'سوشال مدیا های بین المللی این کسب و کار.',
        links: [
          { label: 'اینستاگرام', icon: instagramIcon, bgColor: 'rgba(75,69,230,0.2)', textColor: '#4b45e6' },
          { label: 'تلگرام', icon: telegramIcon, bgColor: 'rgba(0,104,255,0.2)', textColor: '#0068ff' },
          { label: 'یوتوب', icon: youtubeIcon, bgColor: 'rgba(235,0,0,0.2)', textColor: '#eb0000' },
        ],
      },
      {
        title: 'شبکه های داخلی',
        subtitle: 'سکو های بومی این کسب و کار',
        links: [
          { label: 'بله', icon: baleIcon, bgColor: 'rgba(2,146,122,0.2)', textColor: '#02927a' },
          { label: 'ایتا', icon: eitaaIcon, bgColor: 'rgba(227,118,0,0.2)', textColor: '#e37600' },
          { label: 'آپارات', icon: aparatIcon, bgColor: 'rgba(237,20,91,0.2)', textColor: '#ed145b' },
          { label: 'روبیکا', icon: rubikaIcon, bgColor: 'rgba(15,104,160,0.2)', textColor: '#0f68a0' },
        ],
      },
    ],
  },
  // Empty state example
  empty: {
    name: 'فروشگاه نمونه',
    category: 'دسته‌بندی',
    isEmpty: true,
    sections: [],
  },
}

const LinkdooneScreen = () => {
  const { storeType = 'restaurant' } = useParams()
  const store = STORE_DATA[storeType] || STORE_DATA.restaurant

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('link')

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      {/* Compact dark header
          RTL: menu+avatar+name FIRST (→ RIGHT), bell LAST (→ LEFT)   */}
      <div className="bg-gradient-to-b from-header-from to-header-to rounded-b-xl px-4 pt-4 pb-4 shrink-0">
        <div className="flex items-center justify-between">
          {/* FIRST → visual RIGHT: menu + avatar + name */}
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

          {/* SECOND → visual LEFT: bell notification */}
          <button className="p-1">
            <img src={bellIcon} alt="" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {store.isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-8 px-4 pt-24">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="none" opacity="0.15">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="#202a37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="#202a37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-text-strong text-base font-bold leading-8">کاربر عزیز، لینک های ما خزان است</span>
              <span className="text-text-moderate text-base leading-8">هیچ لینکی در این صفحه تعریف نشده است</span>
            </div>
          </div>
        ) : (
          /* Filled state — sections list */
          <div className="flex flex-col gap-6 px-4 pt-4 pb-6">
            {store.sections.map((section) => (
              <LinkSection key={section.title} {...section} />
            ))}
          </div>
        )}

        <div className="h-20" />
      </div>

      {/* Bottom nav — "link" tab active */}
      <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
        <FrontBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default LinkdooneScreen

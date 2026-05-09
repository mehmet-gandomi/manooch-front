import { useState } from 'react'
import { useParams } from 'react-router-dom'

import FrontBottomNav from '../../../components/front/FrontBottomNav'
import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import GalleryCard from '../../../components/front/gallery/GalleryCard'
import GalleryLightbox from '../../../components/front/gallery/GalleryLightbox'

import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import avatarImg from '../../../assets/images/front/pdp/Avatar.png'
import bellIcon from '../../../assets/images/front/bell-shake-1.svg'
import albumIcon from '../../../assets/images/front/pdp/album-image-4.svg'

import galleryImg1 from '../../../assets/images/admin/gallery-image.jpg'
import galleryImg2 from '../../../assets/images/admin/pizza.jpg'
import galleryImg3 from '../../../assets/images/admin/admin-banner.jpg'
import galleryImg4 from '../../../assets/images/admin/Banner.png'

// Gallery items: each group = { tall (left), topRight, bottomRight, full (full-width row) }
// Rendered as: [tall | topRight+bottomRight stacked] then [full]
const STORE_DATA = {
  restaurant: {
    name: 'رستوران ژیوان',
    category: 'کافه رستوران',
    isEmpty: false,
    items: [
      { id: 1, image: galleryImg1, title: 'فضای سوشال', subtitle: 'قلب سفید' },
      { id: 2, image: galleryImg2, title: 'فضای سوشال', subtitle: 'قلب سفید' },
      { id: 3, image: galleryImg3, title: 'فضای سوشال', subtitle: 'قلب سفید' },
      { id: 4, image: galleryImg4, title: 'فضای سوشال', subtitle: 'قلب سفید' },
      { id: 5, image: galleryImg2, title: 'منوی تابستانه', subtitle: 'ویژه فصل' },
      { id: 6, image: galleryImg1, title: 'دسر ویژه', subtitle: 'شکلاتی' },
      { id: 7, image: galleryImg4, title: 'محیط گرم', subtitle: 'شب نشینی' },
    ],
  },
  jewelry: {
    name: 'بدلیجات تاج محل',
    category: 'بورس کالاهای خاص',
    isEmpty: false,
    items: [
      { id: 1, image: galleryImg4, title: 'طلا و جواهر', subtitle: 'کلکسیون جدید' },
      { id: 2, image: galleryImg3, title: 'دستبند النگو', subtitle: 'طرح باروک' },
      { id: 3, image: galleryImg1, title: 'ست عروس', subtitle: 'ویژه عروسی' },
      { id: 4, image: galleryImg2, title: 'گوشواره طلا', subtitle: 'طرح کلاسیک' },
      { id: 5, image: galleryImg4, title: 'گردنبند', subtitle: 'جواهرنشان' },
    ],
  },
  empty: {
    name: 'فروشگاه نمونه',
    category: 'دسته‌بندی',
    isEmpty: true,
    items: [],
  },
}

// Build display groups from flat items array:
// Pattern: items[0]=tall-left, [1]=top-right, [2]=bottom-right → group of 3
//          items[3]=full-width → standalone
// Then repeats: [4]=tall-left, [5]=top-right, [6]=bottom-right → group, [7]=full, etc.
const buildGroups = (items) => {
  const groups = []
  let i = 0
  while (i < items.length) {
    const left  = items[i]
    const topR  = items[i + 1]
    const botR  = items[i + 2]
    const full  = items[i + 3]
    if (left) groups.push({ type: 'row', left, topR, botR })
    if (full)  groups.push({ type: 'full', item: full })
    i += 4
  }
  return groups
}

const GalleryScreen = () => {
  const { storeType = 'restaurant' } = useParams()
  const store = STORE_DATA[storeType] || STORE_DATA.restaurant

  const [isMenuOpen, setIsMenuOpen]   = useState(false)
  const [activeTab, setActiveTab]     = useState('gallery')
  const [lightboxItem, setLightboxItem] = useState(null)

  const groups = buildGroups(store.items)

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      {/* Dark header */}
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

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {store.isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-8 px-4 pt-24">
            <img src={albumIcon} alt="" className="w-[140px] h-[140px] opacity-15" />
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-text-strong text-base font-bold leading-8">کاربر عزیز، گالری های ما خزان است</span>
              <span className="text-text-moderate text-base leading-8">هیچ تصویری در این صفحه تعریف نشده است</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-4 pt-4 pb-6">
            {groups.map((group, idx) => {
              if (group.type === 'full') {
                return (
                  <GalleryCard
                    key={`full-${idx}`}
                    image={group.item.image}
                    title={group.item.title}
                    subtitle={group.item.subtitle}
                    onClick={() => setLightboxItem(group.item)}
                    className="w-full h-[274px]"
                  />
                )
              }
              // type === 'row': tall left + 2 stacked right
              return (
                <div key={`row-${idx}`} className="flex gap-4 items-start">
                  {/* Tall left card */}
                  {group.left && (
                    <GalleryCard
                      image={group.left.image}
                      title={group.left.title}
                      subtitle={group.left.subtitle}
                      onClick={() => setLightboxItem(group.left)}
                      className="flex-1 h-[274px]"
                    />
                  )}
                  {/* Right column: two stacked */}
                  <div className="flex flex-col gap-4 flex-1">
                    {group.topR && (
                      <GalleryCard
                        image={group.topR.image}
                        title={group.topR.title}
                        subtitle={group.topR.subtitle}
                        onClick={() => setLightboxItem(group.topR)}
                        className="w-full h-[173px]"
                      />
                    )}
                    {group.botR && (
                      <GalleryCard
                        image={group.botR.image}
                        title={group.botR.title}
                        subtitle={group.botR.subtitle}
                        onClick={() => setLightboxItem(group.botR)}
                        className="w-full h-[85px]"
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        <div className="h-20" />
      </div>

      {/* Bottom nav */}
      <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
        <FrontBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <GalleryLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  )
}

export default GalleryScreen

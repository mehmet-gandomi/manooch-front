import locationLoveIcon from '../../assets/images/front/pdp/location-love-2.svg'
import linkIcon from '../../assets/images/front/pdp/link.svg'
import albumImageIcon from '../../assets/images/front/pdp/album-image-4.svg'
import messages2Icon from '../../assets/images/front/pdp/messages-2.svg'
import brochureIcon from '../../assets/images/front/pdp/brochure.svg'

const TABS = [
  { id: 'brochure', icon: brochureIcon, alt: 'کاتالوگ' },
  { id: 'messages', icon: messages2Icon, alt: 'پیام‌ها' },
  { id: 'gallery', icon: albumImageIcon, alt: 'گالری' },
  { id: 'link', icon: linkIcon, alt: 'لینک' },
  { id: 'favorites', icon: locationLoveIcon, alt: 'علاقه‌مندی‌ها' },
]

const FrontBottomNav = ({ activeTab = 'brochure', onTabChange }) => {
  return (
    <div className="flex border-t border-border-light">
      {TABS.map(({ id, icon, alt }) => (
        <button
          key={id}
          onClick={() => onTabChange?.(id)}
          className="flex-1 flex flex-col items-center py-4"
        >
          <img
            src={icon}
            alt={alt}
            className={`w-8 h-8 ${activeTab === id ? 'icon-accent' : ''}`}
          />
        </button>
      ))}
    </div>
  )
}

export default FrontBottomNav

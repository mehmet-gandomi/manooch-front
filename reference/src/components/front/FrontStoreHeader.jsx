import { useNavigate } from 'react-router-dom'
import arrowLeftIcon from '../../assets/images/front/pdp/arrow-left-1.svg'
import cartIcon from '../../assets/images/front/pdp/cart-1.svg'
import verifyIcon from '../../assets/images/front/pdp/verify.svg'
import menuIcon from '../../assets/images/front/pdp/menu.svg'
import avatarImg from '../../assets/images/front/pdp/Avatar.png'

/**
 * @param {'dark'|'primary'} gradient
 */
const FrontStoreHeader = ({
  gradient = 'dark',
  storeName = 'رستوران ژیوان',
  storeCategory = 'کافه رستوران',
  onMenuOpen,
  onCartClick,
}) => {
  const navigate = useNavigate()

  const gradientClass =
    gradient === 'dark' ? 'from-header-from to-header-to' : 'from-primary to-primary-deep'

  return (
    <div className={`bg-gradient-to-b ${gradientClass} rounded-b-xl px-4 pb-4 shrink-0`}>
      <div className="flex items-center justify-between pt-4 pb-2">
        <div className="flex items-center gap-2">
          <button onClick={onMenuOpen}>
            <img src={menuIcon} alt="منو" className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img src={avatarImg} alt="آواتار" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-text-white text-sm font-bold leading-6">{storeName}</span>
              <img src={verifyIcon} alt="" className="w-4 h-4" />
            </div>
            <span className="text-text-disable-weak text-sm leading-6">{storeCategory}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={onCartClick}>
            <img src={cartIcon} alt="سبد خرید" className="w-6 h-6" />
          </button>
          <button onClick={() => navigate(-1)}>
            <img src={arrowLeftIcon} alt="بازگشت" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FrontStoreHeader

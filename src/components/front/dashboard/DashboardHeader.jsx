import verifyIcon from '../../../assets/images/front/pdp/verify.svg'
import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import avatarImg from '../../../assets/images/front/pdp/Avatar.png'
import cartIcon from '../../../assets/images/front/pdp/cart-1.svg'
import shareIcon from '../../../assets/images/front/pdp/share-1.svg'
import bannerImg from '../../../assets/images/front/pdp/product-image.png'

const DashboardHeader = ({
  gradientFrom,
  gradientTo,
  storeName,
  storeCategory,
  isFollowing,
  onToggleFollow,
  onMenuOpen,
  onShareClick,
  activeBannerIdx = 0,
  bannerCount = 3,
}) => (
  <div
    className="shrink-0 rounded-b-xl pb-4"
    style={{ background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})` }}
  >
    {/* Store profile row */}
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <button>
        <img src={cartIcon} alt="سبد خرید" className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleFollow}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-text-white text-sm leading-6 ${
            isFollowing ? 'bg-white/10' : 'border border-white'
          }`}
        >
          {isFollowing ? (
            <>
              دنبال شده
              <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.85)">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </>
          ) : (
            'دنبال کردن'
          )}
        </button>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <img src={verifyIcon} alt="" className="w-4 h-4" />
              <span className="text-text-white text-sm font-bold leading-6">{storeName}</span>
            </div>
            <span className="text-text-disable-weak text-sm leading-6">{storeCategory}</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img src={avatarImg} alt="" className="w-full h-full object-cover" />
          </div>
          <button onClick={onMenuOpen}>
            <img src={menuIcon} alt="منو" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    {/* Action bar: share + quick-link chips */}
    <div className="flex items-center justify-between px-4 mb-3">
      <button onClick={onShareClick}>
        <img src={shareIcon} alt="اشتراک‌گذاری" className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
          <span className="text-text-white text-xs leading-5">سوالات پر تکرار</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
          <span className="text-text-white text-xs leading-5">کارت بانکی</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.8">
            <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
          <span className="text-text-white text-xs leading-5">تیم ما</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.8">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        </div>
      </div>
    </div>

    {/* Banner carousel */}
    <div className="mx-4 rounded-lg overflow-hidden relative h-28 mb-3">
      <img src={bannerImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
        {Array.from({ length: bannerCount }).map((_, i) => (
          <div
            key={i}
            className={`h-3 rounded-full transition-all ${
              i === activeBannerIdx ? 'w-12' : 'w-3 bg-white/50'
            }`}
            style={i === activeBannerIdx ? { backgroundColor: gradientFrom } : {}}
          />
        ))}
      </div>
    </div>

    {/* Search bar */}
    <div className="mx-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" />
        <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="flex-1 text-right text-text-placeholder text-sm leading-6">جستجو</span>
    </div>
  </div>
)

export default DashboardHeader

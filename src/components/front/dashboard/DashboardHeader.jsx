import verifyIcon from '../../../assets/images/front/pdp/verify.svg'
import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import avatarImg from '../../../assets/images/front/pdp/Avatar.png'
import cartIcon from '../../../assets/images/front/pdp/cart-1.svg'
import shareIcon from '../../../assets/images/front/dashboard/share-1.svg'
import bannerImg from '../../../assets/images/front/pdp/product-image.png'
import heartIcon from '../../../assets/images/front/dashboard/heart-tick.svg'
import creditCart from '../../../assets/images/front/dashboard/credit-cards.svg'
import chatIcon from '../../../assets/images/front/dashboard/chat-bubble-circle-question.svg'
import teamIcon from '../../../assets/images/front/dashboard/users-2.svg';

// RTL flex rule: first DOM child → visual RIGHT, last DOM child → visual LEFT.
// Figma code is LTR-ordered (first=left). All flex child order must be REVERSED for RTL.

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
    {/* Store profile row
        Visual order (L→R): [cart] [follow] [name+verify] [avatar] [menu]
        DOM order (RTL reversal): menu FIRST(→RIGHT) … cart LAST(→LEFT)       */}
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      {/* FIRST → visual RIGHT: profile group */}
      <div className="flex items-center gap-2">
        <button onClick={onMenuOpen}>
          <img src={menuIcon} alt="منو" className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <img src={avatarImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-text-white text-sm font-bold leading-6">{storeName}</span>
            <img src={verifyIcon} alt="" className="w-4 h-4" />
          </div>
          <span className="text-text-disable-weak text-sm leading-6">{storeCategory}</span>
        </div>
        {/* Follow button — last in group → leftmost of right cluster */}
        <button
          onClick={onToggleFollow}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-text-white text-sm leading-6 ${
            isFollowing ? 'bg-white/10' : 'border border-white'
          }`}
        >
          {isFollowing ? (
            <>
              <img src={heartIcon} alt="" />
              دنبال شده
            </>
          ) : (
            'دنبال کردن'
          )}
        </button>
      </div>

      {/* SECOND → visual LEFT: cart */}
      <button>
        <img src={cartIcon} alt="سبد خرید" className="w-6 h-6" />
      </button>
    </div>

    {/* Action bar
        Visual order (L→R): [share] [سوالات پر تکرار] [کارت بانکی] [تیم ما]
        DOM order: chips FIRST(→RIGHT) … share LAST(→LEFT)                    */}
    <div className="flex items-center justify-between px-4 mb-3">
      {/* FIRST → visual RIGHT: chips (reversed from Figma order) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
          <img src={teamIcon} alt="" />
          <span className="text-text-white text-xs leading-5">تیم ما</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
          <img src={creditCart} alt="" />
          <span className="text-text-white text-xs leading-5">کارت بانکی</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
          <img src={chatIcon} alt="" />
          <span className="text-text-white text-xs leading-5">سوالات پر تکرار</span>
        </div>
      </div>

      {/* SECOND → visual LEFT: share */}
      <button onClick={onShareClick}>
        <img src={shareIcon} alt="اشتراک‌گذاری" className="w-5 h-5" />
      </button>
    </div>

    {/* Banner carousel */}
    <div className="mx-4 rounded-lg overflow-hidden relative h-28 mb-3">
      <img src={bannerImg} alt="" className="w-full h-full object-cover" />
      {/* dir="ltr" so dots always go left→right regardless of RTL context */}
      <div dir="ltr" className="absolute bottom-3 left-3 flex items-center gap-1.5">
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

    {/* Search bar
        Visual order (L→R): [جستجو text fills] [search icon RIGHT]
        DOM: search icon FIRST(→RIGHT), text SECOND(→LEFT)                    */}
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

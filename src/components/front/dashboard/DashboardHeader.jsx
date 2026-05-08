import { useState, useEffect, useRef } from 'react'
import verifyIcon from '../../../assets/images/front/pdp/verify.svg'
import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import avatarImg from '../../../assets/images/front/pdp/Avatar.png'
import cartIcon from '../../../assets/images/front/pdp/cart-1.svg'
import shareIcon from '../../../assets/images/front/dashboard/share-1.svg'
import heartIcon from '../../../assets/images/front/dashboard/heart-tick.svg'
import creditCart from '../../../assets/images/front/dashboard/credit-cards.svg'
import chatIcon from '../../../assets/images/front/dashboard/chat-bubble-circle-question.svg'
import teamIcon from '../../../assets/images/front/dashboard/users-2.svg'
import bannerPlaceholder from '../../../assets/images/front/pdp/product-image.png'

const AUTOPLAY_INTERVAL = 3000

// RTL flex rule: first DOM child → visual RIGHT, last DOM child → visual LEFT.

const DashboardHeader = ({
  gradientFrom,
  gradientTo,
  storeName,
  storeCategory,
  isFollowing,
  onToggleFollow,
  onMenuOpen,
  onShareClick,
  bannerSlides,
}) => {
  const slides = bannerSlides?.length ? bannerSlides : [{ src: bannerPlaceholder, alt: 'banner' }]
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(null)

  const goTo = (index) => setCurrentSlide((index + slides.length) % slides.length)

  const resetTimer = () => {
    clearInterval(timerRef.current)
    if (slides.length > 1) {
      timerRef.current = setInterval(
        () => setCurrentSlide((prev) => (prev + 1) % slides.length),
        AUTOPLAY_INTERVAL
      )
    }
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [slides.length])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { goTo(diff > 0 ? currentSlide + 1 : currentSlide - 1); resetTimer() }
    touchStartX.current = null
  }

  return (
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
        {/* FIRST → visual RIGHT: chips */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
            <img src={teamIcon} alt="" className="w-3.5 h-3.5" />
            <span className="text-text-white text-xs leading-5">تیم ما</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
            <img src={creditCart} alt="" className="w-3.5 h-3.5" />
            <span className="text-text-white text-xs leading-5">کارت بانکی</span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-sm">
            <img src={chatIcon} alt="" className="w-3.5 h-3.5" />
            <span className="text-text-white text-xs leading-5">سوالات پر تکرار</span>
          </div>
        </div>

        {/* SECOND → visual LEFT: share */}
        <button onClick={onShareClick}>
          <img src={shareIcon} alt="اشتراک‌گذاری" className="w-5 h-5" />
        </button>
      </div>

      {/* Banner slider — RTL flex lays slides right-to-left, positive translateX advances slides */}
      <div
        className="mx-4 rounded-lg overflow-hidden relative h-28 mb-3"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${currentSlide * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover shrink-0"
              style={{ minWidth: '100%' }}
            />
          ))}
        </div>

        {/* dir="ltr" keeps dots in natural left→right order regardless of RTL context */}
        <div dir="ltr" className="absolute bottom-3 left-3 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer() }}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-12' : 'w-3 bg-white/50'
              }`}
              style={i === currentSlide ? { backgroundColor: gradientFrom } : {}}
            />
          ))}
        </div>
      </div>

      {/* Search bar — icon FIRST(→RIGHT), input SECOND(→LEFT) */}
      <div className="mx-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" />
          <path d="M21 21L16.65 16.65" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="جستجو"
          dir="rtl"
          className="flex-1 bg-transparent text-right text-white placeholder:text-white/50 text-sm leading-6 outline-none"
        />
      </div>
    </div>
  )
}

export default DashboardHeader

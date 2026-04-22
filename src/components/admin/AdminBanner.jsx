// src/components/admin/AdminBanner.jsx
// Auto-playing banner slider with swipe support and pagination dots

import { useState, useEffect, useRef } from 'react'
import bannerImg from '../../assets/images/admin/Banner.png'

const slides = [
  { id: 0, src: bannerImg, alt: 'banner 1' },
  { id: 1, src: bannerImg, alt: 'banner 2' },
  { id: 2, src: bannerImg, alt: 'banner 3' },
]

const AUTOPLAY_INTERVAL = 3000

const AdminBanner = () => {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(null)
  const timerRef = useRef(null)

  const goTo = (index) => {
    setCurrent((index + slides.length) % slides.length)
  }

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, AUTOPLAY_INTERVAL)
  }

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      // In RTL: swipe left = next, swipe right = prev
      goTo(diff > 0 ? current + 1 : current - 1)
      resetTimer()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="relative w-full h-[108px] rounded-xl overflow-hidden shrink-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <img
            key={slide.id}
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover shrink-0"
            style={{ minWidth: '100%' }}
          />
        ))}
      </div>

      {/* Pagination dots — bottom-left */}
      <div className="absolute bottom-3 left-3 flex gap-1.5 items-center">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => { goTo(slide.id); resetTimer() }}
            className={`rounded-full transition-all duration-300 ${
              current === slide.id
                ? 'w-12 h-3 bg-header-from'
                : 'w-3 h-3 bg-bg-disable'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default AdminBanner

import { useState, useEffect, useRef } from 'react'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

const THUMBS_SHOWN = 2

const ProductGallery = ({ images = [], productName = '' }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const touchStartX = useRef(null)
  const extraCount = images.length - 1 - THUMBS_SHOWN

  useEffect(() => {
    if (lightboxIndex === null) return
    const total = images.length
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i + 1) % total)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, images.length])

  return (
    <>
      {/* Grid: main image right, thumbnail column left */}
      <div dir="rtl" className="flex gap-2 px-4">
        <button
          onClick={() => setLightboxIndex(0)}
          className="flex-1 rounded-xl overflow-hidden"
          style={{ height: `${THUMBS_SHOWN * 80 + (THUMBS_SHOWN - 1) * 8 + 80}px` }}
        >
          <img src={images[0]} alt={productName} className="w-full h-full object-cover" />
        </button>

        <div className="flex flex-col gap-2">
          {images.slice(1, 1 + THUMBS_SHOWN).map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i + 1)}
              className="w-20 h-20 rounded-xl overflow-hidden shrink-0"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}

          {extraCount > 0 ? (
            <button
              onClick={() => setLightboxIndex(1 + THUMBS_SHOWN)}
              className="w-20 h-20 rounded-xl bg-bg-soft flex items-center justify-center shrink-0"
            >
              <span className="text-text-strong text-base font-bold">
                +{formatFarsi(extraCount)}
              </span>
            </button>
          ) : images[1 + THUMBS_SHOWN] ? (
            <button
              onClick={() => setLightboxIndex(1 + THUMBS_SHOWN)}
              className="w-20 h-20 rounded-xl overflow-hidden shrink-0"
            >
              <img src={images[1 + THUMBS_SHOWN]} alt="" className="w-full h-full object-cover" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const delta = touchStartX.current - e.changedTouches[0].clientX
            touchStartX.current = null
            if (Math.abs(delta) < 40) return
            const total = images.length
            setLightboxIndex((i) => delta > 0 ? (i + 1) % total : (i - 1 + total) % total)
          }}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white text-2xl w-8 h-8 flex items-center justify-center z-10"
          >
            ×
          </button>

          <div className="flex-1 flex items-center" onClick={(e) => e.stopPropagation()}>
            <img src={images[lightboxIndex]} alt={productName} className="w-full object-contain" />
          </div>

          <div className="flex justify-center gap-1.5 pb-8 pt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i) }}
                className={`rounded-full transition-all ${
                  i === lightboxIndex ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default ProductGallery

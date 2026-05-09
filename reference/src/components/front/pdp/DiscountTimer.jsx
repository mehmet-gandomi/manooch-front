import { useState, useEffect } from 'react'

const pad2 = (n) => new Intl.NumberFormat('fa-IR', { minimumIntegerDigits: 2 }).format(n)

const DiscountTimer = ({ label, endsAt }) => {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, endsAt - Date.now()))

  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        const next = Math.max(0, t - 1000)
        if (next === 0) clearInterval(id)
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const totalSec = Math.floor(timeLeft / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60

  return (
    <div className="flex items-center justify-between bg-order-new-soft rounded-tl-xl rounded-tr-xl px-3 py-2 mt-2 border-t border-menu-warning">
      <div className="flex items-center gap-1.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <circle cx="12" cy="12" r="9" stroke="#ff7b06" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="#ff7b06" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="text-menu-warning text-sm font-semibold">{label}</span>
      </div>
      <span className="text-menu-warning text-sm font-bold tracking-widest" dir="ltr">
        {pad2(h)} : {pad2(m)} : {pad2(s)}
      </span>
    </div>
  )
}

export default DiscountTimer

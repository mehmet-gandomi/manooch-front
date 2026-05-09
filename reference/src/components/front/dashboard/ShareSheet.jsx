import { useState } from 'react'

import facebookIcon from '../../../assets/images/social-icons/Platform=Facebook, Color=Brand, State=Default.svg'
import instagramIcon from '../../../assets/images/social-icons/Platform=Instagram, Color=Brand, State=Default.svg'
import telegramIcon from '../../../assets/images/social-icons/Platform=Telegram, Color=Brand, State=Default.svg'
import linkedinIcon from '../../../assets/images/social-icons/Platform=LinkedIn, Color=Brand, State=Default.svg'
import googleIcon from '../../../assets/images/social-icons/Platform=Google, Color=Brand, State=Default.svg'
import eitaaIcon from '../../../assets/images/social-icons/Platform=Eitaa, Color=Brand, State=Default.svg'
import rubikaIcon from '../../../assets/images/social-icons/Platform=Rubika, Color=Brand, State=Default.svg'
import whatsappIcon from '../../../assets/images/social-icons/Platform=WhatsApp, Color=Brand, State=Default.svg'

const SOCIAL_ICONS = [
  { icon: facebookIcon, label: 'فیسبوک' },
  { icon: instagramIcon, label: 'اینستاگرام' },
  { icon: telegramIcon, label: 'تلگرام' },
  { icon: linkedinIcon, label: 'لینکدین' },
  { icon: googleIcon, label: 'گوگل' },
  { icon: eitaaIcon, label: 'ایتا' },
  { icon: rubikaIcon, label: 'روبیکا' },
  { icon: whatsappIcon, label: 'واتساپ' },
]

const ShareSheet = ({ isOpen, onClose, storeUrl }) => {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback — select text
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md bg-text-strong/40"
      onClick={onClose}
    >
      {/* White card drops from top — click inside doesn't close */}
      <div
        className="bg-bg-main rounded-b-xl px-4 pb-4 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Close button — justify-end in RTL puts it on visual LEFT */}
        <div className="flex justify-end pt-4">
          <button onClick={onClose} className="p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#16161d" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* URL section */}
        <div className="flex flex-col gap-1">
          <span className="text-text-strong text-sm font-semibold leading-6 text-right">اشتراک گذاری</span>
          <div className="flex items-center justify-between bg-bg-base rounded-xl px-4 py-3">
            {/* FIRST → RIGHT: URL text */}
            <span className="flex-1 text-text-strong text-sm leading-6 text-right truncate" dir="ltr">
              {storeUrl}
            </span>
            {/* SECOND → LEFT: copy button */}
            <button onClick={handleCopy} className="shrink-0 mr-2">
              {copied ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="#737377" strokeWidth="1.5" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#737377" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border-light w-full" />

        {/* Social icons row — dir="ltr" for natural icon ordering */}
        <div dir="ltr" className="flex items-center justify-between px-2">
          {SOCIAL_ICONS.map(({ icon, label }) => (
            <button
              key={label}
              className="flex items-center justify-center p-2 rounded-lg bg-text-strong/10 hover:bg-text-strong/20 transition-colors"
              title={label}
            >
              <img src={icon} alt={label} className="w-7 h-7" />
            </button>
          ))}
        </div>

        {/* Drag handle */}
        <div className="flex justify-center pb-1">
          <div className="w-12 h-1 rounded-full bg-border-light" />
        </div>
      </div>
    </div>
  )
}

export default ShareSheet

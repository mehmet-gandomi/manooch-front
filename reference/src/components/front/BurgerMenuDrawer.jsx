import { useEffect } from 'react'
import profileIcon from '../../assets/images/burger-menu/user.svg'
import warningIcon from '../../assets/images/burger-menu/energy-saving-lightbulb.svg'
import reportsIcon from '../../assets/images/burger-menu/pie-chart.svg'
import referralIcon from '../../assets/images/burger-menu/user-like.svg'
import domainIcon from '../../assets/images/burger-menu/link-diagonal-2.svg'
import paymentIcon from '../../assets/images/burger-menu/paypal.svg'
import baleIcon from '../../assets/images/burger-menu/Social icon.svg'
import mailIcon from '../../assets/images/burger-menu/mail.svg'
import micIcon from '../../assets/images/burger-menu/mic-4.svg'
import telegramIcon from '../../assets/images/burger-menu/telegram-2.svg'
import youtubeIcon from '../../assets/images/burger-menu/youtube.svg'
import closeIcon from '../../assets/images/burger-menu/close.svg'
import instagramIcon from '../../assets/images/burger-menu/instagram.svg'
import coffeeIcon from '../../assets/images/burger-menu/coffee.svg'

const topItems = [
  { key: 'profile', title: 'پروفایل شما', icon: profileIcon },
  { key: 'reports', title: 'گزارشات فروش', icon: reportsIcon },
  { key: 'referral', title: 'معرفی منوچ به دیگران', supportingText: '۱۰/۰', icon: referralIcon },
  { key: 'domain', title: 'تنظیم دامنه اختصاصی', icon: domainIcon },
  { key: 'payment', title: 'تنظیمات اینماد و درگاه پرداخت', icon: paymentIcon },
]

const marketingItems = [
  { key: 'bulk-message', title: 'ارسال پیام انبوه', description: 'به مشتریان خودتان', icon: mailIcon },
  { key: 'platform-ads', title: 'تبلیغ در پلتفرم', description: 'تبلیغات در دسته های متفاوت', icon: micIcon },
]

const socialLinks = [
  { key: 'instagram', label: 'instagram', icon: <img src={instagramIcon} alt="" className="h-6 w-6 icon-moderate" /> },
  { key: 'telegram', label: 'telegram', icon: <img src={telegramIcon} alt="" className="h-6 w-6" /> },
  { key: 'youtube', label: 'youtube', icon: <img src={youtubeIcon} alt="" className="h-6 w-6" /> },
]

const ActionLink = ({ icon, children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-full items-center gap-3 rounded-2xl px-4 py-2 text-sm font-normal leading-6 text-menu-accent transition-colors hover:bg-menu-accent/5"
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}

const Divider = () => {
  return <div className="h-px w-full bg-border-light" />
}

const MenuItem = ({ title, description, supportingText, icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-12 w-full flex-row items-center gap-4 rounded-xl px-3 py-1.5 text-right transition-colors hover:bg-bg-base"
    >
      <img src={icon} alt="" className="h-6 w-6 shrink-0" />

      <div className="flex min-w-0 flex-row-reverse items-center gap-4">
        {supportingText ? (
          <span className="shrink-0 text-sm font-normal leading-6 text-text-placeholder">
            {supportingText}
          </span>
        ) : null}

        <div className="min-w-0 flex-1 text-right flex items-center">
          <div className="text-base font-normal leading-8 text-text-moderate">
            {title}
          </div>
          {description ? (
            <div className="text-sm font-normal leading-6 text-text-placeholder mr-3">
              {description}
            </div>
          ) : null}
        </div>
      </div>
    </button>
  )
}

const BurgerMenuDrawer = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/10"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-sm">
        <aside
          dir="rtl"
          role="dialog"
          aria-modal="true"
          aria-label="منوی کاربری"
          onClick={(event) => event.stopPropagation()}
          className="flex h-screen w-full flex-col overflow-y-auto overscroll-contain bg-bg-main px-4 py-3"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="flex h-8 w-8 items-center justify-center text-text-strong mr-auto"
          >
            <img src={closeIcon} alt="" className="h-8 w-8" />
          </button>

          <div className="mt-4 rounded-[20px] bg-menu-warning/10 px-4 py-4 backdrop-blur-[40px]">
            <div className="flex flex-row items-center gap-3">
              <img src={warningIcon} alt="" className="h-6 w-6 shrink-0" />
              <p className="whitespace-pre-line text-right text-sm font-normal leading-6 text-menu-warning">
                دنبال یک موبایل فروشی معتبری که قسطی خرید کنی؟
                {'\n'}
                <span className='font-semibold'>موبایل کاج</span> اینجاست.
              </p>
            </div>
          </div>

          <div className="mt-3">
            <Divider />
          </div>

          <div className="mt-4 space-y-1">
            {topItems.map((item) => (
              <MenuItem
                key={item.key}
                title={item.title}
                supportingText={item.supportingText}
                icon={item.icon}
              />
            ))}

            <MenuItem
              title={
                <span>
                  همگام سازی کالا با کانال{' '}
                  <span className="font-bold text-menu-accent">بله</span>
                </span>
              }
              icon={baleIcon}
            />
          </div>

          <div className="mt-3">
            <Divider />
          </div>

          <section className="mt-5">
            <h2 className="text-right text-sm font-semibold leading-6 text-text-heading">
              تبلیغات در منوچ
            </h2>

            <div className="mt-1 space-y-1">
              {marketingItems.map((item) => (
                <MenuItem
                  key={item.key}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>
          </section>

          <div className="mt-3">
            <Divider />
          </div>

          <section className="mt-3">
            <h2 className="text-right text-sm font-semibold leading-6 text-text-heading">
              اینجا مال منوچ
            </h2>

            <div className="mt-2 space-y-1">
              <ActionLink icon={<img src={coffeeIcon} alt="" className="h-6 w-6" />}>
                تو هم به منوچ نیاز داری؟
              </ActionLink>

              <ActionLink icon={<img src={instagramIcon} alt="" className="h-6 w-6" />}>
                اینستاگرام منوچ
              </ActionLink>
            </div>
          </section>

          <div className="mt-auto pt-6">
            <Divider />

            <div className="flex flex-col items-center gap-4 py-4">
              <div className="text-center text-base font-normal leading-8 text-menu-accent flex gap-1">
                <p>قدرت گرفته از</p>
                <a href="#" className='font-semibold underline'>استودیو دیجیتال اثر</a>
              </div>

              <div dir="ltr" className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <button
                    key={link.key}
                    type="button"
                    aria-label={link.label}
                    className="flex h-6 w-6 items-center justify-center"
                  >
                    {link.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default BurgerMenuDrawer

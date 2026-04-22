// src/screens/ShopReadyScreen.jsx
// Final onboarding screen — shop is ready to use

import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import shopImage from '../assets/images/shop-image.svg'

const ShopReadyScreen = () => {
  const navigate = useNavigate()

  const handleEnterPanel = () => {
    navigate('/admin')
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg-main flex flex-col px-4 py-10 max-w-sm mx-auto"
    >
      {/* Content — centered vertically */}
      <div className="flex-1 flex flex-col justify-center items-center gap-8">
        <img src={shopImage} alt="Shop" className="w-48 h-48" />

        <div className="flex flex-col gap-3 items-center text-center">
          <h1 className="text-xl font-bold text-text-strong leading-[48px]">
            هوشنگ آماده کار شده💙
          </h1>
          <p className="text-base font-normal text-text-moderate leading-8">
            حالا میتونی خیلی ساده از هوشنگ کار بکشی و با مشتریات آشناش کنی
          </p>
        </div>
      </div>

      {/* CTA pinned to bottom */}
      <Button onClick={handleEnterPanel} variant="primary">
        ورود به صفحه پنل کاربری
      </Button>
    </div>
  )
}

export default ShopReadyScreen

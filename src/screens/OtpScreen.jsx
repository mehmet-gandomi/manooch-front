// src/screens/OtpScreen.jsx
// OTP verification screen

import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import OtpInput from '../components/OtpInput'
import Button from '../components/Button'

const OtpScreen = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const phoneNumber = location.state?.phoneNumber || '09150299105'

  const handleVerify = () => {
    console.log('Verifying OTP:', otp)
    // Add verification logic here
  }

  const handleEditPhone = () => {
    console.log('Edit phone number')
    navigate('/register')
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg-main flex flex-col px-4 py-10 max-w-sm mx-auto"
    >
      {/* Middle section — content fills remaining space and centers vertically */}
      <div className="flex-1 flex flex-col justify-center gap-8">
        {/* Title and subtitle */}
        <div className="flex flex-col gap-2">
          <h1 className="text-base font-semibold text-text-strong">
            کد احراز شماره همراه
          </h1>
          <p className="text-sm font-bold text-text-moderate">
            کد 5 رقمی ارسال شده به <span className='text-primary'> {phoneNumber} </span> را وارد کنید.
          </p>
        </div>

        {/* OTP Input */}
        <OtpInput length={5} value={otp} onChange={setOtp} />

        {/* Edit phone link */}
        <button onClick={handleEditPhone} className="text-sm font-normal text-primary hover:underline text-left">
          ویرایش شماره همراه
        </button>
      </div>

      {/* Bottom section — CTA pinned to bottom */}
      <Button onClick={handleVerify} variant="primary" disabled={otp.length < 5}>
        تایید کد
      </Button>
    </div>
  )
}

export default OtpScreen

// src/screens/RegisterScreen.jsx
// Phone number registration screen — assembled from components

import { useState } from 'react'
import PhoneInput from '../components/PhoneInput'
import Button from '../components/Button'

const RegisterScreen = () => {
  const [phone, setPhone] = useState('')

  const handleSubmit = () => {
    console.log('Submitting phone:', phone)
    // Add OTP / navigation logic here
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg-main flex flex-col px-4 py-10 max-w-sm mx-auto"
    >
      {/* Middle section — form fills remaining space and centers vertically */}
      <div className="flex-1 flex flex-col justify-center">
        <PhoneInput
          label="شماره همراه"
          placeholder="۰۹۱۵"
          helperText="این یک متن راهنمایی برای کمک به کاربر است."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Bottom section — CTA pinned to bottom */}
      <Button onClick={handleSubmit} variant="primary">
        ثبت نام
      </Button>
    </div>
  )
}

export default RegisterScreen

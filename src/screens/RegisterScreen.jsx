import { useState } from 'react'
import PhoneInput from '../components/PhoneInput'
import Button from '../components/Button'

const RegisterScreen = () => {
  const [phone, setPhone] = useState('')

  const handleSubmit = () => {
    console.log('Submitting phone:', phone)
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#fefefe] flex flex-col justify-between px-4 py-10 max-w-sm mx-auto"
    >
      <div className="flex flex-col gap-4">
        <PhoneInput
          label="شماره همراه"
          placeholder="۰۹۱۵"
          helperText="این یک متن راهنمایی برای کمک به کاربر است."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} variant="primary">
        ثبت نام
      </Button>
    </div>
  )
}

export default RegisterScreen

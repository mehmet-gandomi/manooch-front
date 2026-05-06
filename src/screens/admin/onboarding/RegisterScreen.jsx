import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PhoneInput from '../../../components/ui/PhoneInput'
import Button from '../../../components/ui/Button'

const RegisterScreen = () => {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/otp', { state: { phoneNumber: phone } })
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg-main flex flex-col px-4 py-10 max-w-sm mx-auto"
    >
      <div className="flex-1 flex flex-col justify-center">
        <PhoneInput
          label="شماره همراه"
          placeholder="۰۹۱۵"
          helperText="این یک متن راهنمایی برای کمک به کاربر است."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <Button onClick={handleSubmit} variant="primary">
        ثبت نام
      </Button>
    </div>
  )
}

export default RegisterScreen

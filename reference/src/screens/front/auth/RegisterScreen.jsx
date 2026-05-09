import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Dropdown from '../../../components/ui/Dropdown'
import PhoneInput from '../../../components/ui/PhoneInput'
import logo from '../../../assets/images/Logo.svg'
import userIcon from '../../../assets/images/user.svg'

const RegisterScreen = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')

  const genderOptions = [
    { value: 'male', label: 'مرد' },
    { value: 'female', label: 'زن' },
  ]

  const handleSubmit = () => {
    navigate('/user/otp', { state: { phoneNumber: phone || '09150299105' } })
  }

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main px-4 pb-24"
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex flex-col items-center gap-20">
          <img src={logo} alt="هوشنگ" className="h-[68px] w-[167px]" />

          <div className="flex w-full flex-col gap-4">
            <PhoneInput
              label="شماره همراه"
              placeholder="۰۹۱۵"
              helperText="این یک متن راهنمایی برای کمک به کاربر است."
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              size="compact"
            />

            <Dropdown
              label="جنسیت"
              placeholder="مرد"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              options={genderOptions}
              required
              icon={userIcon}
              size="compact"
            />
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit} variant="admin" size="front">
        ثبت نام
      </Button>
    </div>
  )
}

export default RegisterScreen

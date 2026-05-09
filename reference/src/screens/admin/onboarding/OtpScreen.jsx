import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import OtpInput from '../../../components/ui/OtpInput'
import Button from '../../../components/ui/Button'

const OtpScreen = () => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const phoneNumber = location.state?.phoneNumber || '09150299105'

  const handleVerify = () => {
    navigate('/success')
  }

  const handleEditPhone = () => {
    navigate('/register')
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-bg-main flex flex-col px-4 py-10 max-w-sm mx-auto"
    >
      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-base font-semibold text-text-strong">
            کد احراز شماره همراه
          </h1>
          <p className="text-sm font-bold text-text-moderate">
            کد 5 رقمی ارسال شده به <span className='text-primary'> {phoneNumber} </span> را وارد کنید.
          </p>
        </div>

        <OtpInput length={5} value={otp} onChange={setOtp} />

        <button onClick={handleEditPhone} className="text-sm font-normal text-primary hover:underline text-left">
          ویرایش شماره همراه
        </button>
      </div>

      <Button onClick={handleVerify} variant="primary" disabled={otp.length < 5}>
        تایید کد
      </Button>
    </div>
  )
}

export default OtpScreen

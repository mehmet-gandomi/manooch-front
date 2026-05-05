import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../../components/Button'
import OtpInput from '../../components/OtpInput'

const OtpScreen = ({ defaultError = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const phoneNumber = location.state?.phoneNumber || '09150299105'
  const [otp, setOtp] = useState(defaultError ? '66666' : '')
  const [hasError, setHasError] = useState(defaultError)

  const handleChange = (nextOtp) => {
    setOtp(nextOtp)
    if (hasError) {
      setHasError(false)
    }
  }

  const handleVerify = () => {
    if (otp === '66666') {
      setHasError(true)
      return
    }

    navigate('/user/success')
  }

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main px-4 pb-24"
    >
      <div className="flex flex-1 flex-col justify-center gap-4 translate-y-4">
        <div className="flex flex-col gap-1 text-right">
          <h1 className="text-base font-semibold leading-8 text-text-strong">
            کد احراز شماره همراه
          </h1>
          <p className="text-sm font-bold leading-6 text-text-moderate">
            کد 5 رقمی ارسال شده به <span className="text-text-strong">{phoneNumber}</span> را وارد کنید.
          </p>
        </div>

        <OtpInput length={5} value={otp} onChange={handleChange} hasError={hasError} />

        <div className="min-h-6">
          {hasError ? (
            <p className="text-sm font-bold leading-6 text-danger">
              کد وارد شده اشتباه است.
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => navigate('/user/register')}
          className="w-fit text-sm font-normal leading-6 text-text-heading"
        >
          ویرایش شماره همراه
        </button>
      </div>

      <Button onClick={handleVerify} variant="admin" size="front">
        تایید کد
      </Button>
    </div>
  )
}

export default OtpScreen

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { requestOtp } from '../../../api/auth.js'

export default function RegisterScreen() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await requestOtp(phone)
      navigate('/otp', { state: { phone } })
    } catch (err) {
      setError(err.response?.data?.message || 'خطایی رخ داد')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center font-ravi" dir="rtl">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-xl font-bold text-text-strong mb-2">خوش آمدید</h1>
        <p className="text-sm text-text-moderate mb-8">شماره موبایل خود را وارد کنید</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            className="w-full border border-border-light rounded-xl px-4 py-3 text-base text-text-strong placeholder:text-text-placeholder focus:outline-none focus:border-primary"
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <button
            type="submit"
            disabled={!phone || loading}
            className="w-full bg-primary text-white rounded-xl py-3 text-base font-bold disabled:opacity-50"
          >
            {loading ? 'در حال ارسال...' : 'دریافت کد'}
          </button>
        </form>
      </div>
    </div>
  )
}

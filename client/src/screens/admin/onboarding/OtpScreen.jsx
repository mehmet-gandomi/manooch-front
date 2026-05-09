import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { verifyOtp } from '../../../api/auth.js'
import { useAuth } from '../../../context/AuthContext.jsx'

export default function OtpScreen() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const phone = location.state?.phone ?? ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await verifyOtp(phone, code)
      login(data)
      if (data.user?.shopName) {
        navigate('/admin')
      } else {
        navigate('/profile')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'کد وارد شده صحیح نیست')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center font-ravi" dir="rtl">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-xl font-bold text-text-strong mb-2">کد تأیید</h1>
        <p className="text-sm text-text-moderate mb-8">
          کد ارسال شده به {phone} را وارد کنید
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="12345"
            maxLength={5}
            className="w-full border border-border-light rounded-xl px-4 py-3 text-lg text-center text-text-strong placeholder:text-text-placeholder focus:outline-none focus:border-primary tracking-widest"
          />
          {error && <p className="text-sm text-danger">{error}</p>}
          <button
            type="submit"
            disabled={code.length < 5 || loading}
            className="w-full bg-primary text-white rounded-xl py-3 text-base font-bold disabled:opacity-50"
          >
            {loading ? 'در حال تأیید...' : 'تأیید'}
          </button>
        </form>
      </div>
    </div>
  )
}

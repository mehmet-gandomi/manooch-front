import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../../../api/client.js'

export default function ProfileFormScreen() {
  const [form, setForm] = useState({ name: '', shopName: '', shopSlug: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await apiClient.patch('/shop', form)
      navigate('/ready')
    } catch (err) {
      setError(err.response?.data?.message || 'خطایی رخ داد')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center font-ravi" dir="rtl">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-xl font-bold text-text-strong mb-2">تکمیل پروفایل</h1>
        <p className="text-sm text-text-moderate mb-8">اطلاعات فروشگاه خود را وارد کنید</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-moderate mb-1">نام شما</label>
            <input
              value={form.name}
              onChange={handleChange('name')}
              placeholder="نام و نام خانوادگی"
              className="w-full border border-border-light rounded-xl px-4 py-3 text-base text-text-strong focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-text-moderate mb-1">نام فروشگاه</label>
            <input
              value={form.shopName}
              onChange={handleChange('shopName')}
              placeholder="مثلاً: پیتزا ژیوان"
              className="w-full border border-border-light rounded-xl px-4 py-3 text-base text-text-strong focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-text-moderate mb-1">آدرس فروشگاه (انگلیسی)</label>
            <input
              value={form.shopSlug}
              onChange={handleChange('shopSlug')}
              placeholder="pizza-jivan"
              dir="ltr"
              className="w-full border border-border-light rounded-xl px-4 py-3 text-base text-text-strong focus:outline-none focus:border-primary"
            />
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <button
            type="submit"
            disabled={!form.shopName || !form.shopSlug || loading}
            className="w-full bg-primary text-white rounded-xl py-3 text-base font-bold disabled:opacity-50"
          >
            {loading ? 'در حال ذخیره...' : 'ادامه'}
          </button>
        </form>
      </div>
    </div>
  )
}

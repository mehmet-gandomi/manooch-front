import { useNavigate } from 'react-router-dom'

export default function ShopReadyScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center font-ravi" dir="rtl">
      <div className="w-full max-w-sm p-6 text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-xl font-bold text-text-strong mb-2">فروشگاه شما آماده است!</h1>
        <p className="text-sm text-text-moderate mb-8">
          می‌توانید محصولات و دسته‌بندی‌های خود را اضافه کنید.
        </p>
        <button
          onClick={() => navigate('/admin')}
          className="w-full bg-primary text-white rounded-xl py-3 text-base font-bold"
        >
          رفتن به داشبورد
        </button>
      </div>
    </div>
  )
}

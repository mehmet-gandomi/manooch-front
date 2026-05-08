import { useState } from 'react'

import FrontBottomNav from '../../../components/front/FrontBottomNav'
import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import BillingOrderCard from '../../../components/front/billing/BillingOrderCard'
import BillingOrderDetail from '../../../components/front/billing/BillingOrderDetail'

import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import arrowLeftIcon from '../../../assets/images/front/pdp/arrow-left-1.svg'

const MOCK_ORDERS = [
  {
    id: 1,
    orderNumber: 'سفارش #۱۰۴۵',
    status: 'new',
    customerName: 'علی محمدی',
    itemCount: 3,
    date: '۱۴۰۳/۰۲/۱۵ · ۱۴:۳۲',
    totalPrice: 1250000,
    province: 'تهران',
    city: 'تهران',
    phone: '09121234567',
    address: 'خیابان ولیعصر، کوچه گلستان، پلاک ۱۲، واحد ۳',
    items: [
      { name: 'بلینگ کلاسیک طلایی', orderId: '#SKU-1045-A', qty: 1, price: 650000, originalPrice: 820000 },
      { name: 'بلینگ نقره‌ای', orderId: '#SKU-1045-B', qty: 2, price: 300000, originalPrice: null },
    ],
  },
  {
    id: 2,
    orderNumber: 'سفارش #۱۰۴۴',
    status: 'paid',
    customerName: 'فاطمه رضایی',
    itemCount: 1,
    date: '۱۴۰۳/۰۲/۱۴ · ۱۱:۱۵',
    totalPrice: 480000,
    province: 'اصفهان',
    city: 'اصفهان',
    phone: '09139876543',
    address: 'بلوار آمادگاه، خیابان شیخ بهایی، پلاک ۷',
    items: [
      { name: 'بلینگ ویژه عروس', orderId: '#SKU-1044-A', qty: 1, price: 480000, originalPrice: null },
    ],
  },
  {
    id: 3,
    orderNumber: 'سفارش #۱۰۴۳',
    status: 'shipping',
    customerName: 'محمد کریمی',
    itemCount: 5,
    date: '۱۴۰۳/۰۲/۱۳ · ۰۹:۴۵',
    totalPrice: 2100000,
    province: 'مشهد',
    city: 'مشهد',
    phone: '09153334455',
    address: 'خیابان احمدآباد، نبش کوچه ۱۲، پلاک ۳۴',
    items: [
      { name: 'بلینگ دستبند نقره', orderId: '#SKU-1043-A', qty: 2, price: 420000, originalPrice: 500000 },
      { name: 'بلینگ گوشواره طلا', orderId: '#SKU-1043-B', qty: 1, price: 780000, originalPrice: null },
      { name: 'بلینگ انگشتر کلاسیک', orderId: '#SKU-1043-C', qty: 2, price: 480000, originalPrice: 600000 },
    ],
  },
  {
    id: 4,
    orderNumber: 'سفارش #۱۰۴۲',
    status: 'pending',
    customerName: 'زهرا حسینی',
    itemCount: 2,
    date: '۱۴۰۳/۰۲/۱۲ · ۱۶:۵۸',
    totalPrice: 870000,
    province: 'شیراز',
    city: 'شیراز',
    phone: '09170001122',
    address: 'خیابان قصرالدشت، کوچه سوم، پلاک ۸، واحد ۲',
    items: [
      { name: 'بلینگ گردنبند جواهر', orderId: '#SKU-1042-A', qty: 1, price: 590000, originalPrice: 700000 },
      { name: 'بلینگ النگو مدل باروک', orderId: '#SKU-1042-B', qty: 1, price: 280000, originalPrice: null },
    ],
  },
  {
    id: 5,
    orderNumber: 'سفارش #۱۰۴۱',
    status: 'paid',
    customerName: 'امیر تهرانی',
    itemCount: 4,
    date: '۱۴۰۳/۰۲/۱۱ · ۱۳:۲۰',
    totalPrice: 1680000,
    province: 'کرج',
    city: 'کرج',
    phone: '09126667788',
    address: 'میدان توحید، خیابان بهشتی، پلاک ۵۵',
    items: [
      { name: 'بلینگ ست عروسی', orderId: '#SKU-1041-A', qty: 1, price: 1200000, originalPrice: 1500000 },
      { name: 'بلینگ آویز کریستال', orderId: '#SKU-1041-B', qty: 3, price: 160000, originalPrice: null },
    ],
  },
]

const TABS = [
  { id: 'orders', label: 'سفارشات' },
  { id: 'appointments', label: 'نوبت دهی' },
  { id: 'files', label: 'خرید فایل' },
]

const CheckbookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="#fafafa" strokeWidth="1.5"/>
    <path d="M7 9h10M7 13h6" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M15 13l1.5 1.5L19 11" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#a2a2a5" strokeWidth="1.5"/>
    <path d="M16.5 16.5l3.5 3.5" stroke="#a2a2a5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M7 12h10M11 18h2" stroke="#202a37" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const BillingScreen = () => {
  const [activeTab, setActiveTab] = useState('orders')
  const [bottomTab, setBottomTab] = useState('brochure')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filtered = MOCK_ORDERS.filter(o =>
    o.customerName.includes(searchQuery) || o.orderNumber.includes(searchQuery)
  )

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      {/* Header */}
      <div className="bg-gradient-to-b from-header-from to-header-to rounded-b-xl px-4 pt-4 pb-4 shrink-0">
        <div className="flex items-center justify-between">
          {/* RIGHT: menu + title + icon */}
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMenuOpen(true)}>
              <img src={menuIcon} alt="منو" className="w-6 h-6" />
            </button>
            <CheckbookIcon />
            <span className="text-text-white text-base font-semibold leading-6">سفارشات</span>
          </div>
          {/* LEFT: back arrow */}
          <button>
            <img src={arrowLeftIcon} alt="بازگشت" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-light shrink-0 px-4">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSelectedOrder(null) }}
            className={`flex-1 py-3 text-sm font-medium leading-6 transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-moderate'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'orders' ? (
          selectedOrder ? (
            /* Detail view */
            <div className="flex flex-col gap-4 py-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex items-center gap-1 px-4 text-primary text-sm leading-6"
              >
                <img src={arrowLeftIcon} alt="" className="w-4 h-4" style={{ filter: 'invert(27%) sepia(100%) saturate(3000%) hue-rotate(200deg)' }} />
                بازگشت به لیست
              </button>
              <BillingOrderDetail order={selectedOrder} />
            </div>
          ) : (
            /* List view */
            <div className="flex flex-col gap-3 px-4 pt-4 pb-6">
              {/* Search */}
              <div className="flex items-center gap-2 bg-bg-base border border-border-light rounded-xl px-3 py-2">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="جستجوی سفارش..."
                  dir="rtl"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-strong placeholder:text-text-placeholder outline-none"
                />
              </div>

              {/* Filter bar */}
              <div className="flex items-center justify-between">
                <span className="text-text-weak text-xs leading-6">۳۲۰ سفارش</span>
                <button className="flex items-center gap-1.5 bg-bg-soft rounded-lg px-3 py-1.5">
                  <FilterIcon />
                  <span className="text-text-strong text-xs leading-6">فیلتر</span>
                </button>
              </div>

              {/* Order cards */}
              {filtered.map(order => (
                <BillingOrderCard
                  key={order.id}
                  orderNumber={order.orderNumber}
                  status={order.status}
                  customerName={order.customerName}
                  itemCount={order.itemCount}
                  date={order.date}
                  totalPrice={order.totalPrice}
                  onClick={() => setSelectedOrder(order)}
                />
              ))}
            </div>
          )
        ) : (
          /* Empty state for other tabs */
          <div className="flex flex-col items-center justify-center gap-4 px-4 pt-24 text-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" opacity="0.15">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="#202a37" strokeWidth="1.5"/>
              <path d="M7 9h10M7 13h6" stroke="#202a37" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-text-moderate text-sm leading-8">موردی برای نمایش وجود ندارد</span>
          </div>
        )}
        <div className="h-20" />
      </div>

      {/* Bottom nav */}
      <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
        <FrontBottomNav activeTab={bottomTab} onTabChange={setBottomTab} />
      </div>

      <BurgerMenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default BillingScreen

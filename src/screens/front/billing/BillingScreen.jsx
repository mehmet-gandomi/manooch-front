import { useMemo, useState } from 'react'

import FrontBottomNav from '../../../components/front/FrontBottomNav'
import BurgerMenuDrawer from '../../../components/front/BurgerMenuDrawer'
import BillingOrderCard from '../../../components/front/billing/BillingOrderCard'
import BillingOrderDetail from '../../../components/front/billing/BillingOrderDetail'

import menuIcon from '../../../assets/images/front/pdp/menu.svg'
import checkbookIcon from '../../../assets/images/admin/checkbook.svg'
import arrowLeftIcon from '../../../assets/images/admin/arrow-left-1.svg'
import searchIcon from '../../../assets/images/admin/search-normal.svg'
import settingIcon from '../../../assets/images/admin/product/setting-5.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const TABS = [
  { key: 'orders',       label: 'سفارشات' },
  { key: 'appointments', label: 'نوبت دهی' },
  { key: 'files',        label: 'خرید فایل' },
]

const MOCK_ORDERS = [
  {
    id: 1, orderNumber: 1045, status: 'new',
    customerName: 'علی محمدی', itemCount: 3,
    date: '۱۴۰۳/۰۲/۱۵', time: '۱۴:۳۲', totalPrice: 1250000,
    province: 'تهران', city: 'تهران', phone: '09121234567',
    address: 'خیابان ولیعصر، کوچه گلستان، پلاک ۱۲، واحد ۳',
    items: [
      { name: 'بلینگ کلاسیک طلایی', orderId: 'SKU-1045-A', qty: 1, price: 650000, originalPrice: 820000 },
      { name: 'بلینگ نقره‌ای', orderId: 'SKU-1045-B', qty: 2, price: 300000, originalPrice: null },
    ],
  },
  {
    id: 2, orderNumber: 1044, status: 'paid',
    customerName: 'فاطمه رضایی', itemCount: 1,
    date: '۱۴۰۳/۰۲/۱۴', time: '۱۱:۱۵', totalPrice: 480000,
    province: 'اصفهان', city: 'اصفهان', phone: '09139876543',
    address: 'بلوار آمادگاه، خیابان شیخ بهایی، پلاک ۷',
    items: [
      { name: 'بلینگ ویژه عروس', orderId: 'SKU-1044-A', qty: 1, price: 480000, originalPrice: null },
    ],
  },
  {
    id: 3, orderNumber: 1043, status: 'shipping',
    customerName: 'محمد کریمی', itemCount: 5,
    date: '۱۴۰۳/۰۲/۱۳', time: '۰۹:۴۵', totalPrice: 2100000,
    province: 'مشهد', city: 'مشهد', phone: '09153334455',
    address: 'خیابان احمدآباد، نبش کوچه ۱۲، پلاک ۳۴',
    items: [
      { name: 'بلینگ دستبند نقره', orderId: 'SKU-1043-A', qty: 2, price: 420000, originalPrice: 500000 },
      { name: 'بلینگ گوشواره طلا', orderId: 'SKU-1043-B', qty: 1, price: 780000, originalPrice: null },
      { name: 'بلینگ انگشتر کلاسیک', orderId: 'SKU-1043-C', qty: 2, price: 480000, originalPrice: 600000 },
    ],
  },
  {
    id: 4, orderNumber: 1042, status: 'pending',
    customerName: 'زهرا حسینی', itemCount: 2,
    date: '۱۴۰۳/۰۲/۱۲', time: '۱۶:۵۸', totalPrice: 870000,
    province: 'شیراز', city: 'شیراز', phone: '09170001122',
    address: 'خیابان قصرالدشت، کوچه سوم، پلاک ۸، واحد ۲',
    items: [
      { name: 'بلینگ گردنبند جواهر', orderId: 'SKU-1042-A', qty: 1, price: 590000, originalPrice: 700000 },
      { name: 'بلینگ النگو باروک', orderId: 'SKU-1042-B', qty: 1, price: 280000, originalPrice: null },
    ],
  },
  {
    id: 5, orderNumber: 1041, status: 'paid',
    customerName: 'امیر تهرانی', itemCount: 4,
    date: '۱۴۰۳/۰۲/۱۱', time: '۱۳:۲۰', totalPrice: 1680000,
    province: 'کرج', city: 'کرج', phone: '09126667788',
    address: 'میدان توحید، خیابان بهشتی، پلاک ۵۵',
    items: [
      { name: 'بلینگ ست عروسی', orderId: 'SKU-1041-A', qty: 1, price: 1200000, originalPrice: 1500000 },
      { name: 'بلینگ آویز کریستال', orderId: 'SKU-1041-B', qty: 3, price: 160000, originalPrice: null },
    ],
  },
]

const BillingScreen = () => {
  const [activeTab, setActiveTab]       = useState('orders')
  const [bottomTab, setBottomTab]       = useState('brochure')
  const [searchTerm, setSearchTerm]     = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isMenuOpen, setIsMenuOpen]     = useState(false)

  const filteredOrders = useMemo(() => {
    const term = searchTerm.trim()
    if (!term) return MOCK_ORDERS
    return MOCK_ORDERS.filter(o =>
      [String(o.orderNumber), o.customerName].some(v => v.includes(term))
    )
  }, [searchTerm])

  return (
    <div dir="rtl" className="mx-auto max-w-sm min-h-screen flex flex-col bg-bg-main">
      {/* Dark gradient header */}
      <div className="bg-gradient-to-b from-header-from to-header-to rounded-b-xl px-4 pt-4 pb-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMenuOpen(true)}>
              <img src={menuIcon} alt="منو" className="w-6 h-6" />
            </button>
            <img src={checkbookIcon} alt="" className="w-6 h-6 brightness-0 invert" />
            <span className="text-text-white text-base font-semibold leading-6">سفارشات</span>
          </div>
          <button onClick={() => selectedOrder ? setSelectedOrder(null) : null} aria-label="بازگشت">
            <img src={arrowLeftIcon} alt="" className="w-6 h-6 brightness-0 invert" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {/* Tabs — pill style matching admin */}
        <div className="rounded-2xl bg-bg-base p-1">
          <div className="grid grid-cols-3 gap-1">
            {TABS.map(tab => {
              const isActive = tab.key === activeTab
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => { setActiveTab(tab.key); setSelectedOrder(null) }}
                  className={`rounded-xl px-3 py-3 text-sm leading-6 transition-colors ${
                    isActive
                      ? 'bg-bg-main font-normal text-text-strong shadow-sm'
                      : 'font-normal text-text-placeholder'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {activeTab === 'orders' ? (
          selectedOrder ? (
            /* Detail view */
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="mb-3 flex items-center gap-1 text-primary text-sm leading-6"
              >
                <img src={arrowLeftIcon} alt="" className="w-4 h-4 icon-accent" />
                بازگشت به لیست
              </button>
              <BillingOrderDetail order={selectedOrder} />
            </div>
          ) : (
            /* List view */
            <>
              {/* Search — same style as admin */}
              <div className="relative mt-4">
                <img
                  src={searchIcon}
                  alt=""
                  className="pointer-events-none absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2"
                />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="جستجو"
                  dir="rtl"
                  className="w-full rounded-2xl bg-bg-base py-4 pl-4 pr-14 text-right text-base font-normal text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Filter bar — same style as admin */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs font-normal leading-5 text-text-moderate">
                  {numberFormatter.format(MOCK_ORDERS.length)} سفارش
                </span>
                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-1 rounded-xl border border-border-light bg-bg-main px-3 text-sm font-normal leading-6 text-text-moderate"
                >
                  <span>فیلتر</span>
                  <img src={settingIcon} alt="" className="h-4 w-4" />
                </button>
              </div>

              {/* Order rows */}
              <div className="mt-3 pb-6">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <BillingOrderCard
                      key={order.id}
                      orderNumber={order.orderNumber}
                      status={order.status}
                      customerName={order.customerName}
                      itemCount={order.itemCount}
                      date={order.date}
                      time={order.time}
                      totalPrice={order.totalPrice}
                      onClick={() => setSelectedOrder(order)}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border-light px-4 py-8 text-center text-sm leading-6 text-text-moderate">
                    نتیجه‌ای برای این جستجو پیدا نشد.
                  </div>
                )}
              </div>
            </>
          )
        ) : (
          /* Empty state for other tabs */
          <div className="mt-16 rounded-2xl border border-dashed border-border-light px-4 py-8 text-center text-sm leading-6 text-text-moderate">
            موردی برای نمایش وجود ندارد.
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

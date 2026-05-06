import { useEffect, useMemo, useState } from 'react'
import AdminMenuBar from '../../../components/admin/shared/AdminMenuBar'
import AdminOrderRow from '../../../components/admin/orders/AdminOrderRow'
import AdminScreenHeader from '../../../components/admin/shared/AdminScreenHeader'
import AdminOrderStatusSheet from '../../../components/admin/orders/AdminOrderStatusSheet'
import checkbookIcon from '../../../assets/images/admin/checkbook.svg'
import searchIcon from '../../../assets/images/admin/search-normal.svg'
import settingIcon from '../../../assets/images/admin/product/setting-5.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const tabs = [
  { key: 'orders', label: 'سفارشات' },
  { key: 'appointments', label: 'نوبت دهی' },
  { key: 'files', label: 'خرید فایل' },
]

const AdminOrderListScreen = ({
  orders,
  totalCount = 0,
  onBack,
  onTabChange,
  onOpenOrder,
  onUpdateOrdersStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false)

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => orders.some((order) => order.id === id))
    )
  }, [orders])

  const filteredOrders = useMemo(() => {
    const normalizedTerm = searchTerm.trim()

    if (!normalizedTerm) {
      return orders
    }

    return orders.filter((order) =>
      [String(order.code), order.customerName, order.paymentLabel]
        .filter(Boolean)
        .some((value) => value.includes(normalizedTerm))
    )
  }, [orders, searchTerm])

  const handleToggleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const handleSelectStatus = (nextStatus) => {
    if (selectedIds.length > 0) {
      onUpdateOrdersStatus?.(selectedIds, nextStatus)
    }

    setIsStatusSheetOpen(false)
  }

  return (
    <>
      <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <AdminScreenHeader
            icon={checkbookIcon}
            iconClassName="icon-strong"
            title="لیست سفارشات"
            subtitle="سفارشات مشتریان خود را مشاهده کنید"
            showVideoBadge
            onBack={onBack}
          />

          <div className="mt-5 rounded-2xl bg-bg-base p-1">
            <div className="grid grid-cols-3 gap-1">
              {tabs.map((tab) => {
                const isActive = tab.key === 'orders'

                return (
                  <button
                    key={tab.key}
                    type="button"
                    disabled={tab.key !== 'orders'}
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

          <div className="relative mt-4">
            <img
              src={searchIcon}
              alt=""
              className="pointer-events-none absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="جستجو"
              dir="rtl"
              className="w-full rounded-2xl bg-bg-base py-4 pl-4 pr-14 text-right text-base font-normal text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs font-normal leading-5 text-text-moderate">
              {`${numberFormatter.format(totalCount)} سفارش`}
            </span>

            <div className="flex items-center gap-2">
              {selectedIds.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setIsStatusSheetOpen(true)}
                  className="inline-flex items-center rounded-lg bg-order-new-soft px-3 py-2 text-xs font-normal leading-5 text-menu-warning"
                >
                  تغییر وضعیت {numberFormatter.format(selectedIds.length)} سفارش
                </button>
              ) : null}

              <button
                type="button"
                className="inline-flex h-10 items-center gap-1 rounded-xl border border-border-light bg-bg-main px-3 text-sm font-normal leading-6 text-text-moderate"
              >
                <span>فیلتر</span>
                <img src={settingIcon} alt="" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 pb-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <AdminOrderRow
                  key={order.id}
                  order={order}
                  isSelected={selectedIds.includes(order.id)}
                  onToggleSelect={handleToggleSelect}
                  onOpen={onOpenOrder}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border-light px-4 py-8 text-center text-sm leading-6 text-text-moderate">
                نتیجه ای برای این جستجو پیدا نشد.
              </div>
            )}
          </div>
        </div>

        <AdminMenuBar activeTab="list" onTabChange={onTabChange} />
      </div>

      <AdminOrderStatusSheet
        isOpen={isStatusSheetOpen}
        currentStatus="preparing"
        onSelect={handleSelectStatus}
        onClose={() => setIsStatusSheetOpen(false)}
      />
    </>
  )
}

export default AdminOrderListScreen

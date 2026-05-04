import { useMemo, useState } from 'react'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminOrdersHeader from '../../components/admin/AdminOrdersHeader'
import AdminOrderStatusSheet, { getOrderStatusOption } from '../../components/admin/AdminOrderStatusSheet'
import arrowDownIcon from '../../assets/images/admin/arrow-down.svg'
import briefcaseIcon from '../../assets/images/admin/briefcase.svg'
import callForwardingIcon from '../../assets/images/admin/call-forwarding.svg'

const numberFaGrouped = new Intl.NumberFormat('fa-IR')
const numberFa = new Intl.NumberFormat('fa-IR', { useGrouping: false })

const paymentClassName = 'bg-success-soft text-success'
const newBadgeClassName = 'bg-order-new-soft text-menu-warning'

const DetailLine = ({ children, className = '' }) => (
  <div className={`border-b border-border-light ${className}`}>{children}</div>
)

const AdminOrderDetailScreen = ({ order, onBack, onTabChange, onUpdateOrderStatus, onCancelOrder }) => {
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false)
  const statusOption = useMemo(
    () => getOrderStatusOption(order?.deliveryStatus),
    [order?.deliveryStatus]
  )

  if (!order) {
    return (
      <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
        <div className="flex-1 px-4 pt-4">
          <AdminOrdersHeader onBack={onBack} />
          <div className="mt-10 rounded-2xl border border-dashed border-border-light px-4 py-8 text-center text-sm leading-6 text-text-moderate">
            سفارش مورد نظر پیدا نشد.
          </div>
        </div>
        <AdminMenuBar activeTab="list" onTabChange={onTabChange} />
      </div>
    )
  }

  const handleSelectStatus = (nextStatus) => {
    onUpdateOrderStatus?.(order.id, nextStatus)
    setIsStatusSheetOpen(false)
  }

  return (
    <>
      <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <AdminOrdersHeader
            subtitle="سفارشات مشتریان خود را مشاهده کنید"
            onBack={onBack}
          />

          <section className="mt-5">
            <h2 className="mb-2 text-right text-base font-bold leading-8 text-text-strong">
              وضعیت سفارش
            </h2>
            <button
              type="button"
              onClick={() => setIsStatusSheetOpen(true)}
              className="flex w-full items-center justify-between rounded-2xl bg-bg-base px-4 py-4 text-base font-normal leading-8 text-text-placeholder"
            >
              <span>{statusOption.label}</span>
              <img src={arrowDownIcon} alt="" className="h-6 w-6" />
            </button>
          </section>

          <section className="mt-5 pb-6">
            <DetailLine className="py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold leading-6 text-text-strong">
                    شماره سفارش : {numberFa.format(order.code)}
                  </span>
                </div>
                <span className="text-xs font-normal leading-5 text-text-placeholder flex items-center gap-1">
                  {order.date} - {order.time}
                  {order.isNew ? (
                    <span className={`rounded-lg px-2 py-0.5 text-xs leading-5 ${newBadgeClassName}`}>
                      جدید
                    </span>
                  ) : null}
                </span>
              </div>
            </DetailLine>

            <DetailLine className="py-3">
              <div className="grid grid-cols-2 gap-3 text-xs leading-5 text-text-moderate">
                <div className="flex items-center gap-2 border-l border-border-light pl-3">
                  <img src={callForwardingIcon} alt="" className="h-4 w-4 icon-moderate" />
                  <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={briefcaseIcon} alt="" className="h-4 w-4 icon-moderate" />
                  <span>{order.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={briefcaseIcon} alt="" className="h-4 w-4 icon-moderate" />
                  <span>{order.address}</span>
                </div>
              </div>
            </DetailLine>

            <DetailLine className="py-3">
              <div className="flex justify-between items-center gap-2 text-sm leading-6">
                <span className="text-text-moderate">اقلام فاکتور: {numberFa.format(order.itemsCount)} کالا</span>
                <span class="h-4 border-r border-border-light"></span>
                <span className="px-2 text-center text-text-moderate">
                  {order.customerName}
                </span>
                <span class="h-4 border-r border-border-light"></span>
                <span className={`justify-self-start rounded-lg px-2 py-0.5 text-xs leading-5 ${paymentClassName}`}>
                  {order.paymentLabel}
                </span>
              </div>
            </DetailLine>

            <div className="divide-y divide-border-light">
              {order.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-3 items-center gap-2 py-3 text-sm leading-6">
                  <div className="text-right">
                    <p className="truncate font-bold text-text-strong">
                      {numberFa.format(index + 1)}. {item.name}
                    </p>
                    <p className="text-xs leading-5 text-text-moderate">
                      {numberFa.format(item.code)}
                    </p>
                  </div>

                  <div className="text-center text-sm leading-6">
                    <span className="border-r border-border-light px-3 text-text-placeholder">
                      {numberFa.format(item.quantity)}
                    </span>
                    <span className="border-x border-border-light px-3 text-text-moderate">
                      عدد
                    </span>
                  </div>

                  <div className="text-left">
                    {item.originalPrice ? (
                      <div className="mb-0.5 flex items-center justify-end gap-1">
                        <span className="rounded-md bg-danger-soft px-1.5 text-xs leading-5 text-red-500">
                          تخفیف
                        </span>
                        <span className="text-xs leading-5 text-text-moderate line-through">
                          {numberFaGrouped.format(item.originalPrice)}
                        </span>
                      </div>
                    ) : null}
                    <span className="text-sm font-normal text-text-strong">
                      {numberFaGrouped.format(item.price)} تومان
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <DetailLine className="py-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold leading-6 text-menu-accent">
                  {numberFaGrouped.format(order.totalPrice)} تومان
                </span>
                <span className="text-xs font-normal leading-5 text-text-placeholder">
                  {order.date} - {order.time}
                </span>
              </div>
            </DetailLine>

            <div className="mt-8 flex">
              <button
                type="button"
                onClick={() => onCancelOrder?.(order.id)}
                className="text-base font-normal leading-8 text-red-500"
              >
                لغو سفارش
              </button>
            </div>
          </section>
        </div>

        <AdminMenuBar activeTab="list" onTabChange={onTabChange} />
      </div>

      <AdminOrderStatusSheet
        isOpen={isStatusSheetOpen}
        currentStatus={order.deliveryStatus}
        onSelect={handleSelectStatus}
        onClose={() => setIsStatusSheetOpen(false)}
      />
    </>
  )
}

export default AdminOrderDetailScreen

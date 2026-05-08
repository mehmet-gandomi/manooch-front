import callForwardingIcon from '../../../assets/images/admin/call-forwarding.svg'
import briefcaseIcon from '../../../assets/images/admin/briefcase.svg'

const numberFaGrouped = new Intl.NumberFormat('fa-IR')
const numberFa = new Intl.NumberFormat('fa-IR', { useGrouping: false })

const statusStyles = {
  new:      'bg-order-waiting-soft text-menu-accent',
  paid:     'bg-success-soft text-success',
  shipping: 'bg-order-new-soft text-menu-warning',
  pending:  'bg-bg-soft text-text-moderate',
}

const statusLabels = {
  new:      'جدید',
  paid:     'پرداخت شده',
  shipping: 'ارسال برای مشتری',
  pending:  'در انتظار پرداخت',
}

const DetailLine = ({ children, className = '' }) => (
  <div className={`border-b border-border-light ${className}`}>{children}</div>
)

const BillingOrderDetail = ({ order }) => (
  <div className="px-4 pb-6">
    <DetailLine className="py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold leading-6 text-text-strong">
          شماره سفارش : {numberFa.format(order.orderNumber)}
        </span>
        <span className="text-xs font-normal leading-5 text-text-placeholder">
          {order.date} - {order.time}
        </span>
      </div>
    </DetailLine>

    <DetailLine className="py-3">
      <div className="flex flex-col gap-2 text-xs leading-5 text-text-moderate">
        <div className="flex items-center gap-2">
          <img src={callForwardingIcon} alt="" className="h-4 w-4 icon-moderate" />
          <span dir="ltr">{order.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={briefcaseIcon} alt="" className="h-4 w-4 icon-moderate" />
          <span>{order.province}، {order.city}</span>
        </div>
        <div className="flex items-start gap-2">
          <img src={briefcaseIcon} alt="" className="h-4 w-4 icon-moderate mt-0.5" />
          <span className="flex-1">{order.address}</span>
        </div>
      </div>
    </DetailLine>

    <DetailLine className="py-3">
      <div className="flex items-center justify-between gap-2 text-sm leading-6">
        <span className="text-text-moderate">اقلام فاکتور: {numberFa.format(order.itemCount)} کالا</span>
        <span className="h-4 border-r border-border-light" />
        <span className="px-2 text-center text-text-moderate">{order.customerName}</span>
        <span className="h-4 border-r border-border-light" />
        <span className={`rounded-lg px-2 py-0.5 text-xs leading-5 ${statusStyles[order.status] ?? statusStyles.pending}`}>
          {statusLabels[order.status]}
        </span>
      </div>
    </DetailLine>

    <div className="divide-y divide-border-light">
      {order.items.map((item, index) => (
        <div key={item.id ?? index} className="grid grid-cols-3 items-center gap-2 py-3 text-sm leading-6">
          <div className="text-right">
            <p className="truncate font-bold text-text-strong">
              {numberFa.format(index + 1)}. {item.name}
            </p>
            <p className="text-xs leading-5 text-text-moderate">{item.orderId}</p>
          </div>

          <div className="text-center text-sm leading-6">
            <span className="border-r border-border-light px-3 text-text-placeholder">
              {numberFa.format(item.qty)}
            </span>
            <span className="border-x border-border-light px-3 text-text-moderate">عدد</span>
          </div>

          <div className="text-left">
            {item.originalPrice ? (
              <div className="mb-0.5 flex items-center justify-end gap-1">
                <span className="rounded-md bg-danger-soft px-1.5 text-xs leading-5 text-red-500">تخفیف</span>
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

    <DetailLine className="border-t py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold leading-6 text-menu-accent">
          {numberFaGrouped.format(order.totalPrice)} تومان
        </span>
        <span className="text-xs font-normal leading-5 text-text-placeholder">
          {order.date} - {order.time}
        </span>
      </div>
    </DetailLine>
  </div>
)

export default BillingOrderDetail

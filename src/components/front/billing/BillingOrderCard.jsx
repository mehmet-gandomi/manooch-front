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

const BillingOrderCard = ({ orderNumber, status, customerName, itemCount, date, time, totalPrice, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="block w-full border-b border-border-light py-4 text-right last:border-b-0"
  >
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-bold leading-6 text-text-strong">
        شماره سفارش : {numberFa.format(orderNumber)}
      </span>
      <span className={`rounded-lg px-2 py-0.5 text-xs leading-5 ${statusStyles[status] ?? statusStyles.pending}`}>
        {statusLabels[status]}
      </span>
    </div>

    <div className="mt-2 flex items-center gap-2 text-xs leading-5 text-text-moderate">
      <span>{`اقلام فاکتور: ${numberFa.format(itemCount)} کالا`}</span>
      <span className="h-4 border-r border-border-light" />
      <span className="truncate">{customerName}</span>
    </div>

    <div className="mt-1 flex items-center justify-between gap-3">
      <span className="text-sm font-bold leading-6 text-text-strong">
        {`${numberFaGrouped.format(totalPrice)} تومان`}
      </span>
      <span className="text-xs font-normal leading-5 text-text-placeholder">
        {date} - {time}
      </span>
    </div>
  </button>
)

export default BillingOrderCard

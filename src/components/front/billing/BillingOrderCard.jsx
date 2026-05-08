const numberFaGrouped = new Intl.NumberFormat('fa-IR')
const numberFa = new Intl.NumberFormat('fa-IR', { useGrouping: false })

const statusStyles = {
  paid:     'bg-success-soft text-success',
  shipping: 'bg-order-new-soft text-menu-warning',
  pending:  'bg-bg-soft text-text-moderate',
}

const statusLabels = {
  paid:     'پرداخت شده',
  shipping: 'ارسال برای مشتری',
  pending:  'در انتظار پرداخت',
}

const newBadgeClassName = 'bg-order-waiting-soft text-menu-accent'

const BillingOrderCard = ({ orderNumber, isNew, status, customerName, itemCount, date, time, totalPrice, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="block w-full border-b border-border-light py-4 text-right last:border-b-0"
  >
    {/* Row 1: order number + جدید badge */}
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold leading-6 text-text-strong">
        شماره سفارش : {numberFa.format(orderNumber)}
      </span>
      {isNew ? (
        <span className={`rounded-lg px-2 py-0.5 text-xs leading-5 ${newBadgeClassName}`}>
          جدید
        </span>
      ) : null}
    </div>

    {/* Row 2: item count | customer name | payment status badge */}
    <div className="mt-2 flex items-center gap-2 text-xs leading-5 text-text-moderate">
      <span>{`اقلام فاکتور: ${numberFa.format(itemCount)} کالا`}</span>
      <span className="h-4 border-r border-border-light" />
      <span className="truncate">{customerName}</span>
      {status !== 'new' && (
        <>
          <span className="h-4 border-r border-border-light" />
          <span className={`shrink-0 rounded-lg px-2 py-0.5 text-xs leading-5 ${statusStyles[status] ?? statusStyles.pending}`}>
            {statusLabels[status]}
          </span>
        </>
      )}
    </div>

    {/* Row 3: price | date */}
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

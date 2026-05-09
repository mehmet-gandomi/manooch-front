const numberFaGrouped = new Intl.NumberFormat('fa-IR')
const numberFa = new Intl.NumberFormat('fa-IR', { useGrouping: false })

const statusStyles = {
  waiting: 'bg-order-waiting-soft text-menu-accent',
  paid: 'bg-success-soft text-success',
  customer: 'bg-bg-soft text-text-moderate',
}

const newBadgeClassName = 'bg-order-new-soft text-menu-warning'

const AdminOrderRow = ({ order, isSelected, onToggleSelect, onOpen }) => {
  const handleToggle = (event) => {
    event.stopPropagation()
    onToggleSelect?.(order.id)
  }

  return (
    <button
      type="button"
      onClick={() => onOpen?.(order.id)}
      className="block w-full border-b border-border-light py-4 text-right last:border-b-0"
    >
      <div className="flex items-start gap-2">
        <span
          role="checkbox"
          aria-checked={isSelected}
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleToggle(event)
            }
          }}
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs leading-none transition-colors ${
            isSelected
              ? 'border-menu-accent bg-menu-accent text-text-white'
              : 'border-border-light bg-bg-main text-transparent'
          }`}
        >
          ✓
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-sm font-bold leading-6 text-text-strong">
                شماره سفارش : {numberFa.format(order.code)}
              </span>
              {order.isNew ? (
                <span className={`rounded-lg px-2 py-0.5 text-xs leading-5 ${newBadgeClassName}`}>
                  جدید
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 text-xs leading-5 text-text-moderate">
              <span>{`اقلام فاکتور: ${numberFa.format(order.itemsCount)} کالا`}</span>
              <span className="h-4 border-r border-border-light" />
              <span className="truncate">{order.customerName}</span>
              <span className="h-4 border-r border-border-light" />
              <span
                className={`shrink-0 rounded-lg px-2 py-0.5 text-xs leading-5 ${
                  statusStyles[order.paymentStatus] ?? statusStyles.customer
                }`}
              >
                {order.paymentLabel}
              </span>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="text-sm font-bold leading-6 text-text-strong">
              {`${numberFaGrouped.format(order.totalPrice)} تومان`}
            </span>
            <span className="text-xs font-normal leading-5 text-text-placeholder">
              {order.date} - {order.time}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default AdminOrderRow

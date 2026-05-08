const STATUS_STYLES = {
  new:      { label: 'جدید',               bg: 'rgba(75,69,230,0.1)',  color: '#3f37cb' },
  paid:     { label: 'پرداخت شده',         bg: 'rgba(0,224,67,0.1)',   color: '#00c035' },
  shipping: { label: 'ارسال برای مشتری',   bg: 'rgba(75,69,230,0.1)',  color: '#3f37cb' },
  pending:  { label: 'در انتظار پرداخت',   bg: 'rgba(32,42,55,0.1)',   color: '#202a37' },
}

const BillingOrderCard = ({ orderNumber, status, customerName, itemCount, date, totalPrice, onClick }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.new

  return (
    <button
      onClick={onClick}
      className="w-full text-right bg-bg-main border border-border-light rounded-xl px-4 py-3 flex flex-col gap-2"
    >
      {/* Row 1: order number + status badge */}
      <div className="flex items-center justify-between">
        <span className="text-text-strong text-sm font-semibold leading-6">{orderNumber}</span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: s.bg, color: s.color }}
        >
          {s.label}
        </span>
      </div>

      {/* Row 2: customer name + item count */}
      <div className="flex items-center gap-1.5">
        <span className="text-text-moderate text-sm leading-6">{customerName}</span>
        <span className="text-text-weak text-xs leading-6">·</span>
        <span className="text-text-weak text-xs leading-6">{itemCount} آیتم</span>
      </div>

      {/* Row 3: date (visual left) + price (visual right) */}
      <div className="flex items-center justify-between">
        <span className="text-text-weak text-xs leading-6">{date}</span>
        <span className="text-text-strong text-sm font-bold leading-6" dir="ltr">
          {new Intl.NumberFormat('fa-IR').format(totalPrice)} تومان
        </span>
      </div>
    </button>
  )
}

export default BillingOrderCard

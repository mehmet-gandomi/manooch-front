const STATUS_STYLES = {
  new:      { label: 'جدید',               bg: 'rgba(75,69,230,0.1)',  color: '#3f37cb' },
  paid:     { label: 'پرداخت شده',         bg: 'rgba(0,224,67,0.1)',   color: '#00c035' },
  shipping: { label: 'ارسال برای مشتری',   bg: 'rgba(75,69,230,0.1)',  color: '#3f37cb' },
  pending:  { label: 'در انتظار پرداخت',   bg: 'rgba(32,42,55,0.1)',   color: '#202a37' },
}

const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#a2a2a5"/>
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#a2a2a5"/>
  </svg>
)

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke="#a2a2a5" strokeWidth="1.5"/>
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="#a2a2a5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const BillingOrderDetail = ({ order }) => {
  const s = STATUS_STYLES[order.status] || STATUS_STYLES.new

  return (
    <div className="bg-bg-main border border-border-light rounded-xl mx-4 flex flex-col">
      {/* Card header: date left, order number right */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-text-weak text-xs leading-6">{order.date}</span>
        <span className="text-text-strong text-sm font-semibold leading-6">{order.orderNumber}</span>
      </div>

      <div className="h-px bg-border-light" />

      {/* Customer info */}
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <MapIcon />
          <span className="text-text-moderate text-sm leading-6">{order.province}، {order.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon />
          <span className="text-text-moderate text-sm leading-6" dir="ltr">{order.phone}</span>
        </div>
        <div className="flex items-start gap-2">
          <LocationIcon />
          <span className="text-text-moderate text-sm leading-6 text-right flex-1">{order.address}</span>
        </div>
      </div>

      <div className="h-px bg-border-light" />

      {/* Status + customer name + item count */}
      <div className="flex items-center gap-2 px-4 py-3">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: s.bg, color: s.color }}
        >
          {s.label}
        </span>
        <span className="text-text-strong text-sm font-semibold leading-6">{order.customerName}</span>
        <span className="text-text-weak text-xs leading-6">· {order.itemCount} آیتم</span>
      </div>

      <div className="h-px bg-border-light" />

      {/* Item rows */}
      <div className="flex flex-col px-4 py-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-2 gap-2">
            <span className="text-text-weak text-xs w-5 text-center">{idx + 1}.</span>
            <div className="flex-1 flex flex-col items-end">
              <span className="text-text-strong text-sm leading-6">{item.name}</span>
              <span className="text-text-weak text-xs leading-5">{item.orderId}</span>
            </div>
            <span className="text-text-moderate text-xs leading-6 px-2">×{item.qty}</span>
            <div className="flex flex-col items-end">
              {item.originalPrice && (
                <span className="text-text-weak text-xs line-through leading-5">
                  {new Intl.NumberFormat('fa-IR').format(item.originalPrice)}
                </span>
              )}
              <span className="text-text-strong text-sm font-bold leading-6">
                {new Intl.NumberFormat('fa-IR').format(item.price)}
              </span>
            </div>
            {item.originalPrice && (
              <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-danger-soft text-danger">تخفیف</span>
            )}
          </div>
        ))}
      </div>

      <div className="h-px bg-border-light" />

      {/* Footer: date left + total price right */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-text-weak text-xs leading-6">{order.date}</span>
        <span className="text-text-strong text-sm font-bold leading-6" dir="ltr">
          {new Intl.NumberFormat('fa-IR').format(order.totalPrice)} تومان
        </span>
      </div>
    </div>
  )
}

export default BillingOrderDetail

import BottomSheet from '../BottomSheet'

export const orderStatusOptions = [
  { key: 'preparing', label: 'درحال آماده سازی', helper: 'برای مشتری' },
  { key: 'sent', label: 'ارسال برای مشتری', helper: 'ارسال شده' },
  { key: 'post', label: 'تحویل پیک داده شد', helper: 'تحویل به پست' },
  { key: 'delivered', label: 'تحویل شده به مشتری', helper: 'نهایی' },
]

export const getOrderStatusOption = (status) =>
  orderStatusOptions.find((option) => option.key === status) ?? orderStatusOptions[0]

const AdminOrderStatusSheet = ({ isOpen, currentStatus, onSelect, onClose }) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="تغییر وضعیت سفارش"
    >
      <div className="px-6 pb-10 pt-1">
        <div className="flex flex-col gap-7">
          {orderStatusOptions.map((option) => {
            const isSelected = option.key === currentStatus

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onSelect?.(option.key)}
                className={`flex items-center gap-3 text-base leading-8 transition-colors ${
                  isSelected ? 'font-semibold text-text-strong' : 'font-normal text-text-moderate'
                }`}
              >
                <span>{option.label}</span>
                <span className="text-sm font-normal leading-6 text-text-placeholder">
                  {option.helper}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </BottomSheet>
  )
}

export default AdminOrderStatusSheet

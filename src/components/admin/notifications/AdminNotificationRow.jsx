import linkIcon from '../../../assets/images/admin/link-diagonal-2.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR', { useGrouping: false })

const AdminNotificationRow = ({ notification, isSelected, onToggleSelect, onEdit }) => {
  const daysLabel = numberFormatter.format(Number(notification.activeDays) || 0)
  const isActive = notification.status === 'active'

  return (
    <div className="border-b border-border-light py-3 last:border-b-0">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggleSelect?.(notification.id)}
          aria-pressed={isSelected}
          aria-label={`انتخاب ${notification.title}`}
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            isSelected
              ? 'border-header-from bg-header-from text-text-white'
              : 'border-border-light bg-bg-main text-transparent'
          }`}
        >
          <span className="text-xs leading-none">✓</span>
        </button>

        <button
          type="button"
          onClick={() => onEdit?.(notification.id)}
          className="min-w-0 flex-1 text-right"
        >
          <div className="flex items-center gap-1.5">
            {notification.hasLink ? (
              <img src={linkIcon} alt="" className="h-4 w-4 shrink-0" />
            ) : null}
            <h2 className="truncate text-sm font-bold leading-6 text-text-strong">
              {notification.title}
            </h2>
          </div>
          <p className="mt-1 line-clamp-2 text-xs font-normal leading-5 text-text-placeholder">
            {notification.description}
          </p>
        </button>

        <span
          className={`mt-0.5 shrink-0 rounded-lg px-2 py-1 text-xs font-normal leading-5 ${
            isActive
              ? 'bg-success-soft text-success'
              : 'bg-danger-soft text-red-500'
          }`}
        >
          {isActive ? `${daysLabel} روز فعال` : 'غیر فعال شده'}
        </span>
      </div>
    </div>
  )
}

export default AdminNotificationRow

import editIcon from '../../assets/images/admin/edit.svg'

const plainNumberFormatter = new Intl.NumberFormat('fa-IR', {
  useGrouping: false,
})

const AdminBannerRow = ({
  banner,
  isSelected,
  onToggleSelect,
  onEdit,
}) => {
  const priorityLabel = plainNumberFormatter.format(Number(banner.priority) || 1)

  return (
    <div className="border-b border-border-light py-4 last:border-b-0">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onToggleSelect?.(banner.id)}
          aria-pressed={isSelected}
          aria-label={`انتخاب ${banner.name}`}
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            isSelected
              ? 'border-header-from bg-header-from text-text-white'
              : 'border-border-light bg-bg-main text-transparent'
          }`}
        >
          <span className="text-xs leading-none">✓</span>
        </button>
        <div className="min-w-0 flex-1">
          <img
            src={banner.imageSrc}
            alt={banner.imageAlt || banner.name}
            className="h-[64px] w-full rounded-lg object-cover"
          />

          <div className="mt-1 flex items-end justify-between gap-3">
            <div className="min-w-0 flex-1 text-right">
              <h2 className="truncate text-sm font-bold leading-6 text-text-strong">
                {banner.name}
              </h2>
              <div className="flex flex-row items-center gap-3 text-xs font-normal leading-5 text-text-placeholder">
                <span>الویت</span>
                <span className="h-4 w-px bg-border-light" />
                <span>{priorityLabel}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onEdit?.(banner.id)}
              aria-label={`ویرایش ${banner.name}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center"
            >
              <img src={editIcon} alt="" className="h-5 w-5 icon-moderate" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBannerRow

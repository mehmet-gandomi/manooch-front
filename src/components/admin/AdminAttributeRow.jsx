import editIcon from '../../assets/images/admin/edit.svg'

const AdminAttributeRow = ({
  attribute,
  isSelected,
  onToggleSelect,
  onEdit,
}) => {
  return (
    <div className="border-b border-border-light py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 text-right">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onToggleSelect?.(attribute.id)}
                  aria-pressed={isSelected}
                  aria-label={`انتخاب ${attribute.name}`}
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    isSelected
                      ? 'border-header-from bg-header-from text-text-white'
                      : 'border-border-light bg-bg-main text-transparent'
                  }`}
                >
                  <span className="text-xs leading-none">✓</span>
                </button>

                <div className="min-w-0 flex-1">
                  <div className='flex items-center'>
                  <h2 className="text-base font-bold leading-8 text-text-strong min-w-[80px]">
                    {attribute.name}
                  </h2>
                  <div class="border-l h-5 mr-8 ml-4"></div>
                  <div className="flex items-center gap-2">
                    {attribute.typeLabel ? (
                      <span className="rounded-lg bg-bg-soft px-2 py-1 text-xs font-normal leading-5 text-text-moderate">
                        {attribute.typeLabel}
                      </span>
                    ) : null}
                  </div>
                  </div>
                  {attribute.hasDetails ? (
                    <span className="rounded-lg bg-bg-soft px-2 py-1 text-xs font-normal leading-5 text-text-moderate">
                      جزئیات دارد
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onEdit?.(attribute.id)}
          aria-label={`ویرایش ${attribute.name}`}
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center"
        >
          <img src={editIcon} alt="" className="h-5 w-5 icon-moderate" />
        </button>
      </div>
    </div>
  )
}

export default AdminAttributeRow

// src/components/admin/AdminCategoryRow.jsx
// Editable category list row with selection and metadata chips.

import AdminCategoryStatusChip from './AdminCategoryStatusChip'
import editIcon from '../../assets/images/admin/edit.svg'
import imageIcon from '../../assets/images/admin/image.svg'
import pathIcon from '../../assets/images/admin/path-2.svg'
import textIcon from '../../assets/images/admin/text-file.svg'

const AdminCategoryRow = ({
  category,
  isSelected,
  onToggleSelect,
  onEdit,
}) => {
  return (
    <div className="border-b border-border-light py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 text-right">
          <div className="flex flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onToggleSelect?.(category.id)}
              aria-pressed={isSelected}
              aria-label={`انتخاب ${category.name}`}
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                isSelected
                  ? 'border-header-from bg-header-from text-text-white'
                  : 'border-border-light bg-bg-main text-transparent'
              }`}
            >
              <span className="text-xs leading-none">✓</span>
            </button>

            <div className="flex-1">
              <h2 className="text-base font-bold leading-8 text-text-strong">
                {category.name}
              </h2>

              <div className="mt-2 flex flex-wrap gap-2">
                {category.hasImage ? (
                  <AdminCategoryStatusChip
                    icon={imageIcon}
                    label="تصویر دارد"
                  />
                ) : null}

                {category.hasDescription ? (
                  <AdminCategoryStatusChip
                    icon={textIcon}
                    label="توضیحات دارد"
                    tone="success"
                  />
                ) : null}

                {category.hasIcon ? (
                  <AdminCategoryStatusChip
                    icon={pathIcon}
                    label="ایکن دارد"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => onEdit?.(category.id)}
          aria-label={`ویرایش ${category.name}`}
          className="mt-1 flex h-8 w-8 items-center justify-center"
        >
          <img src={editIcon} alt="" className="h-5 w-5 icon-moderate" />
        </button>
      </div>
    </div>
  )
}

export default AdminCategoryRow

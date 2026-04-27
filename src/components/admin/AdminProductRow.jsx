import editIcon from '../../assets/images/admin/edit.svg'
import mocrophone from '../../assets/images/admin/product/microphone-2.svg'
import textFileIcon from '../../assets/images/admin/text-file.svg'

const numberFaGrouped = new Intl.NumberFormat('fa-IR')
const numberFa = new Intl.NumberFormat('fa-IR', {
  useGrouping: false,
})

const AdminProductRow = ({
  product,
  isSelected,
  onToggleSelect,
  onEdit,
}) => {
  return (
    <div className="border-b border-border-light py-4 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="flex min-w-0 flex-1 flex-row items-center gap-3 text-right">
          <button
            type="button"
            onClick={() => onToggleSelect?.(product.id)}
            aria-pressed={isSelected}
            aria-label={`انتخاب ${product.name}`}
            className={`mt-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
              isSelected
                ? 'border-header-from bg-header-from text-text-white'
                : 'border-border-light bg-bg-main text-transparent'
            }`}
          >
            <span className="text-xs leading-none">✓</span>
          </button>

          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-20 w-20 shrink-0 rounded-2xl object-cover"
          />

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold leading-8 text-text-strong">
              {product.name}
            </h2>
            <div className="flex items-center gap-2">
              <p className="mt-0.5 text-sm font-normal leading-6 text-text-moderate">
                {product.categoryName}
              </p>
              <div className="border-l h-5 mx-1"></div>
              <p className="mt-0.5 text-sm font-normal leading-6 text-text-placeholder">
                {numberFa.format(product.code)}
              </p>
            </div>
            <div className="mt-1 flex flex-row items-center gap-1.5">
              {product.priceLabel ? (
                <span className="text-sm font-semibold leading-6 text-text-strong">
                  {product.priceLabel}
                </span>
              ) : (
                <>
                  <span className="text-sm font-semibold leading-6 text-text-strong">
                    {`${numberFaGrouped.format(product.price)} تومان`}
                  </span>
                  {product.discountPrice ? (
                    <span className="text-sm font-semibold leading-6 text-red-500 line-through">
                      {`${numberFaGrouped.format(product.discountPrice)} تومان`}
                    </span>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end pt-0.5 gap-10">
          <button
            type="button"
            onClick={() => onEdit?.(product.id)}
            aria-label={`ویرایش ${product.name}`}
            className="flex h-6 w-6 items-center justify-center"
          >
            <img src={editIcon} alt="" className="h-5 w-5 icon-moderate" />
          </button>

          <div className="flex items-center gap-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-soft">
              <img src={textFileIcon} alt="" className="h-3.5 w-3.5 icon-moderate" />
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-soft">
              <img src={mocrophone} alt="" className="h-3.5 w-3.5 icon-moderate" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProductRow

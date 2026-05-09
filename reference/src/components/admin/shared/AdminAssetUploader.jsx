import { useRef } from 'react'
import crossIcon from '../../../assets/images/admin/close.svg'

const AdminAssetUploader = ({
  label,
  helperText,
  actionLabel,
  previewSrc,
  previewAlt,
  emptyIcon,
  emptyLabel,
  onUpload,
  onRemove,
  accept = 'image/*',
  previewFit = 'cover',
  dashed = true,
}) => {
  const inputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    onUpload?.(file)
    event.target.value = ''
  }

  return (
    <div className="border-b border-border-light pb-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right">
          <h2 className="text-base font-semibold leading-8 text-text-strong">
            {label}
          </h2>
          <p className="text-xs font-normal leading-5 text-text-placeholder">
            {helperText}
          </p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="min-w-20 rounded-xl bg-bg-soft px-3 py-2 text-sm font-normal leading-6 text-text-moderate transition-colors hover:bg-border-light"
        >
          {actionLabel}
        </button>
      </div>

      <div className="mt-3 flex justify-start">
        <div className="relative h-20 w-20">
          <div
            className={`flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-bg-base p-1 ${
              dashed ? 'border border-dashed border-border-light bg-bg-main' : ''
            }`}
          >
            {previewSrc ? (
              <img
                src={previewSrc}
                alt={previewAlt}
                className={`h-full w-full rounded-lg ${previewFit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 text-center">
                {emptyIcon ? (
                  <img src={emptyIcon} alt="" className="h-8 w-8 icon-moderate" />
                ) : null}
                {emptyLabel ? (
                  <span className="text-xs leading-4 text-text-placeholder">
                    {emptyLabel}
                  </span>
                ) : null}
              </div>
            )}
          </div>

          {previewSrc ? (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`حذف ${label}`}
              className="absolute left-[-6px] top-[-6px] flex h-5 w-5 items-center justify-center rounded-full bg-danger-soft text-xs font-bold leading-none text-red-500"
            >
              <img src={crossIcon} alt="حذف" />
            </button>
          ) : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default AdminAssetUploader

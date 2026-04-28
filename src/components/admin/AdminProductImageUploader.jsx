import { useRef } from 'react'
import closeIcon from '../../assets/images/admin/close.svg'
import imageIcon from '../../assets/images/admin/product/document-upload.svg'

const AdminProductImageUploader = ({
  images = [],
  onUpload,
  onRemove,
  maxFiles = 4,
}) => {
  const inputRef = useRef(null)
  const remainingSlots = Math.max(0, maxFiles - images.length)

  const handleFileChange = (event) => {
    const nextFiles = Array.from(event.target.files ?? []).slice(0, remainingSlots)

    if (nextFiles.length === 0) {
      return
    }

    onUpload?.(nextFiles)
    event.target.value = ''
  }

  return (
    <div className="border-t border-border-light pt-5">
      <div className="text-right">
        <h2 className="text-base font-bold leading-8 text-text-strong">
          تصاویر کالا
        </h2>
      </div>

      {images.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((image) => (
            <div key={image.id} className="relative h-16 w-16 shrink-0">
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full rounded-2xl object-cover"
              />

              <button
                type="button"
                onClick={() => onRemove?.(image.id)}
                aria-label={`حذف ${image.alt}`}
                className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger-soft"
              >
                <img src={closeIcon} alt="" className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {remainingSlots > 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-3 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border-light bg-bg-main px-4 py-5 text-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border">
            <img src={imageIcon} alt="" className="h-5 w-5 icon-moderate" />
          </span>
          <span className="mt-3 text-sm font-normal leading-6 text-text-moderate">
            برای آپلود عکس کلیک کنید
          </span>
          <span className="mt-1 text-xs font-normal leading-5 text-text-placeholder">
            SVG, PNG, JPG or GIF (max 400 x 400 px)
          </span>
        </button>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default AdminProductImageUploader

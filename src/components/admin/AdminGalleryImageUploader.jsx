import { useRef } from 'react'
import closeIcon from '../../assets/images/admin/close.svg'
import uploadIcon from '../../assets/images/admin/product/document-upload.svg'

const AdminGalleryImageUploader = ({
  image,
  onUpload,
  onRemove,
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
    <div>
      <h2 className="text-base font-bold leading-8 text-text-strong">
      تصویر بنر
      </h2>

      {image?.src ? (
        <div className="mt-3 flex">
          <div className="relative h-[80px] w-[80px] shrink-0">
            <img
              src={image.src}
              alt={image.alt || 'تصویر گالری'}
              className="h-full w-full rounded-2xl border border-dashed border-border-light bg-bg-main object-cover p-1"
            />
            <button
              type="button"
              onClick={onRemove}
              aria-label="حذف تصویر گالری"
              className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger-soft"
            >
              <img src={closeIcon} alt="" className="h-3 w-3" />
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-3 flex w-full flex-col items-center justify-center rounded-2xl border border-border-light bg-bg-main px-4 py-5 text-center"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-light bg-bg-main">
          <img src={uploadIcon} alt="" className="h-5 w-5 icon-strong" />
        </span>
        <span className="mt-3 text-sm font-normal leading-6 text-text-moderate">
          برای آپلود فایل لطفا کلیک کنید
        </span>
        <span className="mt-1 text-xs font-normal leading-5 text-text-moderate">
          SVG, PNG, JPG or GIF (max 360 x 110 px)
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

export default AdminGalleryImageUploader

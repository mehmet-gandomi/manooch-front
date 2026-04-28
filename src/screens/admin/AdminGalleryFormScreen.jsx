import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../components/Button'
import AdminGalleryImageUploader from '../../components/admin/AdminGalleryImageUploader'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminScreenHeader from '../../components/admin/AdminScreenHeader'
import galleryHeaderIcon from '../../assets/images/admin/album-image-4.svg'

const createFormState = (gallery) => ({
  id: gallery?.id ?? '',
  name: gallery?.name ?? '',
  priority: gallery?.priority ?? '',
  imageSrc: gallery?.imageSrc ?? '',
  imageAlt: gallery?.imageAlt ?? '',
})

const GalleryTextField = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-base font-semibold leading-8 text-text-strong">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      dir="rtl"
      className="h-11 w-full rounded-xl bg-bg-base px-4 text-right text-base font-normal text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary"
    />
  </div>
)

const AdminGalleryFormScreen = ({
  mode = 'create',
  gallery,
  nextPriority = 1,
  onBack,
  onTabChange,
  onSubmit,
}) => {
  const objectUrlsRef = useRef([])
  const [formValues, setFormValues] = useState(() =>
    createFormState(gallery)
  )

  useEffect(() => {
    setFormValues(createFormState(gallery))
  }, [gallery])

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((value) => URL.revokeObjectURL(value))
    }
  }, [])

  const submitLabel = useMemo(
    () => (mode === 'create' ? 'ثبت تصویر گالری' : 'ویرایش تصویر گالری'),
    [mode]
  )

  const handleFieldChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const releaseObjectUrl = (value) => {
    if (!value?.startsWith('blob:')) {
      return
    }

    URL.revokeObjectURL(value)
    objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== value)
  }

  const handleUpload = (file) => {
    setFormValues((current) => {
      releaseObjectUrl(current.imageSrc)

      const nextUrl = URL.createObjectURL(file)
      objectUrlsRef.current.push(nextUrl)

      return {
        ...current,
        imageSrc: nextUrl,
        imageAlt: file.name,
      }
    })
  }

  const handleRemoveImage = () => {
    setFormValues((current) => {
      releaseObjectUrl(current.imageSrc)

      return {
        ...current,
        imageSrc: '',
        imageAlt: '',
      }
    })
  }

  const handleSubmit = () => {
    onSubmit?.({
      ...gallery,
      id: formValues.id || gallery?.id,
      name: formValues.name.trim() || 'تصویر ماکتل',
      priority: formValues.priority.trim() || String(nextPriority),
      imageSrc: formValues.imageSrc,
      imageAlt: formValues.imageAlt || formValues.name || 'تصویر گالری',
    })
  }

  return (
    <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={galleryHeaderIcon}
          title="گالری"
          subtitle="گالری تصاویر مجموعه خودتان را وارد کنید."
          onBack={onBack}
          iconClassName="icon-strong"
        />

        <div className="mt-6 flex flex-col gap-4 pb-6">
          <GalleryTextField
            label="نام تصویر"
            placeholder="پیتزا ایتالیایی"
            value={formValues.name}
            onChange={handleFieldChange('name')}
          />

          <GalleryTextField
            label="الویت نمایش"
            placeholder="۱"
            value={formValues.priority}
            onChange={handleFieldChange('priority')}
          />

          <AdminGalleryImageUploader
            image={
              formValues.imageSrc
                ? { src: formValues.imageSrc, alt: formValues.imageAlt || 'تصویر گالری' }
                : null
            }
            onUpload={handleUpload}
            onRemove={handleRemoveImage}
          />
        </div>
      </div>

      <div className="px-4 py-4">
        <Button variant="admin" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminGalleryFormScreen

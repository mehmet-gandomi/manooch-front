import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import TextInput from '../../../components/ui/TextInput'
import AdminBannerImageUploader from '../../../components/admin/shared/AdminSingleImageUploader'
import AdminMenuBar from '../../../components/admin/shared/AdminMenuBar'
import AdminScreenHeader from '../../../components/admin/shared/AdminScreenHeader'
import bannerHeaderIcon from '../../../assets/images/admin/panorama-image-1.svg'

const createFormState = (banner, nextPriority) => ({
  id: banner?.id ?? '',
  name: banner?.name ?? '',
  priority: banner?.priority ?? String(nextPriority),
  imageSrc: banner?.imageSrc ?? '',
  imageAlt: banner?.imageAlt ?? '',
})

const AdminBannerFormScreen = ({
  mode = 'create',
  banner,
  nextPriority = 1,
  onBack,
  onTabChange,
  onSubmit,
}) => {
  const objectUrlsRef = useRef([])
  const [formValues, setFormValues] = useState(() =>
    createFormState(banner, nextPriority)
  )

  useEffect(() => {
    setFormValues(createFormState(banner, nextPriority))
  }, [banner, nextPriority])

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((value) => URL.revokeObjectURL(value))
    }
  }, [])

  const submitLabel = useMemo(
    () => (mode === 'create' ? 'ثبت تصویر بنر' : 'ویرایش تصویر بنر'),
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
      ...banner,
      id: formValues.id || banner?.id,
      name: formValues.name.trim() || 'بنر تبلیغاتی پیتزا',
      priority: formValues.priority.trim() || String(nextPriority),
      imageSrc: formValues.imageSrc,
      imageAlt: formValues.imageAlt || formValues.name || 'تصویر بنر',
    })
  }

  return (
    <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={bannerHeaderIcon}
          title="بنر"
          subtitle="بنر های تبلیغاتی و کمپینی خودتان را بارگذاری کنید."
          onBack={onBack}
          iconClassName="icon-strong"
        />

        <div className="mt-6 flex flex-col gap-3 pb-6">
          <TextInput
            label="نام بنر"
            placeholder="پیتزا ایتالیایی"
            value={formValues.name}
            onChange={handleFieldChange('name')}
          />

          <TextInput
            label="الویت نمایش"
            placeholder="۱"
            value={formValues.priority}
            onChange={handleFieldChange('priority')}
            type="text"
          />

          <AdminBannerImageUploader
            title="تصویر بنر"
            hint="ابعاد پیشنهادی: ۱۲۰۰ × ۴۰۰"
            image={
              formValues.imageSrc
                ? { src: formValues.imageSrc, alt: formValues.imageAlt || 'تصویر بنر' }
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

export default AdminBannerFormScreen

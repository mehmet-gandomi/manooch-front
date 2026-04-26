// src/screens/admin/AdminCategoryFormScreen.jsx
// Category create/edit form screen with local upload previews.

import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../components/Button'
import TextAreaInput from '../../components/TextAreaInput'
import TextInput from '../../components/TextInput'
import AdminAssetUploader from '../../components/admin/AdminAssetUploader'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminScreenHeader from '../../components/admin/AdminScreenHeader'
import categoryHeaderIcon from '../../assets/images/category.svg'
import imageIcon from '../../assets/images/admin/image.svg'
import categoryIcon from '../../assets/images/admin/path-2.svg'

const createFormState = (category, nextOrder) => ({
  name: category?.name ?? '',
  description: category?.description ?? '',
  order: category?.order ?? String(nextOrder),
  imageSrc: category?.imageSrc ?? '',
  imageAlt: category?.imageAlt ?? '',
  iconSrc: category?.iconSrc ?? '',
  iconAlt: category?.iconAlt ?? '',
})

const AdminCategoryFormScreen = ({
  mode = 'edit',
  category,
  nextOrder = 1,
  onBack,
  onTabChange,
  onSubmit,
}) => {
  const objectUrlsRef = useRef([])
  const [formValues, setFormValues] = useState(() =>
    createFormState(category, nextOrder)
  )

  useEffect(() => {
    setFormValues(createFormState(category, nextOrder))
  }, [category, nextOrder])

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((value) => {
        URL.revokeObjectURL(value)
      })
    }
  }, [])

  const submitLabel = useMemo(
    () => (mode === 'create' ? 'افزودن دسته بندی' : 'ویرایش'),
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

  const updatePreview = (field, altField, file) => {
    setFormValues((current) => {
      const currentValue = current[field]

      releaseObjectUrl(currentValue)

      const nextUrl = URL.createObjectURL(file)
      objectUrlsRef.current.push(nextUrl)

      return {
        ...current,
        [field]: nextUrl,
        [altField]: file.name,
      }
    })
  }

  const clearPreview = (field, altField) => {
    setFormValues((current) => {
      releaseObjectUrl(current[field])

      return {
        ...current,
        [field]: '',
        [altField]: '',
      }
    })
  }

  const handleSubmit = () => {
    onSubmit?.({
      ...category,
      name: formValues.name.trim() || 'دسته جدید',
      description: formValues.description.trim(),
      order: formValues.order.trim() || String(nextOrder),
      imageSrc: formValues.imageSrc,
      imageAlt: formValues.imageAlt || formValues.name || 'تصویر دسته بندی',
      iconSrc: formValues.iconSrc,
      iconAlt: formValues.iconAlt || formValues.name || 'ایکن دسته بندی',
      hasImage: Boolean(formValues.imageSrc),
      hasDescription: Boolean(formValues.description.trim()),
      hasIcon: Boolean(formValues.iconSrc),
    })
  }

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main"
    >
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={categoryHeaderIcon}
          title="دسته بندی"
          subtitle="افزونه های مورد نیاز خودتون رو فعال کن"
          onBack={onBack}
        />

        <div className="mt-6 flex flex-col gap-4 pb-6">
          <TextInput
            label="نام دسته بندی"
            placeholder="پیتزا ایتالیایی"
            value={formValues.name}
            onChange={handleFieldChange('name')}
          />

          <TextAreaInput
            label="توضیحات دسته بندی"
            placeholder="انواع پیتزا های ایتالیایی"
            value={formValues.description}
            onChange={handleFieldChange('description')}
            heightClass="h-24"
          />

          <TextInput
            label="الویت نمایش"
            placeholder="۱"
            value={formValues.order}
            onChange={handleFieldChange('order')}
            type="text"
          />

          <AdminAssetUploader
            label="تصویر دسته بندی"
            helperText="تصویر بارگذاری شده در دسته بندی"
            actionLabel="افزودن تصویر"
            previewSrc={formValues.imageSrc}
            previewAlt={formValues.imageAlt || 'تصویر دسته بندی'}
            emptyIcon={imageIcon}
            emptyLabel="بدون تصویر"
            onUpload={(file) => updatePreview('imageSrc', 'imageAlt', file)}
            onRemove={() => clearPreview('imageSrc', 'imageAlt')}
          />

          <AdminAssetUploader
            label="ایکن دسته بندی"
            helperText="ایکن بارگذاری شده در دسته بندی"
            actionLabel="افزودن ایکن"
            previewSrc={formValues.iconSrc}
            previewAlt={formValues.iconAlt || 'ایکن دسته بندی'}
            emptyIcon={categoryIcon}
            emptyLabel="بدون ایکن"
            previewFit="contain"
            dashed
            onUpload={(file) => updatePreview('iconSrc', 'iconAlt', file)}
            onRemove={() => clearPreview('iconSrc', 'iconAlt')}
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

export default AdminCategoryFormScreen

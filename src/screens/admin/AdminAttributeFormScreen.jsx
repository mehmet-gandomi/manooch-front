import { useEffect, useMemo, useState } from 'react'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminScreenHeader from '../../components/admin/AdminScreenHeader'
import AdminAttributeValueChip from '../../components/admin/AdminAttributeValueChip'
import categoryHeaderIcon from '../../assets/images/admin/category.svg'
import arrowDown from '../../assets/images/admin/arrow-down.svg'

const attributeTypeOptions = [
  {
    value: 'color',
    label: 'رنگ',
    description: 'قابلیت تعریف عنوان و مقادیر رنگی',
  },
  {
    value: 'size',
    label: 'سایز',
    description: 'قابلیت تعریف عنوان و مقادیر سایز',
  },
  {
    value: 'text',
    label: 'مشخصات',
    description: 'قابلیت تعریف عنوان و توضیح',
  },
]

const createFormState = (attribute, nextOrder) => ({
  id: attribute?.id ?? '',
  type: attribute?.type ?? '',
  name: attribute?.name ?? '',
  order: attribute?.order ?? String(nextOrder),
  values: attribute?.values ?? [],
  pendingValue: '',
  colorValueName: '',
})

const AdminAttributeFormScreen = ({
  mode = 'create',
  attribute,
  nextOrder = 1,
  onBack,
  onTabChange,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState(() =>
    createFormState(attribute, nextOrder)
  )
  const [showTypePicker, setShowTypePicker] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)

  useEffect(() => {
    setFormValues(createFormState(attribute, nextOrder))
  }, [attribute, nextOrder])

  const selectedType = useMemo(
    () =>
      attributeTypeOptions.find((item) => item.value === formValues.type) ?? null,
    [formValues.type]
  )

  const submitLabel = mode === 'create' ? 'ثبت ویژگی' : 'ویرایش ویژگی'

  const handleFieldChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSelectType = (value) => {
    setFormValues((current) => ({
      ...current,
      type: value,
      values: value === 'text' ? [] : current.values,
      pendingValue: '',
      colorValueName: '',
    }))
    setShowTypePicker(false)
  }

  const handleAddValue = () => {
    const nextValue = (formValues.pendingValue || formValues.colorValueName).trim()

    if (!nextValue) {
      return
    }

    setFormValues((current) => ({
      ...current,
      values: [...current.values, nextValue],
      pendingValue: '',
      colorValueName: '',
    }))
    setShowColorPicker(false)
  }

  const handleRemoveValue = (valueToRemove) => {
    setFormValues((current) => ({
      ...current,
      values: current.values.filter((value) => value !== valueToRemove),
    }))
  }

  const handleSubmit = () => {
    onSubmit?.({
      ...attribute,
      id: formValues.id,
      type: formValues.type,
      typeLabel: selectedType?.label ?? '',
      name: formValues.name.trim() || 'ویژگی جدید',
      title: formValues.name.trim() || 'ویژگی جدید',
      order: formValues.order.trim() || String(nextOrder),
      hasDetails: true,
      values: formValues.type === 'text' ? [] : formValues.values,
    })
  }

  const showValueSection = formValues.type === 'size' || formValues.type === 'color'

  return (
    <>
      <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
          <AdminScreenHeader
            icon={categoryHeaderIcon}
            title="ویژگی ها"
            subtitle="افزونه های مورد نیاز خودتون رو فعال کن"
            onBack={onBack}
          />

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-right text-base font-bold leading-8 text-text-strong">
                نوع ویژگی
              </label>
              <button
                type="button"
                onClick={() => setShowTypePicker(true)}
                className="flex h-12 w-full items-center justify-between rounded-xl bg-bg-base px-4 text-base text-text-strong"
              >
                <span>{selectedType?.label ?? 'انتخاب کنید'}</span>
                <img src={arrowDown} alt="" />
              </button>
            </div>

            <TextInput
              label="عنوان ویژگی"
              placeholder={
                formValues.type === 'color'
                  ? 'رنگ لباس'
                  : formValues.type === 'size'
                    ? 'سایز لباس'
                    : 'قد لباس'
              }
              value={formValues.name}
              onChange={handleFieldChange('name')}
            />

            {showValueSection ? (
              <>
                <div className="border-t border-border-light pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 text-right">
                      <h2 className="text-base font-semibold leading-8 text-text-strong">
                        {formValues.type === 'color' ? 'رنگ های ایجاد شده' : 'سایز های ایجاد شده'}
                      </h2>
                      <p className="text-xs font-normal leading-5 text-text-placeholder">
                        {formValues.type === 'color'
                          ? 'رنگ های ایجاد شده در ویژگی ها'
                          : 'سایز های ایجاد شده در ویژگی ها'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (formValues.type === 'color') {
                          setShowColorPicker(true)
                          return
                        }
                      }}
                      className="min-w-20 rounded-xl bg-bg-soft px-3 py-2 text-sm font-normal leading-6 text-text-moderate"
                    >
                      {formValues.type === 'color' ? 'افزودن رنگ' : 'افزودن سایز'}
                    </button>
                  </div>

                  {formValues.type === 'size' ? (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <TextInput
                        label="عنوان سایز"
                        placeholder="لباس"
                        value={formValues.name}
                        onChange={handleFieldChange('name')}
                      />
                      <TextInput
                        label="مقدار سایز"
                        placeholder="XL"
                        value={formValues.pendingValue}
                        onChange={handleFieldChange('pendingValue')}
                      />
                      <div className="flex items-end">
                        <Button variant="secondary" onClick={handleAddValue} className="w-full">
                          افزودن سایز
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {formValues.values.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {formValues.values.map((value) => (
                        <AdminAttributeValueChip
                          key={value}
                          value={value}
                          onRemove={() => handleRemoveValue(value)}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="px-4 py-4">
          <Button variant="admin" onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </div>

        <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
      </div>

      {showTypePicker ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/10">
          <div className="w-full rounded-t-3xl bg-bg-main px-4 py-3">
            <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-border-light" />
            <div className="space-y-4">
              {attributeTypeOptions.map((item) => {
                const isActive = item.value === formValues.type

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleSelectType(item.value)}
                    className="flex w-full items-center justify-between rounded-xl px-2 py-3 text-right"
                  >
                    <div className="text-right flex items-center">
                      <div className="text-base font-bold leading-8 text-text-strong">
                        {item.label}
                      </div>
                      <div className="text-sm leading-6 text-text-placeholder mr-3">
                        {item.description}
                      </div>
                    </div>
                    <span className={`text-base ${isActive ? 'text-text-strong' : 'text-transparent'}`}>
                      ✓
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}

      {showColorPicker ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/10">
          <div className="w-full rounded-t-3xl bg-bg-main px-4 pb-10 pt-3">
            <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-border-light" />

            <TextInput
              label="عنوان رنگ"
              placeholder="سبز"
              value={formValues.colorValueName}
              onChange={handleFieldChange('colorValueName')}
            />

            <div className="mt-4 rounded-xl bg-gradient-to-b from-[#f6d08f] via-[#7c531c] to-[#120b05] p-4">
              <div className="h-40 rounded-lg bg-gradient-to-b from-white/70 via-transparent to-black" />
            </div>
            <div className="mt-3 h-3 rounded-full bg-[linear-gradient(90deg,#ff9800,#ffee00,#37ff00,#00d1ff,#001eff,#ff00e5,#ff0022)]" />

            <div className="mt-6">
              <Button variant="admin" onClick={handleAddValue}>
                افزودن رنگ
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default AdminAttributeFormScreen

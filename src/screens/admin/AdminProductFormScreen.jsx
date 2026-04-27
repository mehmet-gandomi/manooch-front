import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../components/Button'
import BottomSheet from '../../components/BottomSheet'
import Dropdown from '../../components/Dropdown'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminProductImageUploader from '../../components/admin/AdminProductImageUploader'
import AdminScreenHeader from '../../components/admin/AdminScreenHeader'
import addToBoxIcon from '../../assets/images/admin/add-to-box.svg'
import closeIcon from '../../assets/images/admin/close.svg'
import microphoneIcon from '../../assets/images/admin/product/microphone-2.svg'
import settingIcon from '../../assets/images/admin/product/setting-5.svg'
import textFileIcon from '../../assets/images/admin/text-file.svg'

const groupedNumberFormatter = new Intl.NumberFormat('fa-IR')
const plainNumberFormatter = new Intl.NumberFormat('fa-IR', {
  useGrouping: false,
})

const voiceBarHeights = [10, 18, 12, 20, 14, 24, 16, 22, 14, 18, 10, 16, 12, 20]

const toEnglishDigits = (value = '') =>
  value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632))

const sanitizeDigits = (value = '') => toEnglishDigits(value).replace(/\D/g, '')

const formatNumericValue = (value = '', grouped = false) => {
  if (!value) {
    return ''
  }

  const normalizedValue = sanitizeDigits(String(value))

  if (!normalizedValue) {
    return ''
  }

  const numericValue = Number(normalizedValue)

  return grouped
    ? groupedNumberFormatter.format(numericValue)
    : plainNumberFormatter.format(numericValue)
}

const createImageId = () => `product-image-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

const cloneImages = (images = []) =>
  images.map((image) => ({
    id: image.id ?? createImageId(),
    src: image.src,
    alt: image.alt,
  }))

const cloneUnitSales = (unitSales = []) =>
  unitSales.map((unitSale, index) => ({
    id: unitSale.id ?? `unit-${Date.now()}-${index}`,
    name: unitSale.name ?? '',
    price: unitSale.price != null ? String(unitSale.price) : '',
    quantity: unitSale.quantity != null ? String(unitSale.quantity) : '',
    inventory: unitSale.inventory != null ? String(unitSale.inventory) : '',
  }))

const cloneFeatureEntries = (featureEntries = []) =>
  featureEntries.map((entry, entryIndex) => ({
    id: entry.id ?? `feature-${Date.now()}-${entryIndex}`,
    attributeId: entry.attributeId ?? '',
    attributeName: entry.attributeName ?? '',
    hasDifferentPrice: Boolean(entry.hasDifferentPrice),
    selections: (entry.selections ?? []).map((selection, selectionIndex) => ({
      key:
        selection.key ??
        `${entry.attributeId ?? 'feature'}-${selection.name ?? selection.label}-${selectionIndex}`,
      name: selection.name ?? selection.label ?? '',
      hex: selection.hex ?? '',
      inventory: selection.inventory != null ? String(selection.inventory) : '',
      price: selection.price != null ? String(selection.price) : '',
    })),
  }))

const createFormState = (product, categories, nextCode) => ({
  name: product?.name ?? '',
  description: product?.description ?? '',
  hasVoiceDescription: Boolean(product?.hasVoiceDescription),
  categoryId: product?.categoryId ?? categories[0]?.id ?? '',
  hasFeatures:
    typeof product?.hasFeatures === 'boolean'
      ? product.hasFeatures
      : (product?.featureEntries?.length ?? 0) > 0,
  code: product?.code != null ? String(product.code) : '',
  inventory: product?.inventory != null ? String(product.inventory) : '',
  priceInquiry: Boolean(product?.priceInquiry),
  basePrice: product?.basePrice != null ? String(product.basePrice) : '',
  hasDiscount:
    typeof product?.hasDiscount === 'boolean'
      ? product.hasDiscount
      : Boolean(product?.discountedPrice),
  discountedPrice:
    product?.discountedPrice != null ? String(product.discountedPrice) : '',
  hasUnitSale:
    typeof product?.hasUnitSale === 'boolean'
      ? product.hasUnitSale
      : (product?.unitSales?.length ?? 0) > 0,
  unitSales: cloneUnitSales(product?.unitSales),
  featureEntries: cloneFeatureEntries(product?.featureEntries),
  images: cloneImages(product?.imageGallery ?? []),
  nextCode: String(nextCode),
})

const createUnitDraft = (unitSale = null) => ({
  name: unitSale?.name ?? '',
  price: unitSale?.price != null ? String(unitSale.price) : '',
  quantity: unitSale?.quantity != null ? String(unitSale.quantity) : '',
  inventory: unitSale?.inventory != null ? String(unitSale.inventory) : '',
})

const getAttributeValueOptions = (attribute) =>
  (attribute?.values ?? []).map((value, index) =>
    typeof value === 'object' && value !== null
      ? {
          key: `${attribute.id}-${value.name}-${index}`,
          name: value.name ?? '',
          hex: value.hex ?? '',
        }
      : {
          key: `${attribute.id}-${value}-${index}`,
          name: String(value),
          hex: '',
        }
  )

const createFeatureDraft = (featureEntry = null, defaultAttributeId = '') => ({
  attributeId: featureEntry?.attributeId ?? defaultAttributeId,
  hasDifferentPrice: Boolean(featureEntry?.hasDifferentPrice),
  selections: (featureEntry?.selections ?? []).map((selection, index) => ({
    key:
      selection.key ??
      `${featureEntry?.attributeId ?? defaultAttributeId}-${selection.name}-${index}`,
    name: selection.name ?? '',
    hex: selection.hex ?? '',
    inventory: selection.inventory != null ? String(selection.inventory) : '',
    price: selection.price != null ? String(selection.price) : '',
  })),
})

const InlineSwitch = ({ checked, onChange, disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange?.(!checked)}
    className={`relative h-7 w-12 rounded-full transition-colors ${
      checked ? 'bg-header-from' : 'bg-border-light'
    } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-bg-main shadow-sm transition-all ${
        checked ? 'left-1' : 'left-6'
      }`}
    />
  </button>
)

const FieldInput = ({
  label,
  value,
  onChange,
  placeholder,
  helperText = '',
  disabled = false,
  multiline = false,
  rows = 3,
  numeric = false,
  grouped = false,
  suffix = '',
}) => {
  const handleChange = (event) => {
    if (numeric) {
      onChange?.(sanitizeDigits(event.target.value))
      return
    }

    onChange?.(event.target.value)
  }

  const sharedClassName = `w-full rounded-2xl bg-bg-base text-base font-normal text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary ${
    disabled ? 'cursor-not-allowed bg-bg-soft text-text-placeholder' : ''
  } ${suffix ? 'pl-14 pr-4' : 'px-4'}`

  return (
    <div className="flex flex-col gap-1">
      <label className="w-full text-right text-base font-semibold leading-8 text-text-strong">
        {label}
      </label>

      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            dir="rtl"
            className={`${sharedClassName} resize-none py-4 text-right`}
          />
        ) : (
          <input
            type="text"
            value={numeric ? formatNumericValue(value, grouped) : value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            dir="rtl"
            inputMode={numeric ? 'numeric' : 'text'}
            className={`${sharedClassName} py-4 text-right`}
          />
        )}

        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-normal leading-6 text-text-placeholder">
            {suffix}
          </span>
        ) : null}
      </div>

      {helperText ? (
        <p className="w-full text-right text-xs font-normal leading-5 text-text-placeholder">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

const ToggleRow = ({
  title,
  description,
  checked,
  onChange,
  disabled = false,
  className = ''
}) => (
  <div className={`flex flex-row-reverse items-start justify-between gap-4 ${className}`}>
    <div className="flex-1 text-right">
      <h2 className="text-base font-bold leading-8 text-text-strong">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm font-normal leading-6 text-text-placeholder">
          {description}
        </p>
      ) : null}
    </div>

    <InlineSwitch checked={checked} onChange={onChange} disabled={disabled} />
  </div>
)

const VoiceDescriptionField = ({ hasRecording, onToggle, onClear }) => (
  <div className="flex flex-col gap-1">
    <label className="w-full text-right text-base font-semibold leading-8 text-text-strong">
      ضبط توضیحات
    </label>

    <div className="rounded-2xl bg-bg-base px-3 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={hasRecording ? onClear : onToggle}
          aria-label={hasRecording ? 'حذف توضیح صوتی' : 'افزودن توضیح صوتی'}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            hasRecording
              ? 'bg-danger-soft text-red-500'
              : 'border border-border-light bg-bg-main'
          }`}
        >
          {hasRecording ? (
            <img src={closeIcon} alt="" className="h-3 w-3" />
          ) : (
            <img src={microphoneIcon} alt="" className="h-4 w-4 icon-moderate" />
          )}
        </button>

        <button
          type="button"
          onClick={onToggle}
          className="flex-1 rounded-xl bg-bg-main px-3 py-3"
        >
          <div className="flex items-center justify-end gap-0.5">
            {voiceBarHeights.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className={`w-1 rounded-full ${
                  hasRecording ? 'bg-header-from' : 'bg-border-light'
                }`}
                style={{ height }}
              />
            ))}
          </div>
        </button>
      </div>
    </div>

    <p className="w-full text-right text-xs font-normal leading-5 text-text-placeholder">
     حداکثر ویس ۱۵ ثانیه می باشد
    </p>
  </div>
)

const SummaryBadge = ({ label, colorHex = '' }) => (
  <span className="inline-flex items-center gap-2 rounded-xl bg-bg-soft px-3 py-2 text-sm font-normal leading-5 text-text-moderate">
    {colorHex ? (
      <span
        className="h-3.5 w-3.5 rounded-full border border-black/10"
        style={{ backgroundColor: colorHex }}
      />
    ) : null}
    <span>{label}</span>
  </span>
)

const ProductUnitCard = ({ unitSale, onEdit, onRemove }) => (
  <div className="relative rounded-2xl border border-border-light bg-bg-main px-3 py-3">
    <button type="button" onClick={onEdit} className="block w-full text-right">
      <div className="pl-7">
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm font-semibold leading-6 text-text-strong">
            {unitSale.name}
          </span>
          <span className="text-sm font-semibold leading-6 text-text-strong">
            {`${formatNumericValue(unitSale.price, true)} ریال`}
          </span>
        </div>

        <p className="mt-1 text-xs font-normal leading-5 text-text-placeholder">
          {`${formatNumericValue(unitSale.quantity)} عدد در واحد • ${formatNumericValue(
            unitSale.inventory
          )} موجود`}
        </p>
      </div>
    </button>

    <button
      type="button"
      onClick={onRemove}
      aria-label={`حذف ${unitSale.name}`}
      className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-danger-soft"
    >
      <img src={closeIcon} alt="" className="h-3 w-3" />
    </button>
  </div>
)

const ProductFeatureCard = ({ featureEntry, onEdit, onRemove }) => (
  <div className="relative rounded-2xl border border-border-light bg-bg-main px-3 py-3">
    <button type="button" onClick={onEdit} className="block w-full text-right">
      <div className="pl-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-sm font-semibold leading-6 text-text-strong">
              {featureEntry.attributeName}
            </span>
            <p className="mt-1 text-xs font-normal leading-5 text-text-placeholder">
              {featureEntry.hasDifferentPrice
                ? 'قیمت فروش متفاوت برای هر مورد فعال است'
                : 'موجودی هر مورد به صورت جداگانه ثبت شده است'}
            </p>
          </div>

          <span className="rounded-xl bg-bg-soft px-2 py-1 text-xs font-normal leading-5 text-text-moderate">
            {`${formatNumericValue(featureEntry.selections.length)} مورد`}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap justify-end gap-2">
          {featureEntry.selections.map((selection) => (
            <SummaryBadge
              key={selection.key}
              label={selection.name}
              colorHex={selection.hex}
            />
          ))}
        </div>
      </div>
    </button>

    <button
      type="button"
      onClick={onRemove}
      aria-label={`حذف ${featureEntry.attributeName}`}
      className="absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-danger-soft"
    >
      <img src={closeIcon} alt="" className="h-3 w-3" />
    </button>
  </div>
)

const AdminProductFormScreen = ({
  mode = 'create',
  product,
  categories = [],
  attributes = [],
  nextCode = 1,
  onBack,
  onTabChange,
  onSubmit,
  onDelete,
}) => {
  const objectUrlsRef = useRef([])
  const selectableAttributes = useMemo(
    () => attributes.filter((attribute) => (attribute.values?.length ?? 0) > 0),
    [attributes]
  )
  const [formValues, setFormValues] = useState(() =>
    createFormState(product, categories, nextCode)
  )
  const [isUnitSheetOpen, setIsUnitSheetOpen] = useState(false)
  const [editingUnitIndex, setEditingUnitIndex] = useState(null)
  const [unitDraft, setUnitDraft] = useState(() => createUnitDraft())
  const [isFeatureSheetOpen, setIsFeatureSheetOpen] = useState(false)
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null)
  const [featureDraft, setFeatureDraft] = useState(() =>
    createFeatureDraft(null, selectableAttributes[0]?.id ?? '')
  )

  const releaseObjectUrl = (value) => {
    if (!value?.startsWith('blob:')) {
      return
    }

    URL.revokeObjectURL(value)
    objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== value)
  }

  useEffect(() => {
    setFormValues((current) => {
      current.images.forEach((image) => {
        releaseObjectUrl(image.src)
      })

      return createFormState(product, categories, nextCode)
    })
  }, [product, categories, nextCode])

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((value) => {
        URL.revokeObjectURL(value)
      })
    }
  }, [])

  const submitLabel = mode === 'create' ? 'ثبت کالا' : 'ویرایش'
  const unitSheetLabel = editingUnitIndex === null ? 'افزودن واحد فروش' : 'ویرایش واحد فروش'
  const featureSheetLabel =
    editingFeatureIndex === null ? 'افزودن ویژگی کالا' : 'ویرایش ویژگی کالا'

  const activeFeatureAttribute = useMemo(
    () =>
      selectableAttributes.find((attribute) => attribute.id === featureDraft.attributeId) ??
      null,
    [featureDraft.attributeId, selectableAttributes]
  )

  const featureValueOptions = useMemo(
    () => getAttributeValueOptions(activeFeatureAttribute),
    [activeFeatureAttribute]
  )

  const isUnitDraftReady =
    Boolean(unitDraft.name.trim()) &&
    Boolean(unitDraft.price) &&
    Boolean(unitDraft.quantity) &&
    Boolean(unitDraft.inventory)

  const isFeatureDraftReady =
    Boolean(featureDraft.attributeId) &&
    featureDraft.selections.length > 0 &&
    featureDraft.selections.every((selection) =>
      formValues.priceInquiry || !featureDraft.hasDifferentPrice
        ? Boolean(selection.inventory)
        : Boolean(selection.inventory) && Boolean(selection.price)
    )

  const handleFormValueChange = (field) => (value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleToggleVoiceDescription = () => {
    setFormValues((current) => ({
      ...current,
      hasVoiceDescription: !current.hasVoiceDescription,
    }))
  }

  const handleClearVoiceDescription = () => {
    setFormValues((current) => ({
      ...current,
      hasVoiceDescription: false,
    }))
  }

  const handleTogglePriceInquiry = () => {
    setFormValues((current) => {
      const nextValue = !current.priceInquiry

      return {
        ...current,
        priceInquiry: nextValue,
        hasDiscount: nextValue ? false : current.hasDiscount,
        discountedPrice: nextValue ? '' : current.discountedPrice,
      }
    })
  }

  const handleToggleDiscount = (nextValue) => {
    setFormValues((current) => ({
      ...current,
      hasDiscount: nextValue,
      discountedPrice: nextValue ? current.discountedPrice : '',
    }))
  }

  const handleUploadImages = (files) => {
    const nextImages = files.map((file) => {
      const nextUrl = URL.createObjectURL(file)
      objectUrlsRef.current.push(nextUrl)

      return {
        id: createImageId(),
        src: nextUrl,
        alt: file.name,
      }
    })

    setFormValues((current) => ({
      ...current,
      images: [...current.images, ...nextImages].slice(0, 4),
    }))
  }

  const handleRemoveImage = (imageId) => {
    setFormValues((current) => {
      const imageToRemove = current.images.find((image) => image.id === imageId)

      if (imageToRemove) {
        releaseObjectUrl(imageToRemove.src)
      }

      return {
        ...current,
        images: current.images.filter((image) => image.id !== imageId),
      }
    })
  }

  const openCreateUnitSheet = () => {
    setEditingUnitIndex(null)
    setUnitDraft(createUnitDraft())
    setIsUnitSheetOpen(true)
  }

  const openEditUnitSheet = (index) => {
    setEditingUnitIndex(index)
    setUnitDraft(createUnitDraft(formValues.unitSales[index]))
    setIsUnitSheetOpen(true)
  }

  const handleSaveUnit = () => {
    if (!isUnitDraftReady) {
      return
    }

    const nextUnit = {
      id:
        editingUnitIndex === null
          ? `unit-${Date.now()}`
          : formValues.unitSales[editingUnitIndex]?.id ?? `unit-${Date.now()}`,
      name: unitDraft.name.trim(),
      price: unitDraft.price,
      quantity: unitDraft.quantity,
      inventory: unitDraft.inventory,
    }

    setFormValues((current) => {
      const nextUnitSales = [...current.unitSales]

      if (editingUnitIndex === null) {
        nextUnitSales.push(nextUnit)
      } else {
        nextUnitSales[editingUnitIndex] = nextUnit
      }

      return {
        ...current,
        hasUnitSale: true,
        unitSales: nextUnitSales,
      }
    })

    setIsUnitSheetOpen(false)
    setEditingUnitIndex(null)
    setUnitDraft(createUnitDraft())
  }

  const handleRemoveUnit = (index) => {
    setFormValues((current) => ({
      ...current,
      unitSales: current.unitSales.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const handleDeleteUnitFromSheet = () => {
    if (editingUnitIndex === null) {
      return
    }

    handleRemoveUnit(editingUnitIndex)
    setIsUnitSheetOpen(false)
    setEditingUnitIndex(null)
    setUnitDraft(createUnitDraft())
  }

  const openCreateFeatureSheet = () => {
    setEditingFeatureIndex(null)
    setFeatureDraft(createFeatureDraft(null, selectableAttributes[0]?.id ?? ''))
    setIsFeatureSheetOpen(true)
  }

  const openEditFeatureSheet = (index) => {
    setEditingFeatureIndex(index)
    setFeatureDraft(createFeatureDraft(formValues.featureEntries[index]))
    setIsFeatureSheetOpen(true)
  }

  const handleChangeFeatureAttribute = (nextAttributeId) => {
    setFeatureDraft((current) => ({
      ...current,
      attributeId: nextAttributeId,
      selections: [],
    }))
  }

  const handleToggleFeaturePriceMode = (nextValue) => {
    setFeatureDraft((current) => ({
      ...current,
      hasDifferentPrice: formValues.priceInquiry ? false : nextValue,
      selections: current.selections.map((selection) => ({
        ...selection,
        price: nextValue ? selection.price : '',
      })),
    }))
  }

  const handleToggleFeatureSelection = (option) => {
    setFeatureDraft((current) => {
      const hasSelection = current.selections.some(
        (selection) => selection.key === option.key
      )

      return {
        ...current,
        selections: hasSelection
          ? current.selections.filter((selection) => selection.key !== option.key)
          : [
              ...current.selections,
              {
                key: option.key,
                name: option.name,
                hex: option.hex,
                inventory: '',
                price: '',
              },
            ],
      }
    })
  }

  const handleFeatureSelectionValueChange =
    (selectionKey, field) => (nextValue) => {
      setFeatureDraft((current) => ({
        ...current,
        selections: current.selections.map((selection) =>
          selection.key === selectionKey
            ? {
                ...selection,
                [field]: nextValue,
              }
            : selection
        ),
      }))
    }

  const handleSaveFeature = () => {
    if (!isFeatureDraftReady || !activeFeatureAttribute) {
      return
    }

    const nextFeature = {
      id:
        editingFeatureIndex === null
          ? `feature-${Date.now()}`
          : formValues.featureEntries[editingFeatureIndex]?.id ?? `feature-${Date.now()}`,
      attributeId: activeFeatureAttribute.id,
      attributeName: activeFeatureAttribute.name,
      hasDifferentPrice: formValues.priceInquiry ? false : featureDraft.hasDifferentPrice,
      selections: featureDraft.selections,
    }

    setFormValues((current) => {
      const nextFeatureEntries = [...current.featureEntries]

      if (editingFeatureIndex === null) {
        nextFeatureEntries.push(nextFeature)
      } else {
        nextFeatureEntries[editingFeatureIndex] = nextFeature
      }

      return {
        ...current,
        hasFeatures: true,
        featureEntries: nextFeatureEntries,
      }
    })

    setIsFeatureSheetOpen(false)
    setEditingFeatureIndex(null)
    setFeatureDraft(createFeatureDraft(null, selectableAttributes[0]?.id ?? ''))
  }

  const handleRemoveFeature = (index) => {
    setFormValues((current) => ({
      ...current,
      featureEntries: current.featureEntries.filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }))
  }

  const handleSubmit = () => {
    const resolvedCategoryId = formValues.categoryId || categories[0]?.id || ''

    onSubmit?.({
      ...product,
      name: formValues.name.trim() || 'کالای جدید',
      description: formValues.description.trim(),
      hasVoiceDescription: formValues.hasVoiceDescription,
      categoryId: resolvedCategoryId,
      code: formValues.code || formValues.nextCode,
      inventory: formValues.inventory || '0',
      priceInquiry: formValues.priceInquiry,
      basePrice: formValues.basePrice,
      hasDiscount: formValues.priceInquiry ? false : formValues.hasDiscount,
      discountedPrice:
        formValues.priceInquiry || !formValues.hasDiscount
          ? ''
          : formValues.discountedPrice,
      hasFeatures: formValues.hasFeatures,
      featureEntries: formValues.hasFeatures ? formValues.featureEntries : [],
      hasUnitSale: formValues.hasUnitSale,
      unitSales: formValues.hasUnitSale ? formValues.unitSales : [],
      imageGallery: formValues.images,
    })
  }

  const featureSelectOptions = selectableAttributes.map((attribute) => ({
    value: attribute.id,
    label: attribute.name,
  }))

  return (
    <>
      <div
        dir="rtl"
        className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main"
      >
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <AdminScreenHeader
            icon={addToBoxIcon}
            title="کالا"
            subtitle="برای منوی خودتون کالا و جزئیات فروش تعریف کنید."
            onBack={onBack}
            iconClassName="icon-strong"
          />

          <div className="mt-6 flex flex-col gap-4 pb-6">
            <FieldInput
              label="نام کالا"
              placeholder="پیتزا وگنو"
              value={formValues.name}
              onChange={handleFormValueChange('name')}
            />

            <FieldInput
              label="توضیحات کالا"
              placeholder="انواع پیتزا های ایتالیایی"
              value={formValues.description}
              onChange={handleFormValueChange('description')}
            />

            <VoiceDescriptionField
              hasRecording={formValues.hasVoiceDescription}
              onToggle={handleToggleVoiceDescription}
              onClear={handleClearVoiceDescription}
            />

            <Dropdown
              label="انتخاب دسته بندی"
              value={formValues.categoryId}
              onChange={(event) => handleFormValueChange('categoryId')(event.target.value)}
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              placeholder="انتخاب دسته بندی"
            />

            <ToggleRow
              title="ویژگی ها"
              description="قابلیت نمایش ویژگی های کالا"
              checked={formValues.hasFeatures}
              className='border-y py-4'
              onChange={(nextValue) =>
                setFormValues((current) => ({
                  ...current,
                  hasFeatures: nextValue,
                }))
              }
            />

            <FieldInput
              label="کد کالا"
              placeholder={formatNumericValue(formValues.nextCode)}
              value={formValues.code}
              onChange={handleFormValueChange('code')}
              numeric
            />

            <FieldInput
              label="موجودی کالا"
              placeholder="۲۰۰"
              value={formValues.inventory}
              onChange={handleFormValueChange('inventory')}
              numeric
            />

            <ToggleRow
              title="استعلام قیمت"
              description="استعلام قیمت کاربر را به شماره شما هدایت می کند."
              className='border-t pt-4'
              checked={formValues.priceInquiry}
              onChange={handleTogglePriceInquiry}
            />

            <FieldInput
              label="قیمت کالا"
              placeholder="۷۰۰,۰۰۰"
              value={formValues.basePrice}
              onChange={handleFormValueChange('basePrice')}
              numeric
              grouped
              suffix="ریال"
              disabled={formValues.priceInquiry}
            />

            <ToggleRow
              title="تخفیف دارد؟"
              description="میتوانید برای این محصول تخفیف بگذارید."
              checked={formValues.hasDiscount}
              onChange={handleToggleDiscount}
              disabled={formValues.priceInquiry}
            />

            <FieldInput
              label="قیمت با تخفیف"
              placeholder="۶۹۰,۰۰۰"
              value={formValues.discountedPrice}
              onChange={handleFormValueChange('discountedPrice')}
              numeric
              grouped
              suffix="ریال"
              disabled={formValues.priceInquiry || !formValues.hasDiscount}
            />

            <ToggleRow
              title="واحد فروش پیشرفته"
              description="با فعالسازی واحد فروش پیشرفته ایجاد کنید."
              checked={formValues.hasUnitSale}
              onChange={(nextValue) =>
                setFormValues((current) => ({
                  ...current,
                  hasUnitSale: nextValue,
                }))
              }
            />

            {formValues.hasFeatures ? (
              <div className="border-t border-border-light pt-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <h2 className="text-base font-bold leading-8 text-text-strong">
                      ویژگی های کالا
                    </h2>
                    <p className="text-xs font-normal leading-5 text-text-placeholder">
                      رنگ، سایز یا سایر ویژگی های قابل انتخاب را اضافه کنید.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openCreateFeatureSheet}
                    className="inline-flex items-center gap-2 rounded-xl bg-bg-soft px-3 py-2 text-sm font-normal leading-6 text-text-moderate"
                  >
                    <img src={settingIcon} alt="" className="h-4 w-4 icon-moderate" />
                    <span>افزودن ویژگی کالا</span>
                  </button>
                </div>

                {formValues.featureEntries.length > 0 ? (
                  <div className="mt-4 flex flex-col gap-3">
                    {formValues.featureEntries.map((featureEntry, index) => (
                      <ProductFeatureCard
                        key={featureEntry.id}
                        featureEntry={featureEntry}
                        onEdit={() => openEditFeatureSheet(index)}
                        onRemove={() => handleRemoveFeature(index)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {formValues.hasUnitSale ? (
              <div className="border-t border-border-light pt-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-right">
                    <h2 className="text-base font-bold leading-8 text-text-strong">
                      واحد های فروش کالا
                    </h2>
                    <p className="text-xs font-normal leading-5 text-text-placeholder">
                      برای هر واحد قیمت، تعداد و موجودی جدا ثبت کنید.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openCreateUnitSheet}
                    className="inline-flex items-center gap-2 rounded-xl bg-bg-soft px-3 py-2 text-sm font-normal leading-6 text-text-moderate"
                  >
                    <img src={textFileIcon} alt="" className="h-4 w-4 icon-moderate" />
                    <span>افزودن واحد فروش</span>
                  </button>
                </div>

                {formValues.unitSales.length > 0 ? (
                  <div className="mt-4 flex flex-col gap-3">
                    {formValues.unitSales.map((unitSale, index) => (
                      <ProductUnitCard
                        key={unitSale.id}
                        unitSale={unitSale}
                        onEdit={() => openEditUnitSheet(index)}
                        onRemove={() => handleRemoveUnit(index)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <AdminProductImageUploader
              images={formValues.images}
              onUpload={handleUploadImages}
              onRemove={handleRemoveImage}
            />
          </div>
        </div>

        <div className="px-4 py-4">
          {mode === 'edit' ? (
            <button
              type="button"
              onClick={onDelete}
              className="mb-3 flex w-full items-center justify-center rounded-2xl bg-danger-soft px-5 py-3 text-base font-semibold leading-8 text-red-500"
            >
              حذف کالا
            </button>
          ) : null}

          <Button variant="admin" onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </div>

        <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
      </div>

      <BottomSheet
        isOpen={isFeatureSheetOpen}
        onClose={() => {
          setIsFeatureSheetOpen(false)
          setEditingFeatureIndex(null)
        }}
        ariaLabel="انتخاب ویژگی"
      >
        <div className="max-h-[70vh] overflow-y-auto px-4 pb-10">
          <h2 className="text-right text-xl font-bold leading-10 text-text-strong">
            انتخاب ویژگی
          </h2>

          <div className="mt-3">
            <Dropdown
              value={featureDraft.attributeId}
              onChange={(event) => handleChangeFeatureAttribute(event.target.value)}
              options={featureSelectOptions}
              placeholder="انتخاب ویژگی"
            />
          </div>

          <div className="mt-5 border-t border-border-light pt-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-base font-bold leading-8 text-text-strong">
                قیمت فروش متفاوت دارد؟
              </span>
              <InlineSwitch
                checked={!formValues.priceInquiry && featureDraft.hasDifferentPrice}
                onChange={handleToggleFeaturePriceMode}
                disabled={formValues.priceInquiry}
              />
            </div>
          </div>

          {activeFeatureAttribute ? (
            <>
              <div className="mt-5 flex flex-wrap justify-end gap-2">
                {featureValueOptions.map((option) => {
                  const isSelected = featureDraft.selections.some(
                    (selection) => selection.key === option.key
                  )

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleToggleFeatureSelection(option)}
                      className="inline-flex items-center gap-2 rounded-xl bg-bg-soft px-3 py-2 text-sm font-normal leading-6 text-text-moderate"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                          isSelected
                            ? 'border-header-from bg-header-from text-text-white'
                            : 'border-border-light bg-bg-main text-transparent'
                        }`}
                      >
                        <span className="text-xs leading-none">✓</span>
                      </span>
                      {option.hex ? (
                        <span
                          className="h-4 w-4 rounded-full border border-black/10"
                          style={{ backgroundColor: option.hex }}
                        />
                      ) : null}
                      <span>{option.name}</span>
                    </button>
                  )
                })}
              </div>

              {featureDraft.selections.length > 0 ? (
                <div className="mt-5 flex flex-col gap-4">
                  {featureDraft.selections.map((selection) =>
                    formValues.priceInquiry || !featureDraft.hasDifferentPrice ? (
                      <FieldInput
                        key={`${selection.key}-inventory`}
                        label={`موجودی ${selection.name}`}
                        placeholder="۱۲"
                        value={selection.inventory}
                        onChange={handleFeatureSelectionValueChange(
                          selection.key,
                          'inventory'
                        )}
                        numeric
                      />
                    ) : (
                      <div
                        key={selection.key}
                        className="grid grid-cols-2 gap-3"
                      >
                        <FieldInput
                          label={`قیمت ${selection.name}`}
                          placeholder="۱۲۰,۰۰۰"
                          value={selection.price}
                          onChange={handleFeatureSelectionValueChange(
                            selection.key,
                            'price'
                          )}
                          numeric
                          grouped
                          suffix="ریال"
                        />
                        <FieldInput
                          label={`موجودی ${selection.name}`}
                          placeholder="۱۲"
                          value={selection.inventory}
                          onChange={handleFeatureSelectionValueChange(
                            selection.key,
                            'inventory'
                          )}
                          numeric
                        />
                      </div>
                    )
                  )}
                </div>
              ) : null}
            </>
          ) : (
            <p className="mt-5 text-right text-sm font-normal leading-6 text-text-placeholder">
              ابتدا یک ویژگی دارای مقدار از بخش ویژگی ها بسازید.
            </p>
          )}

          <div className="mt-8">
            <Button
              variant="admin"
              onClick={handleSaveFeature}
              disabled={!isFeatureDraftReady}
            >
              {featureSheetLabel}
            </Button>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isUnitSheetOpen}
        onClose={() => {
          setIsUnitSheetOpen(false)
          setEditingUnitIndex(null)
        }}
        ariaLabel="واحد فروش"
      >
        <div className="max-h-[70vh] overflow-y-auto px-4 pb-10">
          <FieldInput
            label="نام واحد"
            placeholder="جین"
            value={unitDraft.name}
            onChange={(value) =>
              setUnitDraft((current) => ({
                ...current,
                name: value,
              }))
            }
          />

          <div className="mt-4">
            <FieldInput
              label="قیمت هر واحد"
              placeholder="۲۵۶,۰۰۰"
              value={unitDraft.price}
              onChange={(value) =>
                setUnitDraft((current) => ({
                  ...current,
                  price: value,
                }))
              }
              numeric
              grouped
              suffix="ریال"
            />
          </div>

          <div className="mt-4">
            <FieldInput
              label="تعداد در واحد"
              placeholder="۱۲"
              value={unitDraft.quantity}
              onChange={(value) =>
                setUnitDraft((current) => ({
                  ...current,
                  quantity: value,
                }))
              }
              numeric
            />
          </div>

          <div className="mt-4">
            <FieldInput
              label="موجودی واحد"
              placeholder="۳۰۰"
              value={unitDraft.inventory}
              onChange={(value) =>
                setUnitDraft((current) => ({
                  ...current,
                  inventory: value,
                }))
              }
              numeric
            />
          </div>

          <div className="mt-8">
            {editingUnitIndex !== null ? (
              <button
                type="button"
                onClick={handleDeleteUnitFromSheet}
                className="mb-3 flex w-full items-center justify-center rounded-2xl bg-danger-soft px-5 py-3 text-base font-semibold leading-8 text-red-500"
              >
                حذف واحد فروش
              </button>
            ) : null}

            <Button
              variant="admin"
              onClick={handleSaveUnit}
              disabled={!isUnitDraftReady}
            >
              {unitSheetLabel}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  )
}

export default AdminProductFormScreen

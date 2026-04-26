import { useEffect, useMemo, useRef, useState } from 'react'
import Button from '../../components/Button'
import BottomSheet from '../../components/BottomSheet'
import TextInput from '../../components/TextInput'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminScreenHeader from '../../components/admin/AdminScreenHeader'
import AdminAttributeValueChip from '../../components/admin/AdminAttributeValueChip'
import categoryHeaderIcon from '../../assets/images/admin/category.svg'
import arrowDown from '../../assets/images/admin/arrow-down.svg'

const DEFAULT_COLOR_HEX = '#F6D08F'

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

const normalizeHexColor = (value = '') => {
  const sanitized = value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6)

  if (sanitized.length === 3) {
    return `#${sanitized
      .split('')
      .map((character) => `${character}${character}`)
      .join('')
      .toUpperCase()}`
  }

  if (sanitized.length === 6) {
    return `#${sanitized.toUpperCase()}`
  }

  return ''
}

const sanitizeHexInput = (value = '') => {
  const sanitized = value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6).toUpperCase()

  if (!sanitized && !value.includes('#')) {
    return ''
  }

  return `#${sanitized}`
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const componentToHex = (value) =>
  Math.round(value).toString(16).padStart(2, '0').toUpperCase()

const hsvToRgb = (h, s, v) => {
  const hue = ((h % 360) + 360) % 360
  const chroma = v * s
  const segment = hue / 60
  const secondary = chroma * (1 - Math.abs((segment % 2) - 1))
  const match = v - chroma

  let red = 0
  let green = 0
  let blue = 0

  if (segment >= 0 && segment < 1) {
    red = chroma
    green = secondary
  } else if (segment >= 1 && segment < 2) {
    red = secondary
    green = chroma
  } else if (segment >= 2 && segment < 3) {
    green = chroma
    blue = secondary
  } else if (segment >= 3 && segment < 4) {
    green = secondary
    blue = chroma
  } else if (segment >= 4 && segment < 5) {
    red = secondary
    blue = chroma
  } else {
    red = chroma
    blue = secondary
  }

  return {
    r: (red + match) * 255,
    g: (green + match) * 255,
    b: (blue + match) * 255,
  }
}

const rgbToHsv = (red, green, blue) => {
  const r = red / 255
  const g = green / 255
  const b = blue / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let hue = 0

  if (delta !== 0) {
    if (max === r) {
      hue = 60 * (((g - b) / delta) % 6)
    } else if (max === g) {
      hue = 60 * ((b - r) / delta + 2)
    } else {
      hue = 60 * ((r - g) / delta + 4)
    }
  }

  if (hue < 0) {
    hue += 360
  }

  return {
    h: hue,
    s: max === 0 ? 0 : delta / max,
    v: max,
  }
}

const hexToRgb = (value = '') => {
  const normalized = normalizeHexColor(value)

  if (!normalized) {
    return null
  }

  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  }
}

const hexToHsv = (value = '') => {
  const rgb = hexToRgb(value)

  if (!rgb) {
    return { h: 0, s: 0, v: 1 }
  }

  return rgbToHsv(rgb.r, rgb.g, rgb.b)
}

const hsvToHex = ({ h, s, v }) => {
  const rgb = hsvToRgb(h, s, v)

  return `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`
}

const createFormState = (attribute, nextOrder) => ({
  id: attribute?.id ?? '',
  type: attribute?.type ?? '',
  name: attribute?.name ?? '',
  order: attribute?.order ?? String(nextOrder),
  values: attribute?.values ?? [],
  pendingValue: '',
  colorValueName: '',
  colorHex: DEFAULT_COLOR_HEX,
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
  const [showSizePicker, setShowSizePicker] = useState(false)
  const colorAreaRef = useRef(null)
  const hueSliderRef = useRef(null)
  const colorAreaPointerIdRef = useRef(null)
  const hueSliderPointerIdRef = useRef(null)

  useEffect(() => {
    setFormValues(createFormState(attribute, nextOrder))
  }, [attribute, nextOrder])

  const selectedType = useMemo(
    () =>
      attributeTypeOptions.find((item) => item.value === formValues.type) ?? null,
    [formValues.type]
  )

  const submitLabel = mode === 'create' ? 'ثبت ویژگی' : 'ویرایش ویژگی'
  const selectedColorHex = normalizeHexColor(formValues.colorHex) || DEFAULT_COLOR_HEX
  const selectedColorHsv = useMemo(() => hexToHsv(selectedColorHex), [selectedColorHex])
  const selectedHueHex = useMemo(
    () => hsvToHex({ h: selectedColorHsv.h, s: 1, v: 1 }),
    [selectedColorHsv.h]
  )
  const colorIndicatorPosition = useMemo(
    () => ({
      left: `${selectedColorHsv.s * 100}%`,
      top: `${(1 - selectedColorHsv.v) * 100}%`,
    }),
    [selectedColorHsv.s, selectedColorHsv.v]
  )
  const hueIndicatorPosition = useMemo(
    () => ({
      left: `${(selectedColorHsv.h / 360) * 100}%`,
    }),
    [selectedColorHsv.h]
  )
  const isColorValueReady =
    Boolean(formValues.colorValueName.trim()) && Boolean(normalizeHexColor(formValues.colorHex))
  const isSizeValueReady = Boolean(formValues.pendingValue.trim())

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
      colorHex: DEFAULT_COLOR_HEX,
    }))
    setShowTypePicker(false)
    setShowColorPicker(false)
    setShowSizePicker(false)
  }

  const handleAddValue = () => {
    const nextValue =
      formValues.type === 'color'
        ? {
            name: formValues.colorValueName.trim(),
            hex: normalizeHexColor(formValues.colorHex),
          }
        : formValues.pendingValue.trim()

    if (
      (formValues.type === 'color' && (!nextValue.name || !nextValue.hex)) ||
      (formValues.type !== 'color' && !nextValue)
    ) {
      return
    }

    setFormValues((current) => ({
      ...current,
      values: [...current.values, nextValue],
      pendingValue: '',
      colorValueName: '',
      colorHex: DEFAULT_COLOR_HEX,
    }))
    setShowColorPicker(false)
    setShowSizePicker(false)
  }

  const handleRemoveValue = (indexToRemove) => {
    setFormValues((current) => ({
      ...current,
      values: current.values.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleColorHexChange = (event) => {
    setFormValues((current) => ({
      ...current,
      colorHex: sanitizeHexInput(event.target.value),
    }))
  }

  const updateColorFromArea = (clientX, clientY) => {
    if (!colorAreaRef.current) {
      return
    }

    const rect = colorAreaRef.current.getBoundingClientRect()
    const saturation = clamp((clientX - rect.left) / rect.width, 0, 1)
    const value = clamp(1 - (clientY - rect.top) / rect.height, 0, 1)

    setFormValues((current) => {
      const currentHex = normalizeHexColor(current.colorHex) || DEFAULT_COLOR_HEX
      const currentHsv = hexToHsv(currentHex)

      return {
        ...current,
        colorHex: hsvToHex({
          h: currentHsv.h,
          s: saturation,
          v: value,
        }),
      }
    })
  }

  const updateHueFromSlider = (clientX) => {
    if (!hueSliderRef.current) {
      return
    }

    const rect = hueSliderRef.current.getBoundingClientRect()
    const hue = clamp((clientX - rect.left) / rect.width, 0, 1) * 360

    setFormValues((current) => {
      const currentHex = normalizeHexColor(current.colorHex) || DEFAULT_COLOR_HEX
      const currentHsv = hexToHsv(currentHex)

      return {
        ...current,
        colorHex: hsvToHex({
          h: hue,
          s: currentHsv.s,
          v: currentHsv.v,
        }),
      }
    })
  }

  const handleColorAreaPointerDown = (event) => {
    colorAreaPointerIdRef.current = event.pointerId
    event.currentTarget.setPointerCapture?.(event.pointerId)
    updateColorFromArea(event.clientX, event.clientY)
  }

  const handleColorAreaPointerMove = (event) => {
    if (colorAreaPointerIdRef.current !== event.pointerId) {
      return
    }

    updateColorFromArea(event.clientX, event.clientY)
  }

  const handleColorAreaPointerEnd = (event) => {
    if (colorAreaPointerIdRef.current !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId)
    colorAreaPointerIdRef.current = null
  }

  const handleHueSliderPointerDown = (event) => {
    hueSliderPointerIdRef.current = event.pointerId
    event.currentTarget.setPointerCapture?.(event.pointerId)
    updateHueFromSlider(event.clientX)
  }

  const handleHueSliderPointerMove = (event) => {
    if (hueSliderPointerIdRef.current !== event.pointerId) {
      return
    }

    updateHueFromSlider(event.clientX)
  }

  const handleHueSliderPointerEnd = (event) => {
    if (hueSliderPointerIdRef.current !== event.pointerId) {
      return
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId)
    hueSliderPointerIdRef.current = null
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

                        if (formValues.type === 'size') {
                          setShowSizePicker(true)
                        }
                      }}
                      className="min-w-20 rounded-xl bg-bg-soft px-3 py-2 text-sm font-normal leading-6 text-text-moderate"
                    >
                      {formValues.type === 'color' ? 'افزودن رنگ' : 'افزودن سایز'}
                    </button>
                  </div>

                  {formValues.values.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {formValues.values.map((value, index) => (
                        <AdminAttributeValueChip
                          key={
                            typeof value === 'object' && value !== null
                              ? `${value.name}-${value.hex}-${index}`
                              : `${value}-${index}`
                          }
                          value={value}
                          onRemove={() => handleRemoveValue(index)}
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

      <BottomSheet
        isOpen={showTypePicker}
        onClose={() => setShowTypePicker(false)}
        ariaLabel="انتخاب نوع ویژگی"
      >
        <div className="px-4 pb-3">
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
      </BottomSheet>

      <BottomSheet
        isOpen={showColorPicker}
        onClose={() => setShowColorPicker(false)}
        ariaLabel="انتخاب رنگ"
      >
        <div className="px-4 pb-10">
          <TextInput
            label="عنوان رنگ"
            placeholder="سبز"
            value={formValues.colorValueName}
            onChange={handleFieldChange('colorValueName')}
          />

          <div className="mt-4">
            <div
              className="relative h-40 overflow-hidden rounded-xl"
              style={{ backgroundColor: selectedHueHex }}
            >
              <div
                ref={colorAreaRef}
                role="slider"
                aria-label="ناحیه انتخاب رنگ"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(selectedColorHsv.s * 100)}
                tabIndex={0}
                onPointerDown={handleColorAreaPointerDown}
                onPointerMove={handleColorAreaPointerMove}
                onPointerUp={handleColorAreaPointerEnd}
                onPointerCancel={handleColorAreaPointerEnd}
                className="h-full touch-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to top, #000000, rgba(0, 0, 0, 0)), linear-gradient(to right, #FFFFFF, rgba(255, 255, 255, 0))',
                }}
              />

              <span
                className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
                style={{
                  left: colorIndicatorPosition.left,
                  top: colorIndicatorPosition.top,
                  backgroundColor: selectedColorHex,
                }}
              />
            </div>
          </div>

          <div
            ref={hueSliderRef}
            role="slider"
            aria-label="نوار انتخاب طیف رنگ"
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={Math.round(selectedColorHsv.h)}
            tabIndex={0}
            onPointerDown={handleHueSliderPointerDown}
            onPointerMove={handleHueSliderPointerMove}
            onPointerUp={handleHueSliderPointerEnd}
            onPointerCancel={handleHueSliderPointerEnd}
            className="relative mt-3 h-3 rounded-full touch-none bg-[linear-gradient(90deg,#ff0000,#ff9800,#ffee00,#37ff00,#00d1ff,#001eff,#ff00e5,#ff0000)]"
          >
            <span
              className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
              style={{
                left: hueIndicatorPosition.left,
                backgroundColor: selectedHueHex,
              }}
            />
          </div>

          <div className="mt-4 flex w-full flex-col gap-1">
            <label className="w-full text-right text-base font-semibold text-text-strong">
              کد رنگ
            </label>
            <div className="relative w-full">
              <input
                type="text"
                dir="ltr"
                placeholder="#FFFFFF"
                value={formValues.colorHex}
                onChange={handleColorHexChange}
                className="w-full rounded-2xl bg-bg-base py-4 pl-4 pr-16 text-left text-base font-normal uppercase text-text-strong outline-none transition-all placeholder:text-[#a3a9b6] focus:ring-2 focus:ring-primary"
              />
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <span
                  className="h-8 w-8 rounded-xl border border-border-light shadow-sm"
                  style={{ backgroundColor: selectedColorHex }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="admin" onClick={handleAddValue} disabled={!isColorValueReady}>
              افزودن رنگ
            </Button>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={showSizePicker}
        onClose={() => setShowSizePicker(false)}
        ariaLabel="افزودن سایز"
      >
        <div className="px-4 pb-10">
          <TextInput
            label="عنوان سایز"
            placeholder="لباس"
            value={formValues.name}
            onChange={handleFieldChange('name')}
          />

          <div className="mt-6">
            <TextInput
              label="مقدار سایز"
              placeholder="XL"
              value={formValues.pendingValue}
              onChange={handleFieldChange('pendingValue')}
            />
          </div>

          <div className="mt-6">
            <Button variant="admin" onClick={handleAddValue} disabled={!isSizeValueReady}>
              افزودن سایز
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  )
}

export default AdminAttributeFormScreen

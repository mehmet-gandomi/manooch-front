// src/screens/admin/AdminBusinessInfoScreen.jsx
// Business information management screen based on the Figma business node

import { useEffect, useMemo, useState } from 'react'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import BottomSheet from '../../components/BottomSheet'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import TextAreaInput from '../../components/TextAreaInput'
import TextInput from '../../components/TextInput'
import arrowDownIcon from '../../assets/images/admin/arrow-down.svg'
import arrowLeftIcon from '../../assets/images/admin/arrow-left-1.svg'
import briefcaseIcon from '../../assets/images/admin/briefcase.svg'
import ExportIcon from '../../assets/images/admin/export.svg'
import linkIcon from '../../assets/images/admin/link-diagonal-2.svg'
import trashIcon from '../../assets/images/admin/trash-2.svg'
import categoryIcon from '../../assets/images/category.svg'
import shopIcon from '../../assets/images/shop.svg'

const businessTabs = [
  { key: 'details', label: 'اطلاعات', submitLabel: 'ثبت اطلاعات' },
  { key: 'contact', label: 'راه ارتباطی', submitLabel: 'ثبت راه ارتباطی' },
  { key: 'links', label: 'لینکدونی', submitLabel: 'ثبت لینکدونی' },
]

const categoryOptions = [
  { value: 'jewelry', label: 'بدلیجات' },
  { value: 'clothing', label: 'پوشاک' },
  { value: 'food', label: 'مواد غذایی' },
]

const socialIconModules = import.meta.glob(
  '../../assets/images/social-icons/*.svg',
  {
    eager: true,
    import: 'default',
  }
)

const getSocialIcon = (platform) =>
  socialIconModules[
    `../../assets/images/social-icons/Platform=${platform}, Color=Brand, State=Default.svg`
  ]

const socialNetworkOptions = [
  {
    value: 'website',
    label: 'وبسایت',
    placeholder: 'Https://ieffect.ir',
    icon: linkIcon,
  },
  {
    value: 'instagram',
    label: 'اینستاگرام',
    placeholder: '@ieffect.studio',
    icon: getSocialIcon('Instagram'),
  },
  {
    value: 'telegram',
    label: 'تلگرام',
    placeholder: '@effect',
    icon: getSocialIcon('Telegram'),
  },
  {
    value: 'youtube',
    label: 'یوتوب',
    placeholder: '@effect',
    icon: getSocialIcon('YouTube'),
  },
  {
    value: 'whatsapp',
    label: 'واتساپ',
    placeholder: '@effect',
    icon: getSocialIcon('WhatsApp'),
  },
  {
    value: 'bale',
    label: 'بله',
    placeholder: '@effect',
    icon: getSocialIcon('bale'),
  },
  {
    value: 'rubika',
    label: 'روبیکا',
    placeholder: '@effect',
    icon: getSocialIcon('Rubika'),
  },
  {
    value: 'aparat',
    label: 'آپارات',
    placeholder: '@effect',
    icon: getSocialIcon('Aparat'),
  },
  {
    value: 'eitaa',
    label: 'ایتا',
    placeholder: '@effect',
    icon: getSocialIcon('Eitaa'),
  },
  {
    value: 'facebook',
    label: 'فیسبوک',
    placeholder: 'Https://facebook.com/ieffect',
    icon: getSocialIcon('Facebook'),
  },
  {
    value: 'x',
    label: 'ایکس',
    placeholder: '@effect',
    icon: getSocialIcon('Twitter'),
  },
  {
    value: 'linkedin',
    label: 'لینکدین',
    placeholder: '@effect',
    icon: getSocialIcon('LinkedIn'),
  },
  {
    value: 'tiktok',
    label: 'تیک تاک',
    placeholder: '@effect',
    icon: getSocialIcon('TikTok'),
  },
  {
    value: 'pinterest',
    label: 'پینترست',
    placeholder: '@effect',
    icon: getSocialIcon('Pinterest'),
  },
  {
    value: 'discord',
    label: 'دیسکورد',
    placeholder: '@effect',
    icon: getSocialIcon('Discord'),
  },
]

const getSocialOption = (value) =>
  socialNetworkOptions.find((option) => option.value === value)

const linkFields = [
  getSocialOption('website'),
  getSocialOption('instagram'),
  getSocialOption('telegram'),
  getSocialOption('youtube'),
  getSocialOption('bale'),
  getSocialOption('rubika'),
  getSocialOption('aparat'),
  getSocialOption('eitaa'),
].map((option) => ({
  key: option.value,
  label: option.label,
  placeholder: option.placeholder,
  icon: option.icon,
}))

const numberFormatter = new Intl.NumberFormat('fa-IR')
const initialLinkCount = 14

const createCustomLinkKey = (type) =>
  `${type || 'social'}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

const LinkInputRow = ({
  field,
  value,
  isSelected,
  onToggleSelect,
  onChange,
}) => (
  <div className='flex gap-3'>
    <div className="mb-1 flex items-center gap-2">
      <button
        type="button"
        onClick={() => onToggleSelect?.(field.key)}
        aria-pressed={isSelected}
        aria-label={`انتخاب ${field.label}`}
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
          isSelected
            ? 'border-header-from bg-header-from text-text-white'
            : 'border-border-light bg-bg-main text-transparent'
        }`}
      >
        <span className="text-[10px] leading-none">✓</span>
      </button>
    </div>


    <div className='w-full'>
      <label className="text-base font-semibold leading-8 text-text-strong">
        {field.label}
      </label>
      <input
        type="text"
        value={value ?? ''}
        onChange={onChange}
        placeholder={field.placeholder}
        dir="ltr"
        className="h-11 w-full rounded-xl bg-bg-base px-4 text-left text-sm font-normal text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary"
      />
    </div>
  </div>
)

const SocialOptionIcon = ({ option, className = 'h-6 w-6' }) => (
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-base">
    <img src={option.icon ?? linkIcon} alt="" className={className} />
  </span>
)

const AdminBusinessInfoScreen = ({
  activeTab = 'business',
  initialBusinessTab = 'details',
  onBusinessTabChange,
  onTabChange,
  onBack,
}) => {
  const [activeBusinessTab, setActiveBusinessTab] = useState(initialBusinessTab)
  const [links, setLinks] = useState(linkFields)
  const [totalLinkCount, setTotalLinkCount] = useState(initialLinkCount)
  const [selectedLinkKeys, setSelectedLinkKeys] = useState(() =>
    linkFields.slice(0, 5).map((field) => field.key)
  )
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false)
  const [isSocialSelectorOpen, setIsSocialSelectorOpen] = useState(false)
  const [linkDraft, setLinkDraft] = useState({
    type: '',
    url: '',
  })
  const [formValues, setFormValues] = useState({
    businessName: '',
    category: '',
    about: '',
    supportPhone: '',
    supportId: '',
    primaryPhone: '',
    secondaryPhone: '',
    address: '',
    showAreaRange: false,
    googleMapLink: '',
    neshanLink: '',
    website: '',
    instagram: '',
    telegram: '',
    youtube: '',
    bale: '',
    rubika: '',
    aparat: '',
    eitaa: '',
    facebook: '',
    whatsapp: '',
    x: '',
    linkedin: '',
    tiktok: '',
    pinterest: '',
  })

  useEffect(() => {
    setActiveBusinessTab(initialBusinessTab)
  }, [initialBusinessTab])

  const currentBusinessTab = useMemo(
    () =>
      businessTabs.find((tab) => tab.key === activeBusinessTab) ?? businessTabs[0],
    [activeBusinessTab]
  )

  const selectedSocialOption = useMemo(
    () => socialNetworkOptions.find((option) => option.value === linkDraft.type),
    [linkDraft.type]
  )

  const handleFieldChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const toggleAreaRange = () => {
    setFormValues((prev) => ({
      ...prev,
      showAreaRange: !prev.showAreaRange,
    }))
  }

  const handleBusinessTabChange = (nextTab) => {
    setActiveBusinessTab(nextTab)
    onBusinessTabChange?.(nextTab)
  }

  const handleToggleLinkSelect = (key) => {
    setSelectedLinkKeys((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    )
  }

  const handleDeleteSelectedLinks = () => {
    if (selectedLinkKeys.length === 0) {
      return
    }

    setLinks((current) =>
      current.filter((field) => !selectedLinkKeys.includes(field.key))
    )
    setTotalLinkCount((current) =>
      Math.max(0, current - selectedLinkKeys.length)
    )
    setSelectedLinkKeys([])
  }

  const handleAddLink = () => {
    if (!selectedSocialOption || !linkDraft.url.trim()) {
      return
    }

    const selectedOption = selectedSocialOption
    const key = createCustomLinkKey(selectedOption.value)

    setLinks((current) => [
      ...current,
      {
        key,
        label: selectedOption.label,
        placeholder: selectedOption.placeholder,
        icon: selectedOption.icon,
      },
    ])
    setTotalLinkCount((current) => current + 1)
    setFormValues((prev) => ({
      ...prev,
      [key]: linkDraft.url,
    }))
    setLinkDraft({
      type: '',
      url: '',
    })
    setIsAddLinkOpen(false)
  }

  const handleCloseAddLink = () => {
    setIsAddLinkOpen(false)
    setIsSocialSelectorOpen(false)
  }

  const handleSelectSocialNetwork = (option) => {
    setLinkDraft((current) => ({
      ...current,
      type: option.value,
    }))
    setIsSocialSelectorOpen(false)
  }

  const renderBusinessTabContent = () => {
    if (activeBusinessTab === 'contact') {
      return (
        <div className="mt-6 flex flex-col gap-4 pb-6">
          <TextInput
            label="تلفن تماس اول"
            placeholder="۰۹۱۵"
            value={formValues.primaryPhone}
            onChange={handleFieldChange('primaryPhone')}
            className="flex-row-reverse"
          />

          <TextInput
            label="تلفن تماس دوم"
            placeholder="۰۹۱۵"
            value={formValues.secondaryPhone}
            onChange={handleFieldChange('secondaryPhone')}
            className="flex-row-reverse"
          />

          <TextInput
            label="آدرس"
            placeholder="مشهد، پیروزی ..."
            value={formValues.address}
            onChange={handleFieldChange('address')}
            showInfoIcon
          />

          <div className="border-b border-border-light pb-4 flex flex-row-reverse">
            <div className='mr-4'>
              <span className="text-right text-base font-semibold text-text-strong">
                نمایش محدوده مکانی
              </span>
              <p className="mt-2 text-right text-sm font-normal leading-6 text-text-moderate">
                با فعالسازی این گزینه کاربر محدوده شما را می بیند نه لوکیشن دقیق
                شما!
              </p>
            </div>
            <div>
              <button
                type="button"
                role="switch"
                aria-checked={formValues.showAreaRange}
                onClick={toggleAreaRange}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  formValues.showAreaRange ? 'bg-primary' : 'bg-border-light'
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-bg-main shadow-sm transition-all ${
                    formValues.showAreaRange ? 'left-1' : 'left-6'
                  }`}
                />
              </button>
            </div>
          </div>

          <TextInput
            label="لینک گوگل مپ"
            placeholder="https://maps.google.com/"
            value={formValues.googleMapLink}
            onChange={handleFieldChange('googleMapLink')}
            className="flex-row-reverse"
          />

          <TextInput
            label="لینک نشان"
            placeholder="https://neshan.org/maps#c36.285-59.549-17z"
            value={formValues.neshanLink}
            onChange={handleFieldChange('neshanLink')}
            className="flex-row-reverse"
          />
        </div>
      )
    }

    if (activeBusinessTab === 'links') {
      return (
        <div className="mt-4 flex flex-col gap-4 pb-6">
          <div className="flex min-h-8 items-center justify-between gap-3">
            {selectedLinkKeys.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={handleDeleteSelectedLinks}
                  className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-1.5 text-xs font-normal leading-5 text-red-500"
                >
                  <img src={trashIcon} alt="حذف لینک" className="h-4 w-4" />
                  <span>{`حذف ${numberFormatter.format(selectedLinkKeys.length)} لینک`}</span>
                </button>
              </>
            ) : null}
            <span className="text-xs font-normal leading-5 text-text-moderate">
              {`${numberFormatter.format(totalLinkCount)} عدد لینک`}
            </span>
          </div>

          {links.map((field) => (
            <LinkInputRow
              key={field.key}
              field={field}
              value={formValues[field.key]}
              onChange={handleFieldChange(field.key)}
              isSelected={selectedLinkKeys.includes(field.key)}
              onToggleSelect={handleToggleLinkSelect}
            />
          ))}
        </div>
      )
    }

    return (
      <>
        <div className="mt-6 flex">
          {/* Temporary fallback until a dedicated export/share asset is added locally. */}
          <button
            type="button"
            aria-label="اشتراک گذاری"
            className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-border-light bg-bg-main shadow-md"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-border-light bg-bg-main">
              <img
                src={ExportIcon}
                alt=""
                className="h-6 w-6 icon-moderate"
              />
            </span>
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-3 pb-6">
          <TextInput
            label="نام کسب و کار"
            placeholder="بدلیجات تاج محل"
            value={formValues.businessName}
            onChange={handleFieldChange('businessName')}
            required
            icon={shopIcon}
            showInfoIcon
          />

          <Dropdown
            label="دسته"
            placeholder="بدلیجات"
            helperText="دسته کسب و کار خودتان را با دقت انتخاب کنید"
            value={formValues.category}
            onChange={handleFieldChange('category')}
            options={categoryOptions}
            required
            icon={categoryIcon}
          />

          <TextAreaInput
            label="درباره کسب و کار"
            placeholder="ما سال هاست در تلاشیم بهترین خدمات را به .."
            value={formValues.about}
            onChange={handleFieldChange('about')}
            heightClass="h-28"
          />

          <TextInput
            label="تلفن پشتیبانی"
            placeholder="۰۹۱۵"
            value={formValues.supportPhone}
            onChange={handleFieldChange('supportPhone')}
            className="flex-row-reverse"
            showInfoIcon
          />

          <TextInput
            label="آیدی پشتیبانی"
            placeholder="ieffect.ir"
            value={formValues.supportId}
            onChange={handleFieldChange('supportId')}
            className="flex-row-reverse"
            showInfoIcon
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div
        dir="rtl"
        className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main"
      >
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 flex-row items-center gap-3 text-right">
            <img src={briefcaseIcon} alt="" className="h-8 w-8 shrink-0" />

            <div>
              <h1 className="text-base font-bold leading-8 text-text-strong">
                اطلاعات کسب و کار
              </h1>
              <p className="text-xs font-normal leading-5 text-text-moderate">
                افزونه های مورد نیاز خودت رو فعال کن
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            aria-label="بازگشت"
            className="flex h-8 w-8 items-center justify-center"
          >
            <img src={arrowLeftIcon} alt="" className="h-6 w-6 icon-strong" />
          </button>
        </div>

        <div className="mt-6 flex rounded-2xl bg-bg-base p-1">
          {businessTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleBusinessTabChange(tab.key)}
              className={`flex-1 rounded-xl px-3 py-2 text-center text-sm font-normal leading-6 ${
                activeBusinessTab === tab.key
                  ? 'bg-bg-soft text-text-heading'
                  : 'text-text-placeholder'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderBusinessTabContent()}
      </div>

      {activeBusinessTab === 'links' ? (
        <div className="px-4 py-4">
          <div className="flex justify-start">
            <Button
              variant="admin"
              className="!w-[159px]"
              onClick={() => setIsAddLinkOpen(true)}
            >
              <span className="text-xl leading-none">+</span>
              <span>افزودن لینک</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-4">
          <Button variant="primary" className="bg-header-from">
            {currentBusinessTab.submitLabel}
          </Button>
        </div>
      )}

      <AdminMenuBar activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      <BottomSheet
        isOpen={isAddLinkOpen}
        onClose={handleCloseAddLink}
        ariaLabel="افزودن لینک"
      >
        <div dir="rtl" className="px-4 pb-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold leading-8 text-text-strong">
                شبکه اجتماعی
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSocialSelectorOpen(true)}
                  dir="rtl"
                  aria-haspopup="dialog"
                  aria-expanded={isSocialSelectorOpen}
                  className={`flex h-11 w-full items-center gap-3 rounded-2xl bg-bg-base py-2 pl-12 pr-4 text-right text-base font-normal outline-none transition-all focus:ring-2 focus:ring-primary ${
                    linkDraft.type ? 'text-text-strong' : 'text-text-placeholder'
                  }`}
                >
                  {selectedSocialOption ? (
                    <SocialOptionIcon option={selectedSocialOption} />
                  ) : (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-disable">
                      <img src={linkIcon} alt="" className="h-5 w-5 brightness-0 invert" />
                    </span>
                  )}
                  <span>
                    {selectedSocialOption?.label ?? 'انتخاب کنید'}
                  </span>
                </button>
                <img
                  src={arrowDownIcon}
                  alt=""
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 icon-moderate"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base font-semibold leading-8 text-text-strong">
                لینک
              </label>
              <input
                type="text"
                value={linkDraft.url}
                onChange={(event) =>
                  setLinkDraft((current) => ({
                    ...current,
                    url: event.target.value,
                  }))
                }
                placeholder="Https://ieffect.ir"
                dir="ltr"
                className="h-11 w-full rounded-2xl bg-bg-base px-4 text-left text-base font-normal text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              variant="admin"
              onClick={handleAddLink}
              disabled={!selectedSocialOption || !linkDraft.url.trim()}
            >
              افزودن لینک
            </Button>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isSocialSelectorOpen}
        onClose={() => setIsSocialSelectorOpen(false)}
        ariaLabel="انتخاب شبکه اجتماعی"
      >
        <div dir="rtl" className="px-4 pb-8">
          <div className="mb-4 flex flex-col gap-1">
            <h2 className="text-base font-semibold leading-8 text-text-strong">
              انتخاب شبکه اجتماعی
            </h2>
            <p className="text-sm font-normal leading-6 text-text-moderate">
              نام شبکه را انتخاب کنید، سپس لینک آن را وارد کنید.
            </p>
          </div>

          <div className="-mx-1 flex max-h-[58vh] flex-col gap-2 overflow-y-auto px-1">
            {socialNetworkOptions.map((option) => {
              const isSelected = linkDraft.type === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelectSocialNetwork(option)}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-3 text-right transition-colors ${
                    isSelected ? 'bg-bg-soft' : 'bg-bg-base'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <SocialOptionIcon option={option} />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-base font-semibold leading-7 text-text-strong">
                        {option.label}
                      </span>
                    </span>
                  </span>

                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                      isSelected
                        ? 'border-header-from bg-header-from text-text-white'
                        : 'border-border-light text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </BottomSheet>
    </>
  )
}

export default AdminBusinessInfoScreen

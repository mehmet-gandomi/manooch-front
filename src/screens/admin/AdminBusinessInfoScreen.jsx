// src/screens/admin/AdminBusinessInfoScreen.jsx
// Business information management screen based on the Figma business node

import { useEffect, useMemo, useState } from 'react'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import TextAreaInput from '../../components/TextAreaInput'
import TextInput from '../../components/TextInput'
import arrowLeftIcon from '../../assets/images/admin/arrow-left-1.svg'
import briefcaseIcon from '../../assets/images/admin/briefcase.svg'
import ExportIcon from '../../assets/images/admin/export.svg'
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

const linkFields = [
  { key: 'website', label: 'وبسایت', placeholder: 'Https://ieffect.ir' },
  { key: 'instagram', label: 'اینستاگرام', placeholder: '@ieffect.studio' },
  { key: 'telegram', label: 'تلگرام', placeholder: '@effect' },
  { key: 'youtube', label: 'یوتوب', placeholder: '@effect' },
  { key: 'bale', label: 'بله', placeholder: '@effect' },
  { key: 'rubika', label: 'روبیکا', placeholder: '@effect' },
  { key: 'aparat', label: 'آپارات', placeholder: '@effect' },
  { key: 'eitaa', label: 'ایتا', placeholder: '@effect' },
]

const AdminBusinessInfoScreen = ({
  activeTab = 'business',
  initialBusinessTab = 'details',
  onBusinessTabChange,
  onTabChange,
  onBack,
}) => {
  const [activeBusinessTab, setActiveBusinessTab] = useState(initialBusinessTab)
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
  })

  useEffect(() => {
    setActiveBusinessTab(initialBusinessTab)
  }, [initialBusinessTab])

  const currentBusinessTab = useMemo(
    () =>
      businessTabs.find((tab) => tab.key === activeBusinessTab) ?? businessTabs[0],
    [activeBusinessTab]
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
        <div className="mt-6 flex flex-col gap-4 pb-6">
          {linkFields.map((field) => (
            <TextInput
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              value={formValues[field.key]}
              onChange={handleFieldChange(field.key)}
              className="flex-row-reverse"
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

      <div className="px-4 py-4">
        <Button variant="primary" className="bg-header-from">
          {currentBusinessTab.submitLabel}
        </Button>
      </div>

      <AdminMenuBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}

export default AdminBusinessInfoScreen

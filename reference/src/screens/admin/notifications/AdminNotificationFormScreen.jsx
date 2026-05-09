import { useEffect, useState } from 'react'
import Button from '../../../components/ui/Button'
import TextAreaInput from '../../../components/ui/TextAreaInput'
import TextInput from '../../../components/ui/TextInput'
import AdminMenuBar from '../../../components/admin/shared/AdminMenuBar'
import AdminScreenHeader from '../../../components/admin/shared/AdminScreenHeader'
import bellIcon from '../../../assets/images/admin/bell-shake-1.svg'

const createFormState = (notification) => ({
  id: notification?.id ?? '',
  title: notification?.title ?? '',
  description: notification?.description ?? '',
  activeDays: notification?.activeDays ?? '3',
  hasLink: Boolean(notification?.hasLink),
  link: notification?.link ?? '',
})

const InlineSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange?.(!checked)}
    className={`relative mt-1 h-7 w-12 rounded-full transition-colors ${
      checked ? 'bg-header-from' : 'bg-border-light'
    }`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-bg-main shadow-sm transition-all ${
        checked ? 'left-1' : 'left-6'
      }`}
    />
  </button>
)

const AdminNotificationFormScreen = ({
  notification,
  onBack,
  onTabChange,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState(() => createFormState(notification))

  useEffect(() => {
    setFormValues(createFormState(notification))
  }, [notification])

  const handleFieldChange = (field) => (event) => {
    const value = event.target.value

    setFormValues((current) => ({
      ...current,
      [field]: field === 'description' ? value.slice(0, 100) : value,
    }))
  }

  const handleLinkToggle = (checked) => {
    setFormValues((current) => ({
      ...current,
      hasLink: checked,
      link: checked ? current.link : '',
    }))
  }

  const handleSubmit = () => {
    const activeDays = formValues.activeDays.trim() || '3'

    onSubmit?.({
      ...notification,
      id: formValues.id || notification?.id,
      title: formValues.title.trim() || 'بزرگترین حراج ایران!!!',
      description:
        formValues.description.trim() || 'چون ما بهترین فروشگاه در ایران هستیم',
      activeDays,
      hasLink: formValues.hasLink,
      link: formValues.hasLink ? formValues.link.trim() : '',
      status: Number(activeDays) > 0 ? 'active' : 'inactive',
    })
  }

  return (
    <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={bellIcon}
          title="اخبار و اطلاع رسانی"
          subtitle="اخبار و اطلاعیه های کسب و کارتان را به مشتریان اطلاع دهید"
          onBack={onBack}
          iconClassName="icon-strong"
        />

        <div className="mt-6 flex flex-col gap-3 pb-6">
          <TextInput
            label="عنوان خبر"
            placeholder="بزرگترین حراج ایران!!!"
            value={formValues.title}
            onChange={handleFieldChange('title')}
          />

          <TextAreaInput
            label="توضیحات خبر"
            placeholder="چون ما بهترین فروشگاه در ایران هستیم"
            value={formValues.description}
            onChange={handleFieldChange('description')}
            helperText="حداکثر ۱۰۰ کاراکتر"
            heightClass="h-[100px]"
          />

          <TextInput
            label="چند روز فعال باشد"
            placeholder="۳"
            value={formValues.activeDays}
            onChange={handleFieldChange('activeDays')}
            type="text"
          />

          <div className="flex flex-row-reverse items-start justify-between gap-4">
            <div className="flex-1 text-right">
              <h2 className="text-sm font-bold leading-6 text-text-strong">
                لینک دارد؟
              </h2>
              <p className="mt-1 text-sm font-normal leading-6 text-text-moderate">
                اگر خبر به لینک نیاز دارد فعال کنید.
              </p>
            </div>
            <InlineSwitch checked={formValues.hasLink} onChange={handleLinkToggle} />
          </div>

          {formValues.hasLink ? (
            <TextInput
              label="لینک خبر"
              placeholder="https://ieffect.ir/about"
              value={formValues.link}
              onChange={handleFieldChange('link')}
              className="flex-row-reverse"
            />
          ) : null}
        </div>
      </div>

      <div className="px-4 py-4">
        <Button variant="admin" onClick={handleSubmit}>
          ثبت خبر
        </Button>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminNotificationFormScreen

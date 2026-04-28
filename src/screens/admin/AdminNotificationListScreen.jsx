import { useEffect, useMemo, useState } from 'react'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminNotificationRow from '../../components/admin/AdminNotificationRow'
import AdminScreenHeader from '../../components/admin/AdminScreenHeader'
import bellIcon from '../../assets/images/admin/bell-shake-1.svg'
import searchIcon from '../../assets/images/admin/search-normal.svg'
import trashIcon from '../../assets/images/admin/trash-2.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const AdminNotificationListScreen = ({
  notifications,
  onBack,
  onTabChange,
  onAddNotification,
  onEditNotification,
  onDeleteNotifications,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => notifications.some((item) => item.id === id))
    )
  }, [notifications])

  const filteredNotifications = useMemo(() => {
    const normalizedTerm = searchTerm.trim()

    if (!normalizedTerm) {
      return notifications
    }

    return notifications.filter((notification) =>
      [notification.title, notification.description, notification.link]
        .filter(Boolean)
        .some((value) => value.includes(normalizedTerm))
    )
  }, [notifications, searchTerm])

  const handleToggleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      return
    }

    onDeleteNotifications?.(selectedIds)
    setSelectedIds([])
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

        <div className="mt-6">
          <TextInput
            type="search"
            placeholder="جستجو اخبار"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={searchIcon}
          />
        </div>

        <div className="mt-4 flex min-h-8 items-center justify-between gap-3">
          <span className="text-xs font-normal leading-5 text-text-moderate">
            {`${numberFormatter.format(notifications.length)} عدد خبر`}
          </span>

          {selectedIds.length > 0 ? (
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-1.5 text-xs font-normal leading-5 text-red-500"
            >
              <img src={trashIcon} alt="حذف خبر" className="h-4 w-4" />
              <span>{`حذف ${numberFormatter.format(selectedIds.length)} خبر`}</span>
            </button>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-3 pb-6">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <AdminNotificationRow
                key={notification.id}
                notification={notification}
                isSelected={selectedIds.includes(notification.id)}
                onToggleSelect={handleToggleSelect}
                onEdit={onEditNotification}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border-light px-4 py-8 text-center text-sm leading-6 text-text-moderate">
              نتیجه ای برای این جستجو پیدا نشد.
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex justify-start">
          <Button variant="admin" className="!w-[150px]" onClick={onAddNotification}>
            <span className="text-xl leading-none">+</span>
            <span>افزودن خبر</span>
          </Button>
        </div>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminNotificationListScreen

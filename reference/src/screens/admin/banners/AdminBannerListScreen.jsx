import { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import TextInput from '../../../components/ui/TextInput'
import AdminBannerRow from '../../../components/admin/banners/AdminBannerRow'
import AdminMenuBar from '../../../components/admin/shared/AdminMenuBar'
import AdminScreenHeader from '../../../components/admin/shared/AdminScreenHeader'
import bannerHeaderIcon from '../../../assets/images/admin/panorama-image-1.svg'
import searchIcon from '../../../assets/images/admin/search-normal.svg'
import trashIcon from '../../../assets/images/admin/trash-2.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const AdminBannerListScreen = ({
  banners,
  onBack,
  onTabChange,
  onAddBanner,
  onEditBanner,
  onDeleteBanners,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => banners.some((banner) => banner.id === id))
    )
  }, [banners])

  const filteredBanners = useMemo(() => {
    const normalizedTerm = searchTerm.trim()

    if (!normalizedTerm) {
      return banners
    }

    return banners.filter((banner) =>
      [banner.name, String(banner.priority)]
        .filter(Boolean)
        .some((value) => value.includes(normalizedTerm))
    )
  }, [banners, searchTerm])

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

    onDeleteBanners?.(selectedIds)
    setSelectedIds([])
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

        <div className="mt-6">
          <TextInput
            type="search"
            placeholder="جستجو بنر"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={searchIcon}
          />
        </div>

        <div className="mt-4 flex min-h-8 items-center justify-between gap-3">
          <span className="text-xs font-normal leading-5 text-text-moderate">
            {`${numberFormatter.format(banners.length)} عدد بنر`}
          </span>

          {selectedIds.length > 0 ? (
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-1.5 text-xs font-normal leading-5 text-red-500"
            >
              <img src={trashIcon} alt="حذف بنر" className="h-4 w-4" />
              <span>{`حذف ${numberFormatter.format(selectedIds.length)} بنر`}</span>
            </button>
          ) : (
            <span />
          )}
        </div>

        <div className="mt-3 pb-6">
          {filteredBanners.length > 0 ? (
            filteredBanners.map((banner) => (
              <AdminBannerRow
                key={banner.id}
                banner={banner}
                isSelected={selectedIds.includes(banner.id)}
                onToggleSelect={handleToggleSelect}
                onEdit={onEditBanner}
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
          <Button variant="admin" className="!w-36" onClick={onAddBanner}>
            <span className="text-xl leading-none">+</span>
            <span>افزودن بنر</span>
          </Button>
        </div>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminBannerListScreen

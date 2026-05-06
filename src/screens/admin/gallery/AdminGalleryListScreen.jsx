import { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import TextInput from '../../../components/ui/TextInput'
import AdminGalleryRow from '../../../components/admin/gallery/AdminGalleryRow'
import AdminMenuBar from '../../../components/admin/shared/AdminMenuBar'
import AdminScreenHeader from '../../../components/admin/shared/AdminScreenHeader'
import galleryHeaderIcon from '../../../assets/images/admin/album-image-4.svg'
import searchIcon from '../../../assets/images/admin/search-normal.svg'
import trashIcon from '../../../assets/images/admin/trash-2.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const AdminGalleryListScreen = ({
  galleries,
  onBack,
  onTabChange,
  onAddGallery,
  onEditGallery,
  onDeleteGalleries,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => galleries.some((gallery) => gallery.id === id))
    )
  }, [galleries])

  const filteredGalleries = useMemo(() => {
    const normalizedTerm = searchTerm.trim()

    if (!normalizedTerm) {
      return galleries
    }

    return galleries.filter((gallery) =>
      [gallery.name, String(gallery.priority)]
        .filter(Boolean)
        .some((value) => value.includes(normalizedTerm))
    )
  }, [galleries, searchTerm])

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

    onDeleteGalleries?.(selectedIds)
    setSelectedIds([])
  }

  return (
    <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={galleryHeaderIcon}
          title="گالری"
          subtitle="گالری تصاویر مجموعه خودتان را وارد کنید."
          onBack={onBack}
          iconClassName="icon-strong"
        />

        <div className="mt-6">
          <TextInput
            type="search"
            placeholder="جستجو تصویر"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={searchIcon}
          />
        </div>

        <div className="mt-4 flex min-h-8 items-center justify-between gap-3">
          <span className="text-xs font-normal leading-5 text-text-moderate">
            {`${numberFormatter.format(galleries.length)} عدد تصویر`}
          </span>

          {selectedIds.length > 0 ? (
            <>
              <span className="h-5 w-px" />
              <button
                type="button"
                onClick={handleDeleteSelected}
                className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-1.5 text-xs font-normal leading-5 text-red-500"
              >
                <img src={trashIcon} alt="حذف تصویر" className="h-4 w-4" />
                <span>{`حذف ${numberFormatter.format(selectedIds.length)} تصویر`}</span>
              </button>
            </>
          ) : null}
        </div>

        <div className="mt-3 pb-6">
          {filteredGalleries.length > 0 ? (
            filteredGalleries.map((gallery) => (
              <AdminGalleryRow
                key={gallery.id}
                gallery={gallery}
                isSelected={selectedIds.includes(gallery.id)}
                onToggleSelect={handleToggleSelect}
                onEdit={onEditGallery}
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
          <Button
            variant="admin"
            className="!w-[169px]"
            onClick={onAddGallery}
          >
            <span className="text-xl leading-none">+</span>
            <span>افزودن تصویر</span>
          </Button>
        </div>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminGalleryListScreen

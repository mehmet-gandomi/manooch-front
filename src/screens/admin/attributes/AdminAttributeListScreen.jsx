import { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import TextInput from '../../../components/ui/TextInput'
import AdminMenuBar from '../../../components/admin/shared/AdminMenuBar'
import AdminScreenHeader from '../../../components/admin/shared/AdminScreenHeader'
import AdminAttributeRow from '../../../components/admin/attributes/AdminAttributeRow'
import searchIcon from '../../../assets/images/admin/search-normal.svg'
import trashIcon from '../../../assets/images/admin/trash-2.svg'
import colorsSquareIcon from '../../../assets/images/admin/colors-square.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const AdminAttributeListScreen = ({
  attributes,
  onBack,
  onTabChange,
  onAddAttribute,
  onEditAttribute,
  onDeleteAttributes,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => attributes.some((attribute) => attribute.id === id))
    )
  }, [attributes])

  const filteredAttributes = useMemo(() => {
    const normalizedTerm = searchTerm.trim()

    if (!normalizedTerm) {
      return attributes
    }

    return attributes.filter((attribute) =>
      [attribute.name, attribute.title, attribute.typeLabel]
        .filter(Boolean)
        .some((value) => value.includes(normalizedTerm))
    )
  }, [attributes, searchTerm])

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

    onDeleteAttributes?.(selectedIds)
    setSelectedIds([])
  }

  return (
    <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={colorsSquareIcon}
          title="ویژگی ها"
          subtitle="افزونه های مورد نیاز خودتون رو فعال کن"
          onBack={onBack}
          iconClassName="icon-strong"
        />

        <div className="mt-6">
          <TextInput
            type="search"
            placeholder="جستجو ویژگی"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={searchIcon}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 min-h-[36px]">
          <span className="text-sm font-normal leading-6 text-text-moderate">
            {`${numberFormatter.format(attributes.length)} عدد ویژگی`}
          </span>

          {selectedIds.length > 0 ? (
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-2 text-sm font-normal leading-5 text-red-500"
            >
              <img src={trashIcon} alt="حذف ویژگی" className="h-4 w-4" />
              <span>{`حذف ${numberFormatter.format(selectedIds.length)} ویژگی`}</span>
            </button>
          ) : null}
        </div>

        <div className="mt-2 pb-6">
          {filteredAttributes.length > 0 ? (
            filteredAttributes.map((attribute) => (
              <AdminAttributeRow
                key={attribute.id}
                attribute={attribute}
                isSelected={selectedIds.includes(attribute.id)}
                onToggleSelect={handleToggleSelect}
                onEdit={onEditAttribute}
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
        <Button variant="admin" onClick={onAddAttribute}>
          <span className="text-xl leading-none">+</span>
          <span>افزودن ویژگی</span>
        </Button>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminAttributeListScreen

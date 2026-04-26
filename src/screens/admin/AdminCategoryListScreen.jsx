// src/screens/admin/AdminCategoryListScreen.jsx
// Category management list screen based on the provided screenshots.

import { useEffect, useMemo, useState } from 'react'
import Button from '../../components/Button'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import AdminCategoryRow from '../../components/admin/AdminCategoryRow'
import AdminScreenHeader from '../../components/admin/AdminScreenHeader'
import categoryHeaderIcon from '../../assets/images/category.svg'
import TextInput from '../../components/TextInput'
import SearchIcon from '../../assets/images/admin/search-normal.svg'
import TrashIcon from '../../assets/images/admin/trash-2.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const AdminCategoryListScreen = ({
  categories,
  onBack,
  onTabChange,
  onAddCategory,
  onEditCategory,
  onDeleteCategories,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState(() =>
    categories.slice(0, 2).map((category) => category.id)
  )

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => categories.some((category) => category.id === id))
    )
  }, [categories])

  const filteredCategories = useMemo(() => {
    const normalizedTerm = searchTerm.trim()

    if (!normalizedTerm) {
      return categories
    }

    return categories.filter((category) =>
      [category.name, category.description]
        .filter(Boolean)
        .some((value) => value.includes(normalizedTerm))
    )
  }, [categories, searchTerm])

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

    onDeleteCategories?.(selectedIds)
    setSelectedIds([])
  }

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main"
    >
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={categoryHeaderIcon}
          title="دسته بندی"
          subtitle="افزونه های مورد نیاز خودتون رو فعال کن"
          onBack={onBack}
        />

        <div className="mt-6">
          <TextInput
            type="search"
            placeholder="جستجو دسته بندی"
            onChange={(event) => setSearchTerm(event.target.value)}
            icon = {SearchIcon}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm font-normal leading-6 text-text-moderate">
            {numberFormatter.format(categories.length)} عدد دسته
          </span>

          {selectedIds.length > 0 ? (
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-2 text-sm font-normal leading-6 text-red-500"
            >
              <img src={TrashIcon} alt="حذف دسته" />
              <span>حذف {numberFormatter.format(selectedIds.length)} دسته</span>
            </button>
          ) : null}
        </div>

        <div className="mt-3 pb-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <AdminCategoryRow
                key={category.id}
                category={category}
                isSelected={selectedIds.includes(category.id)}
                onToggleSelect={handleToggleSelect}
                onEdit={onEditCategory}
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
        <Button variant="admin" onClick={onAddCategory}>
          <span className="text-xl leading-none">+</span>
          <span>افزودن دسته بندی</span>
        </Button>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminCategoryListScreen

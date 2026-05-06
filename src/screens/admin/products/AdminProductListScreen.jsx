import { useEffect, useMemo, useState } from 'react'
import Button from '../../../components/ui/Button'
import TextInput from '../../../components/ui/TextInput'
import AdminMenuBar from '../../../components/admin/shared/AdminMenuBar'
import AdminProductRow from '../../../components/admin/products/AdminProductRow'
import AdminScreenHeader from '../../../components/admin/shared/AdminScreenHeader'
import addToBoxIcon from '../../../assets/images/admin/add-to-box.svg'
import searchIcon from '../../../assets/images/admin/search-normal.svg'
import trashIcon from '../../../assets/images/admin/trash-2.svg'

const numberFormatter = new Intl.NumberFormat('fa-IR')

const sortIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 3H13M3 3H4M9 8H13M3 8H7M11 13H13M3 13H9"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
    <circle cx="5" cy="3" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="8" cy="8" r="1.6" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="10" cy="13" r="1.6" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

const AdminProductListScreen = ({
  products,
  totalCount = 0,
  onBack,
  onTabChange,
  onDeleteProducts,
  onAddProduct,
  onEditProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState(() =>
    products.slice(0, 2).map((product) => product.id)
  )

  useEffect(() => {
    setSelectedIds((current) =>
      current.filter((id) => products.some((product) => product.id === id))
    )
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedTerm = searchTerm.trim()

    if (!normalizedTerm) {
      return products
    }

    return products.filter((product) =>
      [product.name, product.categoryName, String(product.code)]
        .filter(Boolean)
        .some((value) => value.includes(normalizedTerm))
    )
  }, [products, searchTerm])

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

    onDeleteProducts?.(selectedIds)
    setSelectedIds([])
  }

  return (
    <div dir="rtl" className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main">
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <AdminScreenHeader
          icon={addToBoxIcon}
          title="کالا"
          subtitle="کالا مورد نیاز خودتون را اضافه کنید."
          onBack={onBack}
          iconClassName="icon-strong"
        />

        <div className="mt-6">
          <TextInput
            type="search"
            placeholder="جستجو کالا"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={searchIcon}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-bg-main px-3 py-2 text-sm font-normal leading-6 text-text-moderate"
            >
              {sortIcon}
              <span>مرتب سازی</span>
            </button>
            <div className="border-l h-5 ml-1 mr-2"></div>
            <span className="text-sm font-normal leading-6 text-text-moderate">
              {`${numberFormatter.format(totalCount)} عدد کالا`}
            </span>
          </div>
          
          {selectedIds.length > 0 ? (
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1 rounded-lg bg-danger-soft px-3 py-2 text-sm font-normal leading-6 text-red-500"
            >
              <img src={trashIcon} alt="حذف کالا" className="h-4 w-4" />
              <span>{`حذف ${numberFormatter.format(selectedIds.length)} کالا`}</span>
            </button>
          ) : (
            <span className="h-10" />
          )}
        </div>

        <div className="mt-3 pb-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <AdminProductRow
                key={product.id}
                product={product}
                isSelected={selectedIds.includes(product.id)}
                onToggleSelect={handleToggleSelect}
                onEdit={onEditProduct}
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
          <Button variant="admin" className="!w-[164px]" onClick={onAddProduct}>
            <span className="text-xl leading-none">+</span>
            <span>افزودن کالا</span>
          </Button>
        </div>
      </div>

      <AdminMenuBar activeTab="edit" onTabChange={onTabChange} />
    </div>
  )
}

export default AdminProductListScreen

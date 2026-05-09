import { Routes, Route, Navigate } from 'react-router-dom'

// Screens (will be filled in as we build them)
const Placeholder = ({ name }) => (
  <div className="p-8 text-text-strong font-ravi">{name}</div>
)

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-bg-base font-ravi" dir="rtl">
      {/* Sidebar will go here */}
      <main className="flex-1">
        <Routes>
          <Route index element={<Placeholder name="داشبورد" />} />
          <Route path="categories" element={<Placeholder name="دسته‌بندی‌ها" />} />
          <Route path="categories/new" element={<Placeholder name="دسته‌بندی جدید" />} />
          <Route path="categories/:id" element={<Placeholder name="ویرایش دسته‌بندی" />} />
          <Route path="attributes" element={<Placeholder name="ویژگی‌ها" />} />
          <Route path="attributes/new" element={<Placeholder name="ویژگی جدید" />} />
          <Route path="attributes/:id" element={<Placeholder name="ویرایش ویژگی" />} />
          <Route path="products" element={<Placeholder name="محصولات" />} />
          <Route path="products/new" element={<Placeholder name="محصول جدید" />} />
          <Route path="products/:id" element={<Placeholder name="ویرایش محصول" />} />
          <Route path="gallery" element={<Placeholder name="گالری" />} />
          <Route path="gallery/new" element={<Placeholder name="تصویر جدید" />} />
          <Route path="gallery/:id" element={<Placeholder name="ویرایش تصویر" />} />
          <Route path="settings" element={<Placeholder name="تنظیمات" />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

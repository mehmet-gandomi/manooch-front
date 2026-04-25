// src/screens/admin/AdminPluginsScreen.jsx
// Admin plugins screen based on the provided Figma screenshot

import { useState } from 'react'
import AdminToggleSettingRow from '../../components/admin/AdminToggleSettingRow'
import AdminMenuBar from '../../components/admin/AdminMenuBar'
import arrowLeftIcon from '../../assets/images/admin/arrow-left-1.svg'
import plugIcon from '../../assets/images/admin/plug.svg'

const initialPluginStates = {
  shop: true,
  category: true,
  features: true,
  banner: false,
  faq: false,
}

const pluginItems = [
  {
    key: 'shop',
    title: 'فروشگاه',
    description: 'فعالسازی افزونه فروشگاه',
  },
  {
    key: 'category',
    title: 'دسته بندی',
    description: 'دسته بندی کالا هایتان را مشخص کنید.',
  },
  {
    key: 'features',
    title: 'ویژگی ها',
    description: 'ویژگی های کالاهایتان را تعیین کنید.',
  },
  {
    key: 'banner',
    title: 'افزونه بنر',
    description: 'اطلاعات ورود من را برای دفعه بعد ذخیره کنید.',
  },
  {
    key: 'faq',
    title: 'سوالات پر تکرار',
    description: 'اطلاعات ورود من را برای دفعه بعد ذخیره کنید.',
  },
]

const AdminPluginsScreen = ({
  activeTab = 'plugin',
  onTabChange,
  onBack,
}) => {
  const [pluginStates, setPluginStates] = useState(initialPluginStates)

  const handleToggle = (key) => {
    setPluginStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-screen max-w-sm flex-col bg-bg-main"
    >
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 flex-row items-center gap-3 text-right">
            <img src={plugIcon} alt="" className="h-8 w-8 shrink-0 icon-strong" />

            <div>
              <h1 className="text-base font-bold leading-8 text-text-strong">
                افزونه ها
              </h1>
              <p className="text-xs font-normal leading-5 text-text-moderate">
                افزونه های مورد نیاز خودتون رو فعال کن
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

        <div className="mt-8 flex flex-col gap-7 pb-6">
          {pluginItems.map((item) => (
            <AdminToggleSettingRow
              key={item.key}
              title={item.title}
              description={item.description}
              enabled={pluginStates[item.key]}
              onToggle={() => handleToggle(item.key)}
            />
          ))}
        </div>
      </div>

      <AdminMenuBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  )
}

export default AdminPluginsScreen

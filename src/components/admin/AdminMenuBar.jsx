// src/components/admin/AdminMenuBar.jsx
// Bottom navigation bar for admin panel — 5 tabs

import plugIcon from '../../assets/images/admin/plug.svg'
import briefcaseIcon from '../../assets/images/admin/briefcase.svg'
import paintRollersIcon from '../../assets/images/admin/paint-rollers.svg'
import checkbookIcon from '../../assets/images/admin/checkbook.svg'
import ellipseHomeIcon from '../../assets/images/admin/ellipse-home.svg'

const tabs = [
  { key: 'plugin',    icon: plugIcon,         label: 'افزونه' },
  { key: 'business',  icon: briefcaseIcon,    label: 'کسب‌وکار' },
  { key: 'edit',      icon: paintRollersIcon, label: 'ویرایش' },
  { key: 'list',      icon: checkbookIcon,    label: 'لیست' },
  { key: 'dashboard', icon: ellipseHomeIcon,  label: 'داشبورد' },
]

const AdminMenuBar = ({ activeTab = 'dashboard', onTabChange }) => {
  return (
    <div className="flex flex-row-reverse items-center w-full border-t border-border-light bg-bg-main">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange?.(tab.key)}
            className={`flex flex-1 flex-col items-center px-3 py-4 transition-all ${
              isActive ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <img src={tab.icon} alt={tab.label} className="w-8 h-8" />
          </button>
        )
      })}
    </div>
  )
}

export default AdminMenuBar

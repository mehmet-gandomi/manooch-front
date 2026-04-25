// src/components/admin/AdminToggleSettingRow.jsx
// Reusable setting row with a description and iOS-style toggle

const AdminToggleSettingRow = ({
  title,
  description,
  enabled = false,
  onToggle,
}) => {
  return (
    <div className="flex flex-row-reverse items-start justify-between gap-4">
      <div className="flex-1 text-right">
        <h2 className="text-base font-bold leading-8 text-text-strong">
          {title}
        </h2>
        <p className="mt-1 text-sm font-normal leading-7 text-text-moderate">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`relative mt-1 h-7 w-12 rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-border-light'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-bg-main shadow-sm transition-all ${
            enabled ? 'left-1' : 'left-6'
          }`}
        />
      </button>
    </div>
  )
}

export default AdminToggleSettingRow

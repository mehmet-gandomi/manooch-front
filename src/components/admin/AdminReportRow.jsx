// src/components/admin/AdminReportRow.jsx
// A single report row — icon, label on right, value on left, optional divider

const AdminReportRow = ({ icon, label, value, showDivider = true }) => {
  return (
    <div className="flex flex-col gap-2 w-full py-1">
      <div className="flex items-center justify-between w-full">
        {/* Label + icon — right */}
        <div className="flex flex-row-reverse items-center gap-4">
          <span className="text-base text-text-moderate leading-8 whitespace-nowrap">
            {label}
          </span>
          <img src={icon} alt={label} className="w-6 h-6 shrink-0" />
        </div>
        
        {/* Value — left */}
        <span className="text-base text-text-strong leading-8">{value}</span>
      </div>

      {showDivider && <div className="h-px w-full bg-border-light" />}
    </div>
  )
}

export default AdminReportRow

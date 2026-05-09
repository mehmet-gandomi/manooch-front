const AdminMenuItem = ({ icon, label, onClick, dashed = false }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      <div
        className={`flex items-center justify-center p-5 rounded-lg bg-bg-base w-[64px] h-[64px] ${
          dashed ? 'border border-dashed border-border-light' : ''
        }`}
      >
        <img src={icon} alt={label} className="w-6 h-6 icon-moderate" />
      </div>
      <span className="text-xs text-text-weak leading-5 text-center whitespace-nowrap">
        {label}
      </span>
    </button>
  )
}

export default AdminMenuItem

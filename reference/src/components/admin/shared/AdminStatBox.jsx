const AdminStatBox = ({ icon, value, label, showArrow = false, arrowIcon }) => {
  return (
    <div className="flex flex-1 items-center justify-between gap-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 shrink-0">
        <img src={icon} alt={label} className="w-6 h-6 shrink-0" />
        <div className="flex flex-col items-start leading-5 text-text-white text-xs">
          <span className="font-black">{value}</span>
          <span className="font-normal whitespace-nowrap">{label}</span>
        </div>
      </div>
      {showArrow && arrowIcon && (
        <img src={arrowIcon} alt="" className="w-6 h-6 shrink-0" />
      )}
    </div>
  )
}

export default AdminStatBox

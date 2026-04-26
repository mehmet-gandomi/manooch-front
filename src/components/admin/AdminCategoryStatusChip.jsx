// src/components/admin/AdminCategoryStatusChip.jsx
// Small status pill for category metadata flags.

const toneClasses = {
  neutral: {
    chip: 'bg-bg-soft text-text-moderate',
    icon: 'icon-moderate',
  },
  success: {
    chip: 'bg-success-soft text-success',
    icon: 'icon-success',
  },
}

const AdminCategoryStatusChip = ({
  icon,
  label,
  tone = 'neutral',
}) => {
  const toneConfig = toneClasses[tone] ?? toneClasses.neutral

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-normal leading-5 ${toneConfig.chip}`}
    >
      {icon ? (
        <img src={icon} alt="" className={`h-3.5 w-3.5 shrink-0 ${toneConfig.icon}`} />
      ) : null}
      <span>{label}</span>
    </span>
  )
}

export default AdminCategoryStatusChip

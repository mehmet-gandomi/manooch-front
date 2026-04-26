import closeIcon from '../../assets/images/admin/close.svg'

const AdminAttributeValueChip = ({ value, onRemove }) => {
  const isColorValue = typeof value === 'object' && value !== null
  const label = isColorValue ? value.name : value
  const colorHex = isColorValue ? value.hex : ''

  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-2 rounded-lg bg-bg-soft px-3 py-2 text-sm font-normal leading-5 text-text-moderate"
    >
      <img src={closeIcon} alt="" className="h-3 w-3 shrink-0" />
      {colorHex ? (
        <span
          className="h-4 w-4 shrink-0 rounded-full border border-black/10"
          style={{ backgroundColor: colorHex }}
        />
      ) : null}
      <span>{label}</span>
    </button>
  )
}

export default AdminAttributeValueChip

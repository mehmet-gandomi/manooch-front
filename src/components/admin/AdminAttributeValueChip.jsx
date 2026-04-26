import closeIcon from '../../assets/images/admin/close.svg'

const AdminAttributeValueChip = ({ value, onRemove }) => {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-2 rounded-lg bg-bg-soft px-3 py-2 text-sm font-normal leading-5 text-text-moderate"
    >
      <img src={closeIcon} alt="" className="h-3 w-3 shrink-0" />
      <span>{value}</span>
    </button>
  )
}

export default AdminAttributeValueChip

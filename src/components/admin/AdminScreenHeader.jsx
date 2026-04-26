// src/components/admin/AdminScreenHeader.jsx
// Shared heading row for admin sub-screens with a title, subtitle, and back action.

import arrowLeftIcon from '../../assets/images/admin/arrow-left-1.svg'

const AdminScreenHeader = ({
  icon,
  title,
  subtitle,
  onBack,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 flex-row items-center gap-3 text-right">
        {icon ? (
          <img src={icon} alt="" className="mt-1 h-8 w-8 shrink-0" />
        ) : null}

        <div>
          <h1 className="text-base font-bold leading-8 text-text-strong">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-xs font-normal leading-5 text-text-moderate">
              {subtitle}
            </p>
          ) : null}
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
  )
}

export default AdminScreenHeader

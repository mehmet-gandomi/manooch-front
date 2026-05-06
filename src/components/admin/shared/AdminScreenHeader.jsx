import arrowLeftIcon from '../../../assets/images/admin/arrow-left-1.svg'

const AdminScreenHeader = ({
  icon,
  title,
  subtitle,
  onBack,
  iconClassName = '',
  showVideoBadge = false,
}) => {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-start gap-3 text-right">
        {icon ? (
          <img src={icon} alt="" className={`mt-1 h-8 w-8 shrink-0 ${iconClassName}`.trim()} />
        ) : null}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-base font-bold leading-8 text-text-strong">
              {title}
            </h1>
            {showVideoBadge ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-educational-soft px-2 py-1 text-xs font-normal leading-4 text-menu-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-menu-accent" />
                <span>ویدیو آموزشی</span>
              </span>
            ) : null}
          </div>
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
        className="flex h-8 w-8 shrink-0 items-center justify-center"
      >
        <img src={arrowLeftIcon} alt="" className="h-6 w-6 icon-strong" />
      </button>
    </div>
  )
}

export default AdminScreenHeader

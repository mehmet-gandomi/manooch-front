import infoIcon from '../../assets/images/info-icon.svg'

const Dropdown = ({
  label = '',
  placeholder = 'انتخاب کنید',
  helperText = '',
  value = '',
  onChange,
  options = [],
  required = false,
  icon = null,
  showInfoIcon = false,
  size = 'default',
}) => {
  const labelClassName =
    size === 'compact' ? 'text-sm font-semibold leading-6' : 'text-base font-semibold'

  const selectClassName =
    size === 'compact'
      ? 'bg-bg-base h-14 rounded-2xl w-full text-sm font-normal leading-6 text-right outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer'
      : 'bg-bg-base py-4 rounded-2xl w-full text-base font-normal text-right outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer'

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className={`${labelClassName} text-text-strong text-right w-full`}>
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {icon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <img src={icon} alt="" className="w-6 h-6" />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          dir="rtl"
          className={`${selectClassName} ${
            value === '' ? 'text-[#a3a9b6]' : 'text-text-strong'
          } ${
            icon && showInfoIcon ? 'pr-14 pl-16' : icon ? 'pr-14 pl-12' : showInfoIcon ? 'pr-4 pl-16' : 'px-4 pl-12'
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23737377' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left 1rem center',
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {showInfoIcon && (
          <div className="absolute left-12 top-1/2 -translate-y-1/2 pointer-events-none z-10">
            <img src={infoIcon} alt="" className="w-4 h-4" />
          </div>
        )}
      </div>

      {helperText && (
        <p className="text-sm font-normal text-text-moderate text-right w-full">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default Dropdown

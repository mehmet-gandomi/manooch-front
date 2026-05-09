import infoIcon from '../../assets/images/info-icon.svg'

const TextInput = ({
  label = '',
  placeholder = '',
  helperText = '',
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  required = false,
  icon = null,
  showInfoIcon = false,
  className = '',
  multiline = false,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-base font-semibold text-text-strong text-right w-full">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      <div className={`relative w-full ${className}`}>
        {icon && (
          <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${className.includes('flex-row-reverse') ? 'left-4' : 'right-4'}`}>
            <img src={icon} alt="" className="w-6 h-6" />
          </div>
        )}
        {multiline ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            dir="rtl"
            rows={10}
            className={`py-4 rounded-2xl w-full h-[196px] text-base font-normal placeholder:text-[#a3a9b6] outline-none focus:ring-2 focus:ring-primary transition-all disabled:cursor-not-allowed resize-none ${
              disabled ? 'text-[#a3a9b6]' : 'text-text-strong'
            } ${
              className.includes('flex-row-reverse') ? 'text-left' : 'text-right'
            } ${
              disabled ? 'bg-[#f0f1f3]' : 'bg-bg-base'
            } ${
              className.includes('flex-row-reverse')
                ? (icon && showInfoIcon ? 'pl-14 pr-12' : icon ? 'pl-14 pr-4' : showInfoIcon ? 'pl-4 pr-12' : 'px-4')
                : (icon && showInfoIcon ? 'pr-14 pl-12' : icon ? 'pr-14 pl-4' : showInfoIcon ? 'pr-4 pl-12' : 'px-4')
            }`}
          />
        ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          dir="rtl"
          className={`py-4 rounded-2xl w-full text-base font-normal placeholder:text-[#a3a9b6] outline-none focus:ring-2 focus:ring-primary transition-all disabled:cursor-not-allowed ${
            disabled ? 'text-[#a3a9b6]' : 'text-text-strong'
          } ${
            className.includes('flex-row-reverse') ? 'text-left' : 'text-right'
          } ${
            disabled ? 'bg-[#f0f1f3]' : 'bg-bg-base'
          } ${
            className.includes('flex-row-reverse')
              ? (icon && showInfoIcon ? 'pl-14 pr-12' : icon ? 'pl-14 pr-4' : showInfoIcon ? 'pl-4 pr-12' : 'px-4')
                : (icon && showInfoIcon ? 'pr-14 pl-12' : icon ? 'pr-14 pl-4' : showInfoIcon ? 'pr-4 pl-12' : 'px-4')
            }`}
          />
        )}
        {showInfoIcon && (
          <div className={`absolute pointer-events-none ${multiline ? 'top-4 left-4' : 'top-1/2 -translate-y-1/2'} ${!multiline && className.includes('flex-row-reverse') ? 'right-4' : !multiline ? 'left-4' : ''}`}>
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

export default TextInput

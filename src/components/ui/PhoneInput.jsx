import iranFlag from '../../assets/images/IR-flag.svg'

const PhoneInput = ({
  label = 'شماره همراه',
  placeholder = '۰۹۱۵',
  helperText = 'این یک متن راهنمایی برای کمک به کاربر است.',
  value = '',
  onChange,
  required = false,
  size = 'default',
}) => {
  const labelClassName =
    size === 'compact'
      ? 'text-sm font-semibold leading-6'
      : 'text-base font-semibold leading-8'

  const fieldClassName =
    size === 'compact'
      ? 'bg-bg-base flex h-14 items-center flex-row-reverse justify-end gap-3 px-4 rounded-2xl w-full'
      : 'bg-bg-base flex items-center flex-row-reverse justify-end gap-3 px-4 py-4 rounded-2xl w-full'

  const inputClassName =
    size === 'compact'
      ? 'flex-1 bg-transparent text-sm font-normal leading-6 text-text-strong placeholder:text-text-placeholder text-left outline-none'
      : 'flex-1 bg-transparent text-base font-normal leading-8 text-text-strong placeholder:text-text-placeholder text-left outline-none'

  const helperClassName =
    size === 'compact'
      ? 'text-sm font-normal leading-6 text-text-moderate text-right w-full'
      : 'text-sm font-normal leading-6 text-text-moderate text-right w-full'

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className={`${labelClassName} text-text-strong text-right w-full`}>
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}

      <div className={fieldClassName}>
        <img src={iranFlag} alt="Iran flag" className="w-6 h-6 shrink-0 rounded-sm" />
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          dir="rtl"
          className={inputClassName}
        />
      </div>

      {helperText && (
        <p className={helperClassName}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export default PhoneInput

// src/components/PhoneInput.jsx
// Phone number input field with country flag, label, and helper text

import iranFlag from '../assets/images/IR-flag.svg'

const PhoneInput = ({
  label = 'شماره همراه',
  placeholder = '۰۹۱۵',
  helperText = 'این یک متن راهنمایی برای کمک به کاربر است.',
  value = '',
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Label */}
      {label && (
        <label className="text-base font-semibold leading-8 text-text-strong text-right w-full">
          {label}
        </label>
      )}

      {/* Input field */}
      <div className="bg-bg-base flex items-center flex-row-reverse justify-end gap-3 px-4 py-4 rounded-2xl w-full">
        <img src={iranFlag} alt="Iran flag" className="w-6 h-6 shrink-0 rounded-sm" />
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          dir="rtl"
          className="flex-1 bg-transparent text-base font-normal leading-8 text-text-strong placeholder:text-text-placeholder text-left outline-none"
        />
      </div>

      {/* Helper text */}
      {helperText && (
        <p className="text-sm font-normal leading-6 text-text-moderate text-right w-full">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default PhoneInput

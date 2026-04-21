// src/components/PhoneInput.jsx
// Phone number input field with country flag, label, and helper text

const IranFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="shrink-0 rounded-sm overflow-hidden"
  >
    {/* Iran flag — 3 horizontal bands: green, white, red */}
    <rect width="24" height="8" fill="#239f40" />
    <rect y="8" width="24" height="8" fill="#ffffff" />
    <rect y="16" width="24" height="8" fill="#da0000" />
    {/* Emblem placeholder — simple circle */}
    <circle cx="12" cy="12" r="2.5" fill="#239f40" opacity="0.7" />
  </svg>
)

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
        <label className="text-[16px] font-semibold leading-8 text-[#16161d] text-right w-full">
          {label}
        </label>
      )}

      {/* Input field */}
      <div className="bg-[#fafafa] flex items-center justify-end gap-3 px-4 py-4 rounded-2xl w-full">
        <IranFlag />
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          dir="rtl"
          className="flex-1 bg-transparent text-[16px] font-normal leading-8 text-[#16161d] placeholder:text-[#a3a9b6] text-right outline-none"
        />
      </div>

      {/* Helper text */}
      {helperText && (
        <p className="text-[13px] font-normal leading-6 text-[#737377] text-right w-full">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default PhoneInput

// src/components/TextAreaInput.jsx
// Multiline text area field with label and helper text

const TextAreaInput = ({
  label = '',
  placeholder = '',
  helperText = '',
  value = '',
  onChange,
  required = false,
  heightClass = 'h-28',
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="w-full text-right text-base font-semibold text-text-strong">
          {label}
          {required && <span className="mr-1 text-red-500">*</span>}
        </label>
      )}

      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        dir="rtl"
        className={`w-full resize-none rounded-2xl bg-bg-base px-4 py-4 text-right text-base font-normal text-text-strong outline-none transition-all placeholder:text-text-placeholder focus:ring-2 focus:ring-primary ${heightClass}`}
      />

      {helperText && (
        <p className="w-full text-right text-sm font-normal text-text-moderate">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default TextAreaInput

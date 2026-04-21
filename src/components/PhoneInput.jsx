const IranFlag = () => (
  <div className="relative shrink-0 size-6 overflow-clip rounded-sm">
    <img
      alt="IR"
      className="absolute inset-0 size-full object-cover"
      src="https://www.figma.com/api/mcp/asset/5ed3490e-47d6-432c-85c8-66e07e9f323a"
    />
    <img
      alt=""
      className="absolute"
      style={{ inset: '36.96% 33.7%' }}
      src="https://www.figma.com/api/mcp/asset/fa3be912-b217-49ae-b1b3-258c146f74b9"
    />
    <img
      alt=""
      className="absolute"
      style={{ inset: '0 4.96% 71.74% 4.96%' }}
      src="https://www.figma.com/api/mcp/asset/c2d4c4b1-bea8-464c-9b14-5221fba08e8b"
    />
    <img
      alt=""
      className="absolute"
      style={{ inset: '71.74% 4.96% 0 4.96%' }}
      src="https://www.figma.com/api/mcp/asset/ad725090-8677-457a-8a6e-4b862da632c2"
    />
  </div>
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
      {label && (
        <label className="text-[16px] font-semibold leading-8 text-[#16161d] text-right w-full">
          {label}
        </label>
      )}

      <div className="bg-[#fafafa] flex items-center justify-end gap-3 px-4 py-4 rounded-2xl w-full">
        <IranFlag />
        <input
          type="tel"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          dir="rtl"
          className="flex-1 bg-transparent text-[16px] font-normal leading-8 text-[#16161d] placeholder:text-[#a3a9b6] text-right outline-none min-w-0"
        />
      </div>

      {helperText && (
        <p className="text-[13px] font-normal leading-6 text-[#737377] text-right w-full">
          {helperText}
        </p>
      )}
    </div>
  )
}

export default PhoneInput

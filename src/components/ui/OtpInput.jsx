import { useRef, useEffect } from 'react'

const OtpInput = ({ length = 5, value = '', onChange, hasError = false, autoFocus = true }) => {
  const inputRefs = useRef([])

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  const handleChange = (index, newValue) => {
    if (newValue && !/^\d$/.test(newValue)) return

    const newOtp = value.split('')
    newOtp[index] = newValue
    const updatedValue = newOtp.join('').slice(0, length)

    onChange(updatedValue)

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      } else {
        handleChange(index, '')
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, length)
    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData)
      const nextIndex = Math.min(pastedData.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center w-full" dir="ltr">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`h-14 w-14 rounded-lg border bg-bg-base text-center text-lg font-normal outline-none transition-all focus:ring-2 ${
            hasError
              ? 'border-danger text-red-500 focus:ring-red-500'
              : 'border-border-light text-text-strong focus:ring-primary'
          }`}
        />
      ))}
    </div>
  )
}

export default OtpInput

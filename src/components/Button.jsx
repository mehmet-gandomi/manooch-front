// src/components/Button.jsx
// Primary action button matching the Figma design

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const variants = {
    primary:
      'bg-primary text-text-white hover:brightness-90 active:brightness-75',
    secondary:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-3
        px-5 py-2 w-full rounded-2xl
        text-[16px] font-normal leading-8
        transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button

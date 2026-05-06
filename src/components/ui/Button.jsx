const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'default',
  disabled = false,
  className = '',
}) => {
  const variants = {
    primary:
      'bg-primary text-text-white hover:brightness-90 active:brightness-75',
    secondary:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
    admin:
      'bg-header-from text-text-white hover:bg-header-to active:brightness-90',
  }

  const sizes = {
    default: 'px-5 py-2 w-full rounded-2xl text-base font-normal leading-8',
    front: 'h-12 px-5 py-2 w-full rounded-lg text-base font-normal leading-8',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-3
        ${sizes[size]}
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

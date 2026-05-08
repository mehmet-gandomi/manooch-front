// RTL: icon FIRST (→ visual RIGHT), label SECOND (→ visual LEFT of icon)
const LinkButton = ({ label, icon, bgColor, textColor, href = '#' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 w-full py-2 px-5 rounded-xl transition-opacity active:opacity-70"
    style={{ backgroundColor: bgColor }}
  >
    <img src={icon} alt={label} className="w-6 h-6 shrink-0" />
    <span className="text-base leading-8 font-normal" style={{ color: textColor }}>
      {label}
    </span>
  </a>
)

export default LinkButton

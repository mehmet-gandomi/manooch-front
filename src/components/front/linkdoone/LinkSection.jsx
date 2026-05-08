import LinkButton from './LinkButton'

const LinkSection = ({ title, subtitle, links }) => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-col gap-1.5 items-end">
      <span className="text-text-strong text-sm font-semibold leading-6 text-right">{title}</span>
      <span className="text-text-moderate text-sm leading-6 text-right w-full">{subtitle}</span>
    </div>
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <LinkButton key={link.label} {...link} />
      ))}
    </div>
  </div>
)

export default LinkSection

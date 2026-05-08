const GalleryCard = ({ image, title, subtitle, onClick, className = '' }) => (
  <div
    role="button"
    onClick={onClick}
    className={`relative overflow-hidden rounded-lg shrink-0 cursor-pointer ${className}`}
  >
    <img src={image} alt={title} className="absolute inset-0 size-full object-cover" />
    {/* gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(32,42,55,0.4)] to-header-to rounded-lg" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-right flex flex-col gap-1">
      <span className="text-text-white text-sm font-semibold leading-6 w-full">{title}</span>
      <span className="text-text-disable-weak text-xs leading-5 w-full">{subtitle}</span>
    </div>
  </div>
)

export default GalleryCard

const GalleryCard = ({ image, title, subtitle, onClick, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative overflow-hidden rounded-lg shrink-0 ${className}`}
  >
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    {/* gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(32,42,55,0.4)] to-header-to rounded-lg" />
    <div className="absolute bottom-0 left-0 right-0 p-4 text-right flex flex-col gap-1">
      <span className="text-text-white text-sm font-semibold leading-6 w-full">{title}</span>
      <span className="text-text-disable-weak text-xs leading-5 w-full">{subtitle}</span>
    </div>
  </button>
)

export default GalleryCard

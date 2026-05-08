import shareIcon from '../../../assets/images/front/pdp/share-1.svg'

const LocationPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#0068ff"/>
  </svg>
)

const MapSection = ({ title, mapImage, viewLabel }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <span className="text-text-strong text-sm font-semibold leading-6 text-right w-full">{title}</span>
    <div className="relative h-[120px] w-full rounded-lg overflow-hidden">
      <img src={mapImage} alt={title} className="absolute inset-0 size-full object-cover" />
    </div>
    {/* Footer: view link (RIGHT) + share icon (LEFT) */}
    <div className="flex items-center justify-between w-full">
      <button className="flex items-center gap-1.5">
        <LocationPinIcon />
        <span className="text-text-strong text-sm leading-6">{viewLabel}</span>
      </button>
      <button>
        <img src={shareIcon} alt="اشتراک‌گذاری" className="w-6 h-6 icon-moderate" />
      </button>
    </div>
  </div>
)

export default MapSection

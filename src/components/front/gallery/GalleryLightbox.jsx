import closeIcon from '../../../assets/images/admin/close.svg'

const GalleryLightbox = ({ item, onClose }) => {
  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-md bg-[rgba(93,93,93,0.4)] flex flex-col justify-between pt-4 pb-0"
      onClick={onClose}
    >
      {/* Top bar: close X on left */}
      <div className="flex items-center px-4 shrink-0" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
          <img src={closeIcon} alt="بستن" className="w-6 h-6 brightness-0 invert" />
        </button>
      </div>

      {/* Image + caption */}
      <div
        className="flex-1 mx-4 flex flex-col relative rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-header-to rounded-b-lg p-4 text-right flex flex-col gap-1">
          <span className="text-text-white text-sm font-semibold leading-6 w-full">{item.title}</span>
          <span className="text-text-disable-weak text-xs leading-5 w-full">{item.subtitle}</span>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center py-2 shrink-0">
        <div className="w-[134px] h-1 rounded-full bg-text-strong" />
      </div>
    </div>
  )
}

export default GalleryLightbox

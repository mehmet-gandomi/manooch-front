import cartShopIcon from '../../../assets/images/front/pdp/cart-shop.svg'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

const ProductCardH = ({ product }) => (
  <div className="flex items-center gap-3 justify-end px-3 py-2 border-b border-border-light">
    {/* Info */}
    <div className="flex-1 flex flex-col gap-3 items-end min-w-0">
      {/* Name row */}
      <div className="flex items-start justify-between w-full">
        <button className="bg-primary/20 p-2 rounded-lg shrink-0">
          <img src={cartShopIcon} alt="افزودن" className="w-4 h-4" />
        </button>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-text-strong text-sm font-semibold leading-6 truncate max-w-[160px]">
            {product.name}
          </span>
          {product.subtitle && (
            <span className="text-text-weak text-xs leading-5">{product.subtitle}</span>
          )}
        </div>
      </div>

      {/* Price row */}
      <div className="flex items-center gap-1 w-full">
        <span className="text-text-weak text-sm leading-6">هزارتومان</span>
        <div className="flex items-center gap-1">
          <span className="text-text-strong text-sm font-semibold leading-6">
            {formatFarsi(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-danger text-xs leading-5 line-through">
              {formatFarsi(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Thumbnail */}
    <div className="w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>
  </div>
)

export default ProductCardH

import cartShopIcon from '../../../assets/images/front/pdp/cart-shop.svg'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

// RTL: first DOM child → visual RIGHT, last → visual LEFT.

const ProductCardH = ({ product }) => (
  <div className="flex items-center gap-3 px-3 py-2 border-b border-border-light">
    {/* FIRST → visual RIGHT: thumbnail */}
    <div className="w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>

    {/* SECOND → visual LEFT: info */}
    <div className="flex-1 flex flex-col gap-3 items-end min-w-0">
      {/* Name row: name RIGHT, cart button LEFT */}
      <div className="flex items-start justify-between w-full">
        {/* FIRST → RIGHT: name + subtitle */}
        <div className="flex flex-col items-end gap-0.5 flex-1 min-w-0">
          <span className="text-text-strong text-sm font-semibold leading-6 truncate w-full text-right">
            {product.name}
          </span>
          {product.subtitle && (
            <span className="text-text-weak text-xs leading-5 truncate w-full text-right">
              {product.subtitle}
            </span>
          )}
        </div>
        {/* SECOND → LEFT: add-to-cart button */}
        <button className="bg-primary/20 p-2 rounded-lg shrink-0 mr-2">
          <img src={cartShopIcon} alt="افزودن" className="w-4 h-4" />
        </button>
      </div>

      {/* Price row: price RIGHT, هزارتومان LEFT */}
      <div className="flex items-center gap-1 w-full">
        {/* FIRST → RIGHT: prices */}
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
        {/* SECOND → LEFT: unit */}
        <span className="text-text-weak text-sm leading-6">هزارتومان</span>
      </div>
    </div>
  </div>
)

export default ProductCardH

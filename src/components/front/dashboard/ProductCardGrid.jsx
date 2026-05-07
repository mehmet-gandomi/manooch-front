import cartShopIcon from '../../../assets/images/front/pdp/cart-shop.svg'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

const ProductCardGrid = ({ product }) => (
  <div className="flex flex-col items-end bg-bg-base rounded-lg overflow-hidden">
    <div className="w-full aspect-square overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>

    <div className="p-2 flex flex-col gap-2 w-full">
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-text-strong text-xs font-semibold leading-5 truncate w-full text-right">
          {product.name}
        </span>
        {product.subtitle && (
          <span className="text-text-weak text-xs leading-5 truncate w-full text-right">
            {product.subtitle}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between w-full gap-1">
        <button className="flex items-center gap-1 px-2 py-1.5 bg-primary/10 rounded-lg text-primary text-xs leading-5 shrink-0">
          <img src={cartShopIcon} alt="افزودن" className="w-4 h-4" />
          افزودن به سبد
        </button>
        <div className="flex flex-col items-end">
          {product.originalPrice && (
            <span className="text-danger text-xs leading-4 line-through">
              {formatFarsi(product.originalPrice)}
            </span>
          )}
          <div className="flex items-center gap-0.5">
            <span className="text-text-weak text-xs leading-5">هزارتومان</span>
            <span className="text-text-strong text-xs font-semibold leading-5">
              {formatFarsi(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ProductCardGrid

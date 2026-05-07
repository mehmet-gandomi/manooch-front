const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

const ProductCardV = ({ product }) => (
  <div className="flex flex-col gap-1 bg-bg-base p-2 rounded-lg shrink-0 w-[148px]">
    <div className="w-full h-[100px] rounded-lg overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>

    <div className="flex flex-col gap-0.5 w-full">
      <span className="text-text-strong text-xs font-semibold leading-5 truncate w-full text-right">
        {product.name}
      </span>
      {product.subtitle && (
        <span className="text-text-weak text-xs leading-5 truncate w-full text-right">
          {product.subtitle}
        </span>
      )}
    </div>

    {/* Price row: price RIGHT, هزارتومان LEFT */}
    <div className="flex items-center gap-1 w-full">
      {/* FIRST → RIGHT: prices */}
      <div className="flex items-center gap-1">
        <span className="text-text-strong text-xs font-semibold leading-5">
          {formatFarsi(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-danger text-xs leading-5 line-through">
            {formatFarsi(product.originalPrice)}
          </span>
        )}
      </div>
      {/* SECOND → LEFT: unit */}
      <span className="text-text-weak text-xs leading-5">هزارتومان</span>
    </div>
  </div>
)

export default ProductCardV

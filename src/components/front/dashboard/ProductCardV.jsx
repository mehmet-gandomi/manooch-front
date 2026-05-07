const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

const ProductCardV = ({ product }) => (
  <div className="flex flex-col gap-1 items-end bg-bg-base p-2 rounded-lg shrink-0 w-[148px]">
    <div className="w-full h-[100px] rounded-lg overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>

    <div className="flex flex-col gap-0.5 items-end w-full">
      <span className="text-text-strong text-xs font-semibold leading-5 truncate w-full text-right">
        {product.name}
      </span>
      {product.subtitle && (
        <span className="text-text-weak text-xs leading-5 truncate w-full text-right">
          {product.subtitle}
        </span>
      )}
    </div>

    <div className="flex items-center gap-1 w-full">
      <span className="text-text-weak text-xs leading-5">هزارتومان</span>
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
    </div>
  </div>
)

export default ProductCardV

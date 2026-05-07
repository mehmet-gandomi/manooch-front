import ProductCardV from './ProductCardV'

const ProductSection = ({ title, products }) => (
  <div className="flex flex-col gap-1 px-4 mb-4">
    {/* Section header
        Visual order (L→R): [مشاهده همه] [title]
        DOM: title FIRST(→RIGHT), مشاهده همه SECOND(→LEFT)                   */}
    <div className="flex items-center justify-between py-1">
      <span className="text-text-strong text-sm font-semibold leading-6">{title}</span>
      <button className="text-secondary text-sm leading-6">مشاهده همه</button>
    </div>

    {/* Horizontal scroll — RTL naturally starts from the right */}
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {products.map((product) => (
        <ProductCardV key={product.id} product={product} />
      ))}
    </div>
  </div>
)

export default ProductSection

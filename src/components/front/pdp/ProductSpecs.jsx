const ProductSpecs = ({ specs = [] }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-text-strong text-sm font-semibold leading-6 text-right">
      مشخصات کالا
    </span>
    <div className="flex gap-2 items-center flex-wrap">
      {specs.map((spec, i) => (
        <div key={i} className="bg-bg-base flex flex-col px-3 py-1.5 rounded-lg gap-0.5">
          <span className="text-text-weak text-xs leading-5">{spec.label}</span>
          <span className="text-text-strong text-sm font-semibold leading-6">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
)

export default ProductSpecs

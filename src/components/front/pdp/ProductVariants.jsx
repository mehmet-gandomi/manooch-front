import checkIcon from '../../../assets/images/front/pdp/check.svg'
import addIcon from '../../../assets/images/front/pdp/add.svg'
import minusIcon from '../../../assets/images/front/pdp/minus.svg'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

function Checkbox({ checked }) {
  return (
    <div
      className={`w-3 h-3 rounded-[6px] shrink-0 flex items-center justify-center border transition-colors ${
        checked ? 'bg-text-strong border-text-strong' : 'bg-bg-main border-border-light'
      }`}
    >
      {checked && <img src={checkIcon} alt="" className="w-2 h-2" />}
    </div>
  )
}

function PrimaryCheckbox({ checked }) {
  return (
    <div
      className={`w-4 h-4 rounded-[4px] shrink-0 flex items-center justify-center border transition-colors ${
        checked ? 'bg-primary border-primary' : 'bg-bg-main border-border-light'
      }`}
    >
      {checked && <img src={checkIcon} alt="" className="w-2.5 h-2.5" />}
    </div>
  )
}

// Clothing variant (color + size pickers)
export function ClothingVariants({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-col gap-1.5">
        <span className="text-text-strong text-sm font-semibold leading-6 text-right">
          رنگ : {colors[selectedColor]?.name}
        </span>
        <div className="flex flex-wrap gap-2">
          {colors.map((color, i) => (
            <button
              key={i}
              onClick={() => onColorChange(i)}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg transition-colors ${
                selectedColor === i ? 'bg-text-heading/15' : 'bg-text-heading/10'
              }`}
            >
              <Checkbox checked={selectedColor === i} />
              <img src={color.ellipse} alt={color.name} className="w-3 h-3" />
              <span className="text-text-heading text-xs leading-5">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-text-strong text-sm font-semibold leading-6 text-right">
          سایز : {sizes[selectedSize]}
        </span>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size, i) => (
            <button
              key={i}
              onClick={() => onSizeChange(i)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-text-heading/10"
            >
              <Checkbox checked={selectedSize === i} />
              <span className="text-text-heading text-xs leading-5">{size}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Wholesale unit selector with qty stepper
export function WholesaleUnits({ units, unitQty, onToggle, onChangeQty }) {
  return (
    <div className="flex flex-col gap-0">
      <span className="text-text-strong text-sm font-semibold leading-6 text-right mb-1.5">
        واحد فروش
      </span>
      {units.map((unit) => {
        const isChecked = !!unitQty[unit.name]
        const qty = unitQty[unit.name] || 0
        return (
          <div
            key={unit.name}
            role="button"
            tabIndex={0}
            onClick={() => onToggle(unit.name)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle(unit.name)}
            className="flex items-center gap-2 border border-border-light rounded-lg px-3 py-1.5 bg-bg-main mb-2 cursor-pointer"
          >
            <PrimaryCheckbox checked={isChecked} />
            <div className="flex-1 flex flex-col items-start gap-0.5 text-right">
              <span className="text-text-weak text-xs leading-5">{unit.name}</span>
              <span className="text-text-strong text-sm font-semibold leading-6">
                {formatFarsi(unit.packSize)} {unit.packUnit}
              </span>
            </div>
            {isChecked && (
              <div className="flex items-center gap-1 rounded-lg px-1 py-1">
                <button
                  onClick={(e) => { e.stopPropagation(); onChangeQty(unit.name, 1) }}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  <img src={addIcon} alt="+" className="w-5 h-5" />
                </button>
                <span className="text-primary text-sm font-semibold leading-6 min-w-[20px] text-center">
                  {formatFarsi(qty)}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); onChangeQty(unit.name, -1) }}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  <img src={minusIcon} alt="−" className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

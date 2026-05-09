import FrontBottomNav from '../FrontBottomNav'
import cartShopIcon from '../../../assets/images/front/pdp/cart-shop.svg'

const formatFarsi = (n) => new Intl.NumberFormat('fa-IR').format(n)

/**
 * @param {'clothing'|'wholesale'} productType
 * @param {number} price          displayed price (already computed total for wholesale)
 * @param {number} [originalPrice] clothing only — shown with strikethrough when present
 * @param {string} accentColor    Tailwind text-* class for the price
 * @param {boolean} hasSelection  wholesale: at least one unit checked; clothing: always true
 * @param {Array}  selectedUnits  wholesale units that are checked, with their qty
 * @param {object} unitQty        map of unit name → qty (for the summary chips)
 * @param {string} activeTab
 * @param {Function} onTabChange
 */
const PdpBottomBar = ({
  productType,
  price,
  originalPrice,
  accentColor,
  hasSelection,
  selectedUnits = [],
  unitQty = {},
  activeTab,
  onTabChange,
}) => (
  <div className="sticky bottom-0 bg-bg-main border-t border-border-light shrink-0">
    <div className="flex items-center justify-between px-4 py-2">
      {/* Left side: action */}
      {productType === 'clothing' ? (
        <button className="bg-header-from text-text-white text-sm rounded-xl px-4 py-3">
          افزودن به سبد
        </button>
      ) : hasSelection ? (
        <div className="flex items-center gap-2">
          <button className="rounded-xl p-1">
            <img src={cartShopIcon} alt="افزودن به سبد" className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1.5">
            {selectedUnits.map((unit, i) => (
              <div key={unit.name} className="flex items-center gap-1">
                {i > 0 && <span className="text-text-weak text-sm">|</span>}
                <span className="text-text-heading text-sm font-bold leading-6">
                  {formatFarsi(unitQty[unit.name])}
                </span>
                <span className="text-text-weak text-sm leading-6">{unit.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Right side: price */}
      <div className="flex flex-col items-end">
        {productType === 'clothing' && originalPrice && (
          <span className="text-text-weak text-xs line-through leading-4">
            {formatFarsi(originalPrice)} هزارتومان
          </span>
        )}
        <div className="flex items-center gap-1">
          <span className={`text-base font-bold leading-8 ${accentColor}`}>
            {formatFarsi(price)}
          </span>
          <span className="text-text-weak text-sm leading-6">هزارتومان</span>
        </div>
      </div>
    </div>

    <FrontBottomNav activeTab={activeTab} onTabChange={onTabChange} />
  </div>
)

export default PdpBottomBar

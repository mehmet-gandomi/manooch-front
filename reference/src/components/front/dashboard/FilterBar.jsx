import filterIcon from '../../../assets/images/front/dashboard/setting-5.svg'
import verticalIcon from '../../../assets/images/front/dashboard/row-vertical.svg'
import horizentalIcon from '../../../assets/images/front/dashboard/row-horizontal.svg'


const FilterBar = ({ categories, activeCategory, onCategoryChange, viewMode, onViewModeChange }) => (
  <div className="flex items-center gap-2 px-4 py-2">
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="flex items-center bg-bg-base rounded-lg overflow-hidden border border-border-light p-1">
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-1.5 transition-colors rounded-lg ${viewMode === 'list' ? 'bg-bg-soft' : ''}`}
        >
          <img src={verticalIcon} alt="" />
        </button>
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-1.5 transition-colors rounded-lg ${viewMode === 'grid' ? 'bg-bg-soft' : ''}`}
        >
          <img src={horizentalIcon} alt="" />
        </button>
      </div>
      <button className="flex items-center gap-1 px-1.5 py-2 rounded-lg border border-border-light">
        <img src={filterIcon} alt="" />
        <span className="text-text-heading text-xs leading-5">فیلتر</span>
      </button>
    </div>
    <div className="h-6 w-px bg-border-light shrink-0" />
    <div className="flex items-center gap-1.5 overflow-x-auto flex-1 no-scrollbar">
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => onCategoryChange(i)}
          className={`shrink-0 px-2 py-1.5 rounded-lg text-xs leading-5 transition-colors ${
            activeCategory === i
              ? 'bg-primary/15 text-primary font-semibold'
              : 'bg-primary/10 text-primary'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
)

export default FilterBar

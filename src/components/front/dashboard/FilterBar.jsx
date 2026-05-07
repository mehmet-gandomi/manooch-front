// RTL layout: filter+toggle is LAST (→ visual LEFT), categories are FIRST/flex-1 (→ visual RIGHT).
// Categories overflow scrolls to the LEFT to reveal more items (RTL natural direction).

const FilterBar = ({ categories, activeCategory, onCategoryChange, viewMode, onViewModeChange }) => (
  <div className="flex items-center gap-2 px-4 py-2">
    {/* FIRST → visual RIGHT: scrollable category pills (flex-1 takes remaining space) */}
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

    {/* Divider */}
    <div className="h-6 w-px bg-border-light shrink-0" />

    {/* LAST → visual LEFT: filter button + list/grid toggle */}
    <div className="flex items-center gap-1.5 shrink-0">
      <button className="flex items-center gap-1 px-1.5 py-1.5 rounded-lg border border-border-light">
        <span className="text-text-heading text-xs leading-5">فیلتر</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
            stroke="#3d4350"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* List / Grid toggle — list icon FIRST(→RIGHT), grid icon SECOND(→LEFT) */}
      <div className="flex items-center bg-bg-base rounded-xl overflow-hidden border border-border-light">
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-bg-soft' : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="#3d4350" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-bg-soft' : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="#3d4350" strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="#3d4350" strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="#3d4350" strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="#3d4350" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
)

export default FilterBar

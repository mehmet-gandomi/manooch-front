// src/components/StepIndicator.jsx
// Progress indicator for multi-step forms

const StepIndicator = ({ currentStep = 1, totalSteps = 3 }) => {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        const isLast = stepNumber === totalSteps

        return (
          <div key={stepNumber} className="flex items-center">
            {/* Circle */}
            <div
              className={`relative w-6 h-6 rounded-full flex items-center justify-center ${
                isCompleted || isActive
                  ? 'bg-primary shadow-[0_0_0_4px_rgba(0,104,255,0.2)]'
                  : 'bg-white border-2 border-bg-base'
              }`}
            >
              {isCompleted ? (
                // Checkmark for completed steps
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : isActive ? (
                // White inner circle for active step
                <div className="w-2 h-2 bg-white rounded-full" />
              ) : (
                // Gray inner circle for inactive step
                <div className="w-2 h-2 bg-text-placeholder rounded-full" />
              )}
            </div>

            {/* Line connector (not shown after last step) */}
            {!isLast && (
              <div
                className={`h-0.5 ${
                  isCompleted ? 'bg-primary w-[138px]' : 'bg-bg-base w-[138px]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default StepIndicator

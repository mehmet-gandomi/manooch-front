import { useEffect, useRef, useState } from 'react'

const CLOSE_THRESHOLD = 96

const createDragState = () => ({
  pointerId: null,
  startY: 0,
  offset: 0,
  hasDragged: false,
})

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  ariaLabel = 'پنجره بازشو',
}) => {
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStateRef = useRef(createDragState())

  useEffect(() => {
    if (!isOpen) {
      setDragOffset(0)
      setIsDragging(false)
      dragStateRef.current = createDragState()
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const resetDrag = () => {
    setDragOffset(0)
    setIsDragging(false)
    dragStateRef.current = createDragState()
  }

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      offset: 0,
      hasDragged: false,
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return
    }

    const nextOffset = Math.max(0, event.clientY - dragStateRef.current.startY)

    dragStateRef.current.offset = nextOffset
    dragStateRef.current.hasDragged = nextOffset > 0

    setIsDragging(true)
    setDragOffset(nextOffset)
  }

  const handlePointerEnd = (event) => {
    if (dragStateRef.current.pointerId !== event.pointerId) {
      return
    }

    const shouldClose = dragStateRef.current.offset > CLOSE_THRESHOLD

    event.currentTarget.releasePointerCapture?.(event.pointerId)

    resetDrag()

    if (shouldClose) {
      onClose?.()
    }
  }

  const handleHandleClick = (event) => {
    if (!dragStateRef.current.hasDragged) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/10"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-sm items-end">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          onClick={(event) => event.stopPropagation()}
          className="w-full rounded-t-3xl bg-bg-main"
          style={{
            transform: `translateY(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 200ms ease-out',
          }}
        >
          <button
            type="button"
            aria-label="کشیدن برای بستن"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onClick={handleHandleClick}
            className="flex w-full cursor-grab touch-none items-center justify-center px-4 pb-6 pt-3 active:cursor-grabbing"
          >
            <span className="h-1 w-16 rounded-full bg-border-light" />
          </button>

          {children}
        </div>
      </div>
    </div>
  )
}

export default BottomSheet

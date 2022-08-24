import { useEffect, useRef, useState } from 'react'

export type DropElementTypes = HTMLElement | HTMLButtonElement | Document | null

export const useDragging = <T extends DropElementTypes>(ele: T) => {
  const [dragging, setDragging] = useState(0)
  // const eleRef = useRef<T>(null)

  useEffect(() => {
    // const ele = eleRef.current
    const showDropZone: EventListener = (e) => {
      e.preventDefault()

      setDragging((count) => count + 1)
    }
    const hideDropZone: EventListener = (e) => {
      e.preventDefault()

      setDragging((count) => count - 1)
    }

    ele?.addEventListener('dragenter', showDropZone, false)
    ele?.addEventListener('dragleave', hideDropZone, false)
    ele?.addEventListener('drop', hideDropZone, false)
    return () => {
      ele?.removeEventListener('dragenter', showDropZone, false)
      ele?.removeEventListener('dragleave', hideDropZone, false)
      ele?.removeEventListener('drop', hideDropZone, false)
    }
  }, [ele])

  return dragging > 0
}

import { useEffect, useState } from 'react'

export const useDragging = (ele: HTMLElement | Document | null) => {
  const [dragging, setDragging] = useState(0)

  useEffect(() => {
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
  return dragging
}

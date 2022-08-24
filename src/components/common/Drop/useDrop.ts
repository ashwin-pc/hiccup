import useConfigContext from 'components/ConfigContext'
import {
  useCallback,
  useRef,
  DragEvent,
  MutableRefObject,
  useEffect,
} from 'react'
import { DropElementTypes, useDragging } from './useDragging'

export interface DropProps<T extends DropElementTypes> {
  draggingOverDocument: boolean
  dragging: boolean
  ref: MutableRefObject<T | null>
  onDragOver: (evt: DragEvent) => void
  onDrop: (evt: DragEvent) => void
}

export const useDrop = <T extends DropElementTypes>(): DropProps<T> => {
  const { dragging: draggingOverDocument } = useConfigContext()
  const dropTargetRef = useRef<T>(null)
  const isDragging = useDragging<T | null>(dropTargetRef.current)
  const handleDragOver = useCallback((evt: DragEvent) => {
    evt.preventDefault()
    evt.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDrop = useCallback((evt: DragEvent) => {
    evt.preventDefault()
    const file = evt.dataTransfer.files[0]
    const url = evt.dataTransfer.getData('text/uri-list')

    if (url) {
      alert(url)
    }
  }, [])

  return {
    draggingOverDocument,
    dragging: isDragging,
    ref: dropTargetRef,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  }
}

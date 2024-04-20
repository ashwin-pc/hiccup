import useConfigContext from 'components/ConfigContext'
import { triggerEdit } from 'components/EditLinkModal'
import {
  EditModalField,
  Entities,
} from 'components/EditLinkModal/EditLinkModal'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { ConfigEntity } from 'modules/config'
import { DropElementTypes, useDragging } from 'modules/hooks'
import { useCallback, useRef, DragEvent, MutableRefObject } from 'react'
import toast from 'react-hot-toast'

export interface DropProps<T extends DropElementTypes> {
  draggingOverDocument: boolean
  dragging: boolean
  dropRef: MutableRefObject<T | null>
  onDragOver: (evt: DragEvent) => void
  onDrop: (evt: DragEvent) => void
}

export const useDrop = <T extends DropElementTypes, E extends Entities>(
  entity: E,
  onSave: (fields: EditModalField[]) => void,
  type: 'link' | 'background' = 'link'
): DropProps<T> => {
  const { dragging: draggingOverDocument, addConfig } = useConfigContext()
  const dropTargetRef = useRef<T>(null)
  const isDragging = useDragging<T | null>(dropTargetRef.current)
  const handleDragOver = useCallback((evt: DragEvent) => {
    evt.preventDefault()
    evt.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDrop = useCallback(
    (evt: DragEvent) => {
      evt.preventDefault()
      const file = evt.dataTransfer.files[0]
      const url = evt.dataTransfer.getData('text/uri-list')

      if (url) {
        const newLink: E =
          type === 'link'
            ? {
                ...entity,
                link: url,
              }
            : {
                ...entity,
                background: url,
              }

        const modalFields: EditModalField[] = [
          ...transformEntityToFields(newLink),
        ]

        if (type === 'background') {
          return onSave(modalFields)
        }

        triggerEdit({
          fields: modalFields,
          onSave,
          title: `Add/Edit link`,
        })
      }

      if (file) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const uploadedConfig = e.target?.result
          try {
            const config = JSON.parse(uploadedConfig as string) as ConfigEntity

            await addConfig(config, true)
            toast.success(
              `Loaded Config "${config.defaultTitle || 'Uploaded Config'}"`
            )
          } catch (e) {
            toast.error(`Invalid config: ${(e as Error).message}`)
            return
          }
        }
        reader.readAsText(file)
      }
    },
    [addConfig, entity, onSave, type]
  )

  return {
    draggingOverDocument,
    dragging: isDragging,
    dropRef: dropTargetRef,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  }
}

import Icon from 'components/common/Icon'
import useConfigContext, { triggerConfigError } from 'components/ConfigContext'
import { triggerEdit } from 'components/EditLinkModal'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import {
  transformEntityToFields,
  transformFieldsToEntity,
} from 'components/EditLinkModal/transforms'
import { validate } from 'modules/config'
import { NewEntity } from 'modules/config/Config'
import { FC, DragEvent, useCallback, useRef } from 'react'
import styles from './index.module.css'
import { useDragging } from './useDragging'

// Prevent default drag drop behaviour
window.addEventListener(
  'dragover',
  (e) => {
    e && e.preventDefault()
  },
  false
)
window.addEventListener(
  'drop',
  (e) => {
    e && e.preventDefault()
  },
  false
)

const CATEGORY_KEY = 'category'

export const FileUpload: FC = ({ children }) => {
  const {
    dispatch,
    config: { categories },
  } = useConfigContext()
  const dropTargetRef = useRef(null)
  const dragging = useDragging(document)
  const draggingOverDropTarget = useDragging(dropTargetRef.current)
  const handleDragOver = useCallback((evt: DragEvent) => {
    evt.preventDefault()
    evt.dataTransfer.dropEffect = 'copy'
  }, [])

  const onSave = useCallback(
    (modalData: EditModalField[]) => {
      const categoryFieldIndex = modalData.findIndex(
        ({ label }) => label === CATEGORY_KEY
      )
      const categoryField = modalData.slice(categoryFieldIndex, 1)[0]

      const newLink = transformFieldsToEntity(modalData) as NewEntity
      delete newLink.category
      dispatch.addQuickLink(categoryField.value || '', newLink)
    },
    [dispatch]
  )

  const handleDrop = useCallback(
    (evt: DragEvent) => {
      evt.preventDefault()
      const file = evt.dataTransfer.files[0]
      const linkUrl = evt.dataTransfer.getData('text/uri-list')

      // Links
      if (linkUrl) {
        const hasCategories = categories.length > 0
        const newLink: NewEntity = {
          name: '',
          link: linkUrl,
          tags: '',
        }
        const modalFields: EditModalField[] = [
          ...transformEntityToFields(newLink),
        ]

        if (hasCategories) {
          modalFields.unshift({
            type: 'select',
            label: CATEGORY_KEY,
            options: categories.map(({ title }) => ({
              label: title,
              value: title,
            })),
            value: categories[0].title,
          })
        } else {
          modalFields.unshift({
            type: 'input',
            label: CATEGORY_KEY,
            value: 'quick',
          })
        }

        triggerEdit({
          fields: modalFields,
          onSave,
          title: `Add link`,
        })
        return
      }

      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const uploadedConfig = e.target?.result
          const [valid, error, path] = validateUpload(uploadedConfig)

          if (!valid) {
            return triggerConfigError(
              `Failed to upload config: \nError ${error}\nPath: ${path}`
            )
          }

          dispatch.setConfig(JSON.parse(uploadedConfig as string))
        }
        reader.readAsText(file)
      }
    },
    [categories, dispatch, onSave]
  )

  const highlightClass = draggingOverDropTarget ? styles.highlight : undefined

  return (
    <div
      ref={dropTargetRef}
      className={styles.upload}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {children}
      {dragging > 0 && (
        <div className={[styles.dropzone, highlightClass].join(' ')}>
          <Icon size={40} icon="file" />
          Drop your link or config file here
        </div>
      )}
    </div>
  )
}

const validateUpload = (result: any) => {
  if (typeof result !== 'string') return [false, 'Not a JSON file', 'filetype']

  try {
    const configText = JSON.parse(result)
    return validate(configText)
  } catch (error) {
    return [false, 'Could not parse JSON', 'json']
  }
}

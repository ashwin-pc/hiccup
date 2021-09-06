import Icon from 'components/common/Icon'
import useConfigContext, { triggerConfigError } from 'components/ConfigContext'
import { validate } from 'modules/config'
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

export const FileUpload: FC = ({ children }) => {
  const { dispatch } = useConfigContext()
  const dropTargetRef = useRef(null)
  const dragging = useDragging(document)
  const draggingOverDropTarget = useDragging(dropTargetRef.current)
  const handleDragOver = useCallback((evt: DragEvent) => {
    evt.preventDefault()
    evt.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDrop = useCallback(
    (evt: DragEvent) => {
      evt.preventDefault()
      const file = evt.dataTransfer.files[0]

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
    [dispatch]
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
      {dragging >= 0 && (
        <div className={[styles.dropzone, highlightClass].join(' ')}>
          <Icon size={40} icon="file" />
          Drop your config file here
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

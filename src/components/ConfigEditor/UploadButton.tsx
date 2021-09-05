import Icon from 'components/common/Icon'
import { ChangeEvent, FC, useRef } from 'react'
import styles from './index.module.css'

interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget
}

export const UploadButton: FC<{ handleFile: (file: File) => void }> = ({
  handleFile,
}) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    hiddenFileInput.current?.click()
  }
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: HTMLInputEvent) => {
    const fileUploaded = event.target.files?.[0]
    fileUploaded && handleFile(fileUploaded)
  }
  return (
    <>
      <button className={styles.upload} onClick={handleClick}>
        Upload Config
        <Icon size={14} icon="upload" />
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  )
}

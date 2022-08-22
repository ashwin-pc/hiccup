import Icon from 'components/common/Icon'
import React, { ChangeEvent, FC, useRef } from 'react'

interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget
}

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  handleFile: (file: string | ArrayBuffer | null | undefined) => void
  size?: number
}

export const UploadButton: FC<Props> = ({
  handleFile,
  className,
  size = 14,
}) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: HTMLInputEvent) => {
    const fileUploaded = event.target.files?.[0]

    if (fileUploaded) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleFile(e.target?.result)
        event.target.value = ''
      }
      reader.readAsText(fileUploaded)
    }
  }

  return (
    <>
      <button
        className={className}
        onClick={() => hiddenFileInput.current?.click()}
      >
        <Icon size={size} icon="upload" />
        Load Config
      </button>
      <input
        type="file"
        accept=".json"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  )
}

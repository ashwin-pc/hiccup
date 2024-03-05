import { Icon } from 'components/common/Icon'
import { ConfigEntity } from 'modules/config'
import React, { ChangeEvent, FC, useRef } from 'react'
import toast from 'react-hot-toast'

interface HTMLInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget
}

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  addConfig: (config: ConfigEntity) => Promise<void>
  size?: number
}

export const UploadButton: FC<Props> = ({
  addConfig,
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
      reader.onload = async (e) => {
        const uploadedConfig = e.target?.result

        try {
          const config = JSON.parse(uploadedConfig as string) as ConfigEntity

          await addConfig(config)
          toast.success(
            `Loaded Config "${config.defaultTitle || 'Uploaded Config'}"`
          )
        } catch (e) {
          toast.error(`Invalid config: ${(e as Error).message}`)
          return
        }
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

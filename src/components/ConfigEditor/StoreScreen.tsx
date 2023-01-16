import { toast } from 'react-hot-toast'
import { Input } from 'components/common/Input'
import { IconButton } from 'components/common/Icon'
import useConfigContext from 'components/ConfigContext'
import { validateFile } from 'modules/config'
import { FC, useEffect, useState } from 'react'
import { UploadButton } from './UploadButton'
import { fetchConfig } from 'modules/config/load'
import { FileViewer } from './FileViewer'
import { ConfigList } from './ConfigList'
import styles from './StoreScreen.module.css'

export const StoreScreen: FC = () => {
  const { config } = useConfigContext()
  const [previewId, setPreviewId] = useState(config.id)

  useEffect(() => {
    setPreviewId(config.id)
  }, [config])

  return (
    <div className={styles.screen}>
      <ConfigList previewId={previewId} setPreviewId={setPreviewId} />
      <FileViewer configId={previewId} />
      <LoadFile />
      <URLInput />
    </div>
  )
}

const LoadFile = () => {
  const { storeActions } = useConfigContext()

  const handleFile = (
    configString: string | ArrayBuffer | null | undefined
  ) => {
    const [valid, message] = validateFile(configString)

    if (!valid) {
      return toast.error(message)
    }

    const config = JSON.parse(configString as string)
    storeActions.saveConfig(config)
    toast.success(`Loaded Config "${config.title}"`)
  }

  return <UploadButton className={styles.fileLoader} handleFile={handleFile} />
}

const URLInput = () => {
  const { storeActions } = useConfigContext()
  const [value, setValue] = useState('')
  const handleSubmit = async () => {
    if (value === '') {
      return
    }

    try {
      const config = await fetchConfig(value)
      storeActions.saveConfig(config)
      toast.success(`Added config "${config.title}"`)
    } catch (error) {
      return toast.error(`${error}`)
    }
  }

  return (
    <div className={styles.url} data-testid="config-url-input">
      <Input
        label="Add Config URL"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyUp={({ key }) => key === 'Enter' && handleSubmit()}
      />
      <IconButton
        icon="square-plus"
        buttonClassname={styles.addBtn}
        size={30}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

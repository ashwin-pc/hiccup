import { toast } from 'react-hot-toast'
import Icon, { Props as IconProps } from 'components/common/Icon'
import { Input } from 'components/common/Input'
import useConfigContext from 'components/ConfigContext'
import { EMPTY_CONFIG, validateFile, ConfigEntity } from 'modules/config'
import React, { FC, useEffect, useState } from 'react'
import styles from './StoreScreen.module.css'
import { delay } from 'modules/utils'
import { UploadButton } from './UploadButton'
import {
  fetchConfig,
  load as loadConfig,
  networkCall,
} from 'modules/config/load'
import { FileViewer } from './FileViewer'
import { DownloadButton } from './DownloadButton'

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
      <DownloadButton id={previewId} />
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
    <div className={styles.url}>
      <Input
        label="Add Config URL"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyUp={({ key }) => key === 'Enter' && handleSubmit()}
      />
      <IconButton
        icon="square-plus"
        className={styles.addBtn}
        size={30}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

const ConfigList: FC<{ previewId: string; setPreviewId: any }> = ({
  previewId,
  setPreviewId,
}) => {
  const { config: currentConfig, storeActions, store } = useConfigContext()
  const availableConfigs: ConfigEntity[] = Object.values(store.configs || {})

  return (
    <div className={styles.list}>
      {availableConfigs.map((config) => {
        const previewing = config.id === previewId
        return (
          <div
            key={config.id}
            className={`${styles.listItem} ${previewing && 'previewing'}`}
            data-id={config.id}
            tabIndex={previewing ? -1 : 0}
            onClick={() => setPreviewId(config.id)}
            onKeyUp={({ key }) => key === 'Enter' && setPreviewId(config.id)}
            role="button"
          >
            <span>{config.title}</span>

            <label>{config.id === currentConfig.id ? 'Active' : ''}</label>

            <IconButton
              icon="check"
              onSubmit={async () => {
                storeActions.setActiveId(config.id)

                // Use the caching strategy to load latest value
                await delay()
                const loadedConfig = await loadConfig(config.url)
                storeActions.saveConfig(loadedConfig)
              }}
            />

            <IconButton
              icon="sync"
              disabled={!config.url}
              onSubmit={async () => {
                const remoteConfig = await networkCall(config.url)
                if (!remoteConfig) return

                toast.success(`Synced URL: ${config.url}`)
              }}
            />

            <IconButton
              icon="trash"
              disabled={
                !!(
                  config.id === EMPTY_CONFIG.id ||
                  (config.url === './config.json' && !config.metadata?.editing)
                )
              }
              onSubmit={() => {
                try {
                  storeActions.deleteConfig(config.id)
                  toast.success(`Deleted config ${config.title}`)
                } catch (error) {
                  toast.error(
                    `Error deleting config. Error ${(error as Error).message}`
                  )
                }
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

interface ButtonProps extends Omit<IconProps, 'onClick' | 'onKeyUp'> {
  onSubmit: () => void
  disabled?: boolean
}

const IconButton: FC<ButtonProps> = ({
  onSubmit,
  disabled = false,
  size = 11,
  className,
  icon,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const handleClick = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled || loading) return

    setLoading(true)
    try {
      return await onSubmit()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`${disabled && 'disabled'} ${styles.listAction} ${className}`}
      tabIndex={disabled ? -1 : 0}
      role="button"
      onKeyUp={(e) => e.key === 'Enter' && handleClick(e)}
    >
      <Icon
        size={size}
        className={styles.listIcon}
        icon={loading ? 'ellipsis' : icon}
        {...props}
      />
    </div>
  )
}

import { toast } from 'react-hot-toast'
import Icon, { Props as IconProps } from 'components/common/Icon'
import { Input } from 'components/common/Input'
import useConfigContext from 'components/ConfigContext'
import { EMPTY_CONFIG, validate } from 'modules/config'
import {
  fetchConfig,
  load as loadConfig,
  networkCall,
} from 'modules/config/load'
import { ConfigEntity } from 'modules/config/types'
import React, { FC, useState } from 'react'
import styles from './AddScreen.module.css'
import { delay } from 'modules/utils'
import { UploadButton } from './UploadButton'

export const AddScreen: FC = () => {
  return (
    <div className={styles.screen}>
      <LoadFile />
      <URLInput />
      <ConfigList />
    </div>
  )
}

const LoadFile = () => {
  const { storeActions } = useConfigContext()

  const handleFile = (
    configString: string | ArrayBuffer | null | undefined
  ) => {
    if (typeof configString !== 'string') {
      return toast.error(
        'Uploaded file format incorrect. Upload a correct JSON file'
      )
    }

    try {
      const config: ConfigEntity = JSON.parse(configString)
      const [valid, message, path] = validate(config)

      if (!valid) {
        return toast.error(
          `Not a valid config. \nError: ${message}. \nPath: ${path}`
        )
      }

      storeActions.saveConfig(config)
      toast.success(`Loaded Config "${config.title}"`)
    } catch (e) {
      toast.error('Not a valid JSON')
    }
  }

  return (
    <UploadButton
      className={styles.fileLoader}
      size={40}
      handleFile={handleFile}
    />
  )
}

const URLInput = () => {
  const { storeActions } = useConfigContext()
  const [value, setValue] = useState('')
  const handleSubmit = async () => {
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
        tabIndex={0}
        size={30}
        onClick={handleSubmit}
      />
    </div>
  )
}

const ConfigList: FC = () => {
  const { config: currentConfig, storeActions, store } = useConfigContext()
  const availableConfigs: ConfigEntity[] = Object.values(store.configs || {})

  return (
    <div className={styles.list}>
      {availableConfigs.map((config) => {
        const activeItem = config.id === currentConfig.id
        return (
          <div
            key={config.id}
            className={`${styles.listItem} ${activeItem && 'active'}`}
          >
            <span>{config.title}</span>

            <label>Active</label>

            <IconButton
              icon="check"
              onClick={async () => {
                storeActions.setActiveId(config.id)

                // Use the caching strategy to load latest value
                await delay()
                const loadedConfig = await loadConfig(config.url)
                storeActions.saveConfig(loadedConfig)
              }}
            />

            {config.url && (
              <IconButton
                icon="sync"
                onClick={async () => {
                  const remoteConfig = await networkCall(config.url)
                  if (!remoteConfig) return

                  toast.success(`Synced URL: ${config.url}`)
                }}
              />
            )}

            <IconButton
              icon="trash"
              disabled={
                !!(
                  config.id === EMPTY_CONFIG.id ||
                  config.url === './config.json'
                )
              }
              onClick={() => {
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

interface ButtonProps extends Omit<IconProps, 'onClick'> {
  onClick: React.MouseEventHandler<HTMLDivElement>
  disabled?: boolean
}

const IconButton: FC<ButtonProps> = ({
  onClick,
  disabled = false,
  size = 11,
  className,
  icon,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const handleClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disabled || loading) return

    setLoading(true)
    try {
      return await onClick(e)
    } catch (error) {
      throw e
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      className={`${disabled && 'disabled'} ${styles.listAction} ${className}`}
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

const LoadFileButton: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => (
  <div className={styles.fileLoader} tabIndex={0} {...props}>
    <Icon icon="upload" className={styles.load} size={40} />
    <p>Click to load a config file</p>
  </div>
)

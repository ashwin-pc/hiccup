import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  FC,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { ConfigEntity } from 'modules/config/types'
import useMethods from 'modules/useMethods'
import { methods } from './methods'
import {
  EMPTY_CONFIG,
  load as loadConfig,
  save as saveConfig,
} from 'modules/config'
import { Modal, styles as modalStyles } from 'components/common/Modal'
import styles from './index.module.css'
import { on, off, trigger } from 'modules/ui-events'

interface IConfigContext {
  config: ConfigEntity
  dispatch: ReturnType<typeof methods>
  editing: boolean
  setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfigContext = createContext<IConfigContext | undefined>(undefined)
const CONFIG_ERROR_EVENT_TYPE = 'config-error'

const ConfigProvider: FC<{ config?: ConfigEntity }> = ({
  config: overridingConfig,
  children,
}) => {
  const [config, dispatch] = useMethods(methods, EMPTY_CONFIG)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState<string>()

  // Keyboard shortcuts
  useHotkeys('ctrl+e,cmd+e', () => setEditing((val) => !val))
  useHotkeys('Escape', () => setEditing(false))

  // Load the latest config on app start
  useEffect(() => {
    loadConfig(overridingConfig).then((loadedConfig) => {
      dispatch.setConfig(loadedConfig)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save the config when its updated
  useEffect(() => {
    try {
      saveConfig(config)
    } catch (e: any) {
      console.error(e)
      setError(e.message)

      // Reload last saved config
      loadConfig().then((loadedConfig) => {
        dispatch.setConfig(loadedConfig)
      })
    }
  }, [config, dispatch])

  useEffect(() => {
    const handleError = ({ detail }: { detail: string }) => setError(detail)
    on(CONFIG_ERROR_EVENT_TYPE, handleError)
    return () => {
      off(CONFIG_ERROR_EVENT_TYPE, handleError)
    }
  }, [])

  const contextValue = {
    config,
    dispatch,
    editing: config.metadata?.readonly ? false : editing,
    setEditing,
  }

  return (
    <ConfigContext.Provider value={contextValue}>
      <>
        {children}
        <Modal show={!!error} onClose={() => setError(undefined)}>
          <h1 className={modalStyles.title}>Error</h1>
          <p className={modalStyles.body}>
            There was an error saving/loading the config. See the error message
            below to fix it.
          </p>
          <div className={styles.error}>{error}</div>
        </Modal>
      </>
    </ConfigContext.Provider>
  )
}

const useConfigContext = () => {
  const context = useContext(ConfigContext)

  if (context === undefined) throw new Error('useConfigContext is undefined')

  return context
}

const triggerConfigError = (error: string) =>
  trigger(CONFIG_ERROR_EVENT_TYPE, error)

export {
  triggerConfigError,
  ConfigProvider,
  ConfigContext,
  useConfigContext,
  useConfigContext as default,
}

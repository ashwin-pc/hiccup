import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
  FC,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { addConfigId } from '../../modules/configId'
import process from 'process'
import { ConfigEntity } from 'modules/config/Config'
import useMethods from 'modules/useMethods'
import { methods } from './methods'
import { load as loadConfig, save as saveConfig } from 'modules/config'
import { Modal, styles as modalStyles } from 'components/common/Modal'
import styles from './index.module.css'

// const CONFIG_KEY = 'config'

interface IConfigContext {
  config: ConfigEntity
  dispatch: ReturnType<typeof methods>
  editing: boolean
  setEditing: React.Dispatch<boolean>
}

const ConfigContext = createContext<IConfigContext | undefined>(undefined)

const ConfigProvider: FC<{ config?: ConfigEntity }> = ({
  config: overridingConfig,
  children,
}) => {
  const [config, dispatch] = useMethods(methods, {})
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

  // const [config, setRealConfig] = useState({})
  // const url = (process.env.PUBLIC_URL || '.') + '/config.json'

  // const setConfig = useCallback((configValue) => {
  //     setRealConfig(addConfigId(configValue))
  // }, [])

  // const getConfig = useCallback(async () => {
  //     // Give highest priority to the overriding config
  //     if (overridingConfig) {
  //         setConfig(overridingConfig)

  //         return
  //     }

  //     // Check localstorage for config
  //     const localConfig = localStorage.getItem(CONFIG_KEY)
  //     if (localConfig) {
  //         setConfig(JSON.parse(localConfig))

  //         return
  //     }

  //     // Else fetch the default file
  //     const result = await fetch(url).then(response => response.json())

  //     setConfig(result)
  // }, [overridingConfig, setConfig, url])

  // const updateConfig = useCallback(newConfig => {
  //     setConfig(newConfig)
  // }, [setConfig])

  // const resetConfig = useCallback(() => {
  //     getConfig()
  // }, [getConfig])

  // const clearConfig = useCallback(() => {
  //     localStorage.removeItem(CONFIG_KEY)
  //     getConfig()
  // }, [getConfig])

  // useEffect(() => {
  //     getConfig()
  // }, [getConfig])

  // useEffect(() => {
  //     localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
  // }, [config])

  return (
    <ConfigContext.Provider value={{ config, dispatch, editing, setEditing }}>
      <>
        {children}
        <Modal show={!!error} onClose={() => setError(undefined)}>
          <h1 className={modalStyles.title}>Error</h1>
          <p className={modalStyles.body}>
            There was an error saving the change. See the error message below to
            fix it.
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

export {
  ConfigProvider,
  ConfigContext,
  useConfigContext,
  useConfigContext as default,
}

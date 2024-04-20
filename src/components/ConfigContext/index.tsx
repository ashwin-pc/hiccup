import React, {
  createContext,
  useState,
  useContext,
  FC,
  useEffect,
  useCallback,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import {
  Config,
  ConfigService,
  ConfigParams,
  configService,
  AppState,
  AppStore,
  ConfigEntity,
  ConfigMap,
  StoreActions,
  useStore,
  ROOT_ID,
} from 'modules/config'
import { useDragging } from 'modules/hooks'
import toast from 'react-hot-toast'

interface IConfigContext {
  config: Config | undefined
  availableConfigs: ConfigMap
  configService: ConfigService
  dragging: boolean
  storeActions: StoreActions
  store: AppStore
  addConfig: (
    data: ConfigEntity,
    setDefaultActiveConfig?: boolean
  ) => Promise<void>
  updateConfig: (
    partialData: Partial<ConfigEntity>,
    optionalProps?: Partial<ConfigParams>
  ) => Promise<void>
  refetchConfig: () => Promise<void>
  updateAvailableConfigs: (configs: ConfigMap) => void
  setActiveConfig: (id: string) => Promise<void>
  deleteConfig: (config: Config) => Promise<void>
}

const ConfigContext = createContext<IConfigContext | undefined>(undefined)

const ConfigProvider: FC = ({ children }) => {
  const [activeId, setActiveId] = useState<string>()
  const [availableConfigs, setAvailableConfigs] = useState<ConfigMap>({})

  const { dispatch: storeActions, store } = useStore()
  const dragging = useDragging(document)

  // Initialize the config service
  useEffect(() => {
    const init = async () => {
      // Start the service which loads the active config
      try {
        const configs = await configService.getAvailableConfigs()
        const config = await configService.getDefaultActiveConfig(configs)

        if (!config) {
          throw new Error('No active config found')
        }

        // Set the active config to be used in the context
        setAvailableConfigs(configs)
        setActiveId(config.id)
        storeActions.setAppState(AppState.READY)
        document.getElementById(ROOT_ID)?.classList.remove('loading')
      } catch (error) {
        console.error('Failed to start the config service', error)
        toast.error(
          `Failed to start the config service.\n Error: ${
            (error as Error).message
          }`
        )
      }
    }

    if (store.state === AppState.UNINITIALIZED) {
      storeActions.setAppState(AppState.LOADING)
      init()
    }
  }, [store.state, storeActions])

  // Keyboard shortcuts
  useHotkeys('ctrl+e,cmd+e', () => storeActions.toggleEditing(), [storeActions])
  useHotkeys(
    'Escape',
    () => {
      if (store.state === AppState.EDITING)
        storeActions.setAppState(AppState.READY)
    },
    [store.state, storeActions]
  )

  const addConfig = useCallback(
    async (data: ConfigEntity, setDefaultActiveConfig: boolean = true) => {
      const newConfig = await configService.addConfig(data)
      setAvailableConfigs((prev) => ({ ...prev, [newConfig.id]: newConfig }))
      if (setDefaultActiveConfig) {
        setActiveId(newConfig.id)
      }
    },
    [setAvailableConfigs]
  )

  const updateConfig = useCallback(
    async (
      partialData: Partial<ConfigEntity>,
      optionalProps?: Partial<ConfigParams>
    ) => {
      const id = optionalProps?.id || activeId
      if (!id) return

      try {
        const newConfig = await configService.updateConfig(
          availableConfigs[id],
          partialData,
          optionalProps
        )
        setAvailableConfigs((prev) => ({ ...prev, [newConfig.id]: newConfig }))
      } catch (error) {
        console.error('Failed to update config', error)
        toast.error(`Failed to update config: \n${(error as Error).message}`)
      }
    },
    [activeId, availableConfigs]
  )

  const refetchConfig = useCallback(async () => {
    if (!activeId) return
    const config = availableConfigs[activeId]
    const newConfig = await configService.create({
      ...config,
      data: undefined,
    })
    setAvailableConfigs((prev) => ({ ...prev, [newConfig.id]: newConfig }))
  }, [activeId, availableConfigs])

  const updateAvailableConfigs = useCallback(
    (configs: ConfigMap) => {
      setAvailableConfigs(configs)
    },
    [setAvailableConfigs]
  )

  const setActiveConfig = useCallback(async (id: string) => {
    setActiveId(id)

    // Add configID to the URL
    const url = new URL(window.location.href)
    url.searchParams.set('id', id)
    window.history.pushState({}, '', url.toString())
  }, [])

  const deleteConfig = useCallback(
    async (config: Config) => {
      await configService.deleteConfig(config)
      const newConfigs = { ...availableConfigs }
      delete newConfigs[config.id]
      setAvailableConfigs(newConfigs)
    },
    [availableConfigs]
  )

  const contextValue = {
    config: availableConfigs[activeId ?? ''],
    availableConfigs,
    dragging,
    storeActions,
    store,
    addConfig,
    updateConfig,
    refetchConfig,
    configService,
    updateAvailableConfigs,
    setActiveConfig,
    deleteConfig,
  }

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  )
}

// This overload is for when a selector is provided: it returns the selected part of the state
function useConfigContext<T>(selector: (state: IConfigContext) => T): T

// This overload is for when no selector is provided: it returns the entire context
function useConfigContext(): IConfigContext

// Implementation of the hook that checks whether a selector is provided and acts accordingly
function useConfigContext<T>(
  selector?: (state: IConfigContext) => T
): T | IConfigContext {
  const context = useContext(ConfigContext)

  if (context === undefined) {
    throw new Error('useConfigContext must be used within a ConfigProvider')
  }

  // Check if a selector is provided and return its result if so, otherwise return the whole context
  return selector ? selector(context) : context
}

export {
  ConfigProvider,
  ConfigContext,
  useConfigContext,
  useConfigContext as default,
}

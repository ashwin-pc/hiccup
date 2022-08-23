import useMethods from 'modules/useMethods'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { CONFIG_KEY, EMPTY_CONFIG } from './constants'
import { load as loadConfig, loadStoreFromCache } from './load'
import { runMigrations } from './runMigrations'
import { ConfigEntity, LocalConfigStore } from './types'
import validate from './validate'

export const EMPTY_STATE: LocalConfigStore = {
  active: EMPTY_CONFIG.id,
  untouched: true,
  configs: {
    [EMPTY_CONFIG.id]: EMPTY_CONFIG,
  },
}

export const useStore = () => {
  const [store, dispatch] = useMethods(methods, EMPTY_STATE)

  // Load the latest config on app start
  useEffect(() => {
    const hydrate = async () => {
      try {
        // Load config store from memory if it exists
        const localConfigStore = loadStoreFromCache()
        if (localConfigStore) {
          dispatch.setStore(localConfigStore)
        }

        // Load default config
        const configKey = 'config'
        const searchParams = new URLSearchParams(window.location.search)
        const configURLParam = searchParams.get(configKey)
        const cachedActiveURL =
          localConfigStore?.configs[localConfigStore.active].url
        const loadedConfig = await loadConfig(
          configURLParam || cachedActiveURL || undefined
        )

        // Update active if the loaded config is not present in the store
        const updateActive = !localConfigStore?.configs[loadedConfig.id]

        dispatch.saveConfig(loadedConfig, updateActive)

        runMigrations(dispatch)
      } catch (e) {
        toast.error((e as Error).message)
      } finally {
        toast.success('All set!')
      }
    }

    hydrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(store))
  }, [store])

  return {
    store,
    config: store.configs[store.active],
    dispatch,
  }
}

const methods = (state: LocalConfigStore) => ({
  setStore: (store: LocalConfigStore) => store,

  setActiveId: (id: string) => {
    state.active = id
  },

  setUntouched: (untouched: boolean) => {
    state.untouched = untouched
  },

  saveConfig: (config: ConfigEntity, updateActive = true) => {
    const [valid, errorMessage, path] = validate(config)
    if (!valid)
      throw new Error(
        `Failed to save config: \nError: ${errorMessage}\nPath: ${path}`
      )

    const { id } = config

    state.active = updateActive ? id : state.active

    state.configs[id] = config
  },

  deleteConfig: (id: string) => {
    delete state.configs[id]

    // If there are no more configs, load the empty one
    if (Object.keys(state.configs).length <= 1) {
      state.configs[EMPTY_CONFIG.id] = EMPTY_CONFIG
      state.active = EMPTY_CONFIG.id
    }

    // If the  confiog you deleted was the active one, get the next config from the list
    if (state.active === id) {
      state.active = Object.keys(state.configs)[0]
    }
  },

  resetStore: () => EMPTY_STATE,
})

interface StoreActionMethods
  extends Omit<ReturnType<typeof methods>, 'setStore' | 'resetStore'> {
  setStore: (store: LocalConfigStore) => void
  resetStore: () => void
}

export type StoreActions = StoreActionMethods

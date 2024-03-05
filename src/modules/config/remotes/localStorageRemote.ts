import { ConfigEntity, ConfigParams, ManifestItem } from '../types'
import { Client, Remote } from './remoteService'

const TYPE = 'localStorage'
const KEY = 'hiccup:config'

interface LocalStorageConfig extends ManifestItem {
  data?: ConfigEntity
}

interface LocalStorageMap {
  [id: string]: LocalStorageConfig
}

export interface LocalStorageClient extends Client {
  initialize: () => Promise<void>
  getAllData: () => Promise<{ [id: string]: ConfigParams }>
}

const getLocalStorage = () => {
  const localConfigString = localStorage.getItem(KEY)
  if (!localConfigString) {
    throw new Error('Local storage cache not found')
  }
  const configs: LocalStorageMap = localConfigString
    ? JSON.parse(localConfigString)
    : {}

  if (!configs) {
    throw new Error('No localstorage data found')
  }
  return configs
}

export const LocalStorageRemote: Remote<LocalStorageClient> = {
  type: TYPE,
  readonly: false,
  client: {
    getData: async ({ id }: ConfigParams) => {
      const configs = getLocalStorage()
      const config = configs[id]

      if (!config.data) {
        throw new Error('Config not found in local storage')
      }

      return config.data
    },

    setData: async (config) => {
      const configs = getLocalStorage()
      configs[config.id] = {
        ...config,
      }

      localStorage.setItem(KEY, JSON.stringify(configs))
    },

    getAllData: async (): Promise<LocalStorageMap> => {
      const configs = getLocalStorage()
      return configs
    },

    initialize: async () => {
      const localConfigString = localStorage.getItem(KEY)
      if (!localConfigString) {
        localStorage.setItem(KEY, JSON.stringify({}))
      }
    },

    deleteData: async (id: string) => {
      const configs = getLocalStorage()
      delete configs[id]

      localStorage.setItem(KEY, JSON.stringify(configs))
    },
  },
}

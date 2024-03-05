import { Config } from './config'
import { loadManifest } from './load/manifest'
import { configMigrationService } from './migrations'
import {
  registerDefaultRemotes,
  LocalStorageRemote,
  remoteService,
  LocalStorageClient,
} from './remotes'
import { URLRemote, URLRemoteParams } from './remotes/urlRemote'
import { ConfigEntity, ConfigMap, ConfigParams } from './types'
import { generateId } from './utils'
import validate from './validate'

export class ConfigService {
  constructor() {
    registerDefaultRemotes()
  }

  async getAvailableConfigs(): Promise<ConfigMap> {
    // Load all remote configs from a manifest
    const manifest = await loadManifest()
    const availableConfigs: ConfigMap = {}

    for (const config of manifest.configs) {
      if (availableConfigs[config.id]) {
        throw new Error(`Duplicate config id: ${config.id}`)
      }

      availableConfigs[config.id] = await this.create(config)
    }

    // Load local storage configs if available
    const localClient = remoteService.getRemote<LocalStorageClient>(
      LocalStorageRemote.type
    ).client
    try {
      const localStorageConfigs = await localClient.getAllData()

      for (const id in localStorageConfigs) {
        if (availableConfigs[id]) {
          throw new Error(`Duplicate config id: ${id}`)
        }
        availableConfigs[id] = await this.create(localStorageConfigs[id])
      }
    } catch (e) {
      console.error('Failed to load local storage configs', e)
      localClient.initialize()
    }

    // Load any URL configs
    const url = new URL(window.location.href)
    const urlConfig = url.searchParams.get('config')
    if (urlConfig) {
      availableConfigs['url'] = await this.create({
        id: 'url',
        title: 'URL Config',
        remote: {
          type: URLRemote.type,
          url: urlConfig,
        } as URLRemoteParams,
      })
    }

    return availableConfigs
  }

  async create(params: ConfigParams): Promise<Config> {
    const newParams = { ...params }
    // Check to see if there is data in the params
    if (!newParams.data) {
      try {
        if (!newParams.remote.type)
          throw new Error(
            'Remote type not available. For non-remote configs, provide data in the params.'
          )

        const client = remoteService.getRemote(newParams.remote.type).client

        if (!client)
          throw new Error(`Remote type ${newParams.remote.type} not available`)

        newParams.data = await client.getData(params)

        if (!newParams.data) {
          throw new Error(`Failed to load data for config ${params.id}`)
        }

        // Migrate the data if needed
        newParams.data = configMigrationService.migrate(newParams.data)

        // Set the title to the default title for URL configs since the title is not available until the data is loaded
        if (newParams.id === 'url' && newParams.data) {
          newParams.title = newParams.data.defaultTitle
        }
      } catch (e) {
        newParams.error = (e as Error).message
      }
    }
    return new Config(newParams)
  }

  addConfig(configData: ConfigEntity) {
    // Migrate if needed
    const migratedData = configMigrationService.migrate(configData)
    const params: ConfigParams = {
      id: generateId(),
      title: migratedData.defaultTitle,
      remote: { type: LocalStorageRemote.type },
      data: migratedData,
      edited: true,
    }
    return this.create(params)
  }

  async getDefaultActiveConfig(
    availableConfigs: ConfigMap
  ): Promise<Config | undefined> {
    // 01. Check the URL for a config id
    const url = new URL(window.location.href)
    const configId = url.searchParams.get('id')
    if (configId && availableConfigs[configId]) {
      return availableConfigs[configId]
    }

    // 02. Check the URL for URL config
    if (availableConfigs.url) {
      return availableConfigs.url
    }

    // 03. Check available configs for a default
    if (availableConfigs.default) {
      return availableConfigs.default
    }

    // 04. Set the first available config
    const firstConfig = Object.values(availableConfigs)[0]
    if (firstConfig) {
      return firstConfig
    }
  }

  updateConfig(
    config: Config,
    partialData: Partial<ConfigEntity>,
    optionalProps?: Partial<ConfigParams>
  ): Config {
    if (!partialData) {
      throw new Error('No data to update')
    }

    if (config.readonly) {
      throw new Error('Config is readonly')
    }

    const newConfigData = { ...config.data, ...partialData }

    const [valid, errorMessage, path] = validate(newConfigData)
    if (!valid)
      throw new Error(
        `Failed to update config: \nError: ${errorMessage}\nPath: ${path}`
      )

    const newConfig = new Config({
      ...config,
      ...optionalProps,
      data: newConfigData as ConfigEntity,
    })

    return newConfig
  }

  async saveConfig(config: Config) {
    if (config.readonly) {
      throw new Error('Config is readonly')
    }

    config.edited = false

    const client = remoteService.getRemote(config.remote.type).client
    await client.setData(config)

    // Return a new config with the edited flag set to false
    return new Config({ ...config })
  }

  clone(config: Config) {
    if (!config.data) {
      throw new Error('Cannot clone a config without data')
    }
    // Cloned configs are needed to allow editing without changing the original config
    // To do this we use the LocalStorageRemote to store the cloned config
    const clonedConfig = new Config({
      ...config,
      // Generate random id
      id: generateId(),
      title: `${config.title} (clone)`,
      remote: { type: LocalStorageRemote.type },
      data: config.data,
      edited: true, // Mark that the config has to be saved
      readonly: false,
    })

    return clonedConfig
  }

  async deleteConfig(config: Config) {
    if (config.readonly) {
      throw new Error('Config is readonly')
    }

    const client = remoteService.getRemote(config.remote.type).client

    if (!client.deleteData)
      throw new Error(
        `Client for remote type ${config.remote.type} does not support deleting data`
      )
    await client.deleteData(config.id)

    return config.id
  }
}

export const configService = new ConfigService()

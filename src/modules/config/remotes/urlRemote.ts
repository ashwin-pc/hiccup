import { configMigrationService } from '../migrations'
import { RemoteParams } from '../types'
import validate from '../validate'
import { Client, Remote } from './remoteService'

const TYPE = 'url'

export interface URLRemoteParams extends RemoteParams {
  type: 'url'
  url: string
}

export interface URLClient extends Client {}

export const URLRemote: Remote<URLClient> = {
  type: TYPE,
  readonly: true,
  client: {
    getData: async ({ remote }) => {
      // Add a 10 second delay to simulate a slow network
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      const remoteParams = remote as URLRemoteParams
      const response = await fetch(remoteParams.url, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      })
      const data = await response.json()

      if (!data) {
        throw new Error(`Failed to load data from ${remoteParams.url}`)
      }

      // Migration if needed
      const migratedDate = configMigrationService.migrate(data)

      const [valid, message, path] = validate(migratedDate)

      if (!valid) {
        throw new Error(`Invalid config: ${message} at ${path}`)
      }

      return migratedDate
    },

    setData: async (config) => {
      throw new Error('Cannot set data on URLRemote')
    },

    validate: (params) => {
      if (params.remote.type === TYPE || !params.remote.url) {
        return false
      }

      return true
    },
  },
}

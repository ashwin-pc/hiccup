import { Config } from '../config'
import { ConfigParams, ConfigEntity } from '../types'

export interface Client {
  initialize?: () => Promise<void>
  validate?: (params: ConfigParams) => boolean
  getData: (configParams: ConfigParams) => Promise<ConfigEntity>
  setData: (config: Config) => Promise<void>
  deleteData?: (id: string) => Promise<void>
}

export interface Remote<T extends Client = Client> {
  type: string
  readonly?: boolean
  client: T
}

/**
 * RemoteService
 * Constains all the registered remote types and their clients
 */
export class RemoteService {
  private remotes = new Map<string, Remote>()

  /**
   * Registers a remote type
   * @param type
   * @param client
   */
  register(remote: Remote) {
    const { client, type } = remote
    if (this.remotes.has(type)) {
      throw new Error(`Remote type ${type} already registered`)
    }
    this.remotes.set(type, remote)

    // Initialize the client if it has an initialize method
    if (client.initialize) {
      client.initialize()
    }
  }

  /**
   * Unregisters a remote type
   * @param type
   */
  unregister(type: string) {
    this.remotes.delete(type)
  }

  /**
   * Gets a remote client
   * @param type
   */
  getRemote<T extends Client = Client>(type: string): Remote<T> {
    const remote = this.remotes.get(type) as Remote<T>
    if (!remote) {
      throw new Error(`Remote type "${type}" not registered`)
    }
    return remote
  }

  /**
   * Gets all registered remote types
   */
  getRemoteTypes() {
    return Array.from(this.remotes.keys())
  }
}

export const remoteService = new RemoteService()

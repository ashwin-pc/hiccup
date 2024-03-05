import { remoteService } from './remotes'
import { ConfigEntity, ConfigParams } from './types'
import validate from './validate'

/**
 * Config
 * A config is a remote or local entity that contains data of the links and categories
 */
export class Config {
  public readonly id: string
  public title: string
  public data?: ConfigEntity
  public readonly readonly: boolean
  public remote: ConfigParams['remote']
  public edited: boolean
  public error?: string

  constructor(params: ConfigParams) {
    const { id, title, remote, readonly, data, edited, error } = params

    if (!error || data) {
      // Validate the data
      const [valid, errorMessage, path] = validate(data)
      if (!valid) {
        throw new Error(
          `Invalid config: ${errorMessage} at ${path}\nConfig: ${JSON.stringify(
            data,
            null,
            2
          )}`
        )
      }
    }

    this.id = id
    this.title = title
    this.remote = remote
    this.readonly =
      readonly || remoteService.getRemote(remote.type).readonly || false
    this.data = data
    this.edited = edited || false
    this.error = error
  }

  get params(): ConfigParams {
    return {
      id: this.id,
      title: this.title,
      remote: this.remote,
      readonly: this.readonly,
      data: this.data,
      edited: this.edited,
      error: this.error,
    }
  }
}

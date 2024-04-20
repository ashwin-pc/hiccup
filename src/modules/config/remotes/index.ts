import { LocalStorageRemote } from './localStorageRemote'
import { remoteService } from './remoteService'
import { URLRemote } from './urlRemote'

export const registerDefaultRemotes = () => {
  remoteService.register(LocalStorageRemote)
  remoteService.register(URLRemote)
}

export * from './remoteService'
export { LocalStorageRemote } from './localStorageRemote'
export type { LocalStorageClient } from './localStorageRemote'

import uuid from 'modules/uuid'
import toast from 'react-hot-toast'
import { ConfigEntity } from './types'
import { StoreActions } from './useStore'
import validate from './validate'

export const runMigrations = (actions: StoreActions) => {
  v1_v2(actions)
}

const v1_v2 = (actions: StoreActions) => {
  const oldConfigKey = 'hiccup_config'
  try {
    const localConfigString = localStorage.getItem(oldConfigKey)
    if (!localConfigString) return
    const config: Partial<ConfigEntity> = JSON.parse(localConfigString)

    if (!config.version || config.version === '1.0') {
      config.version = `2.0`
    }

    //   Add missing props
    if (!config.id) config.id = uuid()
    if (!config.title) config.title = 'Recovered Config'
    if (!config.metadata) config.metadata = { readonly: false }

    const [valid, message, path] = validate(config as ConfigEntity)

    if (!valid)
      throw new Error(`Could not migrate V1 config. \n${path}\n${message}`)

    actions.saveConfig(config as ConfigEntity)

    // Remove old config from memory
    localStorage.removeItem(oldConfigKey)
    toast.success('Recoverd v1 config. Please save the config for future use')
  } catch (error) {
    return toast.error((error as Error).message)
  }
}

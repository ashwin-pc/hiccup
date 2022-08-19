import { CONFIG_KEY, URL } from '../constants'
import { ConfigEntity } from '../types'
import { isValid, validate } from '../validate'
import { triggerConfigError } from 'components/ConfigContext'
import { EMPTY_CONFIG } from '..'

export const load = async (
  overridingConfig?: ConfigEntity
): Promise<ConfigEntity> => {
  // Pick the overriding config if it exists first
  // if (overridingConfig && isValid(overridingConfig)) return overridingConfig

  // // Then check the local storage if we have one saved there
  // const localConfigString = localStorage.getItem(CONFIG_KEY)
  // const localConfig = !!localConfigString && JSON.parse(localConfigString)
  // if (isValid(localConfig)) return localConfig

  // Else fetch the default file.
  try {
    const remoteConfig = await sync()
    return remoteConfig
  } catch (e) {
    console.error('Failed to load config from url: ', URL, e)
    triggerConfigError(`Failed to load config from url: ${URL}\n${e}`)
  }

  return EMPTY_CONFIG
}

export const sync = async (): Promise<ConfigEntity> => {
  const searchParams = new URLSearchParams(window.location.search)
  const configURL = searchParams.get('config') || URL
  const remoteConfig = await fetch(configURL, {
    mode: 'cors',
  }).then((response) => response.json())
  const [valid, error, path] = validate(remoteConfig)
  if (!valid) throw new Error(`${error}\nPath: ${path}`)

  return remoteConfig
}

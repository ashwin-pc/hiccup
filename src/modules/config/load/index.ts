import { CONFIG_KEY, URL } from '../constants'
import { ConfigEntity } from '../types'
import { isValid, validate } from '../validate'
import { triggerConfigError } from 'components/ConfigContext'
import { EMPTY_CONFIG } from '..'

type CACHE_STRATEGIES = 'cache' | 'network' | 'cache-first' | 'network-first'

export const load = async (): Promise<ConfigEntity> => {
  const searchParams = new URLSearchParams(window.location.search)
  const strategy =
    (searchParams.get('cache') as CACHE_STRATEGIES | undefined) || 'network'
  let config: ConfigEntity | undefined

  console.log(window.location.search)

  switch (strategy) {
    case 'cache':
      config = cacheCall()
      break

    case 'cache-first':
      config = cacheCall(false)
      if (!config) {
        config = await networkCall()
      }
      break

    case 'network':
      config = await networkCall()
      break

    case 'network-first':
      config = await networkCall(false)
      if (!config) {
        config = cacheCall()
      }
      break

    default:
      break
  }

  return config || EMPTY_CONFIG
}

const cacheCall = (noFallback = true): ConfigEntity | undefined => {
  try {
    const localConfigString = localStorage.getItem(CONFIG_KEY)
    const localConfig = !!localConfigString && JSON.parse(localConfigString)
    if (!isValid(localConfig)) {
      noFallback &&
        triggerConfigError(
          `Cached config is either invalid or missing for key : ${CONFIG_KEY}`
        )
      return
    }

    return localConfig
  } catch (e) {
    noFallback &&
      triggerConfigError(`Failed to load config cached config.\n${e}`)
  }
}

const networkCall = async (
  noFallback = true
): Promise<ConfigEntity | undefined> => {
  try {
    const remoteConfig = await sync()
    return remoteConfig
  } catch (e) {
    noFallback &&
      triggerConfigError(`Failed to load config from url: ${URL}\n${e}`)
  }
}

export const sync = async (): Promise<ConfigEntity> => {
  const searchParams = new URLSearchParams(window.location.search)
  const configURL = searchParams.get('config') || URL
  const response = await fetch(configURL, {
    mode: 'cors',
  })
  const remoteConfig = await response.json()
  const [valid, error, path] = validate(remoteConfig)
  if (!valid) throw new Error(`${error}\nPath: ${path}`)

  return remoteConfig
}

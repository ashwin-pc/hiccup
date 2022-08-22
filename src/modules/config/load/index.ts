import { CONFIG_KEY, URL } from '../constants'
import { ConfigEntity, LocalConfigStore } from '../types'
import { isValid, validate } from '../validate'
import { EMPTY_CONFIG } from '..'
import toast from 'react-hot-toast'

type CACHE_STRATEGIES = 'cache' | 'network' | 'cache-first' | 'network-first'

export const load = async (url?: string): Promise<ConfigEntity> => {
  const strategy = getCacheStrategy()
  let config: ConfigEntity | undefined

  switch (strategy) {
    case 'cache':
      config = cacheCall()
      break

    case 'cache-first':
      config = cacheCall(false)
      if (!config) {
        config = await networkCall(url)
      }
      break

    case 'network':
      config = await networkCall(url)
      break

    case 'network-first':
      config = await networkCall(url, false)
      if (!config) {
        config = cacheCall()
      }
      break

    default:
      break
  }

  return config || EMPTY_CONFIG
}

export const getCacheStrategy = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const strategy =
    (searchParams.get('cache') as CACHE_STRATEGIES | undefined) || 'cache'
  return strategy
}

export const loadStoreFromCache = (): LocalConfigStore | undefined => {
  const localConfigString = localStorage.getItem(CONFIG_KEY)
  if (!localConfigString) return
  return JSON.parse(localConfigString)
}

const cacheCall = (noFallback = true): ConfigEntity | undefined => {
  try {
    const localConfigStore = loadStoreFromCache()
    const localConfig = localConfigStore?.configs[
      localConfigStore.active
    ] as ConfigEntity

    if (!isValid(localConfig)) {
      noFallback &&
        toast.error(
          `Cached config is either invalid or missing for key : ${CONFIG_KEY}`
        )
      return
    }

    return localConfig
  } catch (e) {
    noFallback && toast.error(`Failed to load config cached config.\n${e}`)
  }
}

export const fetchConfig = async (url = URL): Promise<ConfigEntity> => {
  console.log('Fetching url: ', url)
  const configURL = url || URL
  try {
    const response = await fetch(configURL, {
      mode: 'cors',
      cache: 'no-cache',
    })
    const remoteConfig = await response.json()
    const [valid, error, path] = validate(remoteConfig)
    if (!valid) throw new Error(`${error}\nPath: ${path}`)

    return { url: configURL, ...remoteConfig }
  } catch (error) {
    throw new Error(
      `Failed to fetch config from url: ${url}. Error: ${
        (error as Error).message
      }`
    )
  }
}

// Same as fetchConfig but with error handling
export const networkCall = async (
  url = URL,
  noFallback = true
): Promise<ConfigEntity | undefined> => {
  try {
    const remoteConfig = await fetchConfig(url)
    return remoteConfig
  } catch (e) {
    noFallback && toast.error((e as Error).message)
  }
}

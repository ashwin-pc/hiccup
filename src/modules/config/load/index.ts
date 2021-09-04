import { CONFIG_KEY, URL } from '../constants'
import { ConfigEntity } from '../Config'
import { isValid } from '../validate'

export const load = async (
  overridingConfig?: ConfigEntity
): Promise<ConfigEntity> => {
  // Pick the overriding connfig if it exists first
  if (overridingConfig && isValid(overridingConfig)) return overridingConfig

  // Then check the local storage if we have one saved there
  const localConfigString = localStorage.getItem(CONFIG_KEY)
  const localConfig = !!localConfigString && JSON.parse(localConfigString)
  if (isValid(localConfig)) return localConfig

  // Else fetch the default file
  if (URL) {
    try {
      const remoteConfig = await fetch(URL).then((response) => response.json())
      if (isValid(remoteConfig)) return remoteConfig
    } catch (e) {
      console.error('Failed to load config from url: ', URL, e)
    }
  }

  return {}
}

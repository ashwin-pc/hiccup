import { CONFIG_KEY } from '../constants'
import { ConfigEntity } from '../types'
import { validate } from '../validate'

export const save = (config: ConfigEntity) => {
  const [valid, errorMessage, path] = validate(config)
  if (!valid)
    throw new Error(
      `Failed to save config: \nError: ${errorMessage}\nPath: ${path}`
    )

  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

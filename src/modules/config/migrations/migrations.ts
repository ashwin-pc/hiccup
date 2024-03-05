import { AnyConfig } from './types'
import uuid from 'modules/uuid'

export function migrateTo2_0_0(config: AnyConfig): AnyConfig {
  const newConfig = { ...config }
  // Add missing props
  newConfig.id = uuid()
  newConfig.title = 'Recovered Config'
  newConfig.metadata = { readonly: false }
  return newConfig
}

export function migrateTo3_0_0(config: AnyConfig): AnyConfig {
  const newConfig = { ...config }

  // update the props
  delete newConfig.id
  newConfig.defaultTitle = newConfig.title
  delete newConfig.title
  delete newConfig.metadata?.readonly
  delete newConfig.metadata?.editing
  return newConfig
}

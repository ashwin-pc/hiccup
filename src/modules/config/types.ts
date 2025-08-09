import { Config } from './config'

export interface SearchProvider {
  type: string
  name?: string
  url?: string
}

export interface LinksEntity {
  name: string
  link: string
  tags?: string
  /**
   * Where should the link open?
   * Defaults to `_blank` to preserve existing behaviour.
   */
  target?: string
}

export interface FeaturedEntity extends LinksEntity {
  background?: string
}

export interface CategoriesEntity {
  title: string
  links: LinksEntity[]
}

export interface NewEntity extends LinksEntity {
  category?: string
}

export interface Metadata {
  search?: SearchProvider[]
}

// The datatype of the raw config data, not to be confused with the Config class
// which is a reference to a specific ConfigEntity which may not contain the config data
export interface ConfigEntity {
  version: string
  defaultTitle: string
  url?: string
  featured: FeaturedEntity[]
  categories: CategoriesEntity[]
  metadata?: Metadata
}

export interface RemoteParams {
  type: string
  error?: string
  [key: string]: any
}

export interface ConfigMap {
  [id: string]: Config
}

export enum AppState {
  UNINITIALIZED = 'uninitialized',
  LOADING = 'loading',
  READY = 'ready',
  EDITING = 'editing',
}
export interface AppStore {
  state: AppState
}

export interface Manifest {
  version: string
  configs: ManifestItem[]
}

export interface ManifestItem {
  id: string
  title: string
  remote: RemoteParams
  readonly?: boolean
}

// Serializable config params that can be used to create a Config object
export interface ConfigParams extends ManifestItem {
  data?: ConfigEntity
  edited?: boolean
  error?: string
}

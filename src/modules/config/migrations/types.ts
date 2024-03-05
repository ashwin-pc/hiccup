export interface AnyConfig {
  version?: string
  [key: string]: any // Extensible for any number of other properties
}

export type MigrationFunction = (config: AnyConfig) => AnyConfig

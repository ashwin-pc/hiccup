import { compare, gt, coerce } from 'semver'
import validate from '../validate'
import { ConfigEntity } from '../types'
import { AnyConfig, MigrationFunction } from './types'
import { migrateTo2_0_0, migrateTo3_0_0 } from './migrations'

export class ConfigMigrationService {
  private migrations: { [version: string]: MigrationFunction } = {}

  constructor() {
    this.addMigration('2.0.0', migrateTo2_0_0)
    this.addMigration('3.0.0', migrateTo3_0_0)
  }

  addMigration(version: string, migrationFn: MigrationFunction): void {
    if (this.migrations[version]) {
      throw new Error(`Migration for version ${version} already exists.`)
    }
    this.migrations[version] = migrationFn
  }

  migrate(config: AnyConfig): ConfigEntity {
    const sortedVersions = Object.keys(this.migrations).sort(compare)
    let currentConfig = config

    sortedVersions.forEach((version) => {
      if (gt(version, coerce(config.version) || '0.0.0')) {
        console.log(`Migrating to version ${version}`)
        currentConfig = this.migrations[version](currentConfig)
        currentConfig.version = version // Update the version after migration
      }
    })

    const [valid, message, path] = validate(currentConfig)

    if (!valid)
      throw new Error(`Could not migrate config. \n${path}\n${message}`)

    return currentConfig as ConfigEntity
  }
}

export const configMigrationService = new ConfigMigrationService()

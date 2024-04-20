import { ConfigMigrationService } from './migrationService'
import mockConfig from '../__mocks__/mock_1_0_0_config.json'
import mockConfig200 from '../__mocks__/mock_2_0_0_config.json'
import mockLatest from '../__mocks__/mock_latest_config.json'

describe('ConfigMigrationService', () => {
  let migrationService: ConfigMigrationService

  beforeEach(() => {
    migrationService = new ConfigMigrationService()
  })

  it('should add a migration', () => {
    const version = '4.0.0'
    const migrationFn = jest.fn()
    migrationService.addMigration(version, migrationFn)
    expect(migrationService['migrations'][version]).toBe(migrationFn)
  })

  it('should throw an error when adding a duplicate migration', () => {
    const version = '2.0.0'
    const migrationFn = jest.fn()
    expect(() =>
      migrationService.addMigration(version, migrationFn)
    ).toThrowError(`Migration for version ${version} already exists.`)
  })

  it('should migrate the oldest config to the latest version', () => {
    const config = JSON.parse(JSON.stringify(mockConfig))

    const migratedConfig = migrationService.migrate(config)
    // Check that the config was migrated to the latest version
    // A successful migration should update the version to the latest version since any invalid config should throw an error
    expect(migratedConfig.version).toBe('3.0.0')
  })

  it('should migrate the 2.0 config to the latest version', () => {
    const config = JSON.parse(JSON.stringify(mockConfig200))

    const migratedConfig = migrationService.migrate(config)
    // Check that the config was migrated to version 2.0.0
    expect(migratedConfig.version).toBe('3.0.0')
  })

  it('should throw an error when migrating an invalid config', () => {
    const config = { ...mockConfig, featured: 'should not be a string' }

    expect(() => migrationService.migrate(config)).toThrowError()
  })

  it('should not migrate a config that is already at the latest version', () => {
    const config = JSON.parse(JSON.stringify(mockLatest))

    // TODO: Spy on the migration functions to ensure they are not called
    const migratedConfig = migrationService.migrate(config)
    // Check that the config was not changed
    expect(migratedConfig).toEqual(config)
  })
})

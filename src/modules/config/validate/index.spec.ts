import { isValid, validate } from '.'
import { ConfigEntity } from '../types'
import mockConfig from '../__mocks__/mock_config_local.json'

let config: ConfigEntity

describe('validate', () => {
  beforeEach(() => {
    config = JSON.parse(JSON.stringify(mockConfig))
  })
  test('should return true for valid config', () => {
    const [valid] = validate(config)
    expect(valid).toBe(true)
  })
  test('should return false for missing property', () => {
    // @ts-expect-error
    delete config.featured[0].link
    const [valid, reason] = validate(config)
    expect(valid).toBe(false)
    expect(reason).toMatchInlineSnapshot(`"must have required property 'link'"`)
  })
  test('should return false for incorrect property', () => {
    // @ts-expect-error
    config.test = 1
    const [valid, reason] = validate(config)
    expect(valid).toBe(false)
    expect(reason).toMatchInlineSnapshot(
      `"must NOT have additional properties"`
    )
  })
  test('should return false for empty config', () => {
    // @ts-expect-error
    const [valid, reason] = validate(undefined)
    expect(valid).toBe(false)
    expect(reason).toMatchInlineSnapshot(`"No config"`)
  })
})

describe('isValid', () => {
  beforeEach(() => {
    config = JSON.parse(JSON.stringify(mockConfig))
  })
  test('should return true for valid config', () => {
    const valid = isValid(config)
    expect(valid).toBe(true)
  })
  test('should return false for empty config', () => {
    // @ts-expect-error
    const valid = isValid(undefined)
    expect(valid).toBe(false)
  })
})

import { CONFIG_KEY, URL } from '..'
import mockConfig from '../__mocks__/mock_config_local.json'
import { save } from '.'

describe('save', () => {
  test('should save to local storage correctly if valid', () => {
    localStorage.clear()
    save(mockConfig)
    const config = JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}')
    expect(config).toMatchObject(mockConfig)
  })
  test('should throw an error for invalid config', () => {
    expect(() => {
      // @ts-expect-error
      save({ test: 1 })
    }).toThrowError()
  })
})

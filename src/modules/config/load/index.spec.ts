import { load } from '.'
import { CONFIG_KEY } from '..'
import mockConfig from '../__mocks__/mock_config.json'

let testConfig = mockConfig

describe('load', () => {
  beforeEach(() => {
    testConfig = JSON.parse(JSON.stringify(mockConfig))
  })

  test('should load from local storage when no override given', async () => {
    window.localStorage.setItem(CONFIG_KEY, JSON.stringify(testConfig))

    const config = await load()
    expect(config).toMatchObject(testConfig)
    window.localStorage.removeItem(CONFIG_KEY)
  })
  //   TODO: Mocking fetch is a pain
  //   test('should load from url', async () => {
  //     .....
  //   })
  test('should return an empty object by default', async () => {
    const config = await load()
    expect(config).toMatchObject({})
  })
})

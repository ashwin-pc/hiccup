import { load } from './index'
import { CONFIG_KEY } from '..'
// import mockLocalConfig from '../__mocks__/mock_config_local.json'
import mockRemoteConfig from '../__mocks__/mock_config_remote.json'

// let testConfig = mockConfig

describe('load', () => {
  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve(JSON.parse(JSON.stringify(mockRemoteConfig))),
      } as Response)
  })

  beforeEach(() => {
    global.window = Object.create(window)
  })

  test('should load from network by defualt', async () => {
    window.localStorage.removeItem(CONFIG_KEY)

    const config = await load()
    expect(config).toMatchObject(mockRemoteConfig)
  })

  // TODO: Add cache strategy tests
  // switching the location.search params is more annoying than thought
})

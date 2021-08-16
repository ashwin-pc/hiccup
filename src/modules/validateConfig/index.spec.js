import validateConfig from ".";
import mockConfig from "./__mocks__/mock_config.json";

let config

describe('validateConfig', () => {
    beforeEach(() => {
        config = mockConfig
    })
    test('should return true for valid config', () => {
        const [valid] = validateConfig(JSON.stringify(config))
        expect(valid).toBe(true)
    })
    test('should return false for missing property', () => {
        delete config.featured[0].link
        const [valid, reason] = validateConfig(JSON.stringify(config))
        expect(valid).toBe(false)
        expect(reason).toEqual(`should have required property 'link'`)
    })
    test('should return false for incorrect property', () => {
        config.test = 1
        const [valid, reason] = validateConfig(JSON.stringify(config))
        expect(valid).toBe(false)
        expect(reason).toEqual(`should NOT have additional properties`)
    })

})

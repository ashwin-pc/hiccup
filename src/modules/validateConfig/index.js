import Ajv from 'ajv'
import schema from './schema.json'

const ajv = new Ajv()
const validate = ajv.compile(schema)

function validateConfig(config) {
    let configObj
    try {
        configObj = JSON.parse(config)
    } catch (error) {
        console.log('Not a valid JSON')
        return [false, 'Not a valid JSON']
    }

    const valid = validate(configObj)
    if (!valid) {
        console.log(validate.errors)
        const firstError = validate.errors[0]
        return [false, firstError.message, firstError.dataPath]
    }

    return [true]
}

export {
    validateConfig as default,
    validateConfig
}
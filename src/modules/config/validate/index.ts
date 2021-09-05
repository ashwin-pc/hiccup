import Ajv from 'ajv'
import { ConfigEntity } from '../Config'
import schema from './schema.json'

const ajv = new Ajv()
const validator = ajv.compile(schema)

function validate(config: ConfigEntity) {
  if (!config) return [false, 'No config']

  const valid = validator(config)
  if (!valid && validator.errors) {
    console.error(validator.errors)
    const firstError = validator.errors[0]
    return [false, firstError.message, firstError.instancePath]
  }

  return [true]
}

const isValid = (config: ConfigEntity) => validate(config)[0]

export { validate as default, validate, isValid }

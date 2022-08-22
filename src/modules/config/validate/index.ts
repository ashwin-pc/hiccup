import Ajv from 'ajv'
import { ConfigEntity } from '../types'
import schema from './schema.json'

const ajv = new Ajv()
const validator = ajv.compile(schema)

function validate(config: ConfigEntity): [boolean, string | undefined, string] {
  if (!config) return [false, 'No config', '']

  const valid = validator(config)
  if (!valid && validator.errors) {
    console.error(validator.errors)
    const firstError = validator.errors[0]
    return [false, firstError.message, firstError.instancePath]
  }

  return [true, '', '']
}

const isValid = (config: ConfigEntity) => validate(config)[0]

const validateFile = (result: any): [boolean, string] => {
  if (typeof result !== 'string')
    return [false, 'Uploaded file format incorrect. Upload a correct JSON file']

  try {
    const configText = JSON.parse(result)
    const [valid, message, path] = validate(configText)
    return [valid, `Not a valid config. \nError: ${message}. \nPath: ${path}`]
  } catch (error) {
    return [false, 'Not a valid JSON']
  }
}

export { validate as default, validate, validateFile, isValid }

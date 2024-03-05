import Ajv, { JSONSchemaType } from 'ajv'
import { Manifest } from '../types'
import { MANIFEST_URL } from '../constants'

/**
 * The Manifest is used to define the default remote configs to load
 */

export const loadManifest = async () => {
  const manifest = await fetch(MANIFEST_URL).then((res) => res.json())

  const valid = validator(manifest)
  if (!valid) {
    console.error(`Invalid manifest`, validator.errors)
    throw new Error('Invalid manifest')
  }
  return manifest
}

export const manifestSchema: JSONSchemaType<Manifest> = {
  type: 'object',
  properties: {
    version: { type: 'string' },
    configs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          remote: {
            type: 'object',
          },
          readonly: { type: 'boolean', nullable: true },
        },
        required: ['id', 'title', 'remote'],
      },
    },
  },
  required: ['version', 'configs'],
}

const ajv = new Ajv()
const validator = ajv.compile(manifestSchema)

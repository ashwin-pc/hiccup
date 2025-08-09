import { JSONSchemaType } from 'ajv'
import {
  CategoriesEntity,
  ConfigEntity,
  FeaturedEntity,
  LinksEntity,
} from './types'

export const ROOT_ID = 'root'

export const MANIFEST_URL = `${
  process.env.PUBLIC_URL || '.'
}/configs/manifest.json`
export const DEFAULT_BG = '/assets/card.png'

export const EMPTY_CONFIG: ConfigEntity = {
  version: '3.0',
  defaultTitle: 'Empty config',
  featured: [],
  categories: [],
}

export const DEFAULT_LINK: LinksEntity = {
  name: '',
  link: '',
  tags: '',
  target: '_blank',
}

export const DEFAULT_FEATURED_LINK: FeaturedEntity = {
  name: '',
  link: '',
  background: DEFAULT_BG,
  tags: '',
  target: '_blank',
}

export const DEFAULT_CATEGORY: Omit<CategoriesEntity, 'links'> = {
  title: '',
}

export const CONFIG_ENTITY_SCHEMA: JSONSchemaType<ConfigEntity> = {
  type: 'object',
  properties: {
    version: { type: 'string' },
    defaultTitle: { type: 'string' },
    url: { type: 'string', nullable: true },
    featured: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          link: { type: 'string' },
          tags: { type: 'string', nullable: true },
          background: { type: 'string', nullable: true },
          target: { type: 'string', enum: ['_self', '_blank'], nullable: true },
        },
        required: ['link', 'name'],
      },
    },
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          links: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                link: { type: 'string' },
                tags: { type: 'string', nullable: true },
                target: { type: 'string', enum: ['_self', '_blank'], nullable: true },
              },
              required: ['link', 'name'],
            },
          },
        },
        required: ['links', 'title'],
      },
    },
    metadata: {
      type: 'object',
      properties: {
        search: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              name: { type: 'string', nullable: true },
              url: { type: 'string', nullable: true },
            },
            required: ['type'],
          },
          nullable: true,
        },
      },
      nullable: true,
    },
  },
  required: ['defaultTitle', 'version', 'featured', 'categories'],
  additionalProperties: false,
}

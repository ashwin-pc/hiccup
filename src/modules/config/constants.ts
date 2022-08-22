import {
  CategoriesEntity,
  ConfigEntity,
  FeaturedEntity,
  LinksEntity,
} from './types'

export const URL = `${process.env.PUBLIC_URL || '.'}/configs/config.json`
export const CONFIG_KEY = 'hiccup_config_v2'
export const DEFAULT_BG = '/assets/card.png'

export const EMPTY_CONFIG: ConfigEntity = {
  version: '2.0',
  id: 'empty',
  title: 'Empty config',
  featured: [],
  categories: [],
}

export const DEFAULT_LINK: LinksEntity = {
  name: '',
  link: '',
  tags: '',
}

export const DEFAULT_FEATURED_LINK: FeaturedEntity = {
  name: '',
  link: '',
  background: DEFAULT_BG,
  tags: '',
}

export const DEFAULT_CATEGORY: Omit<CategoriesEntity, 'links'> = {
  title: '',
}

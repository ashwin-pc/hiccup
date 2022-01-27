import {
  CategoriesEntity,
  ConfigEntity,
  FeaturedEntity,
  LinksEntity,
  NewEntity,
} from './Config'

export const URL = `${process.env.PUBLIC_URL || '.'}/config.json`
export const CONFIG_KEY = 'hiccup_config'
export const DEFAULT_BG = '/assets/card.png'

export const EMPTY_CONFIG: ConfigEntity = {
  featured: [],
  categories: [],
}

export const DEFAULT_LINK: LinksEntity = {
  name: '',
  link: '',
  tags: '',
}

export const DEFAULT_NEW_LINK: NewEntity = {
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

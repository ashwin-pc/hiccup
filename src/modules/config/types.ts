export interface LinksEntity {
  name: string
  link: string
  tags?: string
}

export interface FeaturedEntity extends LinksEntity {
  background?: string
}

export interface CategoriesEntity {
  title: string
  links: LinksEntity[]
}

export interface NewEntity extends LinksEntity {
  category?: string
}

export interface Metadata {
  readonly?: boolean
}

export interface ConfigEntity {
  version?: string
  featured: FeaturedEntity[]
  categories: CategoriesEntity[]
  metadata?: Metadata
}

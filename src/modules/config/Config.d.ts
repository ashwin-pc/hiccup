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

export interface ConfigEntity {
  featured: FeaturedEntity[]
  categories: CategoriesEntity[]
}

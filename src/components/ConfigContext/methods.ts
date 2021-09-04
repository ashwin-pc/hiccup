import {
  ConfigEntity,
  FeaturedEntity,
  LinksEntity,
} from '../../modules/config/Config'

export const methods = (state: ConfigEntity) => ({
  addFeaturedCard: (card: FeaturedEntity) => {
    if (!state.featured) state.featured = []
    if (state.featured.length >= 4) return

    state.featured.push(card)
  },

  removeFeaturedCard: (cardIndex: number) => {
    state.featured?.splice(cardIndex, 1)
  },

  editFeaturedCard: (cardIndex: number, link: FeaturedEntity) => {
    if (!state.featured?.[cardIndex]) return
    state.featured[cardIndex] = link
  },

  addCategory: (title: string) => {
    if (!state.categories) state.categories = []

    state.categories.push({ title, links: [] })
  },

  removeCategory: (categoryIndex: number) => {
    state.categories?.splice(categoryIndex, 1)
  },

  editCategory: (categoryIndex: number, title: string) => {
    if (!state.categories?.[categoryIndex]) return

    state.categories[categoryIndex].title = title
  },

  addCategoryLink: (categoryIndex: number, categorylink: LinksEntity) => {
    state.categories?.[categoryIndex].links?.push(categorylink)
  },

  removeCategoryLink: (categoryIndex: number, cardIndex: number) => {
    if (!state.categories?.[categoryIndex]) return

    state.categories[categoryIndex].links.splice(cardIndex, 1)
  },

  editCategoryLink: (
    categoryIndex: number,
    cardIndex: number,
    link: LinksEntity
  ) => {
    if (!state.categories?.[categoryIndex].links[cardIndex]) return

    state.categories[categoryIndex].links[cardIndex] = link
  },

  setConfig: (config: ConfigEntity) => {
    state.categories = config.categories
    state.featured = config.featured
  },
})

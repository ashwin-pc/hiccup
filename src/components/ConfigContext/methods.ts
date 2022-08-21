import {
  ConfigEntity,
  FeaturedEntity,
  LinksEntity,
} from '../../modules/config/types'

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

  addQuickLink: (category: string, link: LinksEntity) => {
    const categoryIndex = state.categories.findIndex(
      ({ title }) => title === category
    )

    if (categoryIndex < 0) {
      state.categories.push({
        title: category,
        links: [link],
      })
      return
    }

    state.categories[categoryIndex].links.push(link)
  },

  setConfig: (config: ConfigEntity) => {
    state.id = config.id
    state.title = config.title
    state.url = config.url
    state.version = config.version
    state.categories = config.categories
    state.featured = config.featured
    state.metadata = config.metadata
  },
})

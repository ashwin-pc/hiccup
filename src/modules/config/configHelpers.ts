import produce from 'immer'
import toast from 'react-hot-toast'
import {
  ConfigEntity,
  FeaturedEntity,
  LinksEntity,
  SearchProvider,
} from './types'
import validate from './validate'

/**
 * Represents the payload for adding a featured card.
 */
interface AddFeaturedCard {
  card: FeaturedEntity
}

/**
 * Represents the payload for removing a featured card.
 */
interface RemoveFeaturedCard {
  cardIndex: number
}

/**
 * Represents the payload for editing a featured card.
 */
interface EditFeaturedCard {
  cardIndex: number
  link: FeaturedEntity
}

/**
 * Represents the payload for adding a category.
 */
interface AddCategory {
  title: string
}

/**
 * Represents the payload for removing a category.
 */
interface RemoveCategory {
  categoryIndex: number
}

/**
 * Represents the payload for editing a category.
 */
interface EditCategory {
  categoryIndex: number
  title: string
}

/**
 * Represents the payload for adding a category link.
 */
interface AddCategoryLink {
  categoryIndex: number
  categorylink: LinksEntity
}

/**
 * Represents the payload for removing a category link.
 */
interface RemoveCategoryLink {
  categoryIndex: number
  cardIndex: number
}

/**
 * Represents the payload for editing a category link.
 */
interface EditCategoryLink {
  categoryIndex: number
  cardIndex: number
  link: LinksEntity
}

/**
 * Represents the payload for adding a quick link.
 */
interface QuickLick {
  category: string
  link: LinksEntity
}

/**
 * Represents the response from an action.
 */
interface ActionResponse {
  config: ConfigEntity
  invalid?: boolean
}

/**
 * Pre-processes an action by validating the new configuration and handling errors.
 * @param fn - The function that performs the action on the configuration.
 * @returns The pre-processed action function.
 */
const preProcess =
  <T>(fn: (arg0: ConfigEntity, arg1: T) => ConfigEntity) =>
  (config: ConfigEntity, payload: T): ActionResponse => {
    try {
      const newConfig = fn(config, payload)
      const [valid, message, path] = validate(newConfig)

      if (!valid) {
        toast.error(`${path}. \n${message}`)
        return {
          config,
          invalid: true,
        }
      }

      return { config: newConfig }
    } catch (error) {
      toast.error((error as Error).message)
      return {
        config,
        invalid: true,
      }
    }
  }

/**
 * Adds a featured card to the configuration.
 * @param card - The featured card to add.
 * @returns The pre-processed action function.
 */
export const addFeaturedCard = preProcess<AddFeaturedCard>(
  produce((draft: ConfigEntity, props: AddFeaturedCard) => {
    const { card } = props
    if (!draft.featured) draft.featured = []
    if (draft.featured.length >= 4) return

    draft.featured.push(card)
  })
)

/**
 * Removes a featured card from the configuration.
 * @param cardIndex - The index of the card to remove.
 * @returns The pre-processed action function.
 */
export const removeFeaturedCard = preProcess<RemoveFeaturedCard>(
  produce((draft: ConfigEntity, props: RemoveFeaturedCard) => {
    const { cardIndex } = props
    draft.featured?.splice(cardIndex, 1)
  })
)

/**
 * Edits a featured card in the configuration.
 * @param cardIndex - The index of the card to edit.
 * @param link - The updated card data.
 * @returns The pre-processed action function.
 */
export const editFeaturedCard = preProcess<EditFeaturedCard>(
  produce((draft: ConfigEntity, { cardIndex, link }: EditFeaturedCard) => {
    if (!draft.featured?.[cardIndex]) return
    draft.featured[cardIndex] = link
  })
)

/**
 * Adds a category to the configuration.
 * @param title - The title of the category to add.
 * @returns The pre-processed action function.
 */
export const addCategory = preProcess<AddCategory>(
  produce((draft: ConfigEntity, { title }: AddCategory) => {
    if (!draft.categories) draft.categories = []

    draft.categories.push({ title, links: [] })
  })
)

/**
 * Removes a category from the configuration.
 * @param categoryIndex - The index of the category to remove.
 * @returns The pre-processed action function.
 */
export const removeCategory = preProcess<RemoveCategory>(
  produce((draft: ConfigEntity, { categoryIndex }: RemoveCategory) => {
    draft.categories?.splice(categoryIndex, 1)
  })
)

/**
 * Edits a category in the configuration.
 * @param categoryIndex - The index of the category to edit.
 * @param title - The updated category title.
 * @returns The pre-processed action function.
 */
export const editCategory = preProcess<EditCategory>(
  produce((draft: ConfigEntity, { categoryIndex, title }: EditCategory) => {
    if (!draft.categories?.[categoryIndex]) return

    draft.categories[categoryIndex].title = title
  })
)

/**
 * Adds a category link to the configuration.
 * @param categoryIndex - The index of the category to add the link to.
 * @param categorylink - The link to add.
 * @returns The pre-processed action function.
 */
export const addCategoryLink = preProcess<AddCategoryLink>(
  produce(
    (draft: ConfigEntity, { categoryIndex, categorylink }: AddCategoryLink) => {
      draft.categories?.[categoryIndex].links?.push(categorylink)
    }
  )
)

/**
 * Removes a category link from the configuration.
 * @param cardIndex - The index of the link to remove.
 * @param categoryIndex - The index of the category containing the link.
 * @returns The pre-processed action function.
 */
export const removeCategoryLink = preProcess<RemoveCategoryLink>(
  produce(
    (draft: ConfigEntity, { cardIndex, categoryIndex }: RemoveCategoryLink) => {
      if (!draft.categories?.[categoryIndex]) return

      draft.categories[categoryIndex].links.splice(cardIndex, 1)
    }
  )
)

/**
 * Edits a category link in the configuration.
 * @param cardIndex - The index of the link to edit.
 * @param categoryIndex - The index of the category containing the link.
 * @param link - The updated link data.
 * @returns The pre-processed action function.
 */
export const editCategoryLink = preProcess<EditCategoryLink>(
  produce(
    (
      draft: ConfigEntity,
      { cardIndex, categoryIndex, link }: EditCategoryLink
    ) => {
      if (!draft.categories?.[categoryIndex].links[cardIndex]) return

      draft.categories[categoryIndex].links[cardIndex] = link
    }
  )
)

/**
 * Adds a quick link to the configuration.
 * @param category - The category to add the quick link to.
 * @param link - The quick link to add.
 * @returns The pre-processed action function.
 */
export const addQuickLink = preProcess<QuickLick>(
  produce((draft: ConfigEntity, props: QuickLick) => {
    const { category, link } = props
    const categoryIndex = draft.categories.findIndex(
      ({ title }) => title === category
    )

    if (categoryIndex < 0) {
      draft.categories.push({
        title: category,
        links: [link],
      })
      return
    }

    draft.categories[categoryIndex].links.push(link)
  })
)

/**
 * Sets the search providers in the configuration.
 * @param providers - The search providers to set.
 * @returns The pre-processed action function.
 */
export const setSearchProviders = preProcess<SearchProvider[]>(
  produce((draft: ConfigEntity, props: SearchProvider[]) => {
    const providers = props

    if (!draft.metadata) {
      draft.metadata = {}
    }

    draft.metadata.search = providers
  })
)

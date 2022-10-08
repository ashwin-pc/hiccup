import produce from 'immer'
import uuid from 'modules/uuid'
import toast from 'react-hot-toast'
import { ConfigEntity, FeaturedEntity, LinksEntity, SearchProvider } from './types'
import validate from './validate'

interface AddFeaturedCard {
  card: FeaturedEntity
}

interface RemoveFeaturedCard {
  cardIndex: number
}

interface EditFeaturedCard {
  cardIndex: number
  link: FeaturedEntity
}

interface AddCategory {
  title: string
}

interface RemoveCategory {
  categoryIndex: number
}

interface EditCategory {
  categoryIndex: number
  title: string
}

interface AddCategoryLink {
  categoryIndex: number
  categorylink: LinksEntity
}

interface RemoveCategoryLink {
  categoryIndex: number
  cardIndex: number
}

interface EditCategoryLink {
  categoryIndex: number
  cardIndex: number
  link: LinksEntity
}

interface QuickLick {
  category: string
  link: LinksEntity
}

interface ActionResponse {
  config: ConfigEntity
  invalid?: boolean
}

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

export const addFeaturedCard = preProcess<AddFeaturedCard>(
  produce((draft: ConfigEntity, props: AddFeaturedCard) => {
    const { card } = props
    if (!draft.featured) draft.featured = []
    if (draft.featured.length >= 4) return

    draft.featured.push(card)
    process({ draft })
  })
)

export const removeFeaturedCard = preProcess<RemoveFeaturedCard>(
  produce((draft: ConfigEntity, props: RemoveFeaturedCard) => {
    const { cardIndex } = props
    draft.featured?.splice(cardIndex, 1)
    process({ draft })
  })
)

export const editFeaturedCard = preProcess<EditFeaturedCard>(
  produce((draft: ConfigEntity, { cardIndex, link }: EditFeaturedCard) => {
    if (!draft.featured?.[cardIndex]) return
    draft.featured[cardIndex] = link
    process({ draft })
  })
)

export const addCategory = preProcess<AddCategory>(
  produce((draft: ConfigEntity, { title }: AddCategory) => {
    if (!draft.categories) draft.categories = []

    draft.categories.push({ title, links: [] })
    process({ draft })
  })
)

export const removeCategory = preProcess<RemoveCategory>(
  produce((draft: ConfigEntity, { categoryIndex }: RemoveCategory) => {
    draft.categories?.splice(categoryIndex, 1)
    process({ draft })
  })
)

export const editCategory = preProcess<EditCategory>(
  produce((draft: ConfigEntity, { categoryIndex, title }: EditCategory) => {
    if (!draft.categories?.[categoryIndex]) return

    draft.categories[categoryIndex].title = title
    process({ draft })
  })
)

export const addCategoryLink = preProcess<AddCategoryLink>(
  produce(
    (draft: ConfigEntity, { categoryIndex, categorylink }: AddCategoryLink) => {
      draft.categories?.[categoryIndex].links?.push(categorylink)
      process({ draft })
    }
  )
)

export const removeCategoryLink = preProcess<RemoveCategoryLink>(
  produce(
    (draft: ConfigEntity, { cardIndex, categoryIndex }: RemoveCategoryLink) => {
      if (!draft.categories?.[categoryIndex]) return

      draft.categories[categoryIndex].links.splice(cardIndex, 1)
      process({ draft })
    }
  )
)

export const editCategoryLink = preProcess<EditCategoryLink>(
  produce(
    (
      draft: ConfigEntity,
      { cardIndex, categoryIndex, link }: EditCategoryLink
    ) => {
      if (!draft.categories?.[categoryIndex].links[cardIndex]) return

      draft.categories[categoryIndex].links[cardIndex] = link
      process({ draft })
    }
  )
)

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
    process({ draft })
  })
)

export const setSearchProviders = preProcess<SearchProvider[]>(
  produce((draft: ConfigEntity, props: SearchProvider[]) => {
    const providers = props

    if (!draft.metadata) {
      draft.metadata = {}
    }

    draft.metadata.search = providers
    process({ draft })
  })
)

interface ProcessProps {
  draft: ConfigEntity
}

const process = ({ draft }: ProcessProps): void => {
  // If this is not a edit
  if (draft.metadata?.editing) return

  if (!draft.metadata) {
    draft.metadata = {}
  }

  draft.metadata.editing = true

  draft.title = `${draft.title} - Editing`
  draft.id = uuid()
}

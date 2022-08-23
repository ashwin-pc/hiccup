import produce from 'immer'
import uuid from 'modules/uuid'
import toast from 'react-hot-toast'
import { ConfigEntity, FeaturedEntity, LinksEntity } from './types'
import validate from './validate'

interface BaseEdit {
  editing?: boolean
}

interface AddFeaturedCard extends BaseEdit {
  card: FeaturedEntity
}

interface RemoveFeaturedCard extends BaseEdit {
  cardIndex: number
}

interface EditFeaturedCard extends BaseEdit {
  cardIndex: number
  link: FeaturedEntity
}

interface AddCategory extends BaseEdit {
  title: string
}

interface RemoveCategory extends BaseEdit {
  categoryIndex: number
}

interface EditCategory extends BaseEdit {
  categoryIndex: number
  title: string
}

interface AddCategoryLink extends BaseEdit {
  categoryIndex: number
  categorylink: LinksEntity
}

interface RemoveCategoryLink extends BaseEdit {
  categoryIndex: number
  cardIndex: number
}

interface EditCategoryLink extends BaseEdit {
  categoryIndex: number
  cardIndex: number
  link: LinksEntity
}

interface QuickLick extends BaseEdit {
  category: string
  link: LinksEntity
}

interface ActionResponse {
  config: ConfigEntity
  invalid?: boolean
}

const preProcess =
  <T>(fn: (arg0: ConfigEntity, arg1: T) => ConfigEntity) =>
  (config: ConfigEntity, props: T): ActionResponse => {
    try {
      const newConfig = fn(config, props)
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
    const { card, editing } = props
    if (!draft.featured) draft.featured = []
    if (draft.featured.length >= 4) return

    draft.featured.push(card)
    process({ editing, draft })
  })
)

export const removeFeaturedCard = preProcess<RemoveFeaturedCard>(
  produce((draft: ConfigEntity, props: RemoveFeaturedCard) => {
    const { cardIndex, editing } = props
    draft.featured?.splice(cardIndex, 1)
    process({ editing, draft })
  })
)

export const editFeaturedCard = preProcess<EditFeaturedCard>(
  produce(
    (draft: ConfigEntity, { cardIndex, link, editing }: EditFeaturedCard) => {
      if (!draft.featured?.[cardIndex]) return
      draft.featured[cardIndex] = link
      process({ editing, draft })
    }
  )
)

export const addCategory = preProcess<AddCategory>(
  produce((draft: ConfigEntity, { title, editing }: AddCategory) => {
    if (!draft.categories) draft.categories = []

    draft.categories.push({ title, links: [] })
    process({ editing, draft })
  })
)

export const removeCategory = preProcess<RemoveCategory>(
  produce((draft: ConfigEntity, { editing, categoryIndex }: RemoveCategory) => {
    draft.categories?.splice(categoryIndex, 1)
    process({ editing, draft })
  })
)

export const editCategory = preProcess<EditCategory>(
  produce(
    (draft: ConfigEntity, { categoryIndex, title, editing }: EditCategory) => {
      if (!draft.categories?.[categoryIndex]) return

      draft.categories[categoryIndex].title = title
      process({ editing, draft })
    }
  )
)

export const addCategoryLink = preProcess<AddCategoryLink>(
  produce(
    (
      draft: ConfigEntity,
      { categoryIndex, categorylink, editing }: AddCategoryLink
    ) => {
      draft.categories?.[categoryIndex].links?.push(categorylink)
      process({ editing, draft })
    }
  )
)

export const removeCategoryLink = preProcess<RemoveCategoryLink>(
  produce(
    (
      draft: ConfigEntity,
      { cardIndex, categoryIndex, editing }: RemoveCategoryLink
    ) => {
      if (!draft.categories?.[categoryIndex]) return

      draft.categories[categoryIndex].links.splice(cardIndex, 1)
      process({ editing, draft })
    }
  )
)

export const editCategoryLink = preProcess<EditCategoryLink>(
  produce(
    (
      draft: ConfigEntity,
      { cardIndex, categoryIndex, link, editing }: EditCategoryLink
    ) => {
      if (!draft.categories?.[categoryIndex].links[cardIndex]) return

      draft.categories[categoryIndex].links[cardIndex] = link
      process({ editing, draft })
    }
  )
)

export const addQuickLink = preProcess<QuickLick>(
  produce((draft: ConfigEntity, props: QuickLick) => {
    const { category, link, editing } = props
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
    process({ editing, draft })
  })
)

interface ProcessProps extends BaseEdit {
  draft: ConfigEntity
}

const process = ({ draft, editing = true }: ProcessProps): void => {
  // If this is not a edit
  if (!editing || draft.metadata?.editing) return

  if (!draft.metadata) {
    draft.metadata = {}
  }

  draft.metadata.editing = editing

  draft.title = `${draft.title} - Editing`
  draft.id = uuid()
}

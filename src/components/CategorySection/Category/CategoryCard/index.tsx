import React, { useCallback, FC } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { CategoryCard } from './CategoryCard'
import { AddCategoryCard } from './AddCategoryCard'
import { LinksEntity } from 'modules/config/types'
import { triggerEdit } from 'components/EditLinkModal'
import { DEFAULT_LINK } from 'modules/config'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import {
  transformEntityToFields,
  transformFieldsToEntity,
} from 'components/EditLinkModal/transforms'
import {
  addCategoryLink,
  editCategoryLink,
  removeCategoryLink,
} from 'modules/config/configHelpers'
import { useDrop } from 'components/common/Drop'
interface Props {
  index: number
  categoryIndex: number
  link: LinksEntity
}

const ConnectedCategoryCard = ({
  index: cardIndex,
  link,
  categoryIndex,
}: Props) => {
  const hookProps = useCategoryCard(cardIndex, categoryIndex, link)
  return <CategoryCard {...hookProps} link={link} />
}

const useCategoryCard = (
  cardIndex: number,
  categoryIndex: number,
  link: LinksEntity
) => {
  const { editing, config, storeActions } = useConfigContext()

  const onDelete = useCallback(() => {
    const { config: newConfig, invalid } = removeCategoryLink(config, {
      categoryIndex,
      cardIndex,
    })

    if (invalid) return false
    storeActions.saveConfig(newConfig)
  }, [cardIndex, categoryIndex, config, storeActions])

  const onEdit = useCallback(
    (modalData: EditModalField[]) => {
      const updatedCategoryLink = transformFieldsToEntity(
        modalData
      ) as LinksEntity
      const { config: newConfig, invalid } = editCategoryLink(config, {
        categoryIndex,
        cardIndex,
        link: updatedCategoryLink,
      })

      if (invalid) return false
      storeActions.saveConfig(newConfig)
    },
    [cardIndex, categoryIndex, config, storeActions]
  )

  const newLink = {
    ...DEFAULT_LINK,
    ...link,
  }

  const dropProps = useDrop<HTMLDivElement, LinksEntity>(newLink, onEdit)

  return {
    onEdit,
    onDelete,
    editing,
    ...dropProps,
  }
}

const ConnectedAddCategoryCard: FC<{
  categoryIndex: number
  title: string
}> = ({ categoryIndex, title }) => {
  const { editing, config, storeActions } = useConfigContext()

  const onSave = useCallback(
    (modalData: EditModalField[]) => {
      const newCategoryLink = transformFieldsToEntity(modalData) as LinksEntity
      const { config: newConfig, invalid } = addCategoryLink(config, {
        categoryIndex,
        categorylink: newCategoryLink,
      })

      if (invalid) return false
      storeActions.saveConfig(newConfig)
    },
    [categoryIndex, config, storeActions]
  )

  return editing ? (
    <AddCategoryCard
      onClick={() =>
        triggerEdit({
          fields: transformEntityToFields(DEFAULT_LINK),
          onSave,
          title: `${title}: Add link`,
        })
      }
    />
  ) : null
}

export {
  ConnectedCategoryCard as CategoryCard,
  ConnectedCategoryCard as default,
  ConnectedAddCategoryCard as AddCategoryCard,
}

import React, { useCallback, FC } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { CategoryCard } from './CategoryCard'
import { AddCategoryCard } from './AddCategoryCard'
import { LinksEntity } from 'modules/config/Config'
import { triggerEdit } from 'components/EditLinkModal'
import { DEFAULT_LINK } from 'modules/config'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import {
  transformEntityToFields,
  transformFieldsToEntity,
} from 'components/EditLinkModal/transforms'
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
  const hookProps = useCategoryCard(cardIndex, categoryIndex)
  return <CategoryCard {...hookProps} link={link} />
}

const useCategoryCard = (cardIndex: number, categoryIndex: number) => {
  const { editing, dispatch } = useConfigContext()

  const onDelete = useCallback(() => {
    dispatch.removeCategoryLink(categoryIndex, cardIndex)
  }, [cardIndex, categoryIndex, dispatch])

  const onEdit = useCallback(
    (modalData: EditModalField[]) => {
      const updatedCategoryLink = transformFieldsToEntity(
        modalData
      ) as LinksEntity
      dispatch.editCategoryLink(categoryIndex, cardIndex, updatedCategoryLink)
    },
    [cardIndex, categoryIndex, dispatch]
  )

  return {
    onEdit,
    onDelete,
    editing,
  }
}

const ConnectedAddCategoryCard: FC<{
  categoryIndex: number
  title: string
}> = ({ categoryIndex, title }) => {
  const { editing, dispatch } = useConfigContext()

  const onSave = useCallback(
    (modalData: EditModalField[]) => {
      const newCategoryLink = transformFieldsToEntity(modalData) as LinksEntity
      dispatch.addCategoryLink(categoryIndex, newCategoryLink)
    },
    [categoryIndex, dispatch]
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

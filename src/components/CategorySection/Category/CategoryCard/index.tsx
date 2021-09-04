import React, { useMemo, useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { CategoryCard } from './CategoryCard'
import { AddCategoryCard } from './AddCategoryCard'
import { LinksEntity } from 'modules/config/Config'

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
    (newLink) => {
      dispatch.editCategoryLink(categoryIndex, cardIndex, newLink)
    },
    [cardIndex, categoryIndex, dispatch]
  )

  const edit = useMemo(
    () => ({
      onEdit,
      onDelete,
    }),
    [onDelete, onEdit]
  )

  return {
    edit: editing && edit,
  }
}

const ConnectedAddCategoryCard = ({
  categoryIndex,
}: {
  categoryIndex: number
}) => {
  const { editing, dispatch } = useConfigContext()

  const onSave = useCallback(
    (newLink) => {
      dispatch.addCategoryLink(categoryIndex, newLink)
    },
    [categoryIndex, dispatch]
  )

  return editing ? <AddCategoryCard onSave={onSave} /> : null
}

export {
  ConnectedCategoryCard as CategoryCard,
  ConnectedCategoryCard as default,
  ConnectedAddCategoryCard as AddCategoryCard,
}

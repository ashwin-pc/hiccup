import React, { useMemo, useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { Category } from './Category'
import { AddCategory } from './AddCategory'
import { CategoriesEntity } from 'modules/config/Config'

interface Props extends CategoriesEntity {
  index: number
}

const ConnectedCategory = (props: Props) => {
  const { index } = props
  const hookProps = useCategory(index)
  return <Category {...hookProps} {...props} />
}

const useCategory = (categoryIndex: number) => {
  const { editing, dispatch } = useConfigContext()

  const onDelete = useCallback(() => {
    dispatch.removeCategory(categoryIndex)
  }, [categoryIndex, dispatch])

  const onEdit = useCallback(
    (newTitle) => {
      dispatch.editCategory(categoryIndex, newTitle)
    },
    [categoryIndex, dispatch]
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

const ConnectedAddCategory = () => {
  const { editing, dispatch } = useConfigContext()

  const onSave = useCallback(
    (newCategoryTitle: string) => {
      dispatch.addCategory(newCategoryTitle)
    },
    [dispatch]
  )

  return editing ? <AddCategory onSave={onSave} /> : null
}

export {
  ConnectedCategory,
  ConnectedCategory as Category,
  ConnectedCategory as default,
  ConnectedAddCategory,
  ConnectedAddCategory as AddCategory,
}

import { useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { Category } from './Category'
import { AddCategory } from './AddCategory'
import { CategoriesEntity } from 'modules/config/Config'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { transformFieldsToEntity } from 'components/EditLinkModal/transforms'

interface Props extends CategoriesEntity {
  index: number
}

const ConnectedCategory = (props: Props) => {
  const { index: categoryIndex } = props
  const { editing, dispatch } = useConfigContext()

  const onDelete = useCallback(() => {
    dispatch.removeCategory(categoryIndex)
  }, [categoryIndex, dispatch])

  const onEdit = useCallback(
    (fields: EditModalField[]) => {
      const { title } = transformFieldsToEntity(fields) as any
      dispatch.editCategory(categoryIndex, title)
    },
    [categoryIndex, dispatch]
  )

  return (
    <Category
      editing={editing}
      onDelete={onDelete}
      onEdit={onEdit}
      {...props}
    />
  )
}

const ConnectedAddCategory = () => {
  const { editing, dispatch } = useConfigContext()

  const onSave = useCallback(
    ({ title: categoryTitle }) => {
      dispatch.addCategory(categoryTitle)
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

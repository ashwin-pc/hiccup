import { useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { Category } from './Category'
import { AddCategory } from './AddCategory'
import { CategoriesEntity } from 'modules/config/types'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { transformFieldsToEntity } from 'components/EditLinkModal/transforms'
import {
  addCategory,
  editCategory,
  removeCategory,
} from 'modules/config/configHelpers'

interface Props extends CategoriesEntity {
  index: number
}

const ConnectedCategory = (props: Props) => {
  const { index: categoryIndex } = props
  const { editing, config, storeActions } = useConfigContext()

  const onDelete = useCallback(() => {
    const { config: newConfig, invalid } = removeCategory(config, {
      categoryIndex,
    })

    if (invalid) return false
    storeActions.saveConfig(newConfig)
  }, [categoryIndex, config, storeActions])

  const onEdit = useCallback(
    (fields: EditModalField[]) => {
      const { title } = transformFieldsToEntity(fields) as any
      const { config: newConfig, invalid } = editCategory(config, {
        categoryIndex,
        title,
      })

      if (invalid) return false
      storeActions.saveConfig(newConfig)
    },
    [categoryIndex, config, storeActions]
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
  const { editing, config, storeActions, store } = useConfigContext()

  const onSave = useCallback(
    (fields: EditModalField[]) => {
      const { title } = transformFieldsToEntity(fields) as any
      const { config: newConfig, invalid } = addCategory(config, { title })

      if (invalid) return false
      storeActions.saveConfig(newConfig)
    },
    [config, storeActions]
  )

  // return editing ? <AddCategory onSave={onSave} /> : null
  return editing ? <AddCategory onSave={onSave} /> : <div>{store.dragging}</div>
}

export {
  ConnectedCategory,
  ConnectedCategory as Category,
  ConnectedCategory as default,
  ConnectedAddCategory,
  ConnectedAddCategory as AddCategory,
}

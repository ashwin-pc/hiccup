import { useCallback } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { Category } from './Category'
import { AddCategory } from './AddCategory'
import { AppState, CategoriesEntity } from 'modules/config/types'
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
  const { editing, config, updateConfig } = useConfigContext((state) => ({
    editing: state.store.state === AppState.EDITING,
    config: state.config?.data,
    updateConfig: state.updateConfig,
  }))

  const onDelete = useCallback(() => {
    if (!config) return
    const { config: newConfig, invalid } = removeCategory(config, {
      categoryIndex,
    })
    if (invalid) return false
    updateConfig(newConfig)
  }, [categoryIndex, config, updateConfig])

  const onEdit = useCallback(
    (fields: EditModalField[]) => {
      if (!config) return
      const { title } = transformFieldsToEntity(fields) as any
      const { config: newConfig, invalid } = editCategory(config, {
        categoryIndex,
        title,
      })

      if (invalid) return false
      updateConfig(newConfig)
    },
    [categoryIndex, config, updateConfig]
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
  const { editing, updateConfig, config } = useConfigContext((state) => ({
    editing: state.store.state === AppState.EDITING,
    updateConfig: state.updateConfig,
    config: state.config?.data,
  }))

  const onSave = useCallback(
    (fields: EditModalField[]) => {
      if (!config) return
      const { title } = transformFieldsToEntity(fields) as any
      const { config: newConfig, invalid } = addCategory(config, { title })

      if (invalid) return false
      updateConfig(newConfig)
    },
    [config, updateConfig]
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

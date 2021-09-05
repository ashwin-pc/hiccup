import { FC } from 'react'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { CategoriesEntity } from 'modules/config/Config'
import { DEFAULT_CATEGORY } from 'modules/config'

const AddCategory: FC<{
  onSave: (data: Omit<CategoriesEntity, 'links'>) => void
}> = ({ onSave }) => {
  return (
    <button
      className={styles['add-container']}
      onClick={() =>
        triggerEdit({
          fields: DEFAULT_CATEGORY,
          onSave,
          title: 'Add Category',
        })
      }
    >
      <Icon icon="folder-plus" size={30} className={styles['add-icon']} />
    </button>
  )
}

export { AddCategory, AddCategory as default }

import { FC } from 'react'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { DEFAULT_CATEGORY } from 'modules/config'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'

const AddCategory: FC<{
  onSave: (data: EditModalField[]) => void
}> = ({ onSave }) => {
  return (
    <button
      className={styles['add-container']}
      onClick={() =>
        triggerEdit({
          fields: transformEntityToFields(DEFAULT_CATEGORY),
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

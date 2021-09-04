import React, { useCallback, useState } from 'react'
import { Icon } from 'components/common/Icon'
import { EditLinkModal } from 'components/EditLinkModal'
import styles from './index.module.css'

const DEFAULT_CATEGORY = {
  title: '',
}

const AddCategory = ({ onSave }: { onSave: (title: string) => void }) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const handleSave = useCallback(
    (newCategory: typeof DEFAULT_CATEGORY) => {
      setShowEditModal(false)
      onSave && onSave(newCategory.title)
    },
    [onSave]
  )

  return (
    <div className={styles['add-container']}>
      <Icon
        icon="folder-plus"
        size={30}
        className={styles['add-icon']}
        onClick={() => setShowEditModal(true)}
      />
      <EditLinkModal
        show={showEditModal}
        fields={DEFAULT_CATEGORY}
        onCancel={() => setShowEditModal(false)}
        onSave={handleSave}
      />
    </div>
  )
}

export { AddCategory, AddCategory as default, DEFAULT_CATEGORY }

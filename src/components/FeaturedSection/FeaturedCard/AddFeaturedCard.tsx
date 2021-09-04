import React, { useCallback, useState } from 'react'
import { Icon } from 'components/common/Icon'
import { EditLinkModal } from 'components/EditLinkModal'
import styles from './index.module.css'
import { FeaturedEntity } from 'modules/config/Config'

const DEFAULT_BG = '/assets/card.png'

const DEFAULT_LINK = {
  name: '',
  link: '',
  background: DEFAULT_BG,
  tags: '',
}

const AddFeaturedCard = ({
  onSave,
}: {
  onSave: (newLink: FeaturedEntity) => void
}) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const handleSave = useCallback(
    (editedLink: typeof DEFAULT_LINK) => {
      setShowEditModal(false)
      onSave && onSave(editedLink)
    },
    [onSave]
  )

  return (
    <div className={[styles.container, styles['add-card']].join(' ')}>
      <Icon
        icon="add"
        className={styles['add-icon']}
        onClick={() => setShowEditModal(true)}
      />
      <EditLinkModal
        show={showEditModal}
        fields={DEFAULT_LINK}
        onCancel={() => setShowEditModal(false)}
        onSave={handleSave}
      />
    </div>
  )
}

export { AddFeaturedCard, AddFeaturedCard as default, DEFAULT_BG, DEFAULT_LINK }

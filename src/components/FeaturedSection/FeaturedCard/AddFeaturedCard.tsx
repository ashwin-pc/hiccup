import { FC } from 'react'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { DEFAULT_FEATURED_LINK } from 'modules/config'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'

const AddFeaturedCard: FC<{
  onSave: (modalData: EditModalField[]) => void
}> = ({ onSave }) => {
  return (
    <button
      className={[styles.container, styles['add-card']].join(' ')}
      onClick={() =>
        triggerEdit({
          fields: transformEntityToFields(DEFAULT_FEATURED_LINK),
          onSave,
          title: 'Add Featured Link',
        })
      }
    >
      <Icon icon="add" className={styles['add-icon']} />
    </button>
  )
}

export { AddFeaturedCard, AddFeaturedCard as default }

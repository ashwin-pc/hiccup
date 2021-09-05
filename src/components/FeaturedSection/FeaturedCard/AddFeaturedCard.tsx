import { FC } from 'react'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { FeaturedEntity } from 'modules/config/Config'
import { DEFAULT_FEATURED_LINK } from 'modules/config'

const AddFeaturedCard: FC<{
  onSave: (newLink: FeaturedEntity) => void
}> = ({ onSave }) => {
  return (
    <button
      className={[styles.container, styles['add-card']].join(' ')}
      onClick={() =>
        triggerEdit({
          fields: DEFAULT_FEATURED_LINK,
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

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
    <div className={[styles.container, styles['add-card']].join(' ')}>
      <Icon
        icon="add"
        className={styles['add-icon']}
        onClick={() =>
          triggerEdit({
            fields: DEFAULT_FEATURED_LINK,
            onSave,
            title: 'Add Featured Link',
          })
        }
      />
    </div>
  )
}

export { AddFeaturedCard, AddFeaturedCard as default }

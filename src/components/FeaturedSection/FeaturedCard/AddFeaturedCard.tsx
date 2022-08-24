import { FC, forwardRef } from 'react'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { DEFAULT_FEATURED_LINK } from 'modules/config'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { DropProps, useDrop } from 'components/common/Drop'
import { classNames } from 'modules/utils'

interface Props
  extends Omit<DropProps<HTMLButtonElement>, 'ref' | 'draggingOverDocument'> {
  onSave: (modalData: EditModalField[]) => void
  hidden: boolean
}

// const AddFeaturedCard =
const AddFeaturedCard = forwardRef<HTMLButtonElement, Props>(
  ({ onSave, hidden, dragging, ...dropProps }, ref) => {
    // const {  } =
    //   useDrop<HTMLButtonElement>()
    // const hidden = !(editing || draggingOverDocument)
    return (
      <button
        ref={ref}
        className={classNames([
          styles.container,
          styles['add-card'],
          [dragging, 'dragging'],
          [hidden, 'hidden'],
        ])}
        onClick={() =>
          triggerEdit({
            fields: transformEntityToFields(DEFAULT_FEATURED_LINK),
            onSave,
            title: 'Add Featured Link',
          })
        }
        {...dropProps}
      >
        <Icon
          icon={dragging ? 'upload' : 'add'}
          className={styles['add-icon']}
        />
      </button>
    )
  }
)

export { AddFeaturedCard, AddFeaturedCard as default }

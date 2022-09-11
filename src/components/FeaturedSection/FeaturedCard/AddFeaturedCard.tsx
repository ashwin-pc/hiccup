import { FC } from 'react'
import { Icon } from 'components/common/Icon'
import { triggerEdit } from 'components/EditLinkModal'
import styles from './index.module.css'
import { getEmptyFeaturedLink } from 'modules/config'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { DropProps } from 'components/common/Drop'
import { classNames } from 'modules/utils'

interface Props
  extends Omit<DropProps<HTMLButtonElement>, 'draggingOverDocument'> {
  onSave: (modalData: EditModalField[]) => void
  hidden: boolean
}

// const AddFeaturedCard =
const AddFeaturedCard: FC<Props> = ({
  onSave,
  hidden,
  dragging,
  dropRef,
  ...dropProps
}) => {
  return (
    <button
      ref={dropRef}
      className={classNames([
        styles.container,
        styles['add-card'],
        [dragging, 'highlight'],
        [hidden, 'hide'],
      ])}
      onClick={() =>
        triggerEdit({
          fields: transformEntityToFields(getEmptyFeaturedLink()),
          onSave,
          title: 'Add Featured Link',
        })
      }
      {...dropProps}
    >
      <Icon icon={dragging ? 'earth' : 'add'} className={styles['add-icon']} />
    </button>
  )
}

export { AddFeaturedCard, AddFeaturedCard as default }

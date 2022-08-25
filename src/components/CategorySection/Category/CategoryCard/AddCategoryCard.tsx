import React, { FC } from 'react'
import { Icon } from 'components/common/Icon'
import styles from './index.module.css'
import { DropProps } from 'components/common/Drop'
import { EditModalField } from 'components/EditLinkModal/EditLinkModal'
import { triggerEdit } from 'components/EditLinkModal'
import { transformEntityToFields } from 'components/EditLinkModal/transforms'
import { DEFAULT_LINK } from 'modules/config'
import { classNames } from 'modules/utils'

interface Props
  extends Omit<DropProps<HTMLButtonElement>, 'draggingOverDocument'> {
  onSave: (modalData: EditModalField[]) => void
  hidden: boolean
}

const AddCategoryCard: FC<Props> = ({
  hidden,
  onSave,
  dragging,
  dropRef,
  ...dropProps
}) => {
  return (
    <button
      className={classNames([
        styles.container,
        styles['add-card'],
        [hidden, 'hide'],
        [dragging, 'highlight'],
      ])}
      onClick={() =>
        triggerEdit({
          fields: transformEntityToFields(DEFAULT_LINK),
          onSave,
          title: `Add link`,
        })
      }
      ref={dropRef}
      {...dropProps}
    >
      <Icon icon="add" className={styles['add-icon']} />
    </button>
  )
}

export { AddCategoryCard, AddCategoryCard as default }

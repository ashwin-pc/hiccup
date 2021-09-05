import React, { FunctionComponent } from 'react'
import { Icon } from 'components/common/Icon'
import styles from './index.module.css'

const AddCategoryCard: FunctionComponent<
  React.ButtonHTMLAttributes<HTMLElement>
> = (props) => {
  return (
    <button
      className={[styles.container, styles['add-card']].join(' ')}
      {...props}
    >
      <Icon icon="add" className={styles['add-icon']} />
    </button>
  )
}

export { AddCategoryCard, AddCategoryCard as default }

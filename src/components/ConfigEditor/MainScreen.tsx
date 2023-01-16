import { Icon, IconTypes } from 'components/common/Icon'
import React, { FC, HTMLAttributes } from 'react'
import { ScreenHandler } from '.'
import styles from './MainScreen.module.css'

interface Props extends HTMLAttributes<HTMLElement> {
  label: string
  icon: IconTypes
}

export const MainButton: FC<Props> = ({ label, icon, onClick }) => {
  return (
    <div className={styles.btn} onClick={onClick} tabIndex={0}>
      <Icon className={styles.icon} icon={icon} size={30} />
      <span>{label}</span>
    </div>
  )
}

export const MainScreen: FC<{ setScreen: ScreenHandler }> = ({ setScreen }) => {
  return (
    <div className={styles.screen}>
      <MainButton
        label="Add Config"
        icon="plus"
        onClick={() => setScreen('store')}
      />
      <MainButton
        label="Edit Config"
        icon="edit"
        onClick={() => setScreen('edit')}
      />
    </div>
  )
}

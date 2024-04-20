import { FC } from 'react'
import { ScreenHandler } from '.'
import styles from './MainScreen.module.css'
import { ConfigList } from './ConfigList'
import { ConfigDetails } from './ConfigDetails'
import { ConfigPreview } from './ConfigPreview'

export const MainScreen: FC<{ setScreen: ScreenHandler }> = ({ setScreen }) => {
  return (
    <div className={styles.screen}>
      <ConfigList />
      <ConfigDetails />
      <ConfigPreview />
    </div>
  )
}

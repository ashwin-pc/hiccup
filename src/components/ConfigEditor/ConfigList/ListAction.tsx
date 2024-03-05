import { Icon, IconTypes } from 'components/common/Icon'
import styles from './index.module.css'

export interface Action {
  icon: IconTypes
  onClick: () => void
  text: string
  color?: string
}

export const ListAction = ({ icon, onClick, text, color }: Action) => {
  return (
    <button
      className={styles['action']}
      onClick={onClick}
      style={{
        color: color,
      }}
    >
      <Icon size={10} icon={icon} className={styles['action-icon']} />
      <span>{text}</span>
    </button>
  )
}

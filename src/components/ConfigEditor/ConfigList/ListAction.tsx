import styles from './index.module.css'
import { Icon, Props as IconProps } from 'components/common/Icon'
import { FC, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: IconProps['icon']
  disabled?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const ListAction: FC<Props> = ({
  text,
  icon,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      className={styles.listAction}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <Icon size={10} icon={icon} />}
      <span>{text}</span>
    </button>
  )
}

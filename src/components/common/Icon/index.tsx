import React, { FunctionComponent, SVGProps } from 'react'
import icons from './icons'
import { SearchContext } from 'components/SearchContext'
import styles from './index.module.css'

interface Props extends SVGProps<SVGSVGElement> {
  icon: keyof typeof icons
  size?: number
  className?: string
}

const Icon: FunctionComponent<Props> = ({
  icon,
  size = 20,
  className = '',
  ...props
}) => {
  const IconTag = icons[icon]

  return (
    <IconTag
      className={[styles.icon, className].join(' ')}
      style={{
        width: size + 'px',
      }}
      {...props}
    />
  )
}

export { Icon, Icon as default }

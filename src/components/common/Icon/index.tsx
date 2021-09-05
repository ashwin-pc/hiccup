import { FunctionComponent, SVGProps, useMemo } from 'react'
import icons from './icons'
import styles from './index.module.css'

interface Props extends SVGProps<SVGSVGElement> {
  icon: keyof typeof icons
  size?: number
  className?: string
  as?: 'button'
}

const Icon: FunctionComponent<Props> = ({
  icon,
  size = 20,
  className = '',
  as,
  ...props
}) => {
  const IconTag = icons[icon]

  const iconElement = useMemo(
    () => (
      <IconTag
        className={[styles.icon, className].join(' ')}
        style={{
          width: size + 'px',
        }}
        {...props}
      />
    ),
    [IconTag, className, props, size]
  )

  if (as === 'button') {
    return <button className={styles.button}>{iconElement}</button>
  }

  return <>{iconElement}</>
}

export { Icon, Icon as default }

import { FunctionComponent, SVGProps, useMemo, MouseEventHandler } from 'react'
import icons from './icons'
import styles from './index.module.css'

interface Props extends SVGProps<SVGSVGElement> {
  icon: keyof typeof icons
  size?: number
  className?: string
  as?: 'button' | 'a'
  download?: string
}

const Icon: FunctionComponent<Props> = ({
  icon,
  size = 20,
  className = '',
  as,
  href,
  download,
  onClick,
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
        {...(as !== 'button' && onClick)}
        {...props}
      />
    ),
    [IconTag, as, className, onClick, props, size]
  )

  if (as === 'button') {
    return (
      <button
        className={styles.button}
        onClick={onClick as MouseEventHandler<HTMLButtonElement> | undefined}
      >
        {iconElement}
      </button>
    )
  }

  if (as === 'a') {
    return (
      <a className={styles.a} href={href} download={download}>
        {iconElement}
      </a>
    )
  }

  return <>{iconElement}</>
}

export { Icon, Icon as default }

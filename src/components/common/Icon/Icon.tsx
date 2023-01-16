import { FunctionComponent, SVGProps, useMemo, MouseEventHandler } from 'react'
import icons from './icons'
import styles from './icon.module.css'

export type IconTypes = keyof typeof icons

export interface Props extends SVGProps<SVGSVGElement> {
  icon: IconTypes
  size?: number
  className?: string
  as?: 'button' | 'a'
  download?: string
  'data-testid'?: string
}

const Icon: FunctionComponent<Props> = ({
  icon,
  size = 20,
  className = '',
  as,
  href,
  download,
  onClick,
  'data-testid': testId,
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
        {...(as !== 'button' && { 'data-testid': testId })}
        {...(as !== 'button' && onClick)}
        {...props}
      />
    ),
    [IconTag, as, className, onClick, props, size, testId]
  )

  if (as === 'button') {
    return (
      <button
        className={styles.button}
        {...(as === 'button' && { 'data-testid': testId })}
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

export { Icon }

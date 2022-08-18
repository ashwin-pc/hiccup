import React, { FunctionComponent, HTMLAttributes } from 'react'
import styles from './index.module.css'

interface Props extends HTMLAttributes<HTMLElement> {
  className?: string
}

const Section: FunctionComponent<Props> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={[styles.section, className].join(' ')} {...props}>
    {children}
  </div>
)

export { Section, Section as default }

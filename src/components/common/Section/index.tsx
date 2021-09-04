import React, { FunctionComponent } from 'react'
import styles from './index.module.css'

interface Props {
    className?: string
}

const Section: FunctionComponent<Props> = ({ children, className = '' }) => (
    <div className={[styles.section, className].join(' ')}>
        {children}
    </div>
)

export {
    Section,
    Section as default
}
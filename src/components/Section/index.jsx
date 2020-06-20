import React from 'react'
import styles from './index.module.css'

const Section = ({ children, className = '' }) => (
    <div className={[styles.section, className].join(' ')}>
        {children}
    </div>
)

export {
    Section,
    Section as default
}
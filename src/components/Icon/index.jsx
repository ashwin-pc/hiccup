import React from 'react'
import icons from './icons'
import styles from './index.module.css'

const Icon = ({ icon, size = 20, className = '', ...props }) => {
    const IconTag = icons[icon]
    
    return (
        <IconTag className={[styles.icon, className].join(' ')} style={{
            width: size + 'px',
        }} {...props} />
    )
}

export {
    Icon,
    Icon as default
}
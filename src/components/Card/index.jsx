import React from 'react'
import styles from './index.module.css'

const Card = ({ href, background, children, highlight, className = '' }) => {
    const highlightClass = highlight ? styles.highlight : undefined
    
    const cardContent = (
        <li className={[styles.card, className, highlightClass].join(' ')} style={{
            backgroundImage: background && `url(${background})`,
        }}>
            { children }
        </li>
    )

    return (
        href
        ? <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
            {cardContent}
        </a>
        : <>{ cardContent }</>
    )
}

export {
    Card,
    Card as default
}
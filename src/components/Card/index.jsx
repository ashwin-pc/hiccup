import React from 'react'
import { useSearchContext } from '../SearchContext'
import styles from './index.module.css'

const Card = ({ tag = '', href, background, children, className = '' }) => {
    const { highlight } = useSearchContext(tag, href)
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
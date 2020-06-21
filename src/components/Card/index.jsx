import React from 'react'
import { useSearchContext } from '../SearchContext'
import styles from './index.module.css'

const Card = ({ tag = '', link, background, children, className = '' }) => {
    const { highlight } = useSearchContext(tag, link)
    const highlightClass = highlight ? styles.highlight : undefined
    
    return (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <li className={[styles.card, className, highlightClass].join(' ')} style={{
                backgroundImage: background && `url(${background})`,
            }}>
                { children }
            </li>
        </a>
    )
}

export {
    Card,
    Card as default
}
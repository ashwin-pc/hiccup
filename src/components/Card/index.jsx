import React from 'react'
import { useSearchContext } from '../SearchContext'
import styles from './index.module.css'

const Card = ({ tag = '', link, background, children, className = '' }) => {
    const { highlight } = useSearchContext(tag, link)
    
    return (
        <a href={link}>
            <li className={[styles.card, className, tag].join(' ')} style={{
                backgroundImage: background && `url(${background})`,
                border: highlight && `2px solid var(--theme-highlight-1)`
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
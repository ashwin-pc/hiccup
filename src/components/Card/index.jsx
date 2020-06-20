import React from 'react'
import styles from './index.module.css'

const Card = ({ link, background, children, className = '' }) => (
    <a href={link}>
        <li className={[styles.card, className].join(' ')} style={{
            backgroundImage: `url(${background})`
        }}>
            { children }
        </li>
    </a>
)

export {
    Card,
    Card as default
}
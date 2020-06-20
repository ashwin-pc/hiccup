import React from 'react'
import { Card } from '../Card'
import styles from './index.module.css'

const CategoryCard = ({ name, link, tags = '' }) => (
    <Card link={link} className={styles.container} tag={[name,link,tags].join(' ')}>
        <span className={styles.name}>{name}</span>
        <span className={styles.link}>{link}</span>
    </Card>
)

export {
    CategoryCard,
    CategoryCard as default
}
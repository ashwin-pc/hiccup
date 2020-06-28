import React from 'react'
import { CategoryCard, AddCategoryCard } from '../CategoryCard'
import styles from './index.module.css'

const Category = ({ title, links, index: categoryIndex }) => (
    <div className={styles.category}>
        <h1 className={styles.title}>{title}</h1>
        <ul>
            {links.map((link, index) => (
                <CategoryCard key={index} link={link} index={index} categoryIndex={categoryIndex} />
            ))}
            <AddCategoryCard categoryIndex={categoryIndex} />
        </ul>
    </div>
)

export {
    Category,
    Category as default
}
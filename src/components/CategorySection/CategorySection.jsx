import React from 'react'
import { Section } from '../Section'
import { Category } from '../Category'
import styles from './index.module.css'

const CategorySection = ({ categories }) => (
    <Section className={styles.categories}>
        {categories && categories.map(({ title, links }, index) => (
          <Category key={index} title={title} links={links} />
        ))}
    </Section>
)

export {
    CategorySection,
    CategorySection as default
}
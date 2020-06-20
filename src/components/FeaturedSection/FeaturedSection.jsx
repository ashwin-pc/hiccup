import React from 'react'
import { Section } from '../Section'
import { FeaturedCard } from '../FeaturedCard'
import styles from './index.module.css'

const FeaturedSection = ({ featured }) => (
    <Section className={styles.featured}>
        {featured && featured.map(({ name, link, tags, background }, index) => (
            <FeaturedCard key={index} name={name} link={link} tags={tags} background={background} />
        ))}
    </Section>
)

export {
    FeaturedSection,
    FeaturedSection as default
}
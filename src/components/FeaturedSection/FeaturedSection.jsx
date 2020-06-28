import React from 'react'
import { Section } from '../Section'
import { FeaturedCard, AddFeaturedCard } from '../FeaturedCard'
import styles from './index.module.css'

const FeaturedSection = ({ featured }) => (
    <Section className={styles.featured}>
        {featured && featured.map((link, index) => (
            <FeaturedCard key={index} index={index} link={link} />
        ))}
        {featured && featured.length < 4 && <AddFeaturedCard />}
    </Section>
)

export {
    FeaturedSection,
    FeaturedSection as default
}
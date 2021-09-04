import React from 'react'
import { Section } from 'components/common/Section'
import { FeaturedCard, AddFeaturedCard } from './FeaturedCard'
import styles from './index.module.css'
import { FeaturedEntity } from 'modules/config/Config'

const FeaturedSection = ({ featured }: { featured: FeaturedEntity[] }) => (
  <Section className={styles.featured}>
    {featured &&
      featured.map((link, index) => (
        <FeaturedCard key={index} index={index} link={link} />
      ))}
    {featured && featured.length < 4 && <AddFeaturedCard />}
  </Section>
)

export { FeaturedSection, FeaturedSection as default }

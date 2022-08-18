import React, { FC } from 'react'
import { Section } from 'components/common/Section'
import { FeaturedCard, AddFeaturedCard } from './FeaturedCard'
import styles from './index.module.css'
import { FeaturedEntity } from 'modules/config/types'

const FeaturedSection: FC<{ featured: FeaturedEntity[] }> = ({ featured }) => (
  <Section className={styles.featured} data-testid="featured-section">
    {featured &&
      featured.map((link, index) => (
        <FeaturedCard key={index} index={index} link={link} />
      ))}
    {featured && featured.length < 4 && <AddFeaturedCard />}
  </Section>
)

export { FeaturedSection, FeaturedSection as default }

import React, { FC } from 'react'
import { Section } from 'components/common/Section'
import { Category, AddCategory } from './Category'
import styles from './index.module.css'
import { CategoriesEntity } from 'modules/config/Config'

const CategorySection: FC<{
  categories: CategoriesEntity[]
}> = ({ categories }) => (
  <Section className={styles.categories}>
    {categories.map(({ title, links }, index) => (
      <Category key={index} title={title} links={links} index={index} />
    ))}
    {categories.length < 4 && <AddCategory />}
  </Section>
)

export { CategorySection, CategorySection as default }

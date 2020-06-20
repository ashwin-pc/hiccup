import React, { useContext } from 'react'
import { ConfigContext } from '../ConfigContext'
import { CategorySection } from './CategorySection'

const ConnectedCategorySection = () => {
    const { categories } = useContext(ConfigContext)

    return (
        <CategorySection categories={categories} />
    )
}

export {
    ConnectedCategorySection,
    ConnectedCategorySection as CategorySection,
    ConnectedCategorySection as default
}
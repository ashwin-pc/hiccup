import React, { useContext } from 'react'
import { ConfigContext } from '../ConfigContext'
import { CategorySection } from './CategorySection'

const ConnectedCategorySection = () => {
    const { config } = useContext(ConfigContext)

    if (!config.categories) {
        return null
    }

    return (
        <CategorySection categories={config.categories} />
    )
}

export {
    ConnectedCategorySection,
    ConnectedCategorySection as CategorySection,
    ConnectedCategorySection as default
}
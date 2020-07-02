import React from 'react'
import { useConfigContext } from '../ConfigContext'
import { CategorySection } from './CategorySection'

const ConnectedCategorySection = () => {
    const { config } = useConfigContext()

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
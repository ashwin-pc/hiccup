import React, { useContext, useMemo, useCallback } from 'react'
import { ConfigContext } from '../ConfigContext'
import { CategoryCard } from './CategoryCard'
import { AddCategoryCard } from './AddCategoryCard'

const ConnectedCategoryCard = ({ index, link, categoryIndex }) => {
    const hookProps = useCategoryCard(index, categoryIndex)
    return <CategoryCard {...hookProps} link={link} />
}

const useCategoryCard = (cardIndex, categoryIndex) => {
    const { config, editing, updateConfig } = useContext(ConfigContext)

    const onDelete = useCallback(() => {
        const newConfig = { ...config }
        newConfig.categories[categoryIndex].links = newConfig.categories[categoryIndex].links.filter((_, index) => index !== cardIndex)
        
        updateConfig(newConfig)
    }, [cardIndex, categoryIndex, config, updateConfig])

    const onEdit = useCallback(newLink => {
        const newConfig = { ...config }
        newConfig.categories[categoryIndex].links = newConfig.categories[categoryIndex].links.map((link, index) => index === cardIndex ? newLink : link)

        updateConfig(newConfig)
    }, [cardIndex, categoryIndex, config, updateConfig])

    const edit = useMemo(() => ({
        onEdit,
        onDelete,
    }), [onDelete, onEdit])

    return {
        edit: editing && edit,
    }
}

const ConnectedAddCategoryCard = ({ categoryIndex }) => {
    const { config, editing, updateConfig } = useContext(ConfigContext)

    const onSave = useCallback(newLink => {
        const newConfig = { ...config }
        newConfig.categories[categoryIndex].links.push(newLink)

        updateConfig(newConfig)
    }, [categoryIndex, config, updateConfig])

    return editing ? <AddCategoryCard onSave={onSave}/> : null
}


export {
    ConnectedCategoryCard,
    ConnectedCategoryCard as CategoryCard,
    ConnectedCategoryCard as default,
    ConnectedAddCategoryCard,
    ConnectedAddCategoryCard as AddCategoryCard,
}

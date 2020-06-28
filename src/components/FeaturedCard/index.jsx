import React, { useContext, useMemo, useCallback } from 'react'
import { ConfigContext } from '../ConfigContext'
import { FeaturedCard } from './FeaturedCard'
import { AddFeaturedCard } from './AddFeaturedCard'

const ConnectedFeaturedCard = ({ index, link }) => {
    const hookProps = useFeaturedCard(index)
    return <FeaturedCard {...hookProps} link={link} />
}

const useFeaturedCard = (cardIndex) => {
    const { config, editing, updateConfig } = useContext(ConfigContext)

    const onDelete = useCallback(() => {
        const newConfig = { ...config }
        newConfig.featured = newConfig.featured.filter((_, index) => index !== cardIndex)
        
        updateConfig(newConfig)
    }, [cardIndex, config, updateConfig])

    const onEdit = useCallback(newLink => {
        const newConfig = { ...config }
        newConfig.featured = newConfig.featured.map((link, index) => index === cardIndex ? newLink : link)

        updateConfig(newConfig)
    }, [cardIndex, config, updateConfig])

    const edit = useMemo(() => ({
        onEdit,
        onDelete,
    }), [onDelete, onEdit])

    return {
        edit: editing && edit,
    }
}

const ConnectedAddFeaturedCard = () => {
    const { config, editing, updateConfig } = useContext(ConfigContext)

    const onSave = useCallback(newLink => {
        const newConfig = { ...config }
        newConfig.featured.push(newLink)

        updateConfig(newConfig)
    }, [config, updateConfig])

    return editing ? <AddFeaturedCard onSave={onSave}/> : null
}


export {
    ConnectedFeaturedCard,
    ConnectedFeaturedCard as FeaturedCard,
    ConnectedFeaturedCard as default,
    ConnectedAddFeaturedCard,
    ConnectedAddFeaturedCard as AddFeaturedCard,
}

import React, { useContext } from 'react'
import { ConfigContext } from '../ConfigContext'
import { FeaturedSection } from './FeaturedSection'

const ConnectedFeaturedSection = () => {
    const { config } = useContext(ConfigContext)

    if (!config.featured) {
        return null
    }

    return (
        <FeaturedSection featured={config.featured} />
    )
}

export {
    ConnectedFeaturedSection,
    ConnectedFeaturedSection as FeaturedSection,
    ConnectedFeaturedSection as default
}
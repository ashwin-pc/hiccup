import React from 'react'
import { useConfigContext } from '../ConfigContext'
import { FeaturedSection } from './FeaturedSection'

const ConnectedFeaturedSection = () => {
    const { config } = useConfigContext()

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
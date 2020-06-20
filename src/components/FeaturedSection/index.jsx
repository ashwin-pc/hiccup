import React, { useContext } from 'react'
import { ConfigContext } from '../ConfigContext'
import { FeaturedSection } from './FeaturedSection'

const ConnectedFeaturedSection = () => {
    const { featured } = useContext(ConfigContext)

    return (
        <FeaturedSection featured={featured} />
    )
}

export {
    ConnectedFeaturedSection,
    ConnectedFeaturedSection as FeaturedSection,
    ConnectedFeaturedSection as default
}
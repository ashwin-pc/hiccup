import React from 'react'
import { useConfigContext } from '../ConfigContext'
import { FeaturedSection } from './FeaturedSection'

const ConnectedFeaturedSection = () => {
  const { config } = useConfigContext()

  if (!config?.data?.featured) {
    return null
  }

  return <FeaturedSection featured={config.data.featured} />
}

export { ConnectedFeaturedSection, ConnectedFeaturedSection as FeaturedSection }

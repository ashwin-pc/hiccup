import React from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { CategorySection } from './CategorySection'

const ConnectedCategorySection = () => {
  const { config } = useConfigContext((state) => ({
    config: state.config?.data,
  }))

  if (!config?.categories) {
    return null
  }

  return <CategorySection categories={config.categories} />
}

export {
  ConnectedCategorySection,
  ConnectedCategorySection as CategorySection,
  ConnectedCategorySection as default,
}

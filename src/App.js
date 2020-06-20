import React from 'react';
import { FeaturedSection } from './components/FeaturedSection'
import { CategorySection } from './components/CategorySection'
import { ConfigProvider } from './components/ConfigContext'

const App = ({ config }) => {
  
  return (
    <ConfigProvider>
      <FeaturedSection />
      <CategorySection />
    </ConfigProvider>
  )
}

export default App;

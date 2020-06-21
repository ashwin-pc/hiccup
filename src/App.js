import React from 'react';
import { FeaturedSection } from './components/FeaturedSection'
import { CategorySection } from './components/CategorySection'
import { SearchProvider } from './components/SearchContext'
import { ConfigProvider } from './components/ConfigContext'
import { SearchBar } from './components/SearchBar'
import { ConfigEditor } from './components/ConfigEditor'

const App = ({ config }) => {
  
  return (
    <ConfigProvider config={config}>
      <SearchProvider>
        <FeaturedSection />
        <CategorySection />
        <SearchBar />
        <ConfigEditor />
      </SearchProvider>
    </ConfigProvider>
  )
}

export default App;

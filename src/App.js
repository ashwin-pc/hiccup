import React from 'react';
import { FeaturedSection } from './components/FeaturedSection'
import { CategorySection } from './components/CategorySection'
import { SearchProvider } from './components/SearchContext'
import { ConfigProvider } from './components/ConfigContext'
import { SearchBar } from './components/SearchBar'
import { ConfigEditor } from './components/ConfigEditor'
import { Hotkeys } from './components/Hotkeys'

const App = ({ config }) => {

  return (
    <ConfigProvider config={config}>
      <SearchProvider>
        <SearchBar />
        <FeaturedSection />
        <CategorySection />
        <ConfigEditor />
        <Hotkeys />
      </SearchProvider>
    </ConfigProvider>
  )
}

export default App;

import { ConfigEntity } from 'modules/config/Config'
import { FeaturedSection } from './components/FeaturedSection'
import { CategorySection } from './components/CategorySection'
import { SearchProvider } from './components/SearchContext'
import { ConfigProvider } from './components/ConfigContext'
import { SearchBar } from './components/SearchBar'
// import { ConfigEditor } from './components/ConfigEditor'
import { Hotkeys } from './components/Hotkeys'
import { ConnectedEditLinkModal } from 'components/EditLinkModal'

export const ROOT_ID = 'root'

interface Props {
  config?: ConfigEntity
}

const App = ({ config }: Props) => (
  <ConfigProvider config={config}>
    <SearchProvider>
      <SearchBar />
      <FeaturedSection />
      <CategorySection />
      <ConnectedEditLinkModal />
      {/* <ConfigEditor /> */}
      <Hotkeys />
    </SearchProvider>
  </ConfigProvider>
)

export default App

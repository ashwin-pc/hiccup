import { ConfigEntity } from 'modules/config/types'
import { FeaturedSection } from './components/FeaturedSection'
import { CategorySection } from './components/CategorySection'
import { SearchProvider } from './components/SearchContext'
import { ConfigProvider } from './components/ConfigContext'
import { SearchBar } from './components/SearchBar'
import { ConfigEditor } from './components/ConfigEditor'
import { Hotkeys } from './components/Hotkeys'
import { ConnectedEditLinkModal } from 'components/EditLinkModal'
import { FileUpload } from 'components/FileUpload'

export const ROOT_ID = 'root'

interface Props {
  config?: ConfigEntity
}

const App = ({ config }: Props) => (
  <ConfigProvider config={config}>
    <SearchProvider>
      <FileUpload>
        <SearchBar />
        <FeaturedSection />
        <CategorySection />
        <ConnectedEditLinkModal />
        <ConfigEditor />
        <Hotkeys />
      </FileUpload>
    </SearchProvider>
  </ConfigProvider>
)

export default App

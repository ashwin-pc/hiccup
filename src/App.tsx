import { Toaster } from 'react-hot-toast'
import { FeaturedSection } from './components/FeaturedSection'
import { CategorySection } from './components/CategorySection'
import { SearchProvider } from './components/SearchContext'
import { ConfigProvider } from './components/ConfigContext'
import { SearchBar } from './components/SearchBar'
import { ConfigEditor } from './components/ConfigEditor'
import { Hotkeys } from './components/Hotkeys'
import { ConnectedEditLinkModal } from 'components/EditLinkModal'
// import { FileUpload } from 'components/FileUpload'

export const ROOT_ID = 'root'

const App = () => (
  <ConfigProvider>
    <SearchProvider>
      <SearchBar />
      <FeaturedSection />
      <CategorySection />
      <ConnectedEditLinkModal />
      <ConfigEditor />
      <Hotkeys />
      <Toaster
        toastOptions={{
          className: 'toast',
          style: {
            boxShadow: '0 5px 20px var(--theme-bg-1)',
            padding: '10px',
            backgroundColor: 'var(--theme-bg-2)',
            color: 'var(--theme-color-1)',
          },
          success: {
            iconTheme: {
              primary: 'var(--theme-bg-3)',
              secondary: 'var(--theme-highlight-1)',
            },
          },
        }}
      />
    </SearchProvider>
  </ConfigProvider>
)

export default App

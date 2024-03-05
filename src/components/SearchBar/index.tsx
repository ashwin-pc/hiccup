import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { Icon } from 'components/common/Icon'
import { useWindowSize } from 'modules/hooks'
import styles from './index.module.css'
import { HydratedProvider } from './constants'
import useSearch from './useSearch'
import { getHydratedProviders } from './utils'
import { EditModal } from './EditModal'
import { AppState } from 'modules/config'

const SearchBar = () => {
  const { config, storeState } = useConfigContext((state) => ({
    config: state.config,
    storeState: state.store.state,
  }))
  const editing = storeState === AppState.EDITING
  const loading = storeState === AppState.LOADING
  const [searchTerm, setSearchTerm] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentHighlight, setCurrentHighlight] = useState(0)
  const { results } = useSearch(searchTerm, config?.data)
  const [placeholder, setPlaceholder] = useState('')
  const { innerWidth } = useWindowSize()
  const resultsRef = useRef<HTMLElement[]>([])
  const searching = searchTerm.length > 0

  const providers: HydratedProvider[] = useMemo(
    () =>
      getHydratedProviders(
        config?.data?.metadata?.search ?? [{ type: 'google' }]
      ),
    [config?.data?.metadata?.search]
  )

  useEffect(() => {
    resultsRef.current = resultsRef.current.slice(0, results.length + 2)
  }, [results.length])

  const handleChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleExit = useCallback(() => {
    setSearchTerm('')
    resultsRef.current && resultsRef.current[0].blur()
  }, [])

  const handleNavigation = useCallback(
    (event) => {
      if (event.key === 'ArrowDown') {
        const focussableCardsCount = results.length + providers.length + 1
        setCurrentHighlight((highlight) =>
          highlight < focussableCardsCount - 1 ? highlight + 1 : highlight
        )
      } else if (event.key === 'ArrowUp') {
        setCurrentHighlight((highlight) => (highlight < 1 ? 0 : highlight - 1))
      } else if (event.key === 'Escape') {
        handleExit()
      }
    },
    [handleExit, providers.length, results.length]
  )

  useEffect(() => {
    resultsRef.current[currentHighlight].focus()
  }, [currentHighlight])

  const handleDefaultSearch = useCallback(
    (event) => {
      const { url } = providers[0]
      if (event.key === 'Enter') {
        window.location.href = `${url}${event.target.value}`
      }
    },
    [providers]
  )

  useEffect(() => {
    let searchText =
      innerWidth < 600
        ? 'Search'
        : 'Search   ...... or use Shift + Tab for URL bar'

    if (editing) {
      searchText = 'Edit Search Provider'
    }
    setPlaceholder(searchText)
  }, [editing, innerWidth])

  const searchIcon = editing ? (
    <Icon
      icon="edit"
      size={10}
      as="button"
      onClick={() => setShowEditModal(true)}
    />
  ) : (
    <Icon icon="search" size={10} className={styles['search-icon']} />
  )

  if (loading || config?.error) {
    return null
  }

  return (
    <div
      className={styles['search-container']}
      onKeyDown={handleNavigation}
      data-testid="search-bar"
    >
      <input
        type="text"
        name="search"
        className={styles.search}
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleDefaultSearch}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={true}
        disabled={editing}
        ref={(el) => el && (resultsRef.current[0] = el)}
      />
      {searchIcon}
      <div className={styles.results}>
        {searching &&
          providers.map(({ name, url }, index) => (
            <a
              key={name}
              href={`${url}${searchTerm}`}
              className={styles.result}
              ref={(el) => el && (resultsRef.current[index + 1] = el)}
            >
              <Icon icon="earth" size={10} className={styles['web-icon']} />
              <span className={styles.provider}>{name}</span> {searchTerm}
            </a>
          ))}
        {results.map(({ name, url, featured }, index) => (
          <a
            key={index}
            href={url}
            target="__blank"
            className={styles.result}
            ref={(el) =>
              el && (resultsRef.current[index + providers.length + 1] = el)
            }
          >
            {featured && (
              <Icon icon="star" size={10} className={styles['featured-icon']} />
            )}
            {name}
            <span className={styles.url}>{url}</span>
          </a>
        ))}
      </div>
      {searching && (
        <div className={styles.backdrop} onClick={handleExit}></div>
      )}
      <EditModal show={showEditModal} onClose={() => setShowEditModal(false)} />
    </div>
  )
}

export { SearchBar }

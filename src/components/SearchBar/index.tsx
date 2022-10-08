import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { useConfigContext } from 'components/ConfigContext'
import { Icon } from 'components/common/Icon'
import { useWindowSize } from 'modules/useWindowSize'
import styles from './index.module.css'
import { SEARCH_PROVIDERS } from './constants'
import useSearch from './useSearch'

const SearchBar = () => {
  const { config, editing } = useConfigContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentHighlight, setCurrentHighlight] = useState(0)
  const { results } = useSearch(searchTerm, config)
  const providers = useMemo(
    () => {
      const allProviders = config.metadata?.search || [{ type: 'google' }]
      const filteredProviders = allProviders.map(({ type, ...rest }) => {
        let provider = {}
        if (type in SEARCH_PROVIDERS) {
          provider = { ...SEARCH_PROVIDERS[type] }
        }

        return {
          ...provider,
          ...rest
        }
      }).filter(({ name, url }) => (!!name && !!url))

      return filteredProviders;
    },
    [config.metadata?.search]
  )
  const [placeholder, setPlaceholder] = useState('')
  const { innerWidth } = useWindowSize()
  const resultsRef = useRef<HTMLElement[]>([])

  const searching = searchTerm.length > 0

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
        const focussableCardsCount = results.length + (searching ? 1 : 0) + 1
        setCurrentHighlight((highlight) =>
          highlight < focussableCardsCount - 1 ? highlight + 1 : highlight
        )
      } else if (event.key === 'ArrowUp') {
        setCurrentHighlight((highlight) => (highlight < 1 ? 0 : highlight - 1))
      } else if (event.key === 'Escape') {
        handleExit()
      }
    },
    [handleExit, results.length, searching]
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
    setPlaceholder(
      innerWidth < 600
        ? 'Search'
        : 'Search   ...... or use Shift + Tab for URL bar'
    )
  }, [innerWidth])

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
        ref={(el) => el && (resultsRef.current[0] = el)}
      />
      <Icon icon="search" size={10} className={styles['search-icon']} />
      <div className={styles.results}>
        {searching && providers.map(({ name, url }) => (
          <a
            href={`${url}${searchTerm}`}
            className={styles.result}
            ref={(el) => el && (resultsRef.current[1] = el)}
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
            ref={(el) => el && (resultsRef.current[index + 2] = el)}
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
    </div>
  )
}

export { SearchBar, SearchBar as default }

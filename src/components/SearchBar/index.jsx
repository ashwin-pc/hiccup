import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useConfigContext } from '../ConfigContext'
import { useSearchContext } from '../SearchContext'
import { Icon } from '../Icon'
import { ID } from '../../modules/configId'
import styles from './index.module.css'

const MIN_SEARCH_LENGTH = 2
const SEARCH_PROVIDERS = {
    google: {
        url: 'https://google.com/search?q=',
        name: 'Google'
    }
}

/**
 * TODO: 
 * - Add keyboard navigation of links
 */
const SearchBar = () => {
    // TODO: Move this to index and pass ocnfig as a param
    const { config } = useConfigContext()
    const [searchTerm, setSearchTerm] = useState('')
    const { results } = useSearch(searchTerm, config)
    const { url: providerUrl , name: providerName } = useMemo(() => SEARCH_PROVIDERS.google, [])

    const searching = searchTerm.length > 0

    const handleChange = useCallback(event => {
        setSearchTerm(event.target.value)
    }, [])

    const handleClear = useCallback(event => {
        setSearchTerm('')
    }, [])

    const handleSearchProvider = useCallback(event => {
        if (event.key === 'Enter') {
            window.location.href = `${providerUrl}${event.target.value}`
        }
    }, [providerUrl])
    
    return (
        <div className={styles['search-container']} >
            <input 
                type="text"
                name="search"
                className={styles.search}
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleSearchProvider}
                placeholder="Search"
                autoComplete="off"
                autoFocus={true}
            />
            <Icon icon="search" size={10} className={styles['search-icon']} />
            <div className={styles.results}>
                {searching && <a href={`${providerUrl}${searchTerm}`} className={styles.result}>
                    <Icon icon="earth" size={10} className={styles['web-icon']} />
                    <span className={styles.provider}>{providerName}</span> { searchTerm }
                </a>}
                {results.map(({ name, url, featured }, index) => (
                    <a key={index} href={url} target="__blank" className={styles.result}>
                        {featured && <Icon icon="star" size={10} className={styles['featured-icon']} />}
                        { name }
                        <span className={styles.url}>{ url }</span>
                    </a>
                ))}
            </div>
            {searching && <div className={styles.backdrop} onClick={handleClear}></div>}
        </div>
    )
}

const useSearch = (searchTerm, config) => {
    const { results, setResults } = useSearchContext()
    const searchList = useMemo(() => {
        const list = []
        
        // Extract featured
        if (config && config.featured) {
            list.push(...config.featured.map(link => {
                const { name, link: url, tags } = link
                return {
                    featured: true, 
                    id: link[ID],
                    searchText: [name,url,tags].join(' '),
                    name,
                    url,
                }
            }))
        }

        // Extract categories
        if (config && config.categories) {
            const categoryMap = config.categories.reduce((map, category) => ([...map, ...category.links]), [])
            list.push(...categoryMap.map(link => {
                const { name, link: url, tags } = link
                return {
                    featured: false,
                    id: link[ID],
                    searchText: [name,url,tags].join(' '),
                    name,
                    url,
                }
            }))
        }

        return list
    }, [config])


    useEffect(() => {
        if (searchTerm.length >=  MIN_SEARCH_LENGTH) {
            const filteredList = searchList.filter(({ searchText }) => stringSearch(searchText, searchTerm))
            setResults(filteredList)
        } else {
            setResults([])
        }
    }, [searchList, searchTerm, setResults])

    return {
        results,
    }
}

function stringSearch (string = '', fragment) {
    if (!fragment || fragment.length < 1) {
        return false
    }

    return string.toLowerCase().indexOf(fragment) >= 0
}


export {
    SearchBar,
    SearchBar as default
}
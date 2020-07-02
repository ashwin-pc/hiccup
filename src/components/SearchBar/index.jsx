import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useConfigContext } from '../ConfigContext'
import { useSearchContext } from '../SearchContext'
import styles from './index.module.css'

const MIN_SEARCH_LENGTH = 2

/**
 * TODO: 
 * - Add keyboard navigation of links
 * - Extract categories
 * = Handle Featrued and Categories noicely (Easy to identify from bar)
 * - Add Google search option (possibily other search providers as well (optional))
 * - Bonus: two way bind card on page with filtered or selected search result(s)
 */
const SearchBar = () => {
    // TODO: Move this to index and pass ocnfig as a param
    const { config } = useConfigContext()
    const [searchTerm, setSearchTerm] = useState('')
    const { results } = useSearch(searchTerm, config)

    const handleChange = useCallback(event => {
        setSearchTerm(event.target.value)
    }, [])
    
    return (
        <div className={styles['search-container']}>
            <input 
                type="text"
                name="search"
                className={styles.search}
                value={searchTerm}
                onChange={handleChange}
                placeholder="Start searching"
                autoComplete="off"
                autoFocus={true}
            />
            <div className={styles.results}>
                {results.map(({ name, url }, index) => (
                    <a key={index} href={url} target="__blank" className={styles.result}>
                        { name }
                        <span className={styles.url}>{ url }</span>
                    </a>
                ))}
            </div>
        </div>
    )
}

const useSearch = (searchTerm, config) => {
    const { results, setResults, setHighlight } = useSearchContext()
    const searchList = useMemo(() => {
        const list = []
        
        // Extract featured
        if (config && config.featured) {
            list.push(...config.featured.map(link => {
                const { name, link: url, tags } = link
                return {
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
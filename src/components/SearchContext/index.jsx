import React, { createContext, useEffect, useCallback, useState, useContext } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState(null)
    const [initiateAction, setInitiateAction] = useState(false)

    const handleSearchEvent = useCallback(event => {
        if (event.key === 'Escape' ) {
            setSearchTerm(null)
        } else if (event.key === '/') {
            setSearchTerm(previousSearchTerm => {
                return previousSearchTerm === null ? '' : (previousSearchTerm + event.key)
            })
        } else if (event.key === 'Backspace') {
            setSearchTerm(previousSearchTerm => {
                if (previousSearchTerm && previousSearchTerm.length > 1) {
                    return previousSearchTerm.slice(0, -1)
                }
                return null
            })
        } else if (event.key === 'Enter') {
            console.log('here')
            setInitiateAction(true)
        } else {
            setSearchTerm(previousSearchTerm => {
                return previousSearchTerm !== null ? (previousSearchTerm + event.key) : null
            })
        }
    }, [])

    useEffect(() => {
        const listener = document.addEventListener('keydown', handleSearchEvent)
        return () => document.removeEventListener('keydown', listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setTimeout(() => setInitiateAction(false), 0)
    }, [initiateAction])

    return (
        <SearchContext.Provider value={{
            searchTerm,
            initiateAction,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearchContext = (string, link) => {
    const { searchTerm, initiateAction } = useContext(SearchContext)
    const highlight = stringSearch(string, searchTerm)

    if (highlight && initiateAction && link) {
        window.open(link, '_blank')
    }

    return {
        searchTerm,
        initiateAction,
        highlight,
    }
}

function stringSearch (string = '', fragment) {
    if (!fragment || fragment.length < 1) {
        return false
    }

    return string.toLowerCase().indexOf(fragment) >= 0
}

export {
    SearchProvider,
    useSearchContext,
    SearchContext,
    SearchContext as default,
}
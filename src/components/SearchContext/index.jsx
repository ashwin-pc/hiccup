import React, { createContext, useEffect, useCallback, useState, useContext } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searching, setSearching] = useState(false)
    const [initiateAction, setInitiateAction] = useState(false)

    const handleSearchEvent = useCallback(event => {
        if (event.key === 'Escape' ) {
            setSearching(false)
        } else if (event.key === '/') {
            setSearching(true)
        }
    }, [])

    const onSubmit = useCallback(value => setInitiateAction(true), [])

    useEffect(() => {
        const listener = document.addEventListener('keyup', handleSearchEvent)
        return () => document.removeEventListener('keyup', listener)
    }, [handleSearchEvent])

    useEffect(() => {
        setTimeout(() => setInitiateAction(false), 0)
    }, [initiateAction])

    return (
        <SearchContext.Provider value={{
            searching,
            searchTerm,
            setSearchTerm,
            onSubmit,
            initiateAction,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearchContext = (string, link) => {
    const { searchTerm, initiateAction, ...props } = useContext(SearchContext)
    const highlight = stringSearch(string, searchTerm)
    
    if (highlight && initiateAction && link) {
        window.open(link, '_blank')
    }

    return {
        highlight,
        searchTerm,
        initiateAction,
        ...props,
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
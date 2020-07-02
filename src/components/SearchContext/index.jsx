import React, { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [highlight, setHighlight] = useState()

    return (
        <SearchContext.Provider value={{
            results,
            setResults,
            highlight,
            setHighlight
        }}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearchContext = () => {
    return useContext(SearchContext)
}

export {
    SearchProvider,
    useSearchContext,
    SearchContext,
    SearchContext as default,
}
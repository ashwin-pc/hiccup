import React, { createContext, useState, useContext } from 'react'

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([])

    return (
        <SearchContext.Provider value={{
            results,
            setResults
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
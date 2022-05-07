import { FeaturedEntity, LinksEntity } from 'modules/config/types'
import React, { createContext, useState, useContext, FC } from 'react'

export interface SearchResult {
  featured: boolean
  link: LinksEntity | FeaturedEntity
  searchText: string
  name: string
  url: string
}

interface ISearchContext {
  results: SearchResult[]
  setResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
}

const SearchContext = createContext<ISearchContext | undefined>(undefined)

const SearchProvider: FC = ({ children }) => {
  const [results, setResults] = useState<SearchResult[]>([])

  return (
    <SearchContext.Provider
      value={{
        results,
        setResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

const useSearchContext = () => {
  const context = useContext(SearchContext)

  if (context === undefined) throw new Error('useSearchContext is undefined')

  return context
}

export {
  SearchProvider,
  useSearchContext,
  SearchContext,
  SearchContext as default,
}

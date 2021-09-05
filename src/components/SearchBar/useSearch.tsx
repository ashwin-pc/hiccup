import { useSearchContext } from 'components/SearchContext'
import { ConfigEntity } from 'modules/config/Config'
import { useEffect, useMemo } from 'react'
import { MIN_SEARCH_LENGTH } from './constants'

const useSearch = (searchTerm: string, config: ConfigEntity) => {
  const { results, setResults } = useSearchContext()
  const searchList = useMemo(() => {
    const list = []

    // Find the links in featured
    if (config && config.featured) {
      list.push(
        ...config.featured.map((link, index) => {
          const { name, link: url, tags } = link
          return {
            featured: true,
            link,
            searchText: [name, url, tags].join(' '),
            name,
            url,
          }
        })
      )
    }

    // Find the links in categories
    if (config.categories) {
      config.categories.forEach((category, categoryIndex) => {
        category.links.forEach((link, linkIndex) => {
          const { name, link: url, tags } = link

          list.push({
            featured: false,
            link,
            searchText: [name, url, tags].join(' '),
            name,
            url,
          })
        })
      })
    }

    return list
  }, [config])

  useEffect(() => {
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      const filteredList = searchList.filter(({ searchText }) =>
        stringSearch(searchText, searchTerm)
      )
      setResults(filteredList)
    } else {
      setResults([])
    }
  }, [searchList, searchTerm, setResults])

  return {
    results,
  }
}

function stringSearch(string = '', fragment: string) {
  if (!fragment || fragment.length < 1) {
    return false
  }

  return string.toLowerCase().indexOf(fragment) >= 0
}

export default useSearch

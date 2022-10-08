import { SearchProvider } from "modules/config"

export type HydratedProvider = Required<SearchProvider>

export const MIN_SEARCH_LENGTH = 2
export const SEARCH_PROVIDERS = [
  {
    type: 'google',
    url: 'https://google.com/search?q=',
    name: 'Google',
  }, {
    type: 'youtube',
    url: 'https://www.youtube.com/results?search_query=',
    name: 'Youtube',
  }, {
    type: 'amazon',
    url: 'https://www.amazon.com/s?k=',
    name: 'Amazon',
  }, {
    type: 'duckduckgo',
    url: 'https://duckduckgo.com/?q=',
    name: 'Duck Duck Go',
  }, {
    type: 'bing',
    url: 'https://www.bing.com/search?q=',
    name: 'Bing',
  }, {
    type: 'yahoo',
    url: 'https://search.yahoo.com/search?p=',
    name: 'Yahoo',
  }
]


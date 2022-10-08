export const MIN_SEARCH_LENGTH = 2
export const SEARCH_PROVIDERS: { [key: string]: { url: string, name: string } } = {
  google: {
    url: 'https://google.com/search?q=',
    name: 'Google',
  },
  youtube: {
    url: 'https://www.youtube.com/results?search_query=',
    name: 'Youtube',
  },
}

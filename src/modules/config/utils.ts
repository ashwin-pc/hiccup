import { DEFAULT_FEATURED_LINK } from './constants'
import { FeaturedEntity } from './types'

export const getEmptyFeaturedLink = (): FeaturedEntity => ({
  ...DEFAULT_FEATURED_LINK,
  background: getRandomBg(),
})

export const getRandomBg = () => `/assets/card_${getRandomIntInclusive(8)}.png`

function getRandomIntInclusive(max: number, min = 0) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

import { DEFAULT_FEATURED_LINK } from './constants'
import { FeaturedEntity } from './types'

export const getEmptyFeaturedLink = (): FeaturedEntity => ({
  ...DEFAULT_FEATURED_LINK,
  background: getRandomBg(),
})

function getRandomArray(n: number): number[] {
  // Define an empty array to hold the results
  let result: number[] = []

  // Create an array from 0 to n-1
  let arr: number[] = Array.from({ length: n }, (_, i) => i)

  // Randomly shuffle the array
  arr.sort(() => Math.random() - 0.5)

  // Create a function to find a non-consecutive number
  function findNonConsecutive(arr: number[], last: number): number {
    for (let i = 0; i < arr.length; i++) {
      if (Math.abs(arr[i] - last) > 1) {
        return i
      }
    }
    return -1
  }

  // Set the first element
  result.push(arr.pop() as number)

  while (arr.length > 0) {
    let i = findNonConsecutive(arr, result[result.length - 1])
    if (i === -1) {
      // If no suitable number is found, reshuffle and start over
      return getRandomArray(n)
    } else {
      // If a suitable number is found, remove it from the array and add it to the result
      result.push(arr.splice(i, 1)[0])
    }
  }

  // Return the result
  return result
}

function generateCombinations(colors: string[], size: number): Set<string> {
  // Initialize an empty set
  let combinations: Set<string> = new Set()

  // Iterate over each color
  for (let color of colors) {
    // For each color, iterate over each size from 1 to the given size
    for (let i = 1; i <= size; i++) {
      // Add the combination to the set
      combinations.add(`${color}_${i}`)
    }
  }

  // Return the set of combinations
  return combinations
}

let count = 0

// Define the colors
let colors = ['White', 'Red', 'Blue']

// Define the size
let size = 3

// Generate the combinations
let combinations = generateCombinations(colors, size)

// Get random array
let randomArray = getRandomArray(combinations.size)
export function getRandomBg(size = 'normal') {
  // every time we call this function, we get a new combination from the random array from count and then increment count
  let combination =
    Array.from(combinations)[randomArray[count++ % randomArray.length]]

  // get url from combination
  let url = `/assets/${combination}${size === 'medium' ? '_medium' : ''}.jpeg`
  return url
}

export function generateId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((x) => x.toString(16))
    .join('')
}

export function getInitialsFromCamelCase(name: string) {
  return name
    .split(/(?=[A-Z])/)
    .map((x) => x[0])
    .join('')
    .toUpperCase()
}

export function isAbsoluteURL(url: string) {
  const pat = /^https?:\/\//i
  return pat.test(url)
}

export function getBgURL(background: string = getRandomBg('medium')) {
  const backgroundUrl = isAbsoluteURL(background)
    ? background
    : (process.env.PUBLIC_URL || '.') + background
  return backgroundUrl
}

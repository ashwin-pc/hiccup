import produce from 'immer'
import { uuid } from '../uuid'

const ID = Symbol.for('ID')

function addConfigId(config) {
  return produce(config, (draft) => {
    if (config.featured) {
      config.featured.forEach((link) => (link[ID] = uuid()))
    }

    if (config.categories) {
      config.categories.forEach((category) => {
        category[ID] = uuid()

        category.links.forEach((link) => (link[ID] = uuid()))
      })
    }
  })
}

export { addConfigId, ID }

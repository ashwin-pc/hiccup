import { uuid } from '../uuid'

const ID = Symbol.for('ID')

function addConfigId(config) {
    
    if (config.featured) {
        config.featured.forEach(link => link[ID] = uuid())
    }

    if (config.categories) {
        config.categories.forEach(category => {
            category[ID] = uuid()

            category.links.forEach(link => link[ID] = uuid())
        })
    }

    return config
}

export {
    addConfigId,
    ID,
}
import { ID, addConfigId } from '../index'

const SAMPLE_FEATURED = [{
    "name": "Featured Link",
    "background": "/assets/card.png",
    "link": "http://google.com"
}, {
    "name": "Another Feaured link",
    "link": "http://google.com"
}]

const SAMPLE_CATEGORIES = [{
    "title": "Category 1",
    "links": [{
        "name": "Link 1",
        "link": "http://google.com"
    }, {
        "name": "Link 2",
        "link": "http://google.com"
    }]
}, {
    "title": "Category 2",
    "links": [{
        "name": "Link 1",
        "link": "http://google.com"
    }, {
        "name": "Link 2",
        "link": "http://google.com"
    }]
}]

describe('addConfigId', () => {
    test('should add id to config', () => {
        const completeConfig = {
            featured: [...SAMPLE_FEATURED],
            categories: [...SAMPLE_CATEGORIES],
        }

        const newConfig = addConfigId(completeConfig)

        expect(newConfig.featured[0][ID]).toBeDefined()
        expect(newConfig.categories[0][ID]).toBeDefined()
        expect(newConfig.categories[0].links[0][ID]).toBeDefined()
    })
    
})

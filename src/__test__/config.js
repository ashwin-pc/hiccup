const config = {
    featured: [{
        name: 'Featured Link',
        background: '/assets/logo.png',
        link: 'http://google.com'
    }, {
        name: 'Another Feaured link',
        link: 'http://google.com',
        tags: 'space separated tags'
    }],
    categories: [{
        title: 'Category 1',
        links: [{
            name: 'Link 1',
            link: 'http://google.com'
        }, {
            name: 'Test Link 2',
            link: 'http://google.com'
        }]
    }, {
        title: 'Category 2',
        links: [{
            name: 'Link 1',
            link: 'http://google.com',
            tags: 'more searchable tags'
        }, {
            name: 'Link 2',
            link: 'http://google.com'
        }]
    }]
}

export {
    config,
    config as default,
}
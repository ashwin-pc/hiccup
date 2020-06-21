# Hiccup

![](public/logo192.png)

A static start page to get to your most important links, **FAST**. You can use this for your home server, new tab using browser extentions, or basically anywhere you can server a static webpage from!

### [Live Demo](https://test.designedbyashw.in/hiccup/)

## Features

- Static Webpage
- Featured Links
- Categories
- Quick link preview
- Search (with tag support)
- Local Config management
- PWA support
- Keyboard shortcuts

## Screens

Landing page

![](docs/assets/screen.png)

Quickly find links

![](docs/assets/screen-2.png)

Locally manage config using JSON

![](docs/assets/screen-3.png)

## Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Serve the release build or any of the available react scripts to run the app.
The startpage uses a `config.json` file as the source of truth for page. It can be modified locally but the result will only be saved on the browsers `localStorage` and persist across sessions.

### Using Config

Since this is a static website, the only way to permanently update the links is to modify the `config.json` file. If using the pre built version, just update the `config.json` file in the release zip. During development, update the config in the `assets` folder since the build will override any other config file.

To update config on a local browser instance, use the online config editor using the ⚙️ icon. This will persist the config across sessions. The local editor allows to:

- Delete local cache and restore the configuration from `config.json`
- Reset a local modification to the last saved point (useful if config was edited by accident)
- Save the config to `localS

#### Config structure

```js
{
    "featured": [{
        "name": "Link name as seen on the card", // required
        "link": "link", // required
        "background": "path to background image", // optional
        "tags": "space spearated tags for searching" //optional
    }, {
        // ... Other featured links
    }],
    "catagories": [{
        "name": "Category name", // required
        "links": [{
            "name": "Link name as seen on the card", // required
            "link": "link", // required
            "tags": "space spearated tags for searching" //optional
        }, {
            // ... Other category links
        }]
    }, {
        // ... Other categorys
    }],
}
```

#### Sample config 
```
{
    "featured": [{
        "name": "Featured Link",
        "link": "http://google.com",
        "background": "/assets/card.png"
    }, {
        "name": "Another Feaured link",
        "link": "http://google.com"
    }, {
        "name": "One more",
        "link": "http://google.com"
    }, {
        "name": "Oh no!!!",
        "link": "http://google.com",
        "tags": "space separated tags"
    }],
    "categories": [{
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
    }, {
        "title": "Category 3",
        "links": [{
            "name": "Link 1",
            "link": "http://google.com",
            "tags": "more searchable tags"
        }]
    }, {
        "title": "Category 4",
        "links": [{
            "name": "Link 1",
            "link": "http://google.com"
        }, {
            "name": "Link 2",
            "link": "http://google.com"
        }, {
            "name": "Link 3",
            "link": "http://google.com"
        }, {
            "name": "Link 4",
            "link": "http://google.com"
        }]
    }]
}
```

### Using Search

The purpose of the search is to get to you link as easily as possible.

- Press `/` to activate the search
- Press `Esc` to quit the search
- Hit `Enter` to open the first highlighted link amongst search results. (Featured left to right, followed by categories left to right then top to bottom)

Search looks at the `name`, `link` and `tags` field of each link in the config to find a match.


## Available Scripts for development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

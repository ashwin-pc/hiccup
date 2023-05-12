# Hiccup

![GitHub release (latest by date)](https://img.shields.io/github/v/release/ashwin-pc/hiccup)
![GitHub](https://img.shields.io/github/license/ashwin-pc/hiccup)
[![Tests](https://github.com/ashwin-pc/hiccup/actions/workflows/tests.yml/badge.svg?branch=master&event=push)](https://github.com/ashwin-pc/hiccup/actions/workflows/tests.yml/badge.svg?branch=master&event=push)
[![CI](https://github.com/ashwin-pc/hiccup/actions/workflows/deploy_to_server.yml/badge.svg)](https://github.com/ashwin-pc/hiccup/actions/workflows/deploy_to_server.yml)

![](public/logo192.png)

A static start page to get to your most important links, **FAST**. You can use this for your home server, new tab using browser extentions, use the **demo page** directly or basically anywhere you can server a static webpage from!

### [Live Demo](https://designedbyashw.in/test/hiccup/)

## Features

- Static Webpage
- Featured Links
- Categories
- Drag to add links and images
- Search
  - Supports various search providers and custom ones too
  - Links and tag support
- Docker support
- Multiple profiles
- Load remote profile
- Caching strategies
- PWA support
- Keyboard shortcuts
- Read Only mode
- Full keyboard navigation support

![Main screen](docs/assets/main-desktop.png)

## Screens

<div align="center">
<table style="width:100%; border: none;">
  <tr>
    <td></td>
    <td><b>Desktop</b></td>
    <td><b>Mobile</b></td>
  </tr>
  <tr>
    <td><b>Landing Page</b></td>
    <td><img src="docs/assets/main-desktop.png" alt="Landing Page Desktop"></td>
    <td><img src="docs/assets/main-mobile.png" alt="Landing Page Mobile"></td>
  </tr>
  <tr>
    <td><b>Quickly find links</b></td>
    <td><img src="docs/assets/search-desktop.png" alt="Landing Page Desktop"></td>
    <td><img src="docs/assets/search-mobile.png" alt="Landing Page Mobile"></td>
  </tr>
  <tr>
    <td><b>Easily edit links</b></td>
    <td><img src="docs/assets/edit-desktop.png" alt="Landing Page Desktop"></td>
    <td><img src="docs/assets/edit-mobile.png" alt="Landing Page Mobile"></td>
  </tr>
  <tr>
    <td><b>Locally manage config using JSON</b></td>
    <td><img src="docs/assets/config-manager-desktop.png" alt="Landing Page Desktop"></td>
    <td><img src="docs/assets/config-manager-mobile.png" alt="Landing Page Mobile"></td>
  </tr>
</table>
</div>

Drag & drop config file

![Drag & drop config file](docs/assets/screen-drop.png)

## Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Serve the release build or use any of the available react scripts to run the app.
The startpage uses a `config.json` file as the source of truth for page. It can be modified locally but the result will only be saved on the browsers `localStorage` and persist across sessions.

### Installation

To use the app, you have many options

#### [Hosted site](https://test.designedbyashw.in/hiccup)

I have hosted an instance of the app [here](https://test.designedbyashw.in/hiccup). Since this is a static site, chages you make to the links only exist locally on your browser and are never sent anywhere. To save the links to other browsers, just doenload the config file from the editor using the download button and drag the config file onto a new instance of hiccup on your new browser. The links in your config stay private. You can even have multiple config files that you can load based on your need.

#### Docker

To run the app using docker the image `bleckbeard/hiccup:latest`. You can use the command below or the `docker-compose.yaml` file from the repo. Be sure to change the volume to the location of your local config file. Use the one in `./public/configs/config.json` for reference.

```
docker run \
    -p 8899:80 \
    -v `pwd`/public/configs/config.json:/usr/share/nginx/html/configs/config.json \
    bleckbeard/hiccup:latest
```

#### Using a static site host

You cann download the built file or build it yourself and deploy to a static site provider like netlify or github-pages (or any other way to host a static site). To persist the config, edit the local config file. You can always sync the version of your config file to this using the config editor.

### Hotkeys

The app has a few hotkeys to help you easily navigate around. To quickly view the available hotkeys, use the `Cmd/Ctrl + /` hotkey!

> Note: Hotkeys do not work when the search is bar is in focus. Use `Tab` to focus out of the search bar and into the app or click anywhere outside the search bar to use hotkeys

### Using Search

The purpose of the search is to get to you link as easily as possible. The search bar is a powerful tool to search across many search providers e.g. Google, Amazon, Duck Duck Go and Links (including tags)

- Press `UpArrow` and `DownArrow` to navigate the search
- Press `Esc` to quit the search
- Hit `Enter` to open the first highlighted link amongst search results. (Featured cards have a star and the Search provider is marked by a globe)

Search looks at the `name`, `link` and `tags` field of each link in the config to find a match.

To edit the search providers, toggle the edit mode, click on the edit icon on the search bar to add your desired search provider. You can add multiple search providers

### Dragging your links/images/configs to add them

You cann now add/edit the links and background images of each of the cards by simply dragging that link or image from another browser window onto Hiccups link cards. The featured cards have two drop boxes, a link dropbox and image dropbox. To quickly update the background image, use the image dropbox.

You can also upload a config by dropping a config file onto any droppable card. Hiccup will be able to load it.

### Using Edit mode

The edit mode can be activated using `Cmd/Ctrl + e` or the ✏️ icon on the bottom right of the screen. To exit the edit mode at any time use `Esc` or the commands used to start editing. The Edit mode lets you add, delete and edit links on the startpage.

The feaures currently supported are:

- Add, edit and delete upto 4 featured cards
- Add, edit and delete upto 4 categories
- Add, edit and delete category links

These limits were place intentionally to
For more flexibility, you can directly edit the config using the config editor (described in the next section)

e.g.:

- Remove the category of featured section entirely
- Add more than 4 categories or featured cards

> The `Edit mode` alters the config and if you ever wish to revert to the original config.json file, click the trash icon in the config editor to completely reset the config state.

### Using Config

Since this is a static website, all edits made are local and the new config must uploaded to a server from where the configs can be fetched. To make this process easier, Hiccup comes with a built in config manager. The config manager allows you to:

- Load a config file from either URL or local file
- Manage multiple configs (Preview, Select, Sync, Delete)
- Download config file

you can also additionally share hiccup with a preloaded config using the `config` url parameter.

e.g.

```
http://designedbyashw.in/test/hiccup?config=http://your-url.com/config.json
```

> Since this is a CORS request, the server should allow requests from the source domain. Github Gists are an easy way to save remote config's

#### Using with github gists

To save a config on github gists.

1. Create the hiccup view you want and download the config.
1. Copy the contents of the file to the gist
1. Click Creat a **Public** Gist
1. Copy the url and add `/raw` to the end. This is now your config URL

Share the config with anyone to load in their instance of hiccup

#### Migrations

If you were using an older version of Hiccup (< v0.4.x), the config manager will automatically recover the old cached config and promt you to save it using the new version. download the recovered config and redistribute it as needed.

All the config information is stored in **LocalStorage** and never sent to a server anywhere!

#### Config structure

Refer to the [JSON Scheme file](src/modules/validateConfig/schema.json) for the latest schema.

### Caching

The app now supports 4 caching strategies, these are useful if you dont want to frequently update your configs or run it completely offine

Strategies:

- `cache`: Use only the local cache to save and fetch data
- `network`: Use only the network values and fail if you cannot get it
- `cache-first`: If not found in the cache, fallback to the remote URL
- `network-first`: (Default) If not found in the remote server, fallback to the cached value

You can set this value using the URL parameter `cache`

e.g.

```
http://designedbyashw.in/test/hiccup?cache=network
```

### Docker

**Building an image**

```sh
docker build -t TAG .
```

**Running the image**

edit the `./docker-compose.yml` file image to the `TAG` and run

```
docker compose up
```

And visit the URL

```
http://localhost:8899
```

**Deploying to docker-hub**

Run the release script `./release.sh`

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

### `npm run cypress:run` and `npm run cypress:open`

Launches Cypress test suite

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

### Releasing the app

To release the app

- Update the semver in the package.json
- Update the `Readme.md` if new features have been added or breaking changes have been introduced
- Run the `release.sh` script to:
  - build the code and bundle it
  - deploy the latest docker images
  - bundle the built code to add as an `.zip` artifact to the github release
- Push the code to Github and create a new release
- Add the bundled zip as an artifact to the release and delete it locally

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

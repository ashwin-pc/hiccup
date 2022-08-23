// Add all the page level commands

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ConfigAction = 'preview' | 'activate' | 'sync' | 'delete'

const CONFIG_ACTIONS = {
  preview: -1,
  activate: 0,
  sync: 1,
  delete: 2,
}

// export type ConfigAction = keyof typeof CONFIG_ACTIONS

Cypress.Commands.add('clickSettings', () => {
  cy.findByTestId('global-settings').click()
})

Cypress.Commands.add('closeModal', () => {
  cy.findByTestId('close-modal').click()
})

Cypress.Commands.add('screenshotPreviewImage', (name) => {
  cy.screenshot(`preview/${name}`, {
    overwrite: true,
    capture: 'viewport',
  })
})

Cypress.Commands.add('typeInSearchBar', (text) => {
  cy.findByTestId('search-bar').type(text)
})

Cypress.Commands.add('getManagedConfig', (id, action = 'preview') => {
  if (action === 'preview') {
    !!id
      ? cy.findByTestId(`cached-config-${id}`)
      : cy.get('body').find('.previewing')
  } else {
    const index = CONFIG_ACTIONS[action]
    !!id
      ? cy.findByTestId(`cached-config-${id}`).find('button').eq(index)
      : cy.get('body').find('.previewing button').eq(index)
  }
})

// Not happy with these, refactor to be more useful

Cypress.Commands.add('submitUrlInput', (url: string) => {
  cy.findByTestId('config-url-input').find('input').type(`${url}{Enter}`)
})

Cypress.Commands.add('getCachedConfigs', () => {
  cy.get('div[data-testid^="cache"]')
})

Cypress.Commands.add('getEditLinkModal', () => {
  cy.findByTestId('edit-link-title').parent()
})

Cypress.Commands.add('blurSearch', () => {
  cy.get('body').click(5, 5)
})

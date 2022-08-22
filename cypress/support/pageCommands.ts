// Add all the page level commands

Cypress.Commands.add('clickSettings', () => {
  cy.findByTestId('global-settings').click()
})

Cypress.Commands.add('getConfigPreview', (configId: string) => {
  cy.findByTestId(`cached-config-${configId}`)
})

Cypress.Commands.add('getConfigActivate', (configId: string) => {
  cy.findByTestId(`cached-config-${configId}`).find('button').eq(0)
})

Cypress.Commands.add('getConfigSync', (configId: string) => {
  cy.findByTestId(`cached-config-${configId}`).find('button').eq(1)
})

Cypress.Commands.add('getConfigDelete', (configId: string) => {
  cy.findByTestId(`cached-config-${configId}`).find('button').eq(2)
})

Cypress.Commands.add('submitUrlInput', (url: string) => {
  cy.findByTestId('config-url-input').find('input').type(`${url}{Enter}`)
})

Cypress.Commands.add('getPreviewingConfig', () => {
  cy.get('body').find('.previewing')
})

Cypress.Commands.add('getCachedConfigs', () => {
  cy.get('div[data-testid^="cache"]')
})

Cypress.Commands.add('getEditLinkModal', () => {
  cy.findByTestId('edit-link-title').parent()
})

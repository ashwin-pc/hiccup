// Run this only when you need updated screenshots
// Run on a reasonably large monitor so that scrollbars dont appear. This seesm to be a bug with cypress screenshot
describe.skip('Screenshots', () => {
  const screens: {
    type: string
    orientation?: Cypress.ViewportOrientation
    viewport: Cypress.ViewportPreset
  }[] = [
    {
      type: 'desktop',
      viewport: 'macbook-13',
    },
    {
      type: 'mobile',
      viewport: 'iphone-8',
    },
  ]

  beforeEach(() => {
    // TODO: get app url dynamically
    cy.visit('http://localhost:3000')
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
    cy.intercept('GET', '**/assets/*').as('image')
  })

  screens.forEach(({ type, viewport, orientation }) => {
    it(`should capture all major ${type} screens`, () => {
      cy.viewport(viewport, orientation ?? 'portrait')
      // Wait for app to load
      cy.wait('@image')
      cy.get('.toast').should('be.visible')
      cy.get('.toast').should('be.hidden')

      // Landing page
      cy.screenshotPreviewImage(`main-${type}`)

      // Search
      cy.typeInSearchBar('Fea')
      cy.screenshotPreviewImage(`search-${type}`)
      cy.typeInSearchBar('{esc}')

      // Hotkey edit
      cy.blurSearch().type('{cmd+e}')
      cy.screenshotPreviewImage(`edit-${type}`)

      // Exit edit mode and hotkey config maager
      cy.blurSearch().type('{cmd+e}')
      cy.blurSearch().type('{cmd+k}')
      cy.screenshotPreviewImage(`config-manager-${type}`)
      cy.closeModal()

      // Hotkey modal
      cy.get('body').type('{cmd+/}')
      cy.screenshotPreviewImage(`hotkey-${type}`)
      cy.closeModal()
    })
  })
})

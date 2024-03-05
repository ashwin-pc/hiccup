describe('Basic tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' }).as(
      'config'
    )
    cy.intercept('GET', '**/configs/manifest.json', {
      fixture: 'default-manifest',
    })
    // TODO: gett app url dynamically
    cy.visit('http://localhost:3000')
  })

  it('displays the Default config state by default', () => {
    cy.findAllByTestId('featured-card').should('have.length', 4)
    cy.findAllByTestId('category-card').should('have.length', 9)
    cy.findByTestId('search-bar').should('exist')
    cy.findAllByTestId('featured-card').first().contains('Featured Link')

    cy.clickSettings()
    cy.findByTestId(`config-default`)
      .should('contain.text', 'Default Config')
      .findByTestId('active-indicator')
      .should('exist')
  })

  it('should be able to able to load a remote config', () => {
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.visit('http://localhost:3000?config=http://dummyconfig.com')
    cy.findAllByTestId('featured-card')
      .first()
      .contains('This is a dummy config')

    cy.clickSettings()
    cy.findByTestId(`config-url`)
      .should('contain.text', 'Dummy Config')
      .findByTestId('active-indicator')
      .should('exist')
  })

  it('should be able to use Hotkeys', () => {
    cy.waitForPageLoad()
    cy.blurSearch().type('{cmd+/}')
    cy.findAllByTestId('hotkey-modal-title').should('exist')
  })

  it('should not be able to edit a read-only config', () => {
    cy.waitForPageLoad()
    cy.blurSearch().type('{cmd+e}')
    cy.findAllByTestId('category').first().find('h1 button').eq(0).click()

    cy.findAllByTestId('edit-link-title').parent().find('input').type(' Edited')
    cy.findAllByTestId('edit-link-title')
      .parent()
      .find('button')
      .first()
      .click()

    cy.get('.toast').should('contain.text', 'Config is readonly')
  })
})

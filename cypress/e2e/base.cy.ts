describe('Basic tests', () => {
  beforeEach(() => {
    // TODO: gett app url dynamically
    cy.visit('http://localhost:3000')
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
  })

  it('displays the Default config state by default', () => {
    cy.findAllByTestId('featured-card').should('have.length', 4)
    cy.findAllByTestId('category-card').should('have.length', 9)
    cy.findByTestId('search-bar').should('exist')
    cy.findAllByTestId('featured-card')
      .first()
      .contains('First Default Featured Link')

    cy.clickSettings()
    cy.getManagedConfig('default', 'preview')
      .should('contain.text', 'Default Config')
      .should('contain.text', 'Active')
  })

  it('should be able to able to load a remote config', () => {
    cy.visit('http://localhost:3000?config=http://dummyconfig.com')
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.findAllByTestId('featured-card')
      .first()
      .contains('This is a dummy config')

    cy.clickSettings()
    cy.getManagedConfig('dummy', 'preview')
      .should('contain.text', 'Dummy Config')
      .should('contain.text', 'Active')
  })

  it('should be able to use Hotkeys', () => {
    cy.blurSearch().type('{cmd+/}')
    cy.findAllByTestId('hotkey-modal-title').should('exist')
  })

  it('should be able to edit a category', () => {
    cy.blurSearch().type('{cmd+e}')
    cy.findAllByTestId('category').first().find('h1 button').eq(0).click()

    cy.findAllByTestId('edit-link-title').parent().find('input').type(' Edited')
    cy.findAllByTestId('edit-link-title')
      .parent()
      .find('button')
      .first()
      .click()

    cy.get('body').type('{cmd+e}')
    cy.findAllByTestId('category')
      .first()
      .should('contain', 'Category 1 Edited')

    cy.clickSettings()

    cy.getManagedConfig().should('contain', ' - Editing')
  })
})

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
    cy.getConfigPreview('default')
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
    cy.getConfigPreview('dummy')
      .should('contain.text', 'Dummy Config')
      .should('contain.text', 'Active')
  })
})

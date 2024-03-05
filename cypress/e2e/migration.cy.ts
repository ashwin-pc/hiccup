describe('Migrations', () => {
  beforeEach(() => {})

  it('should be able to able to migrate - v1 to latest', () => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'v1-config' })
    cy.visit('http://localhost:3000')
    cy.findAllByTestId('featured-card').first().contains('V1 Config')
  })
})

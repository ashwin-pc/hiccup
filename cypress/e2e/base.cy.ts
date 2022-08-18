describe('Basic tests', () => {
  beforeEach(() => {
    // TODO: gett app url dynamically
    cy.visit('http://localhost:3000')
  })

  it('displays the empty config state by default', () => {
    cy.findAllByTestId('featured-card').should('have.length', 4)
    cy.findAllByTestId('category-card').should('have.length', 9)
    cy.findByTestId('search-bar').should('exist')
  })
})

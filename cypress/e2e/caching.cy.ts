describe('Caching', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
    cy.intercept('http://config.com', { fixture: 'dummy' })
    cy.fixture('sample-cache').then((fixture) =>
      localStorage.setItem('hiccup_config_v2', JSON.stringify(fixture))
    )
  })

  it('should use network-first by default', () => {
    cy.visit('http://localhost:3000')
    // Since loaded cache has
    cy.findAllByTestId('featured-card').first().contains('Featured Link')
  })

  it('should use network when set', () => {
    cy.visit('http://localhost:3000?cache=network')
    cy.findAllByTestId('featured-card').first().contains('Featured Link')
  })

  it('should use cache when set', () => {
    cy.visit('http://localhost:3000?cache=cache')
    cy.findAllByTestId('featured-card').should('have.length', 0)
  })

  it('should use cache-first when set', () => {
    cy.visit('http://localhost:3000?cache=cache-first')
    cy.visit('http://localhost:3000?cache=cache')
    cy.findAllByTestId('featured-card').should('have.length', 0)
  })

  it('should use network-first when set', () => {
    cy.visit('http://localhost:3000?cache=network-first')
    cy.findAllByTestId('featured-card').first().contains('Featured Link')
  })
})

describe('Caching', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
    cy.fixture('sample-cache').then((fixture) =>
      localStorage.setItem('hiccup_config_v2', JSON.stringify(fixture))
    )
  })

  it('should use cache-first by default', () => {
    cy.visit('http://localhost:3000')
    cy.intercept('http://config.com', { fixture: 'dummy' })
    cy.clickSettings()
    cy.getCachedConfigs().should('have.length', 3)
    cy.getConfigPreview('dummy').should('not.exist')
  })

  it('should use network when set', () => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'dummy' })
    cy.intercept('http://config.com', { fixture: 'dummy' })
    cy.visit('http://localhost:3000?cache=network')
    cy.clickSettings()
    cy.getCachedConfigs().should('have.length', 3)
    cy.getConfigPreview('dummy').should('exist')
  })

  it('should use cache when set', () => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'dummy' })
    cy.intercept('http://config.com', { fixture: 'dummy' })
    cy.visit('http://localhost:3000?cache=cache')
    cy.clickSettings()
    cy.getCachedConfigs().should('have.length', 3)
    cy.getConfigPreview('dummy').should('not.exist')
  })

  it('should use cache-first when set', () => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'dummy' })
    cy.intercept('http://config.com', { fixture: 'dummy' })
    cy.visit('http://localhost:3000?cache=cache-first')
    cy.clickSettings()
    cy.getCachedConfigs().should('have.length', 3)
    cy.getConfigPreview('dummy').should('not.exist')
  })

  it('should use network-first when set', () => {
    cy.intercept('GET', '**/configs/config.json', { fixture: 'dummy' })
    cy.intercept('http://config.com', { fixture: 'dummy' })
    cy.visit('http://localhost:3000?cache=network-first')
    cy.clickSettings()
    cy.getCachedConfigs().should('have.length', 3)
    cy.getConfigPreview('dummy').should('exist')
  })
})

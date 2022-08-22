describe('Migrations', () => {
  beforeEach(() => {})

  it('should be able to able to migrate - v1 to v2', () => {
    cy.fixture('v1-config').then((fixture) =>
      localStorage.setItem('hiccup_config', JSON.stringify(fixture))
    )
    cy.visit('http://localhost:3000')
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
    cy.findAllByTestId('featured-card').first().contains('V1 Config')
    cy.clickSettings()
    cy.findByTestId('file-viewer').find('#title').should('contain', 'Recovered')
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(localStorage.getItem('hiccup_config')).to.be.null
  })
})

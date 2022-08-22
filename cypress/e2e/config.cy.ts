describe('Config Manager', () => {
  beforeEach(() => {
    // TODO: gett app url dynamically
    cy.visit('http://localhost:3000')
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
    cy.clickSettings()
  })

  it('should be able to preview configs', () => {
    cy.findByTestId('file-viewer').find('#id').should('not.contain', 'empty')
    cy.getConfigPreview('empty').click()
    cy.findByTestId('file-viewer').find('#id').should('contain', 'empty')
  })

  it('should be able to switch configs', () => {
    cy.findByTestId('file-viewer').find('#id').should('not.contain', 'empty')
    cy.getConfigActivate('empty').click()
    cy.getConfigPreview('empty').should('contain.text', 'Active')
  })

  it('should be able to load remote config', () => {
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.submitUrlInput('http://dummyconfig.com')
    cy.findByTestId('file-viewer').find('#id').should('contain', 'dummy')
    cy.getConfigPreview('dummy').should('contain.text', 'Active')
  })

  it('should be able to sync config', () => {
    cy.findByTestId('file-viewer')
      .find('#title')
      .should('contain', 'Default Config')
    cy.intercept('GET', '**/configs/config.json', {
      fixture: 'default-after-sync',
    }).as('sync')
    cy.getConfigSync('default').click()
    cy.findByTestId('file-viewer')
      .find('#title')
      .should('contain', 'Default Synced Config')
  })

  it('should be able to delete a config but not the default configs', () => {
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.submitUrlInput('http://dummyconfig.com')
    cy.findByTestId('file-viewer').find('#id').should('contain', 'dummy')
    cy.getConfigPreview('dummy').should('contain.text', 'Active')

    // disabled delete default config
    cy.getConfigDelete('default').should('be.disabled')
    cy.getConfigPreview('default').should('exist')

    // Delete dummy config
    cy.getConfigPreview('dummy').should('exist')
    cy.getConfigDelete('dummy').click()
    cy.getConfigPreview('dummy').should('not.exist')
  })
})

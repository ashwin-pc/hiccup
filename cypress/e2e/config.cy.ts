import path from 'path'

describe('Config Manager', () => {
  beforeEach(() => {
    // TODO: gett app url dynamically
    cy.visit('http://localhost:3000')
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
    cy.clickSettings()
  })

  it('should be able to preview configs', () => {
    cy.findByTestId('file-viewer').find('#id').should('not.contain', 'empty')
    cy.getManagedConfig('empty').click()
    cy.findByTestId('file-viewer').find('#id').should('contain', 'empty')
  })

  it('should be able to switch configs', () => {
    cy.findByTestId('file-viewer').find('#id').should('not.contain', 'empty')
    cy.getManagedConfig('empty', 'activate').click()
    cy.getManagedConfig('empty').should('contain.text', 'Active')
  })

  it('should be able to load remote config', () => {
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.submitUrlInput('http://dummyconfig.com')
    cy.findByTestId('file-viewer').find('#id').should('contain', 'dummy')
    cy.getManagedConfig('dummy', 'preview').should('contain.text', 'Active')
  })

  it('should be able to sync config', () => {
    cy.findByTestId('file-viewer')
      .find('#title')
      .should('contain', 'Default Config')
    cy.intercept('GET', '**/configs/config.json', {
      fixture: 'default-after-sync',
    }).as('sync')
    cy.getManagedConfig('default', 'sync').click()
    cy.findByTestId('file-viewer')
      .find('#title')
      .should('contain', 'Default Synced Config')
  })

  it('should be able to delete a config but not the default configs', () => {
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.submitUrlInput('http://dummyconfig.com')
    cy.findByTestId('file-viewer').find('#id').should('contain', 'dummy')
    cy.getManagedConfig('dummy', 'preview').should('contain.text', 'Active')

    // disabled delete default config
    cy.getManagedConfig('default', 'delete').should('be.disabled')
    cy.getManagedConfig('default', 'preview').should('exist')

    // Delete dummy config
    cy.getManagedConfig('dummy', 'preview').should('exist')
    cy.getManagedConfig('dummy', 'delete').click()
    cy.getManagedConfig('dummy', 'preview').should('not.exist')
  })

  it('should download config', () => {
    cy.findByTestId('download-button').click()
    cy.getEditLinkModal().find('button').first().click()
    const downloadsFolder = Cypress.config('downloadsFolder')
    cy.readFile(path.join(downloadsFolder, 'config-default.json')).should(
      'exist'
    )
  })
})

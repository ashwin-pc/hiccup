import path from 'path'

// TODO: Reenable this once the config manager is complete with the new features (i.e. editable remotes)
describe.skip('Config Manager', () => {
  beforeEach(() => {
    // TODO: gett app url dynamically
    cy.intercept('GET', '**/configs/config.json', { fixture: 'default' })
    cy.visit('http://localhost:3000')
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
    cy.findByTestId(`cached-config-empty`)
      .should('contain.text', 'Empty config')
      .findByTestId('active-indicator')
      .should('exist')
  })

  it('should be able to load remote config', () => {
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.submitUrlInput('http://dummyconfig.com')
    cy.findByTestId('file-viewer').find('#id').should('contain', 'dummy')
    cy.findByTestId(`cached-config-dummy`)
      .should('contain.text', 'Dummy Config')
      .findByTestId('active-indicator')
      .should('exist')
  })

  it('should be able to sync config', () => {
    cy.findByTestId('file-viewer')
      .find('#title')
      .should('contain', 'Default Config')
    cy.intercept('GET', '**/configs/config.json', {
      fixture: 'default-after-sync',
    }).as('sync')

    // Sync default config
    cy.findByTestId(`cached-config-default`)
      .findByTestId('ellipsis-button')
      .click()
    cy.findByTestId('sync-button').click()

    // Check if sync was successful
    cy.findByTestId('file-viewer')
      .find('#title')
      .should('contain', 'Default Synced Config')
  })

  it('should be able to delete a config but not the default configs', () => {
    cy.intercept('GET', 'http://dummyconfig.com', { fixture: 'dummy' })
    cy.submitUrlInput('http://dummyconfig.com')
    cy.findByTestId('file-viewer').find('#id').should('contain', 'dummy')
    cy.findByTestId(`cached-config-dummy`)
      .should('contain.text', 'Dummy Config')
      .findByTestId('active-indicator')
      .should('exist')

    // disabled delete default config
    cy.findByTestId(`cached-config-default`)
      .findByTestId('ellipsis-button')
      .click()
    cy.findByTestId('delete-button').should('not.exist')

    // Delete dummy config
    cy.findByTestId(`cached-config-dummy`)
      .findByTestId('ellipsis-button')
      .click()
    cy.findByTestId('delete-button').click()
    cy.findByTestId(`cached-config-dummy`).should('not.exist')
  })

  it('should download config', () => {
    cy.findByTestId(`cached-config-default`)
      .findByTestId('ellipsis-button')
      .click()
    cy.findByTestId('download-button').click()
    cy.getEditLinkModal().find('button').first().click()
    const downloadsFolder = Cypress.config('downloadsFolder')
    cy.readFile(path.join(downloadsFolder, 'config-default.json')).should(
      'exist'
    )
  })
})

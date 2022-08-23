/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    clickSettings(): Chainable<null>
    closeModal(): Chainable<null>
    typeInSearchBar(test: string): Chainable<null>
    screenshotPreviewImage(name: string): Chainable<null>
    getManagedConfig(id?: string, action?: ConfigAction): Chainable<null>

    submitUrlInput(url: string): Chainable<null>
    getEditLinkModal(): Chainable<null>
    getCachedConfigs(): Chainable<null>
    blurSearch(): Chainable<null>
  }
}

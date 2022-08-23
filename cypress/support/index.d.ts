/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    clickSettings(): Chainable<null>
    getConfigPreview(configId: string): Chainable<null>
    getConfigActivate(configId: string): Chainable<null>
    getConfigSync(configId: string): Chainable<null>
    getConfigDelete(configId: string): Chainable<null>
    getPreviewingConfig(): Chainable<null>
    submitUrlInput(url: string): Chainable<null>
    getEditLinkModal(): Chainable<null>
    getCachedConfigs(): Chainable<null>
    blurSearch(): Chainable<null>
  }
}

/// <reference types="Cypress" />

describe('Test base functionalitys', () => {
	it('should render the home page from site', () => {
		cy.visit('/')
	})
})

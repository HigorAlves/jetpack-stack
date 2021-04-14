/// <reference types="Cypress" />

describe('Base tests', () => {
	it('should render the home page from site', () => {
		cy.visit('/')
		cy.get('button').should('contain', 'English')
	})

	it('should test language switch', () => {
		cy.visit('/')
		cy.get('button').click()
		cy.get('button').should('contain', 'Português')
	})

	it('should render login page', () => {
		cy.visit('/login')
		cy.url().should('include', '/login')
	})

	it('should login inside the system', () => {
		cy.visit('/login')
		cy.get('input[name=username]').type('someuser@malito.com')
		cy.get('input[name=password]').type(`${'somepass'}{enter}`)
		cy.url().should('include', '/dashboard')
	})
})

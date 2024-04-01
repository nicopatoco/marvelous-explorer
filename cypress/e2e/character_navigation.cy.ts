describe('Character comics display', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    // Set up the intercept for SPA navigation
    cy.intercept('GET', '**/api/characters*').as('getCharacters')
    // Then wait for the request
    cy.wait('@getCharacters')

    // Should be 50 characters, cos requirements
    cy.get('[data-testid=character-link]').should('have.length', 50)
    cy.get('[data-testid=character-link]').first().click()
    cy.intercept('GET', '**/api/comics*').as('getComics')
    cy.wait('@getComics')
  })

  it('should render all the comics', () => {
    cy.url().should('include', '/details/')
    cy.get('[data-testid=comics-section]').should('exist')
    cy.get('[data-testid=comic]').should('have.length.at.least', 1)
  })
})

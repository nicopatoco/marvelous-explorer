describe('Character favoriting and navigation to favorites page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    // Set up the intercept for SPA navigation
    cy.intercept('GET', '**/api/characters*').as('getCharacters')
    // Then wait for the request
    cy.wait('@getCharacters')
  })

  it('should allows users to favorite characters and view them on the favorites page', () => {
    // Click the favorite button on 4 different characters
    const numberOfCharactersToFavorite = 4
    for (let i = 0; i < numberOfCharactersToFavorite; i++) {
      cy.get('[data-testid="favorite-button"]').eq(i).click()
    }
    // Navigate to the favorites page
    cy.get('[data-testid="favorites-link"]').click()
    // Check page title
    cy.get('h2').contains('FAVOURITES').should('exist')
    // Verify the number of favorited characters displayed matches the number of characters favorited
    cy.get('[data-testid=character-link]').should('have.length', numberOfCharactersToFavorite)
    // Remove a favourite character
    cy.get('[data-testid="favorite-button"]').eq(0).click()
    // Verify the number of favorited characters displayed matches the number of characters favorited -1
    cy.get('[data-testid=character-link]').should('have.length', numberOfCharactersToFavorite - 1)
  })

  it('should navitate to home page', () => {
    // Go back to Home page
    cy.get('[data-testid=marvel-logo]').click()
    // Should be 50 characters, cos requirements
    cy.get('[data-testid=character-link]').should('have.length', 50)
  })
})

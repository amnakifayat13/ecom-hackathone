describe(' navigation test', () => {
  it('tests opening and closing searchbar', () => {
    cy.visit('/')
    cy.get('[data-id="open-searchbar"]').should('not.be.exist')
    cy.get('[data-id="open-search-btn"]').click()
    cy.get('[data-id="open-searchbar"]' ).should('be.visible')
  })

  it('products list', () => {
    cy.visit('/')
    // cy.get('[data-id="product-list-btn]').click()
    cy.get('[data-id="product-list"]' ).click({force:true})
    

    
  })
})
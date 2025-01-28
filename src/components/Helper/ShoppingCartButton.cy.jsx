import React from 'react'
import ShoppingCartButton from './ShoppingCartButton'

describe('<ShoppingCartButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ShoppingCartButton />)
  })
})
import React from 'react'
import CartSideBar from './CartSidebar'

describe('<CartSideBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CartSideBar />)
  })
})
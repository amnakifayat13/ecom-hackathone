import React from 'react'
import { Carousel } from './carousel'

describe('<Carousel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Carousel />)
  })
})
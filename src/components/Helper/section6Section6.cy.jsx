import React from 'react'
import Section6 from './section6'

describe('<Section6 />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Section6 />)
  })
})
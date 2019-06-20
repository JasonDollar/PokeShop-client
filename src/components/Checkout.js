import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { CART_ITEMS_QUERY } from './Cart'
import { USER_ORDERS_QUERY } from './OrderList'
import ShowMyMoney, { USER_CREDITS_QUERY } from './ShowMyMoney'

const ORDER_POKEMONS_MUTATION = gql`
  mutation ORDER_POKEMONS_MUTATION {
    orderPokemons  {
      id
      price
    }
  }
`

const CheckoutContainer = styled.div`
  text-align: center;
`

const CheckoutButton = styled.button`
  margin-top: 1rem;
  border: 1px solid yellow;
  border-radius: 100px;
  background: ${props => props.theme.primaryRed};
  color: white;
  font-size: 2rem;
  padding: 1rem 2rem;
`

const Checkout = ({ buttonDisabled, totalPrice }) => (
    <ShowMyMoney>
      {({ data: { userCredits }, loading: loadingCredits, error: errorCredits }) => {
        if (loadingCredits) return <p>Loading...</p>
        return (
          <Mutation 
            mutation={ORDER_POKEMONS_MUTATION} 
            refetchQueries={[
              { query: CART_ITEMS_QUERY }, 
              { query: USER_ORDERS_QUERY },
              { query: USER_CREDITS_QUERY },
            ]}
          
          >
          {(orderPokemons, { data, loading, error }) => {
            if (data) {
              return <Redirect to="/orders" />
            }
            return (
              <CheckoutContainer>
                <CheckoutButton type="button" onClick={orderPokemons} disabled={loading || loadingCredits || buttonDisabled || (userCredits && userCredits.balance < totalPrice)}>
                  Buy these shiny pokemons!
                </CheckoutButton>
                {errorCredits && <p>{errorCredits.message}</p> }
                {error && <p> {error.message}</p>}
                
              </CheckoutContainer>
            )
          }
          }
          </Mutation>
        )
      }}
    </ShowMyMoney>
)

export default Checkout

Checkout.propTypes = {
  buttonDisabled: PropTypes.bool,
  totalPrice: PropTypes.number,
}

Checkout.defaultProps = {
  buttonDisabled: false,
  totalPrice: 0,
}
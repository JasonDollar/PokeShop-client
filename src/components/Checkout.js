import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { CART_ITEMS_QUERY } from './Cart'
import { USER_ORDERS_QUERY } from './OrderList'
import ShowMyMoney, { USER_CREDITS_QUERY } from './ShowMyMoney'
import ActionButton from './styles/ActionButton'

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


const Checkout = ({ buttonDisabled, totalPrice }) => {
  const [orderPokemons, { data, loading, error }] = useMutation(ORDER_POKEMONS_MUTATION, {
    refetchQueries: [
      { query: CART_ITEMS_QUERY }, 
      { query: USER_ORDERS_QUERY },
      { query: USER_CREDITS_QUERY },
    ],
  })

  return (
    <ShowMyMoney>
      {({ data: { userCredits }, loading: loadingCredits, error: errorCredits }) => {
        if (loadingCredits) return <p>Loading...</p>
        
        if (data) {
          return <Redirect to="/orders" />
        }
        return (
          <CheckoutContainer>
            <ActionButton type="button" onClick={orderPokemons} disabled={loading || loadingCredits || buttonDisabled || (userCredits && userCredits.balance < totalPrice)}>
              Buy these shiny pokemons!
            </ActionButton>
            {errorCredits && <p>{errorCredits.message}</p> }
            {error && <p> {error.message}</p>}
            
          </CheckoutContainer>
        )
      }}
    </ShowMyMoney>
  )
}


export default Checkout

Checkout.propTypes = {
  buttonDisabled: PropTypes.bool,
  totalPrice: PropTypes.number,
}

Checkout.defaultProps = {
  buttonDisabled: false,
  totalPrice: 0,
}
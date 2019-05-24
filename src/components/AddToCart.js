import React from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {CART_ITEMS_QUERY} from './Cart'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
      pokemon {
        id
        name
      }
    }
  }
`

const AddToCart = ({pokemonOfferId, children, disabledButton}) => {
  return (
    <Mutation mutation={ADD_TO_CART_MUTATION} variables={{id: pokemonOfferId}} refetchQueries={[{query: CART_ITEMS_QUERY}]}>
      {(addToCart, {data, loading, error}) => {
        if (data) {
          console.log(data)
        }
        return (
          <button onClick={addToCart} disabled={loading || disabledButton}>
            {children}
          </button>
        )
      }}
    </Mutation>
  )
}

export default AddToCart

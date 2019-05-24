import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

const CART_ITEMS_QUERY = gql`
  query CART_ITEMS_QUERY {
    userCart {
      id
      quantity
      pokemon {
        id
        name
      }
    }
  }
`

const Cart = (props) => {
  return (
    <Query query={CART_ITEMS_QUERY}>
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        console.log(data)
        return (
          <ul>
            {data && data.userCart.map(item => (
              <li key={item.id}>
                <p>{item.pokemon.name}</p>
                <p>{item.quantity}</p>
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  )
}

export default Cart

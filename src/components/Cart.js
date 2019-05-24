import React, {Fragment} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import RemoveFromCart from './RemoveFromCart'

export const CART_ITEMS_QUERY = gql`
  query CART_ITEMS_QUERY {
    userCart {
      id
      quantity
      pokemon {
        id
        name
        price
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
          <Fragment>
            <ul>
              {data && data.userCart.map(item => (
                <li key={item.id}>
                  <p>{item.pokemon.name}</p>
                  <p>{item.quantity}</p>
                  <p>{item.pokemon.price}$$$</p>
                  <RemoveFromCart cartItemId={item.id}/>
                </li>
              ))}
            </ul>
            <p>Total: {data.userCart.reduce((acc, item) => acc + item.pokemon.price, 0)}$$$</p>
          </Fragment>

        )
      }}
    </Query>
  )
}

export default Cart

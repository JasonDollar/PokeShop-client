import React, {Fragment} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import RemoveFromCart from './RemoveFromCart'
import Checkout from './Checkout'
import ShowMyMoney from './ShowMyMoney'

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
    <Query query={CART_ITEMS_QUERY} fetchPolicy="cache-and-network">
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        const totalPrice  = data.userCart.reduce((acc, item) => acc + (item.pokemon.price * item.quantity), 0)
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
            <p>Total: {totalPrice}$$$</p>
            <Checkout buttonDisabled={data.userCart.length <= 0} totalPrice={totalPrice}/>
          </Fragment>

        )
      }}
    </Query>
  )
}

export default Cart

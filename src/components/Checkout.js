import React, {Fragment} from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {CART_ITEMS_QUERY} from './Cart'
import {USER_ORDERS_QUERY} from './OrderList'
import ShowMyMoney from './ShowMyMoney'

const ORDER_POKEMONS_MUTATION = gql`
  mutation ORDER_POKEMONS_MUTATION {
    orderPokemons  {
      id
      price
    }
  }
`

const Checkout = ({children, buttonDisabled, totalPrice}) => {
  return (
    <ShowMyMoney>
      {({data: {userCredits}, loading: loadingCredits}) => {
        if (loadingCredits) return <p>Loading...</p>
        return (
          <Mutation mutation={ORDER_POKEMONS_MUTATION} refetchQueries={[{query: CART_ITEMS_QUERY}, {query: USER_ORDERS_QUERY}]}>
          {(orderPokemons, {loading, error}) => {
            let message
            // if (loading || loadingCredits) {
            //   message = 'Loading...'
            // } else if ()
            return (
              <Fragment>
                <button onClick={orderPokemons} disabled={loading || loadingCredits || buttonDisabled || userCredits.balance < totalPrice }>
                  Buy these shine pokemons!
                </button>
                {userCredits.balance < totalPrice && <p>Yoy don't have enough credits</p> }
                {error && <p> {alert(error.message)}</p>}
              </Fragment>
            )
          }}
        </Mutation>
        )
      }}
    </ShowMyMoney>
  )
}

export default Checkout

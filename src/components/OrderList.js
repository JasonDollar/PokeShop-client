import React, {Fragment} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders {
      id
      price
      user {
        name
      }
      items {
        id
        quantity
        price
        pokemon {
          id
          name
        }
        # seller {
        #   id
        #   name
        # }
      }
    }
  }
`

const OrderList = () => {
  return (
    <Query query={USER_ORDERS_QUERY}>
      {({data, loading, error}) => {
        if (loading) return (<p>Loading...</p>)
        if (error) return (<p>{error.message}</p>)
        if (data.orders.length <= 0) return <p>No orders found</p>
        console.log(data)
        return (
          <div>
            <div>
              {data.orders.map(order => (
                <Fragment key={order.id}>
                  <h3>Order {order.id}</h3>
                  <p>Price: {order.price}</p>
                  <ul >
                    {order.items.map(item => (
                      <li key={item.id}>{item.pokemon.name}</li>
                    ))}
                  </ul>

                </Fragment>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default OrderList

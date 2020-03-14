import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { format } from 'date-fns'
import WidthContainer from './styles/WidthContainer'
import SinglePokemonInfo from './styles/SinglePokemonInfo'
import { OrdersUl, OrderItem } from './styles/OrderList'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { formatBigNumber } from '../utils'

export const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders {
      id
      price
      createdAt
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
          image
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
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY, {
    fetchPolicy: 'cache-and-network',
  })
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error.message} />
        
  if (data.orders.length <= 0) return <ErrorMessage message="No orders found" />
  return (
    <WidthContainer>
      <OrdersUl>
        {data.orders.map(order => (
          <OrderItem key={order.id}>
            <header>
              <h3 className="title">Order {order.id}</h3>
              <p className="date">{format(parseInt(order.createdAt), 'dd/MM/yyyy H:mm')}</p>
            </header>
            
            <ul style={{ padding: 0 }}>
              {order.items.map(item => (
                <SinglePokemonInfo key={item.id}>
                  <img src={item.pokemon.image} alt={item.pokemon.name + ' image'} className="pokemonImage" />
                  <p className="pokemonText">
                    <span className="pokemonName">{item.pokemon.name}</span> x{item.quantity} - <strong>{formatBigNumber(item.price)}CR</strong>
                  </p>
                </SinglePokemonInfo>
              ))}
            </ul>
            <p className="total">Price: {formatBigNumber(order.price)}CR</p>
          </OrderItem>
        )).reverse()}
      </OrdersUl>
    </WidthContainer>
  )
}


export default OrderList

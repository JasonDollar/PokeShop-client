import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { format } from 'date-fns'
import WidthContainer from './styles/WidthContainer'

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

const OrdersUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
  padding: 0;
`

const OrderItem = styled.li`
  list-style: none;
  /* border: 1px solid ${props => props.theme.colorLightGrey}; */
  box-shadow: 0 2px 5px 0 ${props => props.theme.colorGrey};
  padding: 1rem;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid ${props => props.theme.primaryRed};
    margin-bottom: 1rem;
    padding: .5rem;
    padding-bottom: 1.5rem;
    & .title {
      margin: 0;
    }
    & .date {
      margin: 0;
      color: ${props => props.theme.colorLightGrey}
    }
  }
  .total {
    font-size: 2.5rem;
    margin: 1rem;
  }
`

const SinglePokemonInfo = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
    font-size: 2rem;
  .pokemonImage {
    width: 5rem;
    height: 5rem;
  }
  & p span.pokemonName {
    display: inline-block;
    &::first-letter {
      text-transform: uppercase;
    }
  }
`

const OrderList = () => (
    <WidthContainer>
    <Query query={USER_ORDERS_QUERY} fetchPolicy="cache-and-network">
      {({ data, loading, error }) => {
        if (loading) return (<p>Loading...</p>)
        if (error) return (<p>{error.message}</p>)
        
        if (data.orders.length <= 0) return <p>No orders found</p>
        console.log(data)
        return (
            <OrdersUl>
              {data.orders.map(order => (
                <OrderItem key={order.id}>
                  <header>
                    <h3 className="title">Order {order.id}</h3>
                    <p className="date">{format(parseInt(order.createdAt), 'DD/MM/YYYY H:mm')}</p>
                  </header>
                  
                  <ul>
                    {order.items.map(item => (
                      <SinglePokemonInfo key={item.id}>
                        <img src={item.pokemon.image} alt={item.pokemon.name + ' image'} className="pokemonImage" />
                        <p>
                          <span className="pokemonName">{item.pokemon.name}</span> x{item.quantity} - <strong>{item.price}CR</strong>
                        </p>
                      </SinglePokemonInfo>
                    ))}
                  </ul>
                  <p className="total">Price: {order.price}</p>
                </OrderItem>
              ))}
            </OrdersUl>
        )
      }}
    </Query>
    </WidthContainer>
)

export default OrderList

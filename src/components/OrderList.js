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
  margin: 2rem 1rem;
  padding: 0;
`

const OrderItem = styled.li`
  list-style: none;
  /* border: 1px solid ${props => props.theme.colorLightGrey}; */
  box-shadow: 0 2px 5px 0 ${props => props.theme.colorGrey};
  padding: 1rem;
  margin-bottom: 1rem;
  header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* align-items: center; */
    border-bottom: 2px solid ${props => props.theme.primaryRed};
    margin-bottom: 1rem;
    padding: .5rem;
    padding-bottom: 1.5rem;
    @media (min-width: 576px) {
      flex-direction: row;
    }
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
  .pokemonText {
    margin: 1rem 0;
  }
  .pokemonImage {
    width: 6rem;
    height: 6rem;
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
        return (
            <OrdersUl>
              {data.orders.map(order => (
                <OrderItem key={order.id}>
                  <header>
                    <h3 className="title">Order {order.id}</h3>
                    <p className="date">{format(parseInt(order.createdAt), 'DD/MM/YYYY H:mm')}</p>
                  </header>
                  
                  <ul style={{ padding: 0 }}>
                    {order.items.map(item => (
                      <SinglePokemonInfo key={item.id}>
                        <img src={item.pokemon.image} alt={item.pokemon.name + ' image'} className="pokemonImage" />
                        <p className="pokemonText">
                          <span className="pokemonName">{item.pokemon.name}</span> x{item.quantity} - <strong>{item.price}CR</strong>
                        </p>
                      </SinglePokemonInfo>
                    ))}
                  </ul>
                  <p className="total">Price: {order.price}CR</p>
                </OrderItem>
              ))}
            </OrdersUl>
        )
      }}
    </Query>
    </WidthContainer>
)

export default OrderList

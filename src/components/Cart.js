import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RemoveFromCart from './RemoveFromCart'
import AddToCart from './AddToCart'
import Checkout from './Checkout'
// import ShowMyMoney from './ShowMyMoney'
import WidthContainer from './styles/WidthContainer'
import SinglePokemonInfo from './styles/SinglePokemonInfo'

export const CART_ITEMS_QUERY = gql`
  query CART_ITEMS_QUERY {
    userCart {
      id
      quantity
      pokemon {
        id
        name
        price
        pokemon {
          id
          image
        }
      }
    }
  }
`

const CartContainer = styled.div`
margin: 1rem 2rem;
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 900px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .cartTotal {
    font-size: 2.4rem;
  }
`

const SinglePokemonCartItem = styled(SinglePokemonInfo)`
  margin-bottom: 1.5rem;
  .cartControls {
    display: flex;
    /* align-items: center; */
    width: 100%;
    margin: .5rem 1rem;
  }
  .cartButton {
    background: none;
    border: none;
    font-size: 1.6rem;
    &:first-of-type {
      margin-left: 1rem;
    }
  }
  .cartItemQuantity {
    font-size: 2rem;
  }
  
  .cartItemQuantity,
  .cartButton {
    margin-right: 1rem;
  }
  .cartButton {
    transform: translateY(2px);
  }
  .quantityTitle {
    display: inline-block;
  }
  .cartItemTotal {
    margin: 1rem;
  }
  
`

const Cart = props => (
    <WidthContainer>

      <Query query={CART_ITEMS_QUERY} fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          let totalPrice = 0
          if (data && data.userCart) {
            totalPrice = data.userCart.reduce((acc, item) => acc + (item.pokemon.price * item.quantity), 0)
          }
          return (
            <CartContainer>
              <ul>
                {data && data.userCart.map(item => (
                  <SinglePokemonCartItem key={item.id}>
                    <img src={item.pokemon.pokemon.image} alt={item.pokemon.name + ' image'} className="pokemonImage" />
                    <p className="pokemonText">
                      <span className="pokemonName">{item.pokemon.name}</span> - <strong>{item.pokemon.price}</strong>CR each
                    </p>
                    <div className="cartControls">
                      <span className="quantityTitle">Quantity: </span>
                      <RemoveFromCart cartItemId={item.id} CSSclass="cartButton">
                        <FontAwesomeIcon icon="minus" />
                      </RemoveFromCart>
                      <div className="cartItemQuantity">{item.quantity}</div>
                      <AddToCart pokemonOfferId={item.pokemon.id} disabledButton={loading} CSSclass="cartButton">
                        <FontAwesomeIcon icon="plus" />
                      </AddToCart>
                    </div>
                    <p className="cartItemTotal">Total: <strong>{item.pokemon.price * item.quantity}</strong>CR</p>
                  </SinglePokemonCartItem>
                ))}
              </ul>
              <p className="cartTotal">Total Price: {Intl.NumberFormat('de-DE').format(totalPrice)}CR</p>
              <Checkout buttonDisabled={!data || data.userCart.length <= 0} totalPrice={totalPrice} />
            </CartContainer>

          )
        }}
      </Query>
    </WidthContainer>
)

export default Cart

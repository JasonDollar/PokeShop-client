import React from 'react'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RemoveFromCart from './RemoveFromCart'
import AddToCart from './AddToCart'
import Checkout from './Checkout'
import ShowMyMoney from './ShowMyMoney'
import WidthContainer from './styles/WidthContainer'
import SinglePokemonInfo from './styles/SinglePokemonInfo'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { formatBigNumber } from '../utils'

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

const EmptyCart = styled.h3`
  font-size: 4rem;
  text-align: center;
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
  .overTheLimitError {
    text-align: center;
  }
`

const SinglePokemonCartItem = styled(SinglePokemonInfo)`
  margin-bottom: 1.5rem;
  .cartControls {
    display: flex;
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

const Cart = () => {
  const { data, loading, error } = useQuery(CART_ITEMS_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  return (
    <WidthContainer>
      <ShowMyMoney>
        {({ data: moneyData, loading: moneyLoading }) => {
  
          if (loading || moneyLoading) return <Loading />
          if (error) return <ErrorMessage message={error.message} />
      
          if (data.userCart.length <= 0) {
            return <EmptyCart>Your cart is empty!</EmptyCart>
          }
          let totalPrice = 0
          if (data && data.userCart) {
            totalPrice = data.userCart.reduce((acc, item) => acc + (item.pokemon.price * item.quantity), 0)
          }
          const userCredits = moneyData.userCredits.balance
          const userHasEnoughCredits = userCredits > totalPrice
          return (
            <CartContainer>
              <ul>
                {data && data.userCart.map(item => (
                  <SinglePokemonCartItem key={item.id}>
                    <img src={item.pokemon.pokemon.image} alt={item.pokemon.name + ' image'} className="pokemonImage" />
                    <p className="pokemonText">
                      <span className="pokemonName">{item.pokemon.name}</span> - <strong>{formatBigNumber(item.pokemon.price)}</strong>CR each
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
                    <p className="cartItemTotal">Total: <strong>{formatBigNumber(item.pokemon.price * item.quantity)}</strong>CR</p>
                  </SinglePokemonCartItem>
                ))}
              </ul>
              <p className="cartTotal">Total Price: {formatBigNumber(totalPrice)}CR</p>
              <Checkout buttonDisabled={!data || data.userCart.length <= 0 || !userHasEnoughCredits} totalPrice={totalPrice} />
              {!userHasEnoughCredits && <p className="overTheLimitError">You don&apos;t have enough credits! {formatBigNumber(totalPrice - userCredits)}CR over the limit.</p>}
            </CartContainer>
          )
        }}
      </ShowMyMoney>
    </WidthContainer>
  )
}


export default Cart

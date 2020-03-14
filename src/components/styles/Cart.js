import styled from 'styled-components'
import SinglePokemonInfo from './SinglePokemonInfo'

export const EmptyCart = styled.h3`
  font-size: 4rem;
  text-align: center;
`

export const CartContainer = styled.div`
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

export const SinglePokemonCartItem = styled(SinglePokemonInfo)`
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
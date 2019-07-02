import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { UserContext } from '../userContext'
import AddToCart from './AddToCart'
import WidthContainer from './styles/WidthContainer'
import Loading from './Loading'
import { formatBigNumber } from '../utils'

const DetailContainer = styled(WidthContainer)`
  /* margin: 1rem; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
  .heading {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 2.6rem;
    & .number {
      font-weight: 400;
    }
    & .pokeName {
      display: inline-block;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
  .pokeImage {
    width: 80%;
    height: auto;
    margin-right: 2.5rem;
    justify-self: end;
    transform: scale(1.35);
    @media (min-width: 576px) {
      
      width: 30%;
    }
  }
  .price {
    display: flex;
    flex-direction: column;
    & span {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    strong {
      font-size: 2.6rem;
    }
  }
  .type {
    margin: 1.5rem 0;
    grid-column: 1 /-1;
    font-size: 2rem;
    padding: 0 1rem;
    @media (min-width: 576px) {
      grid-column: 1 / 2;
      justify-self: end;
      margin-right: 2rem;
      margin: 1.5rem 0;
    }
  }
  .seller {
    margin: 1.5rem 0;
    grid-column: 1 /-1;
    font-size: 2rem;
    padding: 0 1rem;
    @media (min-width: 576px) {
      grid-column: 2 / 3;
      margin: 1.5rem 0;
    }
    & .sellerLink {
      text-decoration: none;
      color: black;
      &:hover,
      &:active {
        color: royalblue;
        /* text-decoration: underline; */
      }
    }
    & .curentUser {
      color: ${props => props.theme.colorLightGrey};
    }
  }
  .description {
    grid-column: 1 /-1;
    text-align: center;
    font-size: 2rem;
    font-style: italic;
  }
  .addToCart {
    display: block;
    grid-column: 1 /-1;
    margin: 0 auto;
    margin-top: 2.5rem;
    border: 1px solid ${props => props.theme.primaryRed};
    border-radius: 100px;
    background: ${props => props.theme.primaryRed};
    color: white;
    font-size: 2.2rem;
    padding: 1rem 2rem;
    cursor: pointer;
    width: ${props => (props.wide ? '100%' : 'auto')};
    &.loading {
      background: ${props => props.theme.secondaryRed};
    }
    &[disabled] {
      background: ${props => props.theme.secondaryRed};
      border: ${props => props.theme.secondaryRed};
    }
  }
`


const POKEMON_OFFER_QUERY = gql`
  query POKEMON_OFFER_QUERY($id: ID!) {
    pokemonOffer(id: $id) {
      id
      name
      price
      description
      pokemon {
        id
        image
        pokeType
      }
      seller {
        id
        name
      }
    }
  }
`

const OfferDetail = props => {
  const { userId } = useContext(UserContext)
  return (
    <Query query={POKEMON_OFFER_QUERY} variables={{ id: props.match.params.offerId }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />
        if (error) return <p>{error.message}</p>
        const types = data.pokemonOffer.pokemon.pokeType.map(item => item[0].toUpperCase() + item.substring(1, item.length))

        return (
          <DetailContainer>

              <h2 className="heading">
                <span className="number">#{data.pokemonOffer.pokemon.id} </span> 
                <span className="pokeName">{data.pokemonOffer.name}</span>
              </h2>

              <img className="pokeImage" src={data.pokemonOffer.pokemon.image} alt={data.pokemonOffer.name} />
              <p className="price"><span>Price: </span> <strong>{formatBigNumber(data.pokemonOffer.price)} CR</strong></p>
              
              <p className="type">Pokemon type: {types.join(', ')}</p>
              <p className="seller">
                <span>Seller: </span> 
                <Link to={`/user/${data.pokemonOffer.seller.id}`} className="sellerLink">
                  {data.pokemonOffer.seller.name}{data.pokemonOffer.seller.id === userId ? <span className="curentUser"> It's you!</span> : ''}
                </Link>
              </p>
              {
                data.pokemonOffer.description && (
                  <p className="description">{data.pokemonOffer.description}</p>
                )
              }
              {data.pokemonOffer.seller.id !== userId && (

                <AddToCart 
                  pokemonOfferId={data.pokemonOffer.id} 
                  disabledButton={data.pokemonOffer.seller.id === userId || !userId}
                  CSSclass="addToCart"
                >
                  Add to cart
                </AddToCart>
              )}
          </DetailContainer>
        )
      }}
    </Query>
  )
}

export default OfferDetail

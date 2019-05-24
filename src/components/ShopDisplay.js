import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import OfferListItem from './OfferListItem'
import {CURRENT_USER_QUERY} from './User'

export const POKEMON_OFFERS_QUERY = gql`
  query POKEMON_OFFERS_QUERY {
    pokemonOffers {
      id
      name
      price
      pokemon {
        id
        pokeId
        image
        url
      }
    }
  }
`

const ShopDisplay = () => {
  return (
    <Query query={POKEMON_OFFERS_QUERY} >
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <ul>
            {data.pokemonOffers.map(item => (
              <OfferListItem key={item.id} pokemonOffer={item}/>
            ))}
          </ul>
        )
      }}
    </Query>
  )
}

export default ShopDisplay

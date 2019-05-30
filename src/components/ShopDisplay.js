import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import OfferListItem from './OfferListItem'
import { CURRENT_USER_QUERY } from './User'
import GridList from './styles/GridList'
import WidthContainer from './styles/WidthContainer'

export const POKEMON_OFFERS_QUERY = gql`
  query POKEMON_OFFERS_QUERY {
    pokemonOffers {
      id
      name
      price
      pokemon {
        id
        image
        url
      }
    }
  }
`

const ShopDisplay = () => (
    <Query query={POKEMON_OFFERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <WidthContainer>
            <GridList>
              {data.pokemonOffers.map(item => (
                <OfferListItem key={item.id} pokemonOffer={item} />
              ))}
            </GridList>

          </WidthContainer>
        )
      }}
    </Query>
)

export default ShopDisplay

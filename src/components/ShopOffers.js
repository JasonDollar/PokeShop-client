import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import OfferListItem from './OfferListItem'
import GridList from './styles/GridList'
import Loading from './Loading'

export const POKEMON_OFFERS_QUERY = gql`
  query POKEMON_OFFERS_QUERY($skip: Int = 0, $limit: Int = 24, $minPrice: Int, $maxPrice: Int, $pokemonTypes: [String!]) {
    pokemonOffers(skip: $skip, limit: $limit, minPrice: $minPrice, maxPrice: $maxPrice, pokemonTypes: $pokemonTypes) {
      count
      offers {
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
  }
`

const ShopOffers = ({ 
  page,
  itemsPerPage,
  minPrice, 
  maxPrice,
  pokemonTypes, 
  setOffersCount,
}) => {
  const { data, loading, error } = useQuery(POKEMON_OFFERS_QUERY, {
    variables: { 
      skip: page * itemsPerPage - itemsPerPage, 
      limit: itemsPerPage,
      minPrice, 
      maxPrice,
      pokemonTypes,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>
  setOffersCount(data.pokemonOffers.count)
  return (
    <GridList>
      {data.pokemonOffers.offers && data.pokemonOffers.offers.map(item => (
        <OfferListItem key={item.id} pokemonOffer={item} />
      ))}
    </GridList>
  )
  
} 
export default ShopOffers

ShopOffers.propTypes = {
  page: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  minPrice: PropTypes.number.isRequired, 
  maxPrice: PropTypes.number.isRequired,
  pokemonTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setOffersCount: PropTypes.func.isRequired,
}

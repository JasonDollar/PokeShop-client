import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import qs from 'query-string'
import PropTypes from 'prop-types'
import OfferListItem from './OfferListItem'
import ErrorMessage from './ErrorMessage'
import GridList from './styles/GridList'
import WidthContainer from './styles/WidthContainer'
import Pagination from './Pagination'
import { itemsPerPage } from '../config'
import { FilterContext } from '../filterContext'
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

const ShopDisplay = ({ location }) => {
  const {
    minPrice, maxPrice, pokemonTypes,
  } = useContext(FilterContext)
  const { page = 1 } = qs.parse(location.search)
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
  if (error) return <ErrorMessage message={error.message} />

  const maxPage = Math.ceil(data.pokemonOffers.count / itemsPerPage)

  return (
    <WidthContainer>
      <Pagination maxPage={maxPage} page={parseInt(page)} />
      <GridList>
        {data.pokemonOffers.offers && data.pokemonOffers.offers.map(item => (
          <OfferListItem key={item.id} pokemonOffer={item} />
        ))}
      </GridList>

    </WidthContainer>
  ) 

}

export default ShopDisplay

ShopDisplay.propTypes = {
  location: PropTypes.object.isRequired,
}
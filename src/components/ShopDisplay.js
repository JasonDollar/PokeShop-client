import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import qs from 'query-string'
import OfferListItem from './OfferListItem'
import Filter from './Filter'
// import { CURRENT_USER_QUERY } from './User'
import GridList from './styles/GridList'
import WidthContainer from './styles/WidthContainer'
import Pagination from './Pagination'
import { itemsPerPage } from '../config'
import { FilterContext } from '../filterContext'


export const POKEMON_OFFERS_QUERY = gql`
  query POKEMON_OFFERS_QUERY($skip: Int = 0, $limit: Int = 24) {
    pokemonOffers(skip: $skip, limit: $limit) {
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

const ShopDisplay = (props) => {
  // console.log(props.location.search)

  const filter = useContext(FilterContext)
  // console.log(filter)
  const { page = 1 } = qs.parse(props.location.search)
  // console.log(page)
  // }
  return (
    <Query query={POKEMON_OFFERS_QUERY} variables={{ skip: page * itemsPerPage - itemsPerPage, limit: itemsPerPage }} fetchPolicy="cache-and-network">
      {({ data, loading, error }) => {
        if (loading) return <p />
        if (error) return <p>{error.message}</p>
        const maxPage = Math.ceil(data.pokemonOffers.count / itemsPerPage)
        return (
          <WidthContainer>
            {/* This button is here only temporary */}
            <button onClick={() => filter.toggleFilter(true)}>open filter</button>
            <Filter />
            <Pagination maxPage={maxPage} page={parseInt(page)} />
            <GridList>
              {data.pokemonOffers.offers && data.pokemonOffers.offers.map(item => (
                <OfferListItem key={item.id} pokemonOffer={item} />
              ))}
            </GridList>

          </WidthContainer>
        )
      }}
    </Query>
  )
}

export default ShopDisplay

import React, { useContext, useState } from 'react'
import qs from 'query-string'
import PropTypes from 'prop-types'

import ShopOffers from './ShopOffers'
import WidthContainer from './styles/WidthContainer'
import Pagination from './Pagination'
import { itemsPerPage } from '../config'
import { FilterContext } from '../filterContext'


const ShopDisplay = ({ location }) => {
  const {
    minPrice, maxPrice, pokemonTypes,
  } = useContext(FilterContext)
  const [offersCount, setOffersCount] = useState(1)
  const { page = 1 } = qs.parse(location.search)

  const maxPage = Math.ceil(offersCount / itemsPerPage)

  return (
    <WidthContainer>
      <Pagination maxPage={maxPage} page={parseInt(page)} />
      <ShopOffers
        page={page}
        itemsPerPage={itemsPerPage}
        minPrice={minPrice}
        maxPrice={maxPrice}
        pokemonTypes={pokemonTypes}
        setOffersCount={setOffersCount}
      />
    </WidthContainer>
  ) 
}

export default ShopDisplay

ShopDisplay.propTypes = {
  location: PropTypes.object.isRequired,
}
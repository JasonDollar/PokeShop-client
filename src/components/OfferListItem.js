import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const OfferListItem = ({pokemonOffer}) => {
  return (
    <Fragment>
      <Link to={`/offer/${pokemonOffer.id}`}>
        <img src={pokemonOffer.image} alt={pokemonOffer.name}/>
        <p>{pokemonOffer.name}</p>
        <p>{pokemonOffer.price}</p>
      </Link>
    </Fragment>
  )
}

export default OfferListItem

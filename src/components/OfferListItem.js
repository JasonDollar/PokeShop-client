import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ListItem from './styles/ListItem'

const OfferListItem = ({ pokemonOffer }) => (
  <ListItem>
    <Link to={`/offer/${pokemonOffer.id}`}>
      <img src={pokemonOffer.pokemon.image} alt={pokemonOffer.name} />
      <div className="text">
        <p className="name">{pokemonOffer.name}</p>
        <p className="price">{pokemonOffer.price}CR</p>
      </div>
    </Link>
  </ListItem>
)

export default OfferListItem

OfferListItem.propTypes = {
  pokemonOffer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pokemon: PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
    price: PropTypes.number.isRequired,

  }).isRequired,
}
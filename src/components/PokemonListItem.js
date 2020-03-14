import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PokemonListItem = ({ pokemon }) => (
  <>
    <Link to={`/pokemon/${pokemon.name}`}>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </Link>
  </>
)

export default PokemonListItem

PokemonListItem.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}
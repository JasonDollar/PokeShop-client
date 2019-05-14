import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

const PokemonListItem = ({pokemon}) => {
  return (
    <Fragment>
      <Link to={`/pokemon/${pokemon.name}`}>
        <img src={pokemon.image} alt={pokemon.name}/>
        <p>{pokemon.name}</p>
      </Link>
    </Fragment>
  )
}

export default PokemonListItem

import React from 'react'
import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import PokemonListItem from './PokemonListItem'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

const TYPE_POKEMONS = gql`
  query TYPE_POKEMONS($id: ID!) {
    pokeType(id: $id) {
      id
      name
      pokemon {
        id
        name
        image
      }
    }
  }
`

const TypeDetail = ({ match }) => {
  const { data, loading, error } = useQuery(TYPE_POKEMONS, {
    variables: { id: match.params.typeId },
  })
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

  return (
    <WidthContainer>
      <div>
        <h2>{data.pokeType.name}</h2>
        <GridList>
          {data.pokeType.pokemon.map(item => (
            <li key={item.id}>
              <PokemonListItem pokemon={item} />
            </li>
          ))}
        </GridList>
      </div>
    </WidthContainer>
  )
}


export default TypeDetail

TypeDetail.propTypes = {
  match: PropTypes.object.isRequired,
}
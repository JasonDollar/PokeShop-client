import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import PokemonListItem from './PokemonListItem'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import Loading from './Loading'

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

const TypeDetail = props => {
  const { data, loading, error } = useQuery(TYPE_POKEMONS, {
    variables: { id: props.match.params.typeId },
  })
  if (loading) return <WidthContainer><Loading /></WidthContainer>
  if (error) return <WidthContainer><p>Error</p></WidthContainer> 

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

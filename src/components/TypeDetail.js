import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import { Link } from 'react-router-dom'
import PokemonListItem from './PokemonListItem'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'

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

const TypeDetail = props => (
    <WidthContainer>
      <Query query={TYPE_POKEMONS} variables={{ id: props.match.params.typeId }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error</p>
          return (
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
          )
        }}
      </Query>
    </WidthContainer>
)

export default TypeDetail

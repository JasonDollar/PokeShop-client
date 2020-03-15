import React from 'react'
import { useQuery, gql } from '@apollo/client'
import PokemonListItem from './PokemonListItem'
import ErrorMessage from './ErrorMessage'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import Loading from './Loading'

const GET_POKEMONS = gql`
  query GET_POKEMONS($skip: Int!) {
    pokemons(skip: $skip) {
      id
      name
      url
      image
    }
  }
`

const PokemonList = () => {
  const {
    data, loading, error, fetchMore, 
  } = useQuery(GET_POKEMONS, {
    variables: { skip: 0 },
  })

  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  return (
    <WidthContainer>
      <GridList>
        {data.pokemons && data.pokemons.map(item => (
          <li key={item.id}>
            <PokemonListItem pokemon={item} />
          </li>
        ))}
      </GridList>
      <button
        type="button"
        onClick={() => {
          fetchMore({
            variables: {
              skip: data.pokemons.length,
            },
            updateQuery: (prev, { fetchMoreResult, ...rest }) => {
              if (!fetchMoreResult) return prev
              return {
                pokemons: [
                  ...prev.pokemons,
                  ...fetchMoreResult.pokemons,
                ],
              }
            },
          })
        }}
      >
        Fetch More
      </button>
    </WidthContainer>
  )
}


export default PokemonList

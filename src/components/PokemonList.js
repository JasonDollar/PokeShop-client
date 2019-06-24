import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import PokemonListItem from './PokemonListItem'
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

const PokemonList = () => (
    <Query query={GET_POKEMONS} variables={{ skip: 0 }}>
        {({
          data, error, loading, fetchMore,
        }) => {
          if (loading) return <Loading />
          if (error) return <p>{error.message}</p>
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
              >Fetch More
              </button>
            </WidthContainer>
          )
        }}
    </Query>
)

export default PokemonList

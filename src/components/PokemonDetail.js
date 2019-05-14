import React from 'react'
import {Link} from 'react-router-dom'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const SINGLE_POKEMON = gql`
  query SINGLE_POKEMON($id: ID!) {
    pokemon(id: $id) {
      id
      name
      image
      url
      pokeType {
        id
        name
      }
    }
  }
`

const PokemonDetail = (props) => {
  return (
    <div>
      <Query query={SINGLE_POKEMON} variables={{id: props.match.params.pokemonId}}>
        {({data, loading, error}) => {
          if (loading) return <p>Loading...</p>
          if (error) {
            console.log(error.graphQLErrors)
            return <p>Error...</p>
          }
          
          return (
            <div>
              <Link to="/">Home</Link>
              <h2>#{data.pokemon.id} {data.pokemon.name}</h2>
              <img src={data.pokemon.image} alt={data.pokemon.name} style={{width: '20%', height: '20%'}}/>
              <ul>
                {data.pokemon.pokeType.map(item => (
                  <li key={item.id + 'type'}>
                    <Link to={`/type/${item.name}`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </Query>
    </div>
  )
}

export default PokemonDetail

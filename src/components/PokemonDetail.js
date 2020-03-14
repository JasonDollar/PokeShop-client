import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import WidthContainer from './styles/WidthContainer'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

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

const PokemonDetail = props => {
  const { data, loading, error } = useQuery(SINGLE_POKEMON)

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />
          
  return (
    <WidthContainer>
      <div>
        <Link to="/">Home</Link>
        <h2>#{data.pokemon.id} {data.pokemon.name}</h2>
        <img src={data.pokemon.image} alt={data.pokemon.name} style={{ width: '20%', height: '20%' }} />
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
    </WidthContainer>
  )
}


export default PokemonDetail

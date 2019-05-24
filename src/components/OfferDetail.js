import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {UserContext} from '../userContext'
import AddToCart from './AddToCart'


const POKEMON_OFFER_QUERY = gql`
  query POKEMON_OFFER_QUERY($id: ID!) {
    pokemonOffer(id: $id) {
      id
      name
      price
      pokemon {
        image
        id
        pokeId
      }
      seller {
        id
        name
      }
    }
  }
`

const OfferDetail = (props) => {
  const {userId} = useContext(UserContext)
  console.log(userId)
  return (
    <Query query={POKEMON_OFFER_QUERY} variables={{id: props.match.params.offerId}}>
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <div>
            <Link to="/">Home</Link>
            <h2>#{data.pokemonOffer.pokemon.pokeId} {data.pokemonOffer.name}</h2>
            <img src={data.pokemonOffer.pokemon.image} alt={data.pokemonOffer.name} style={{width: '20%', height: '20%'}}/>
            <p>Price: {data.pokemonOffer.price}</p>
            <p>
              Seller: 
              <Link to={`/user/${data.pokemonOffer.seller.id}`}>
                {data.pokemonOffer.seller.name}{data.pokemonOffer.seller.id === userId ? 'You' : ''}
              </Link>
            </p>
            <AddToCart 
              pokemonOfferId={data.pokemonOffer.id} 
              disabledButton={data.pokemonOffer.seller.id === userId}
            >
              Add to cart
            </AddToCart>
          </div>
        )
      }}
    </Query>
  )
}

export default OfferDetail

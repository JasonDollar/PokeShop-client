import React from 'react'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

const POKEMON_OFFER_QUERY = gql`
  query POKEMON_OFFER_QUERY($id: ID!) {
    pokemonOffer(id: $id) {
      id
      name
      image
      price
      pokemonId
      seller {
        id
        name
      }
    }
  }
`

const OfferDetail = (props) => {
  return (
    <Query query={POKEMON_OFFER_QUERY} variables={{id: props.match.params.offerId}}>
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <div>
            <Link to="/">Home</Link>
            <h2>#{data.pokemonOffer.pokemonId} {data.pokemonOffer.name}</h2>
            <img src={data.pokemonOffer.image} alt={data.pokemonOffer.name} style={{width: '20%', height: '20%'}}/>
            <p>Price: {data.pokemonOffer.price}</p>
            <p>
              Seller: 
              <Link to={`/user/${data.pokemonOffer.seller.id}`}>
                {data.pokemonOffer.seller.name}
              </Link>
            </p>
          </div>
        )
      }}
    </Query>
  )
}

export default OfferDetail

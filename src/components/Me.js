import React from 'react'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import OfferListItem from './OfferListItem'

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      offers {
        id
        name
        price
        pokemon {
          id
          image
        }
      }
    }
  }
`

const Me = (props) => {
  return (
    <Query query={ME_QUERY}>
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <div>
            <h2>{data.me.name}</h2>
            <ul>
              {data.me.offers.map(item => (
                <OfferListItem key={item.id} pokemonOffer={item}/>
              ))}
            </ul>
          </div>
        )
      }}
    </Query>
  )
}

export default Me

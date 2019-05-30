import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import OfferListItem from './OfferListItem'
import WidthContainer from './styles/WidthContainer'

const USER_DETAIL_QUERY = gql`
  query USER_DETAIL_QUERY($userId: ID!) {
    user(userId: $userId) {
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

const UserDetail = props => (
    <Query query={USER_DETAIL_QUERY} variables={{ userId: props.match.params.userId }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <WidthContainer>
            <h2>{data.user.name}</h2>
            <ul>
              {data.user.offers.map(item => (
                <OfferListItem key={item.id} pokemonOffer={item} />
              ))}
            </ul>
          </WidthContainer>
        )
      }}
    </Query>
)

export default UserDetail

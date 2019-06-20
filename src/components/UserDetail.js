import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import OfferListItem from './OfferListItem'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import UserInfo from './styles/UserInfo'
import { UserContext } from '../userContext'

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

const UserDetail = props => {
  const { userId } = useContext(UserContext)
  if (userId === props.match.params.userId) {
    return <Redirect to="/me" />
  }
  return (
    <Query query={USER_DETAIL_QUERY} variables={{ userId: props.match.params.userId }}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>

        return (
          <WidthContainer>
            <UserInfo>
              <h2 className="user">{data.user.name}</h2>
              <h3 className="email">{data.user.email}</h3>
              <p className="selling">{data.user.name} is selling:</p>
              <GridList>
                {data.user.offers.map(item => (
                  <OfferListItem key={item.id} pokemonOffer={item} />
                ))}
              </GridList>
            </UserInfo>
          </WidthContainer>
        )
      }}
    </Query>
  )
}

export default UserDetail

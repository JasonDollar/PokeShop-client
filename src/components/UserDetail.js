import React, { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import OfferListItem from './OfferListItem'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import UserInfo from './styles/UserInfo'
import { UserContext } from '../userContext'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'


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

const UserDetail = ({ match }) => {
  const { userId } = useContext(UserContext)


  const { data, loading, error } = useQuery(USER_DETAIL_QUERY, {
    variables: { userId: match.params.userId },
  })

  if (userId === match.params.userId) {
    return <Redirect to="/me" />
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} />

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
}

export default UserDetail

UserDetail.propTypes = {
  match: PropTypes.object.isRequired,
}
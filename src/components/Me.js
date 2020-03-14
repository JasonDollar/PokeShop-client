import React from 'react'
import { useQuery, gql } from '@apollo/client'
import OfferListItem from './OfferListItem'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import UserInfo from './styles/UserInfo'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { formatBigNumber } from '../utils'

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
      email 
      role
      offers {
        id
        name
        price
        pokemon {
          id
          image
        }
      }
      wallet {
        balance
      }
    }
  }
`

const Me = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error.message} />
  if (!data.me) return <ErrorMessage message="We could not fetch your information. Check back later" />
  return (
    <WidthContainer>
      <UserInfo>
        <h2 className="user">{data.me.name}</h2>
        <h3 className="email">{data.me.email}</h3>
        {/* <p>{data.me.role}</p> */}
        <p className="balance">You have {formatBigNumber(data.me.wallet.balance)} CR in your wallet</p>
        <p className="selling">You are selling:</p>
        <GridList>
          {data.me.offers.map(item => (
            <OfferListItem key={item.id} pokemonOffer={item} />
          ))}
        </GridList>
      </UserInfo>
    </WidthContainer>
  )
}

export default Me

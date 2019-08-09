import React from 'react'
import OfferListItem from './OfferListItem'
import User from './User'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import UserInfo from './styles/UserInfo'
import Loading from './Loading'
import { formatBigNumber } from '../utils'

const Me = () => (
  <WidthContainer>

    <User>
      {({ data, loading, error }) => {
        if (loading) return <Loading />
        if (error) return <p>{error.message}</p>
        if (!data.me) return <p>We could not fetch your information. Check back later</p>
        return (
          <UserInfo>
            <h2 className="user">{data.me.name}</h2>
            <h3 className="email">{data.me.email}</h3>
            <p>{data.me.role}</p>
            <p className="balance">You have {formatBigNumber(data.me.wallet.balance)} CR in your wallet</p>
            <p className="selling">You are selling:</p>
            <GridList>
              {data.me.offers.map(item => (
                <OfferListItem key={item.id} pokemonOffer={item} />
              ))}
            </GridList>
          </UserInfo>
        )
      }}
    </User>
  </WidthContainer>
)

export default Me

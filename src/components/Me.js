import React from 'react'
import OfferListItem from './OfferListItem'
import User from './User'
import WidthContainer from './styles/WidthContainer'
import GridList from './styles/GridList'
import UserInfo from './styles/UserInfo'

const Me = props => (
    <WidthContainer>

    <User>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>
        console.log(data)
        return (
          <UserInfo>
            <h2 className="user">{data.me.name}</h2>
            <h3 className="email">{data.me.email}</h3>
            <p className="balance">You have {data.me.wallet.balance} CR in your wallet</p>
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

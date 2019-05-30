import React from 'react'

import OfferListItem from './OfferListItem'
import User from './User'
import OrderList from './OrderList'
import WidthContainer from './styles/WidthContainer'

const Me = props => (
    <WidthContainer>

    <User>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>
        console.log(data)
        return (
          <div>
            <h2>{data.me.name}</h2>
            <h3>{data.me.email}</h3>
            <p>Balance: {data.me.wallet.balance}</p>
            <ul>
              Selling:
              {data.me.offers.map(item => (
                <OfferListItem key={item.id} pokemonOffer={item} />
              ))}
            </ul>
            Orders: 
            <OrderList />
          </div>
        )
      }}
    </User>
    </WidthContainer>

)

export default Me

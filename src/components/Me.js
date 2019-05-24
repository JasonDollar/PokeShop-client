import React from 'react'

import OfferListItem from './OfferListItem'
import User from './User'


const Me = (props) => {
  return (
    <User>
      {({data, loading, error}) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>{error.message}</p>
        console.log(data)
        return (
          <div>
            <h2>{data.me.name}</h2>
            <p>Balance: {data.me.wallet.balance}</p>
            <ul>
              {data.me.offers.map(item => (
                <OfferListItem key={item.id} pokemonOffer={item}/>
              ))}
            </ul>
          </div>
        )
      }}
    </User>

  )
}

export default Me

import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import User from './User'

export const USER_CREDITS_QUERY = gql`
  query USER_CREDITS_QUERY {
    userCredits {
      balance
    }
  }
`

const ShowMyMoney = props => {
  return (
    <User>
      {({data, loading, error}) => {
        if (error || loading) return <p>lol</p>
        console.log(data.me)
        return (
          <p>{data.me.wallet.balance}</p>
        )
      }}
    </User>
  )
}

export default ShowMyMoney
import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import User from './User'

export const USER_CREDITS_QUERY = gql`
  query USER_CREDITS_QUERY {
    userCredits {
      balance
    }
  }
`

const ShowMyMoney = props => (
    <Query query={USER_CREDITS_QUERY}>
      {payload => props.children(payload)}
    </Query>
)

export default ShowMyMoney
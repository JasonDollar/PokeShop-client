import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
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
      wallet {
        balance
      }
    }
  }
`

const User = (props) => {
  return (
    <Query query={CURRENT_USER_QUERY} fetchPolicy="cache-and-network">
      {payload => props.children(payload)}
    </Query>
  )
}

export default User

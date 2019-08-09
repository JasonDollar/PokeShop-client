import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'


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

const User = props => {
  const payload = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  })

  return props.children(payload)
}


export default User

User.propTypes = {
  children: PropTypes.any.isRequired,
}
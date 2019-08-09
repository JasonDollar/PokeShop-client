import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'


export const USER_CREDITS_QUERY = gql`
  query USER_CREDITS_QUERY {
    userCredits {
      balance
    }
  }
`

const ShowMyMoney = props => {
  const payload = useQuery(USER_CREDITS_QUERY)

  return props.children(payload)
}


export default ShowMyMoney

ShowMyMoney.propTypes = {
  children: PropTypes.func.isRequired,
}
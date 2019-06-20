import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CART_ITEMS_QUERY } from './Cart'

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`

const RemoveFromCart = ({ cartItemId, children, CSSclass }) => (
    <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id: cartItemId }} refetchQueries={[{ query: CART_ITEMS_QUERY }]}>
      {(removeFromCart, { data, loading, error }) => {
        if (data) {
          // console.log(data)
        }
        return (
          <button type="button" onClick={removeFromCart} disabled={loading} className={CSSclass}>
            {children}
          </button>
        )
      }}
    </Mutation>
)

export default RemoveFromCart
RemoveFromCart.propTypes = {
  cartItemId: PropTypes.string.isRequired,
  CSSclass: PropTypes.string,
  children: PropTypes.element,
}

RemoveFromCart.defaultProps = {
  children: 'X',
  CSSclass: '',
}
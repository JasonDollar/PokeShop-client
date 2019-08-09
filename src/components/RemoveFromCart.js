import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { CART_ITEMS_QUERY } from './Cart'

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`

const RemoveFromCart = ({ cartItemId, children, CSSclass }) => {
  const [removeFromCart, { data, loading, error }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id: cartItemId },
    refetchQueries: [{ query: CART_ITEMS_QUERY }],
  })

  return (
    <button type="button" onClick={removeFromCart} disabled={loading} className={CSSclass}>
      {children}
    </button>
  )
}

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
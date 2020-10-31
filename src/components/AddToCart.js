import React from 'react'
import { useMutation, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import { CART_ITEMS_QUERY } from './Cart'

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
      pokemon {
        id
        name
      }
    }
  }
`

const AddToCart = ({
  pokemonOfferId, children, disabledButton, CSSclass, 
}) => {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id: pokemonOfferId },
    refetchQueries: [{ query: CART_ITEMS_QUERY }],
  })
  if (error) console.log(error)
  return (
    <button 
      type="button"
      className={`${CSSclass} ${loading && 'loading'}`}
      onClick={() => (addToCart()).catch(lol => console.log(lol))}
      disabled={loading || disabledButton}
    >
      {children}
    </button>
  )
}

export default AddToCart

AddToCart.propTypes = {
  pokemonOfferId: PropTypes.string.isRequired,
  children: PropTypes.any,
  disabledButton: PropTypes.bool.isRequired,
  CSSclass: PropTypes.string,
}

AddToCart.defaultProps = {
  children: 'Add to Cart',
  CSSclass: '',
}
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

import { CART_ITEMS_QUERY } from './Cart'

interface Pokemon {
  id: number
  name: number
  url?: string
  image?:string
  type?: string[]
}

interface NewCartItem {
  id: string,
  quantity: number,
  pokemon: Pokemon
}

interface AddToCartProps {
  pokemonOfferId: string
  children: any
  disabledButton: boolean
  CSSclass: string
}

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

const AddToCart: React.FC<AddToCartProps> = ({
  pokemonOfferId, children, disabledButton, CSSclass, 
}): JSX.Element => {
  const [addToCart, { loading }] = useMutation<
    {addToCart: NewCartItem},
    {id: string}
  >(ADD_TO_CART_MUTATION, {
    variables: { id: pokemonOfferId },
    refetchQueries: [{ query: CART_ITEMS_QUERY }],
  })

  const onButtonClick = (): void => {
    addToCart()
  }

  return (
    <button 
      type="button"
      className={`${CSSclass} ${loading && 'loading'}`}
      onClick={onButtonClick}
      disabled={loading || disabledButton}
    >
      {children}
    </button>
  )
}

export default AddToCart

// AddToCart.propTypes = {
//   pokemonOfferId: PropTypes.string.isRequired,
//   children: PropTypes.any,
//   disabledButton: PropTypes.bool.isRequired,
//   CSSclass: PropTypes.string,
// }

// AddToCart.defaultProps = {
//   children: 'Add to Cart',
//   CSSclass: '',
// }
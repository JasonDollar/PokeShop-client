import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import { UserContext } from '../userContext'
import AddToCart from './AddToCart'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { formatBigNumber } from '../utils'
import DetailContainer from './styles/OfferDetail'

const POKEMON_OFFER_QUERY = gql`
  query POKEMON_OFFER_QUERY($id: ID!) {
    pokemonOffer(id: $id) {
      id
      name
      price
      description
      pokemon {
        id
        image
        pokeType
      }
      seller {
        id
        name
      }
    }
  }
`

const OfferDetail = ({ match }) => {
  const { userId } = useContext(UserContext)
  const { data, loading, error } = useQuery(POKEMON_OFFER_QUERY, {
    variables: { id: match.params.offerId },
  })
  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  const types = data.pokemonOffer.pokemon.pokeType
    .map(item => item[0].toUpperCase() + item.substring(1, item.length))

  return (
    <DetailContainer>
      <h2 className="heading">
        <span className="number">#{data.pokemonOffer.pokemon.id} </span> 
        <span className="pokeName">{data.pokemonOffer.name}</span>
      </h2>

      <img className="pokeImage" src={data.pokemonOffer.pokemon.image} alt={data.pokemonOffer.name} />
      <p className="price"><span>Price: </span> <strong>{formatBigNumber(data.pokemonOffer.price)} CR</strong></p>
      
      <p className="type">Pokemon type: {types.join(', ')}</p>
      <p className="seller">
        <span>Seller: </span> 
        <Link to={`/user/${data.pokemonOffer.seller.id}`} className="sellerLink">
          {data.pokemonOffer.seller.name}{data.pokemonOffer.seller.id === userId ? <span className="curentUser"> It's you!</span> : ''}
        </Link>
      </p>
      {
        data.pokemonOffer.description && (
          <p className="description">{data.pokemonOffer.description}</p>
        )
      }
      {data.pokemonOffer.seller.id !== userId && (

        <AddToCart 
          pokemonOfferId={data.pokemonOffer.id} 
          disabledButton={data.pokemonOffer.seller.id === userId || !userId}
          CSSclass="addToCart"
        >
          Add to cart
        </AddToCart>
      )}
    </DetailContainer>
  )
}

export default OfferDetail

OfferDetail.propTypes = {
  match: PropTypes.object.isRequired,
}
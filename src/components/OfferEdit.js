import React, { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { UserContext } from '../userContext'

import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { POKEMON_OFFER_QUERY } from './OfferDetail'
import DetailContainer from './styles/OfferEdit'
import ActionButton from './styles/ActionButton'

const EDIT_POKEMON_OFFER_MUTATION = gql`
  mutation EDIT_POKEMON_OFFER_MUTATION($offerId: String!, $price: Int, $description: String) {
    editPokemonOffer(data: {offerId: $offerId, price: $price, description: $description}) {
      id
      price
      description
    }
  }
`

const OfferEdit = () => {
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const { offerId } = useParams()
  const history = useHistory()
  const { userId } = useContext(UserContext)
  
  const { data, loading, error } = useQuery(POKEMON_OFFER_QUERY, {
    variables: { id: offerId },
  })

  const [editOffer, { loading: loadingMutation, error: errorMutation }] = useMutation(EDIT_POKEMON_OFFER_MUTATION, {
    variables: { offerId, price, description },
    update: (cache, { data: { editPokemonOffer } }) => {
      const { pokemonOffer } = cache.readQuery({ query: POKEMON_OFFER_QUERY, variables: { id: offerId } })
      cache.writeQuery({
        query: POKEMON_OFFER_QUERY,
        variables: { id: offerId },
        data: {
          ...pokemonOffer,
          price: editPokemonOffer.price,
          description: editPokemonOffer.description,
        },
      })
    },
  })

  useEffect(() => {
    if (data) {
      if (data.pokemonOffer.seller.id !== userId) {
        history.push(`/offer/${offerId}`)
      }
      setPrice(data.pokemonOffer.price)
      setDescription(data.pokemonOffer.description)
      console.log(data)
    }
  }, [data])

  const handleEditMutation = async mutation => {
    try {
      await mutation()
      if (!errorMutation) {
        history.push(`/offer/${offerId}`)
      }
    } catch {
      console.error('Something went wrong')
    }

  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <DetailContainer>
      <h2 className="heading">
        <span className="number">#{data.pokemonOffer.pokemon.id} </span> 
        <span className="pokeName">{data.pokemonOffer.name}</span>
      </h2>

      <img className="pokeImage" src={data.pokemonOffer.pokemon.image} alt={data.pokemonOffer.name} />
      <div className="input-group">
        <label htmlFor="price">Edit price</label>
        <input type="number" id="price" value={price} onChange={e => setPrice(Number(e.target.value))} />
      </div>
      <div className="input-group">
        <label htmlFor="description">Edit description</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <ActionButton disabled={loadingMutation} onClick={() => handleEditMutation(editOffer)}>
        Confirm changes
      </ActionButton>
      {errorMutation && <ErrorMessage error={errorMutation} inline />}
    </DetailContainer>
  )
}

export default OfferEdit

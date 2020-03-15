import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'
import { UserContext } from '../userContext'

import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import { POKEMON_OFFER_QUERY } from './OfferDetail'
import DetailContainer from './styles/OfferEdit'
import ActionButton from './styles/ActionButton'

const OfferEdit = () => {
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const { offerId } = useParams()
  const history = useHistory()
  const { userId } = useContext(UserContext)
  
  const { data, loading, error } = useQuery(POKEMON_OFFER_QUERY, {
    variables: { id: offerId },
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
        <textarea type="number" id="description" value={description} onChange={e => setDescription(Number(e.target.value))} />
      </div>
      {/* TODO connect button to mutation */}
      <ActionButton disabled={true}>
        Confirm changes
      </ActionButton>
    </DetailContainer>
  )
}

export default OfferEdit

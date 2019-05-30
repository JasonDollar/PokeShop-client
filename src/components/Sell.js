import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { POKEMON_OFFERS_QUERY } from './ShopDisplay'
import AuthForm from './styles/AuthForm'

const SELL_POKEMON_MUTATION = gql`
  mutation SELL_POKEMON_MUTATION($name: String!, $price: Int!) {
    sellPokemon(data: {name: $name, price: $price}) {
      id
      name
      price
      pokemon {
        id
        name
      }
      seller {
        id
        name
      }
    }
  }
`

const Sell = props => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)


  return (
    <Mutation mutation={SELL_POKEMON_MUTATION} variables={{ name, price: parseInt(price) }} refetchQueries={[{ query: POKEMON_OFFERS_QUERY }]}>
      {(sellPokemon, { 
        data, loading, error, ...rest
      }) => (
          <AuthForm>
            <form
              onSubmit={async e => {
                e.preventDefault()

                const res = await sellPokemon()
                props.history.push(`/offer/${res.data.sellPokemon.id}`)
              }}
              className="form"
            >

              <h1 className="form__name">Sell</h1>

              <div className="inputGroup">
                <label htmlFor="name">Name:
                  <input type="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                </label>
              </div>

              <div className="inputGroup">
                <label htmlFor="price">Price:
                  <input type="number" id="price" max={999999} value={price} onChange={e => setPrice(e.target.value)} />
                </label>
              </div>
              {error && <span className="errorMessage">{error.message}</span> }

              <button type="submit" className="form__button" disabled={loading}>Sell</button>
            </form>
          </AuthForm>
      )}
    </Mutation>
  )
}

export default Sell

import React, { useState } from 'react'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
import { useMutation, ApolloConsumer } from '@apollo/react-hooks'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import { POKEMON_OFFERS_QUERY } from './ShopDisplay'
import AuthForm from './styles/AuthForm'
import { DropDown, DropDownItem } from './styles/Dropdown'
import ActionButton from './styles/ActionButton'

const SELL_POKEMON_MUTATION = gql`
  mutation SELL_POKEMON_MUTATION($name: String!, $price: Int!, $description: String) {
    sellPokemon(data: {name: $name, price: $price, description: $description}) {
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

const SEARCH_POKEMON_NAME = gql`
  query SEARCH_POKEMON_NAME($name: String) {
    searchPokeName(name: $name) 
  }
`

const Sell = ({ history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [pokemonNames, setPokemonNames] = useState([])

  const onChange = debounce(async (value, client) => {
    const res = await client.query({
      query: SEARCH_POKEMON_NAME,
      variables: { name: value },
    })
    
    setPokemonNames(res.data.searchPokeName)
  }, 350)

  const [sellPokemon, { loading, error }] = useMutation(SELL_POKEMON_MUTATION, {
    variables: { name: name.toLowerCase(), price: parseInt(price), description },
    refetchQueries: [{ query: POKEMON_OFFERS_QUERY }],
  })

  return (
    <AuthForm>
      <form
        onSubmit={async e => {
          e.preventDefault()

          const res = await sellPokemon()
          history.push(`/offer/${res.data.sellPokemon.id}`)
        }}
        className="form"
      >

        <h1 className="form__name">Sell</h1>

        
          <Downshift
            onChange={selection => setName(selection)}
            itemToString={item => (item || '')}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
            }) => (
              <div>
                <ApolloConsumer>
                  {client => (
                    <div className="inputGroup">
                      <label {...getLabelProps()}>Pokemon:</label>
                      <input
                        {...getInputProps({
                          type: 'search',
                          onChange: e => {
                            const { value } = e.target
                            setName(value)
                            onChange(value, client)
                          },
                          value: name,
                        })}
                      />

                    </div>
                  )}
                </ApolloConsumer>
                <DropDown {...getMenuProps()} isOpen={isOpen || pokemonNames.length > 0}>
                  {isOpen
                    ? pokemonNames
                      .map((item, index) => (
                          <DropDownItem
                            {...getItemProps({
                              key: item,
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                              },
                            })}
                          >
                            {item}
                          </DropDownItem> 
                      ))
                    : null}
                </DropDown>
              </div>
            )}
          </Downshift>

        <div className="inputGroup">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" max={999999} value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description:</label>
          <textarea name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        {error && <span className="errorMessage">{error.message}</span> }

        <ActionButton type="submit" className="form_button_NOT" disabled={loading} wide>Sell</ActionButton>
      </form>
    </AuthForm>
  )
}

export default Sell

Sell.propTypes = {
  history: PropTypes.object.isRequired,
}
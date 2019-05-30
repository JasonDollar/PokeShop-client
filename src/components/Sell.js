import React, { useState, Fragment } from 'react'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'
import debounce from 'lodash.debounce'
// import Autocomplete from 'react-toolbox/lib/autocomplete'
import Downshift from 'downshift'
import { POKEMON_OFFERS_QUERY } from './ShopDisplay'
import AuthForm from './styles/AuthForm'
import { DropDown, DropDownItem, SearchStyles } from './styles/Dropdown'

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

const SEARCH_POKEMON_NAME = gql`
  query SEARCH_POKEMON_NAME($name: String) {
    searchPokeName(name: $name) 
  }
`

const Sell = props => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [pokemonNames, setPokemonNames] = useState([])

  const onChange = debounce(async (value, client) => {
    console.log(value)
    // if (name === '') {
    //   setPokemonNames([])
    //   return
    // }
    // setName(value)

    const res = await client.query({
      query: SEARCH_POKEMON_NAME,
      variables: { name: value },
    })
    
    setPokemonNames(res.data.searchPokeName)
  }, 350)

  return (
    <Mutation mutation={SELL_POKEMON_MUTATION} variables={{ name: name.toLowerCase(), price: parseInt(price) }} refetchQueries={[{ query: POKEMON_OFFERS_QUERY }]}>
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
              {error && <span className="errorMessage">{error.message}</span> }

              <button type="submit" className="form__button" disabled={loading}>Sell</button>
            </form>
          </AuthForm>
      )}
    </Mutation>
  )
}

export default Sell

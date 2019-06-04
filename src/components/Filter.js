import React, { useState, useContext } from 'react'
import Downshift from 'downshift'
import styled from 'styled-components'
import { FilterContext } from '../filterContext'
import { pokeTypes } from '../config'
import { DropDown, DropDownItem, SearchStyles } from './styles/Dropdown'

const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30rem;
  background: orangered;
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  /* width: 100px; */
  /* height: 200px; */
`

const PokeTypeElement = styled.span`
  background: white;
  padding: .3rem 1rem;
  border-radius: 10rem;
  margin: .5rem 0;
  margin-right: 1rem;
`

const PokeTypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Filter = () => {
  const {
    isFilterOpen, toggleFilter, minPrice, setMinPrice, maxPrice, setMaxPrice, setPokemonTypes, pokemonTypes,
  } = useContext(FilterContext)
  const [filterMinPrice, setFilterMinPrice] = useState(minPrice)
  const [filterMaxPrice, setFilterMaxPrice] = useState(maxPrice)
  const [typeValue, setTypeValue] = useState('')
  const [chosenTypes, setChosenTypes] = useState(pokemonTypes)

  const applyFilter = (e) => {
    e.preventDefault()
    setMinPrice(filterMinPrice)
    setMaxPrice(filterMaxPrice)
    setPokemonTypes(chosenTypes)
  }

  const removeFromChosenTypes = type => {
    const newChosenTypes = chosenTypes.filter(item => item !== type)
    setChosenTypes(newChosenTypes)
  }
  return (
    <Container isOpen={isFilterOpen}>
      <button onClick={() => toggleFilter(false)}>&times;</button>
      <form onSubmit={applyFilter}>

        Set price:
        <div>
          <label htmlFor="minPrice">Min: </label>
          <input type="number" id="minPrice" value={filterMinPrice} onChange={e => setFilterMinPrice(parseInt(e.target.value))} />
        </div>
        <div>
          <label htmlFor="maxPrice">Max: </label>
          <input type="number" id="maxPrice" value={filterMaxPrice} onChange={e => setFilterMaxPrice(parseInt(e.target.value))} />
        </div>
        <PokeTypesContainer>
          {chosenTypes.length > 0 && chosenTypes.map(item => (
            <PokeTypeElement 
              key={item}
            >
              {item}
              <button type="button" onClick={() => removeFromChosenTypes(item)}>&times;</button>
            </PokeTypeElement>
          )) }

        </PokeTypesContainer>
        <Downshift
          onChange={selection => {
            if (selection === '') return
            const isAlreadyChosen = chosenTypes.includes(selection)
            if (isAlreadyChosen) alert(`You have already chosen ${selection} type`)
            setChosenTypes([...chosenTypes, selection])
            setTypeValue('')
          }}
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
              <label {...getLabelProps({
                htmlFor: 'pokeTypeDropdown',
              })}
              >Choose pokemon types:
              </label>
              <input {...getInputProps({
                id: 'pokeTypeDropdown',
                value: typeValue,
                onChange: e => setTypeValue(e.target.value),
              })}
              />
              <DropDown {...getMenuProps()} isOpen={isOpen || typeValue.length > 0}>
                {isOpen
                  ? pokeTypes
                    .filter(item => !inputValue || item.includes(typeValue))
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
        <button>Filter</button>
      </form>
    </Container>
  )
}

export default Filter

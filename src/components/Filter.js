import React, { useState, useContext } from 'react'
import Downshift from 'downshift'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FilterContext } from '../filterContext'
import { pokeTypes } from '../config'
import { DropDown, DropDownItem } from './styles/Dropdown'
import NavButton from './styles/NavButton'
import {
  Container, PokeTypeElement, PokeTypesContainer, Form, 
} from './styles/Filter'

const Filter = () => {
  const {
    isFilterOpen, toggleFilter, minPrice, setMinPrice, maxPrice, setMaxPrice, setPokemonTypes, pokemonTypes,
  } = useContext(FilterContext)
  const [filterMinPrice, setFilterMinPrice] = useState(minPrice)
  const [filterMaxPrice, setFilterMaxPrice] = useState(maxPrice)
  const [typeValue, setTypeValue] = useState('')
  const [chosenTypes, setChosenTypes] = useState(pokemonTypes)
  const [minTouched, setMinTouched] = useState(false)
  const [maxTouched, setMaxTouched] = useState(false)

  const applyFilter = (e) => {
    e.preventDefault()
    setMinPrice(filterMinPrice)
    setMaxPrice(filterMaxPrice)
    setPokemonTypes(chosenTypes)
    toggleFilter(false)
  }


  const removeFromChosenTypes = type => {
    const newChosenTypes = chosenTypes.filter(item => item !== type)
    setChosenTypes(newChosenTypes)
  }
  return (
    <Container isOpen={isFilterOpen} aria-expanded={isFilterOpen}>
      <NavButton type="button" onClick={() => toggleFilter(false)} wide>
        <FontAwesomeIcon icon="times" />
      </NavButton>
      <Form onSubmit={applyFilter}>

        <h3 className="heading-3">Set price:</h3>
        <div className="inputGroupPrice">
          <label htmlFor="minPrice">Min: </label>
          <input
            className={minTouched ? 'touched' : ''}
            type="number"
            id="minPrice"
            value={filterMinPrice}
            onChange={e => {
              setMinTouched(true)
              setFilterMinPrice(parseInt(e.target.value))
            }}
          />
        </div>
        <div className="inputGroupPrice">
          <label htmlFor="maxPrice">Max: </label>
          <input
            className={maxTouched ? 'touched' : ''}
            type="number"
            id="maxPrice"
            value={filterMaxPrice}
            onChange={e => {
              setMaxTouched(true)
              setFilterMaxPrice(parseInt(e.target.value))
            }}
          />
        </div>
        <PokeTypesContainer>
          {chosenTypes.length > 0 && chosenTypes.map(item => (
            <PokeTypeElement 
              key={item}
            >
              {item}
              <FontAwesomeIcon className="icon" icon="times" onClick={() => removeFromChosenTypes(item)} />
            </PokeTypeElement>
          )) }

        </PokeTypesContainer>
        <Downshift
          onChange={selection => {
            if (selection === '') return
            const isAlreadyChosen = chosenTypes.includes(selection)
            if (isAlreadyChosen) {
              alert(`You have already chosen ${selection} type`)
              setTypeValue('')
              return
            }
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
              >
                <h3 className="heading-3">Choose pokemon types:</h3>
              </label>
              <input {...getInputProps({
                id: 'pokeTypeDropdown',
                className: 'inputWide',
                value: typeValue,
                onChange: e => setTypeValue(e.target.value.toLowerCase()),
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
        <button type="submit" className="filterButton">Filter</button>
      </Form>
    </Container>
  )
}

export default Filter

import React, { useState, useContext } from 'react'
import Downshift from 'downshift'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FilterContext } from '../filterContext'
import { pokeTypes } from '../config'
import { DropDown, DropDownItem } from './styles/Dropdown'
import NavButton from './styles/NavButton'

const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  background: ${props => props.theme.primaryRed};
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform .3s;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 576px) {
    width: 38rem;
  }
`

const PokeTypeElement = styled.span`
  background: white;
  font-size: 1.6rem;
  padding: .3rem 1rem;
  border-radius: 10rem;
  margin-top: 2rem;
  margin-right: 1rem;
  color: black;
  display: flex;
  align-items: center;
  .icon {
    color: black;
    margin-left: .5rem;
  }
`

const PokeTypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Form = styled.form`
  color: white;
  
  margin: 0 1rem;
  .heading-3 {
    font-size: 3rem;
    margin: 1rem 0;
  }

  input {
    color: black;
  }

  .inputGroupPrice {
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    input {
      border: 1px solid ${props => props.theme.colorGrey};
      border-radius: 5px;
      padding: 0 .5rem;
      color: ${props => props.theme.colorLightGrey};
      &.touched {
        color: black;
      }
    }
  }

  .inputWide {
    border: 1px solid ${props => props.theme.colorLightGrey};
      border-radius: 5px;
      padding: .5rem;
    width: 100%;
    font-size: 2rem;
  }

  .filterButton {
    display: block;
    margin: 1rem auto;
    border: 1px solid white;
    border-radius: 5px;
    background: white;
    padding: 1rem 3rem;
    font-size: 2rem;
  }
`

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

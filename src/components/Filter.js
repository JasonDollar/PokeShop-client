import React, { useState, useContext } from 'react'

import styled from 'styled-components'
import { FilterContext } from '../filterContext'

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

const Filter = () => {
  const {
    isFilterOpen, toggleFilter, minPrice, setMinPrice, maxPrice, setMaxPrice,
  } = useContext(FilterContext)
  const [filterMinPrice, setFilterMinPrice] = useState(minPrice)
  const [filterMaxPrice, setFilterMaxPrice] = useState(maxPrice)

  const applyFilter = (e) => {
    e.preventDefault()
    setMinPrice(filterMinPrice)
    setMaxPrice(filterMaxPrice)
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
        <button>Filter</button>
      </form>
    </Container>
  )
}

export default Filter

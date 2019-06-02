import React, { useContext } from 'react'
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
    isFilterOpen, toggleFilter, minPrice, setMinPrice, 
  } = useContext(FilterContext)
  return (
    <Container isOpen={isFilterOpen}>
      <button onClick={() => toggleFilter(false)}>&times;</button>
      Set price:
      <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
    </Container>
  )
}

export default Filter

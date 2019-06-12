import React, { useState, useContext } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import WidthContainer from './styles/WidthContainer'
import Backdrop from './styles/Backdrop'
import { FilterContext } from '../filterContext'

const Container = styled.div`
  width: 100%;
  background: cadetblue;
`



const NavList = styled.ul`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 80%;
  z-index: 100;
  margin: 0;
  background: blue;
  list-style: none;
  padding: 10px;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform .3s;
  &.open {
    transform: translateX(0);
  }
  @media (min-width: 576px) {
    position: static;
    flex-direction: row;
  }

  li {
    margin-right: 15px;
  }
  
  a, span {
    text-decoration: none;
    color: white;
  }
`

const NavButton = styled.button`
  background: none;
`



const Nav = (props) => {
  const [navOpen, toggleNavOpen] = useState(false)
  const {
    isFilterOpen, toggleFilter,
  } = useContext(FilterContext)
  const handleLinkClick = e => {
    if (e.target.nodeName.toLowerCase() === 'a') toggleNavOpen(false)
  }
  return (
    <Container>
      <WidthContainer as="nav">
        {navOpen && <Backdrop onClick={() => toggleNavOpen(false)} />}
        {isFilterOpen && <Backdrop onClick={() => toggleFilter(false)} />}
        {props.location.pathname === '/' && <NavButton type="button" onClick={() => toggleFilter(true)}>open filter</NavButton>}
        <NavButton type="button" onClick={() => toggleNavOpen(!navOpen)}>Toggle</NavButton>
        <NavList className={navOpen ? 'open' : ''} onClick={handleLinkClick} aria-expanded={navOpen}>
          <li>
            <NavLink to="/">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/sell">Sell</NavLink>
          </li>
          <li>
            <NavLink to="/pokedex">pokedex</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/me">Me</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Orders</NavLink>
          </li>


        </NavList>
      </WidthContainer>
    </Container>
  )
}

export default withRouter(Nav)

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import WidthContainer from './styles/WidthContainer'

const Container = styled.div`
  width: 100%;
  background: cadetblue;
`

const NavList = styled.ul`
  margin: 0;
  list-style: none;
  padding: 10px;
  display: flex;

  li {
    margin-right: 15px;
  }
  
  a, span {
    text-decoration: none;
    color: white;
  }
`



const Nav = () => (
    <Container>
      <WidthContainer as="nav">
        <NavList>
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

export default Nav

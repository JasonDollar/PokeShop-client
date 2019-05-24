import React from 'react'
import {Mutation, Query} from 'react-apollo'
import gql from 'graphql-tag'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

import ShowMyMoney from './ShowMyMoney'



const Container = styled.div`
  width: 100%;
  background: cadetblue;
`

const NavBar = styled.nav`
  max-width: 1040px;
  margin: 0 auto;
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



const Nav = () => {
  return (
    <Container>
      <NavBar>
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
            <ShowMyMoney />
          </li>

        </NavList>
      </NavBar>
    </Container>
  )
}

export default Nav

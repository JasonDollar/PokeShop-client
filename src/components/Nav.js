import React from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password:String!) {
    login(data: { email: $email, password: $password}) {
      user {
        name
      }
      token
    }
  
}
`

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
  
  a {
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/sell">Sell</NavLink>
          </li>
          <li>
            <Mutation mutation={LOGIN_MUTATION} variables={{email: 'qwe@qwe.qwe', password: 'qweqwe'}}>
              {(login, {data, error, loading}) => {
                console.log(data)
                if (data) {

                  localStorage.setItem('token', JSON.stringify(data.login.token))
                }
                return (
                  <button onClick={login}>
                    {(error && error.message) || 'LOGIN'}
                  </button>
                )
              }}
            </Mutation>
          </li>
        </NavList>
      </NavBar>
    </Container>
  )
}

export default Nav

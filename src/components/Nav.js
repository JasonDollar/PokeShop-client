import React, { useState, useContext, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WidthContainer from './styles/WidthContainer'
import Backdrop from './styles/Backdrop'
import NavButton from './styles/NavButton'
import { FilterContext } from '../filterContext'
import { UserContext } from '../userContext'

const Container = styled.div`
  width: 100%;
  background:  ${props => props.theme.primaryRed};
`



const NavList = styled.ul`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 70%;
  z-index: 100;
  margin: 0;
  background: ${props => props.theme.primaryRed};
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
    margin-right: 2rem;
    position: static;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    transform: translateX(0);
    z-index: 0;
    
  }

  li {
    &:first-of-type {
      margin-top: 3rem;
      @media (min-width: 576px) {
        margin-top: 0;
      }
    }
    margin-bottom: 1rem;
    text-align: right;
    font-size: 3rem;
    
    @media (min-width: 576px) {
    margin-left: 2rem;
    margin-bottom: 0;
    position: static;
    flex-direction: row;
    transform: translateX(0);
  }
  }
  
  a, span {
    text-decoration: none;
    color: white;
  }
  .logoutButton {
    color: white;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
  }
`

const NavElement = styled(WidthContainer)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .filterButton {
    margin-right: auto;
    /* margin-left: 2rem; */
    padding: .5rem 2rem;
  }
  .menuButton {
    margin-right: 2rem;
  }
`



const Nav = props => {
  const [navOpen, toggleNavOpen] = useState(false)
  const {
    isFilterOpen, toggleFilter,
  } = useContext(FilterContext)
  const { userId, setUserId } = useContext(UserContext)

  const handleLinkClick = e => {
    if (navOpen === false) return
    if (e.target.nodeName.toLowerCase() === 'a') toggleNavOpen(false)
  }
  const logoutUser = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    setUserId('')
  }
  const publicLinks = (
    <Fragment>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
    </Fragment>
  )
  const privateLinks = (
    <Fragment>
      <li>
        <NavLink to="/me">Me</NavLink>
      </li>
      <li>
        <NavLink to="/cart">Cart</NavLink>
      </li>
      <li>
        <NavLink to="/orders">Orders</NavLink>
      </li>
      <li>
        <button type="button" className="logoutButton" onClick={logoutUser}>
          Logout
        </button>
      </li>
    </Fragment>
  )
  return (
    <Container>
      <NavElement as="nav">
        {navOpen && <Backdrop onClick={() => toggleNavOpen(false)} />}
        {isFilterOpen && <Backdrop onClick={() => toggleFilter(false)} />}
        {props.location.pathname === '/' && (
          <NavButton className="filterButton" type="button" onClick={() => toggleFilter(true)}>
            <FontAwesomeIcon icon="filter" />
          </NavButton>
        )}
        {props.location.pathname !== '/' && (
          <NavButton className="filterButton" type="button" onClick={() => props.history.goBack()}>
            <FontAwesomeIcon icon="chevron-left" />
          </NavButton>
        )}
        <NavButton type="button" className="onlyMobile menuButton" onClick={() => toggleNavOpen(!navOpen)}>
          <FontAwesomeIcon icon="bars" />
        </NavButton>
        <NavList className={navOpen ? 'open' : ''} onClick={handleLinkClick} aria-expanded={navOpen}>
          <li>
            <NavLink to="/">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/sell">Sell</NavLink>
          </li>
          {!userId && publicLinks}
          {userId && privateLinks}
          

        </NavList>
      </NavElement>
    </Container>
  )
}

export default withRouter(Nav)

import React, { useState, useContext, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import Backdrop from './styles/Backdrop'
import NavButton from './styles/NavButton'
import { FilterContext } from '../filterContext'
import { UserContext } from '../userContext'
import { Container, NavElement, NavList } from './styles/Nav'

const Nav = ({ history, location }) => {
  const [navOpen, toggleNavOpen] = useState(false)
  const { isFilterOpen, toggleFilter } = useContext(FilterContext)
  const { userId, setUserId } = useContext(UserContext)

  const handleLinkClick = e => {
    if (navOpen === false) return
    if (e.target.nodeName.toLowerCase() === 'a') toggleNavOpen(false)
  }

  const logoutUser = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    setUserId('')
    history.push('/')
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
        {location.pathname === '/' && (
          <NavButton className="filterButton" type="button" onClick={() => toggleFilter(true)}>
            <FontAwesomeIcon icon="filter" />
          </NavButton>
        )}
        {location.pathname !== '/' && (
          <NavButton className="filterButton" type="button" onClick={() => history.goBack()}>
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

Nav.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
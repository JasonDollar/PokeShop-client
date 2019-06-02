import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

import { UserProvider } from './userContext'
import { FilterProvider } from './filterContext'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import ShopDisplay from './components/ShopDisplay'
import TypeDetail from './components/TypeDetail'
import OfferDetail from './components/OfferDetail'
import UserDetail from './components/UserDetail'
import Login from './components/Login'
import Register from './components/Register'
import Me from './components/Me'
import Sell from './components/Sell'
import Cart from './components/Cart'
import OrderList from './components/OrderList'
import Filter from './components/Filter'
import theme from './components/styles/theme'

import Nav from './components/Nav'

const GlobalStyle = createGlobalStyle`
  html {
  font-size: 62.5%;
  box-sizing: border-box;
  }

  body {
    font-size: 1.6rem;
  }

  *, *::after, *::before {
    box-sizing: inherit;
  }
`

function App() {
  return (  
    <ThemeProvider theme={theme}>
      <UserProvider>
        <FilterProvider>
          <GlobalStyle />
          <div className="App">
            <Nav />
            <Route path="/" exact component={Filter} />
            <Switch>
              <Route path="/" exact component={ShopDisplay} />
              <Route path="/pokedex" component={PokemonList} />
              <Route path="/pokemon/:pokemonId" component={PokemonDetail} />
              <Route path="/type/:typeId" component={TypeDetail} />
              <Route path="/offer/:offerId" component={OfferDetail} />
              <Route path="/user/:userId" component={UserDetail} />
              <Route path="/sell" component={Sell} />
              <Route path="/me" component={Me} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/cart" component={Cart} />
              <Route path="/orders" component={OrderList} />
            </Switch>
          </div>
        </FilterProvider>
      </UserProvider>
    </ThemeProvider>
  )
}

export default App

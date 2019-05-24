import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import {UserProvider} from './userContext'
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

import Nav from './components/Nav'



function App() {
  return (
    <UserProvider>

      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={ShopDisplay}/>
          <Route path="/pokedex" component={PokemonList}/>
          <Route path="/pokemon/:pokemonId"  component={PokemonDetail}/>
          <Route path="/type/:typeId"  component={TypeDetail}/>
          <Route path="/offer/:offerId"  component={OfferDetail}/>
          <Route path="/user/:userId"  component={UserDetail}/>
          <Route path="/sell"  component={Sell}/>
          <Route path="/me"  component={Me}/>
          <Route path="/login"  component={Login}/>
          <Route path="/register"  component={Register}/>
          <Route path="/cart"  component={Cart}/>
        </Switch>
      </div>
    </UserProvider>
  );
}

export default App;

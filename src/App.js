import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import ShopDisplay from './components/ShopDisplay'
import TypeDetail from './components/TypeDetail'
import OfferDetail from './components/OfferDetail'
import UserDetail from './components/UserDetail'
import Sell from './components/Sell'

import Nav from './components/Nav'



function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={ShopDisplay}/>
        <Route path="/pokedex" component={PokemonList}/>
        <Route path="/pokemon/:pokemonId" exact component={PokemonDetail}/>
        <Route path="/type/:typeId" exact component={TypeDetail}/>
        <Route path="/offer/:offerId" exact component={OfferDetail}/>
        <Route path="/user/:userId" exact component={UserDetail}/>
        <Route path="/sell" exact component={Sell}/>
      </Switch>
    </div>
  );
}

export default App;

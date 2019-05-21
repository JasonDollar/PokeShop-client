import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import TypeDetail from './components/TypeDetail'
import Sell from './components/Sell'

import Nav from './components/Nav'



function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={PokemonList}/>
        <Route path="/pokemon/:pokemonId" exact component={PokemonDetail}/>
        <Route path="/type/:typeId" exact component={TypeDetail}/>
        <Route path="/sell" exact component={Sell}/>
      </Switch>
    </div>
  );
}

export default App;

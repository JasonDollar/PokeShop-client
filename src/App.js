import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import TypeDetail from './components/TypeDetail'



function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={PokemonList}/>
        <Route path="/pokemon/:pokemonId" exact component={PokemonDetail}/>
        <Route path="/type/:typeId" exact component={TypeDetail}/>
      </Switch>
    </div>
  );
}

export default App;

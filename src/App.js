import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './App.css';

const GET_POKEMONS = gql`
  query GET_POKEMONS($skip: Int = 0) {
    pokemons(skip: $skip) {
      id
      name
      url
    }
  }
`

function App() {
  return (
    <div className="App">
      <Query query={GET_POKEMONS} variables={{skip: 0}}>
        {({data, error, loading}) => {
          if (loading) return <p>Loading...</p>
          console.log(data)
          return (
            <ul>
              {data.pokemons.map(item => (
                <li key={item.id}>
                  <img src={item.url} alt={item.name}/>
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
    </div>
  );
}

export default App;

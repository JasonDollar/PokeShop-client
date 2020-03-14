import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
// import { ApolloClient } from 'apollo-boost'
// import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { ApolloProvider } from 'react-apollo'
import {
  ApolloClient, HttpLink, InMemoryCache, ApolloProvider, 
} from '@apollo/client'
// import { ApolloProvider } from '@apollo/react-hooks'
import * as serviceWorker from './serviceWorker'
import App from './App'
import { checkTokenValidity } from './utils'


const link = new HttpLink({
  uri: process.env.REACT_APP_SERVER,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = checkTokenValidity()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
 
const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter> 
  </ApolloProvider>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

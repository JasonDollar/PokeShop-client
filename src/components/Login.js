import React, {useState} from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {Redirect, Link} from 'react-router-dom'

import AuthForm from './styles/AuthForm'

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

const Login = () => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')


  return (
    <Mutation mutation={LOGIN_MUTATION} variables={{email, password}}>
      {(login, {data, error, loading}) => {
        console.log(data)
        if (data && data.login && data.login.token) {

          localStorage.setItem('token', data.login.token)
          return (
            <Redirect to="/"/>
          )
        }
        return (
          <AuthForm>
            <form onSubmit={e => {
              e.preventDefault()
            }} className="form">

              <h1 className="form__name">Login</h1>

              <div className="inputGroup">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={e => changeEmail(e.target.value)}/>
              </div>

              <div className="inputGroup">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={e => changePassword(e.target.value)}/>
              </div>
              {error && <span className="errorMessage">{error.message}</span> }

              <button type="submit" className="form__button" onClick={login} disabled={loading}>Login</button>
              <div className="form__link--container">
                <Link to="/signup" className="form__link">New User? Create an account</Link>
                <Link to="/reset" className="form__link">Forgot your password?</Link>
              </div>
            </form>
          </AuthForm>
        )
      }}
    </Mutation>
  )

}


export default Login

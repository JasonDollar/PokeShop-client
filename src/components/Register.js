import React, {useState} from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {Redirect, Link} from 'react-router-dom'

import AuthForm from './styles/AuthForm'

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($email: String!, $password:String!, $name: String!) {
    createUser(data: { email: $email, password: $password, name: $name}) {
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
  const [name, changeName] = useState('')


  return (
    <Mutation mutation={CREATE_USER_MUTATION} variables={{email, password, name}}>
      {(createUser, {data, error, loading}) => {
        console.log(data)
        if (data && data.createUser && data.createUser.token) {

          localStorage.setItem('token', data.createUser.token)
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
                <label htmlFor="name">Name:</label>
                <input type="name" id="name" value={name} onChange={e => changeName(e.target.value)}/>
              </div>
              
              <div className="inputGroup">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={e => changeEmail(e.target.value)}/>
              </div>

              <div className="inputGroup">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={e => changePassword(e.target.value)}/>
              </div>
              {error && <span className="errorMessage">{error.message}</span> }

              <button type="submit" className="form__button" onClick={createUser} disabled={loading}>Login</button>
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

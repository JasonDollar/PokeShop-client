import React, {useState, useContext} from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'
import {Redirect, Link} from 'react-router-dom'
import {UserContext} from '../userContext'

import AuthForm from './styles/AuthForm'
import {CURRENT_USER_QUERY} from './User'

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password:String!) {
    login(data: { email: $email, password: $password}) {
      user {
        id
        name
      }
      token
    }
  
}
`

const Login = (props) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const {setUserId} = useContext(UserContext)

  return (

        <Mutation mutation={LOGIN_MUTATION} variables={{email, password}} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
          {(login, {data, error, loading}) => {
            
            // if (data && data.login && data.login.token) {

              // localStorage.setItem('token', data.login.token)
              // props.history.push('/')
            // }
            return (
              <AuthForm>
                <form onSubmit={async e => {
                  e.preventDefault()
                  const data = await login()
                  console.log(data)
                  if (data) {

                    localStorage.setItem('token', data.data.login.token)
                    localStorage.setItem('userId', data.data.login.user.id)
                    setUserId(data.data.login.user.id)
                    // document.cookie = `token=${data.data.login.token}`
                    props.history.push('/')
                  }
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

                  <button type="submit" className="form__button" disabled={loading}>Login</button>
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

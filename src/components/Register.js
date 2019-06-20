import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './User'
import { UserContext } from '../userContext'

import AuthForm from './styles/AuthForm'

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($email: String!, $password:String!, $name: String!) {
    createUser(data: { email: $email, password: $password, name: $name}) {
      user {
        id
        name
        email
      }
      token
    }
  
}
`

const Login = props => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [name, changeName] = useState('')
  const { setUserId } = useContext(UserContext)


  return (
    <Mutation mutation={CREATE_USER_MUTATION} variables={{ email, password, name }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(createUser, {
        error, loading,
      }) => (
          <AuthForm>
            <form
              onSubmit={async e => {
                e.preventDefault()
                const data = await createUser()
                if (data.data.createUser) {
                  localStorage.setItem('token', data.data.createUser.token)
                  localStorage.setItem('userId', data.data.createUser.user.id)
                  setUserId(data.data.createUser.user.id)
                  props.history.push('/')
                }
              }}
              className="form"
            >

              <h1 className="form__name">Register</h1>

              <div className="inputGroup">
                <label htmlFor="name">Name:</label>
                <input type="name" id="name" value={name} onChange={e => changeName(e.target.value)} />
              </div>
              
              <div className="inputGroup">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={e => changeEmail(e.target.value)} />
              </div>

              <div className="inputGroup">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={e => changePassword(e.target.value)} />
              </div>
              {error && <span className="errorMessage">{error.message}</span> }

              <button type="submit" className="form__button" disabled={loading}>Register</button>
              {/* <div className="form__link--container">
                <Link to="/signup" className="form__link">New User? Create an account</Link>
                <Link to="/reset" className="form__link">Forgot your password?</Link>
              </div> */}
            </form>
          </AuthForm>
      )
      }
    </Mutation>
  )

}


export default Login

import React, { useState, useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import { CURRENT_USER_QUERY } from './Me'
import { UserContext } from '../userContext'
import ActionButton from './styles/ActionButton'
import AuthForm from './styles/AuthForm'
import ErrorMessage from './ErrorMessage'

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

const Login = ({ history }) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const [name, changeName] = useState('')
  const { setUserId } = useContext(UserContext)
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    variables: { email, password, name },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })

  return (
    <AuthForm>
      <form
        onSubmit={async e => {
          e.preventDefault()
          try {
            const res = await createUser()
            if (res.data.createUser) {
              localStorage.setItem('token', res.data.createUser.token)
              localStorage.setItem('userId', res.data.createUser.user.id)
              setUserId(res.data.createUser.user.id)
              history.push('/')
            }
          } catch (e) {
            console.error(e.message)
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
        {error && <ErrorMessage error={error} inline />}

        <ActionButton type="submit" disabled={loading} wide>Register</ActionButton>
      </form>
    </AuthForm>
  )

}


export default Login

Login.propTypes = {
  history: PropTypes.object.isRequired,
}
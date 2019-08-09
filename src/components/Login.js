import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { UserContext } from '../userContext'
import AuthForm from './styles/AuthForm'
import { CURRENT_USER_QUERY } from './User'
import ActionButton from './styles/ActionButton'

export const LOGIN_MUTATION = gql`
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

const Login = ({ history }) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  const { setUserId } = useContext(UserContext)
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION, {
    variables: { email, password },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  const usePrevAccount = () => {
    changeEmail('qwe@qwe.qwe')
    changePassword('qweqwe')
  }

  return (
  <AuthForm>
    <form
      onSubmit={async e => {
        e.preventDefault()
        const data = await login()
        if (data) {

          localStorage.setItem('token', data.data.login.token)
          localStorage.setItem('userId', data.data.login.user.id)
          setUserId(data.data.login.user.id)
          history.push('/')
        }
      }}
      className="form"
    >

      <h1 className="form__name">Login</h1>

      <div className="inputGroup">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={e => changeEmail(e.target.value)} />
      </div>

      <div className="inputGroup">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={e => changePassword(e.target.value)} />
      </div>
      {error && <span className="errorMessage">{error.message}</span> }
      <button className="previewButton" type="button" onClick={usePrevAccount}>Use Preview Account</button>
      <Link to="/resetPassword" className="resetLink">
        Reset password
        <FontAwesomeIcon icon="chevron-right" />
      </Link>
      <ActionButton type="submit" disabled={loading} wide>Login</ActionButton>
      {/* <div className="form__link--container">
        <Link to="/signup" className="form__link">New User? Create an account</Link>
        <Link to="/reset" className="form__link">Forgot your password?</Link>
      </div> */}
    </form>
  </AuthForm>
  )

}


export default Login

Login.propTypes = {
  history: PropTypes.object.isRequired,
}
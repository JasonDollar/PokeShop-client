import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import qs from 'query-string'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../userContext'
import AuthForm from './styles/AuthForm'
import ActionButton from './styles/ActionButton'

const CREATE_RESET_TOKEN = gql`
  mutation CREATE_RESET_TOKEN ($email: String!) {
    createResetToken(email: $email) {
      message
      link
    }
  }
`

const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD ($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      user {
        id
      }
      token
    }
  }
`

const ResetPasswordStart = (props) => {
  const [resetEmail, setResetEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const { userId, setUserId } = useContext(UserContext)
  const { resetToken } = qs.parse(props.location.search)
  const [createReset, { loading, error }] = useMutation(CREATE_RESET_TOKEN, {
    variables: { email: resetEmail },
  })
  const [resetPass] = useMutation(RESET_PASSWORD, {
    variables: { resetToken, password, confirmPassword },
  })

  if (userId) {
    return <Redirect to="/" />
  }

  if (!resetToken) {
    return (
      <AuthForm>
        <form
          className="form"
          onSubmit={async e => {
            e.preventDefault()
            if (resetEmail.length <= 0) {
              setValidationError('Please provide an email!')
              return
            }
            setValidationError('')
            await createReset()
          }}
        >
          <h2 className="form__name">Reset</h2>
          <div className="inputGroup">
            <label htmlFor="resetEmailInput">Your email: </label>
            <input type="email" id="resetEmailInput" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
          </div>
          <ActionButton type="submit" disabled={loading} wide>Reset</ActionButton>
          {error && <p className="errorMessage">{error.message}</p>}
          {validationError && <p className="errorMessage">{validationError}</p>}
        </form>
      </AuthForm>
    )
  }

  return (
    <AuthForm>
      <form
        className="form"
        onSubmit={async e => {
          e.preventDefault()
          if (password !== confirmPassword) {
            setValidationError('Your password must match!')
            return
          }
          if (password.length < 6 || confirmPassword.length < 6) {
            setValidationError('Your password is too short!')
            return
          }
          setValidationError('')
          const data = await resetPass()
        
          if (data) {
            localStorage.setItem('token', data.data.resetPassword.token)
            localStorage.setItem('userId', data.data.resetPassword.user.id)
            setUserId(data.data.resetPassword.user.id)
            props.history.push('/')
          }
        }}
      >
        <h2 className="form__name">Reset</h2>
        <div className="inputGroup">
          <label htmlFor="password1">Password: </label>
          <input type="password" id="password1" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="password2">Confirm password: </label>
          <input type="password" id="password2" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

        </div>
        <ActionButton type="submit" disabled={loading} wide>Change Password</ActionButton>
        {error && <p className="errorMessage">{error.message}</p>}
        {validationError && <p className="errorMessage">{validationError}</p>}
      </form>
    </AuthForm>
  )
}

export default ResetPasswordStart

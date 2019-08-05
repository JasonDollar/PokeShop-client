import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import qs from 'query-string'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../userContext'

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


  const handleFormSubmit = async (e, mutationFunc) => {
    e.preventDefault()
    const res = await mutationFunc()
    console.log(res)
  }

  if (userId) {
    return <Redirect to="/" />
  }

  if (!resetToken) {
    return (
      <Mutation mutation={CREATE_RESET_TOKEN} variables={{ email: resetEmail }}>
        {(createReset, { data, loading, error }) => (
            <form onSubmit={async e => {
              e.preventDefault()
              if (resetEmail.length <= 0) {
                setValidationError('Please provide an email!')
                return
              }
              setValidationError('')
              const res = await createReset()
            }}
            >
              <label htmlFor="resetEmailInput">Your email: </label>
              <input type="email" id="resetEmailInput" value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
              <button type="submit">Reset</button>
              {data && <p>{data.createResetToken.message}</p>}
              {validationError && <p>{validationError}</p>}
            </form>
        )}
      </Mutation>
    )
  }

  return (
    <Mutation mutation={RESET_PASSWORD} variables={{ resetToken, password, confirmPassword }}>
      {(resetPass, { loading, error }) => (
          <form onSubmit={async e => {
            e.preventDefault()
            if (password !== confirmPassword) {
              setValidationError('Your password must match!')
              return
            }
            if (password.length <= 6 || confirmPassword.length <= 6) {
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
            <label htmlFor="password1">Password: </label>
            <input type="password" id="password1" value={password} onChange={e => setPassword(e.target.value)} />
            <label htmlFor="password2">Password: </label>
            <input type="password" id="password2" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button type="submit">Change Password</button>
            {error && <p>{error.message}</p>}
            {validationError && <p>{validationError}</p>}
          </form>
      )}
    </Mutation>
  )
}

export default ResetPasswordStart

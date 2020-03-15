import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ErrorMessageText = styled.h2`
  font-size: ${props => (props.inline ? '2.2rem' : '4rem')};
  font-weight: ${props => (props.inline ? 'normal' : 'bold')};
  text-align: center;
  margin: ${props => (props.inline ? '1rem 0' : '2rem 0')};
  color :${props => (props.inline ? props.theme.primaryRed : '#111')};
`

const ErrorMessage = ({ error, message, inline }) => {
  if (message) return <ErrorMessageText inline={inline}>{message}</ErrorMessageText>

  if (error && error.graphQLErrors.length) {
    return (
      <>
        {error.graphQLErrors.map(item => <ErrorMessageText inline={inline}>{item.message}</ErrorMessageText>)}
      </>
    ) 
  }

  if (error && error.networkError) return <ErrorMessageText>Network error: {error.networkError.message}</ErrorMessageText>

  return <ErrorMessageText inline={inline}>{error.message}</ErrorMessageText>
}

export default ErrorMessage

ErrorMessage.propTypes = {
  message: PropTypes.string,
  error: PropTypes.any,
  inline: PropTypes.bool,
}
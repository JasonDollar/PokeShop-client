import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ErrorMessageText = styled.h2`
  font-size: 2.2rem;
  font-weight: normal;
  text-align: center;
  margin: 1rem 0;
  color :${props => props.theme.primaryRed};
`

const ErrorMessage = ({ error, message }) => {
  if (message) return <ErrorMessageText>{message}</ErrorMessageText>

  if (error && error.graphQLErrors.length) {
    return (
      <>
        {error.graphQLErrors.map(item => <span className="errorMessage">{item.message}</span>)}
      </>
    ) 
  }

  if (error && error.networkError) return <ErrorMessageText>Network error: {error.networkError.message}</ErrorMessageText>
  
  return <ErrorMessageText>{error.message}</ErrorMessageText>
}

export default ErrorMessage

ErrorMessage.propTypes = {
  message: PropTypes.string,
  error: PropTypes.any,
}
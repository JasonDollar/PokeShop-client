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

const ErrorMessage = ({ message }) => (
  <ErrorMessageText>{message}</ErrorMessageText>
)

export default ErrorMessage

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}
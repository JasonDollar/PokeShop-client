import React from 'react'
import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0% {
    opacity: .2;
  }

  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
`

const LoadingStyles = styled.div`
  display: flex;
  justify-content: center;
  font-size: 8rem;
  color: ${props => props.theme.primaryRed};
  @media (min-width: 576px) {
    font-size: 20rem;
  }
  span {
    animation: ${blink} 1.4s infinite both;
  }

  span:nth-child(2) {
      animation-delay: .2s;
  }

  span:nth-child(3) {
      animation-delay: .4s;
  }
`

const Loading = () => (
  <LoadingStyles>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </LoadingStyles>
)

export default Loading

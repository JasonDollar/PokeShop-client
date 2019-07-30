import styled from 'styled-components'

const ActionButton = styled.button`
  display: block;
  margin: 0 auto;
  margin-top: 0rem;
  border: 1px solid ${props => props.theme.primaryRed};
  border-radius: 100px;
  background: ${props => (props.disabled ? props.theme.secondaryRed : props.theme.primaryRed)};
  color: white;
  font-size: 2.2rem;
  padding: 1rem 2rem;
  cursor: pointer;
  width: ${props => (props.wide ? '100%' : 'auto')};
  &[disabled] {
    background: ${props => props.theme.secondaryRed};
    border: ${props => props.theme.secondaryRed};
  }
`

export default ActionButton
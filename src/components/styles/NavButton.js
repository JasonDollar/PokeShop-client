import styled from 'styled-components'

const NavButton = styled.button`
  background: none;
  border: none;
  /* border-radius: 7px; */
  padding: ${props => (props.wide ? '.5rem 4rem' : '.5rem')};
  margin: .5rem;
  font-size: 2.5rem;
  color: white;
  cursor: pointer;
  font-family: inherit;
`

export default NavButton
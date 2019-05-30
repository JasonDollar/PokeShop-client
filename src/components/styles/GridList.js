import styled from 'styled-components'

const GridList = styled.ul`
list-style: none;
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 27rem));
  column-gap: .5rem;
  justify-content: center;
  justify-items: center;
`

export default GridList
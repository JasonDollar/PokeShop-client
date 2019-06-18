import styled from 'styled-components'

const GridList = styled.ul`
  list-style: none;
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  display: grid;
  grid-template-columns: minmax(16rem, 30rem);
  column-gap: .5rem;
  justify-content: center;
  justify-items: center;
  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fit, minmax(24rem, 24rem));
  }
`

export default GridList
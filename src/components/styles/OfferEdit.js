import styled from 'styled-components'
import WidthContainer from './WidthContainer'

const DetailContainer = styled(WidthContainer)`
  /* margin: 1rem; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1.5rem;
  .heading {
    grid-column: 1 / -1;
    text-align: center;
    font-size: 2.6rem;
    & .number {
      font-weight: 400;
    }
    & .pokeName {
      display: inline-block;
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
  
  .pokeImage {
    width: 15rem;
    height: 15rem;
    grid-column: 1 / -1;
    justify-self: center;
  }

  .input-group {
    grid-column: 1 /-1;
    margin: 0 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    @media (min-width: 576px) {
      justify-self: center;
      width: 400px;
    }
  }

  button {
    grid-column: 1 /-1;
  }

`

export default DetailContainer
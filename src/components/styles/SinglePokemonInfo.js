import styled from 'styled-components'

const SinglePokemonInfo = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  font-size: 2rem;
  .pokemonText {
    margin: 1rem 0;
  }
  .pokemonImage {
    width: 6rem;
    height: 6rem;
  }
  & p span.pokemonName {
    display: inline-block;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  
`

export default SinglePokemonInfo
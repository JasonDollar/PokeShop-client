import styled from 'styled-components'

const ListItem = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    background: ${props => props.theme.colorWhiteGrey};

  }
  a {
    width: 100%;
    text-decoration: none;
    color: inherit;
    display: flex;
  flex-direction: column;
  align-items: center;
  }
  img {
    width: 50%;
  }
  .text {
    width: 84%;
    padding: 0 .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.colorLightGrey};
    
  }
  .name {
    font-size: 2rem;
    margin: 0.5rem 0;
    margin-bottom: 1rem;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  .price {
    font-size: 2.2rem;
    margin: 0.5rem 0;
    margin-bottom: 1rem;
    font-weight: bold;
    color: ${props => props.theme.colorGrey};
  }
`
export default ListItem
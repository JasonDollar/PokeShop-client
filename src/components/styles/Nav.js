import styled from 'styled-components'
import WidthContainer from './WidthContainer'

export const Container = styled.div`
  width: 100%;
  background:  ${props => props.theme.primaryRed};
`

export const NavList = styled.ul`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 70%;
  z-index: 100;
  margin: 0;
  background: ${props => props.theme.primaryRed};
  list-style: none;
  padding: 10px;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform .3s;
  &.open {
    transform: translateX(0);
  }
  @media (min-width: 576px) {
    margin-right: 2rem;
    position: static;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    transform: translateX(0);
    z-index: 0;
    
  }

  li {
    &:first-of-type {
      margin-top: 3rem;
      @media (min-width: 576px) {
        margin-top: 0;
      }
    }
    margin-bottom: 1rem;
    text-align: right;
    font-size: 3rem;
    
    @media (min-width: 576px) {
    margin-left: 2rem;
    margin-bottom: 0;
    position: static;
    flex-direction: row;
    transform: translateX(0);
  }
  }
  
  a, span {
    text-decoration: none;
    color: white;
  }
  .logoutButton {
    color: white;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
  }
`

export const NavElement = styled(WidthContainer)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .filterButton {
    margin-right: auto;
    /* margin-left: 2rem; */
    padding: .5rem 2rem;
  }
  .menuButton {
    margin-right: 2rem;
  }
`
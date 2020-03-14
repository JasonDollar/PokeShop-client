import styled from 'styled-components'

export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80%;
  background: ${props => props.theme.primaryRed};
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform .3s;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 576px) {
    width: 38rem;
  }
`

export const PokeTypeElement = styled.span`
  background: white;
  font-size: 1.6rem;
  padding: .3rem 1rem;
  border-radius: 10rem;
  margin-top: 2rem;
  margin-right: 1rem;
  color: black;
  display: flex;
  align-items: center;
  .icon {
    color: black;
    margin-left: .5rem;
  }
`

export const PokeTypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Form = styled.form`
  color: white;
  
  margin: 0 1rem;
  .heading-3 {
    font-size: 3rem;
    margin: 1rem 0;
  }

  input {
    color: black;
  }

  .inputGroupPrice {
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    input {
      border: 1px solid ${props => props.theme.colorGrey};
      border-radius: 5px;
      padding: 0 .5rem;
      color: ${props => props.theme.colorLightGrey};
      &.touched {
        color: black;
      }
    }
  }

  .inputWide {
    border: 1px solid ${props => props.theme.colorLightGrey};
      border-radius: 5px;
      padding: .5rem;
    width: 100%;
    font-size: 2rem;
  }

  .filterButton {
    display: block;
    margin: 1rem auto;
    border: 1px solid white;
    border-radius: 5px;
    background: white;
    padding: 1rem 3rem;
    font-size: 2rem;
  }
`

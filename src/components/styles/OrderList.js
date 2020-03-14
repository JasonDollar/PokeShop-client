import styled from 'styled-components'


export const OrdersUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 1rem;
  padding: 0;
`

export const OrderItem = styled.li`
  list-style: none;
  /* border: 1px solid ${props => props.theme.colorLightGrey}; */
  box-shadow: 0 2px 5px 0 ${props => props.theme.colorGrey};
  padding: 1rem;
  margin-bottom: 1rem;
  header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    /* align-items: center; */
    border-bottom: 2px solid ${props => props.theme.primaryRed};
    margin-bottom: 1rem;
    padding: .5rem;
    padding-bottom: 1.5rem;
    @media (min-width: 576px) {
      flex-direction: row;
    }
    & .title {
      margin: 0;
    }
    & .date {
      margin: 0;
      color: ${props => props.theme.colorLightGrey}
    }
  }
  .total {
    font-size: 2.5rem;
    margin: 1rem;
  }
`
import styled from 'styled-components'

const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  transform: translateX(-2%);
  @media (min-width: 576px) {
    font-size: 2rem;
    transform: translateX(0);
  }
  & > * {
    margin: 0;
    border-right: 1px solid ${props => props.theme.colorLightGrey};
    padding: 1rem 1.5rem;
    @media (min-width: 576px) {
      padding: 1.5rem 3rem;
    }
    &:last-child {
      border-right: 0;
    }
  }
  .link {
    text-decoration: none;
    color: inherit;
    display: flex;
    /* align-items: center; */
    & .arrowIcon {
      margin: 0 .5rem;
      transform: translateY(.3rem);
      transition: color .1s;
      @media (min-width: 576px) {
        transform: translateY(.4rem);
      }
    }
    &:hover .arrowIcon {
      color: ${props => props.theme.primaryRed};
    }
  }
  .link[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`

export default PaginationStyles
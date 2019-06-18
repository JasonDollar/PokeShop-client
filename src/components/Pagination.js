import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
      transform: translateY(.5rem);
      transition: color .1s;
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

const Pagination = ({ page, maxPage }) => (
    <PaginationStyles>
      <Link
        className="link"
        aria-disabled={page <= 1}
        to={{
          path: '/',
          search: `?page=${page - 1}`,
        }}
      >
        <FontAwesomeIcon icon="chevron-left" className="arrowIcon" />
        Previous
      </Link>
      <p>Page {page} of {maxPage}</p>
      <Link
        className="link"
        aria-disabled={page >= maxPage}
        to={{
          path: '/',
          search: `?page=${page + 1}`,
        }}
      >
        Next
        <FontAwesomeIcon icon="chevron-right" className="arrowIcon" />
      </Link>
    </PaginationStyles>
)

export default Pagination

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
}
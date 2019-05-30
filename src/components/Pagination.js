import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${props => props.theme.colorLightGrey};
  border-radius: 10px;
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.colorLightGrey};
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`

const Pagination = ({ page, maxPage }) => {
  console.log(page, maxPage)
  
  return (
    <PaginationStyles>
      <Link
        aria-disabled={page <= 1}
        to={{
          path: '/',
          search: `?page=${page - 1}`,
        }}
      >Previous
      </Link>
      <p>Page {page} of {maxPage}</p>
      <Link
        aria-disabled={page >= maxPage}
        to={{
          path: '/',
          search: `?page=${page + 1}`,
        }}
      >Next
      </Link>
    </PaginationStyles>
  )
}

export default Pagination

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
}
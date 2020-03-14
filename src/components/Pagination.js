import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PaginationStyles from './styles/Pagination'

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
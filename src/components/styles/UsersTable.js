import styled from 'styled-components'

const UsersTable = styled.table`
  border-spacing: 0;
  width: 100%;
  thead,
  tbody {
    width: 100%;
  }
  tbody {
    text-align: center;
  }

  tr:not(.table-items) {
    &:hover {
      background: ${props => props.theme.colorWhiteGrey}
    }
  }

  td,
  th {
    padding: 5px;
    margin-bottom: 3px
  }
  td {
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
  }
`

export default UsersTable
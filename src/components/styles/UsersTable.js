import styled from 'styled-components'

const UsersTable = styled.table`
  border-spacing: 0;
  width: 100%;
  thead,
  tbody {
    /* width: 100%; */
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
    margin-bottom: 3px;
    /* min-width: 20%; */
  }
  td {
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
  }
  /* .userRow {
    width: 100%;
    display: flex;
  } */
  .editable {
    /* display: flex; */
    span {
      /* display: block; */
      margin-right: auto;
    }
    input {
      margin: 0;
      width: 50%;
    }
    button {
      margin-left: auto;
    }
    /* justify-content: space-between; */
  }
`

export default UsersTable
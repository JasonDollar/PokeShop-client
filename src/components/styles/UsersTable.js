import styled from 'styled-components'

const UsersTable = styled.table`
  border-spacing: 0;
  width: 100%;
  thead,
  tbody {
  }
  tbody {
    /* text-align: center; */
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
  }
  td {
    border-right: 1px solid #ccc;
    &:last-child {
      border-right: none;
    }
  }
  input {
    margin-right: 5px;

    flex: 1;
    flex-grow: 0;

  } 
  input,
  select {
    border: 1px solid #bbb;
    border-radius: 3px;
  }
  /* .userRow {
    width: 100%;
    display: flex;
  }
*/
  .editable {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  /* input {
    width: 50%;
  } */
`

const EditButton = styled.button`
  border: 1px solid #bbb;
  border-radius: 3px;
  color: #444;
  padding: 3px;
  cursor: pointer;
  background: #fff;
`

export { UsersTable, EditButton }
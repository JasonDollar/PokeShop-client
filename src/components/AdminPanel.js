import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../userContext'
import UserTableRow from './UserTableRow'
import WidthContainer from './styles/WidthContainer'
import Loading from './Loading'
import UsersTable from './styles/UsersTable'

export const USERS_ADMIN_QUERY = gql`
  query USERS_ADMIN_QUERY {
    users {
      id
      name
      email
      role
    }
  }
`



const AdminPanel = () => {
  const { userId } = useContext(UserContext)
  const { data, loading, error } = useQuery(USERS_ADMIN_QUERY, {
    variables: { adminId: userId },
  })
  if (!userId) return <Redirect to="/" />
  if (loading) return <Loading />
  if (error) return <p>{error.message}</p>
  return (
    <WidthContainer>
      <div>
        <UsersTable>
          <thead>
            <tr className="table-items">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>
                <span role="img" aria-label="Actions">🔥🔥🔥</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(item => <UserTableRow key={item.id} user={item} />)}
          </tbody>
        </UsersTable> 
      </div>
    </WidthContainer>
  )
}

export default AdminPanel

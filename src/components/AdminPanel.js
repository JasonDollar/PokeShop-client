import React, { useContext, useState } from 'react'
import { Query } from 'react-apollo'
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
  if (!userId) return <Redirect to="/" />
  return (
    <WidthContainer>
      <Query query={USERS_ADMIN_QUERY} variables={{adminId: userId}}>
        {({data, loading, error}) => {
          // console.log(data);
          if(loading) return <Loading />
          if (error) return <p>{error.message}</p>
          return (
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
          )
        
        }}
      </Query>
    </WidthContainer>
  )
}

export default AdminPanel

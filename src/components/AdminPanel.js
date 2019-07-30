import React, { useContext } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../userContext'
import WidthContainer from './styles/WidthContainer'
import Loading from './Loading'

const USERS_ADMIN_QUERY = gql`
  query USERS_ADMIN_QUERY($adminId: ID!) {
    users(adminId: $adminId) {
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
          console.log(data);
          if(loading) return <Loading />
          if (error) return <p>{error.message}</p>
          return (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table> 

            </div>
          )
        
        }}
      </Query>
    </WidthContainer>
  )
}

export default AdminPanel

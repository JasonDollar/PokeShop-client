import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {USERS_ADMIN_QUERY} from './AdminPanel'

const ADMIN_UPDATE_USER_DATA = gql`
  mutation ADMIN_UPDATE_USER_DATA($userId: ID!, $role: Role, $name: String) {
    adminUpdateUserData(userId: $userId, role: $role, name: $name) {

      id
      name
      email
      role
    }
  }
`

const UserTableRow = user => {
  const [role, setRole] = useState(user.user.role)
  const buttonFunc = async (mutation) => {
    const data = await mutation()
    console.log(data);
    setRole(data.data.adminUpdateUserData.role)
  }
  return (
    <Mutation 
      mutation={ADMIN_UPDATE_USER_DATA} 
      variables={{userId: user.user.id, role}}
      update={(cache, {data: { adminUpdateUserData }}) => {
        const {users} = cache.readQuery({query: USERS_ADMIN_QUERY})
        console.log(adminUpdateUserData);
        console.log(users);
        
        cache.writeQuery({
          query: USERS_ADMIN_QUERY,
          data: {
            users: users.map(item => {
              if (item.id !== adminUpdateUserData.id) return item
              return {
                ...item, 
                ...adminUpdateUserData
              }
            })
          }
        })
      }}
    >
      {(updateUserData, {loading, error}) => {
        return (
          <tr>
            <td>{user.user.id}</td>
            <td>{user.user.name}</td>
            <td>{user.user.email}</td>
            <td>
              <select name="role" id={"role" + user.id} onChange={e => setRole(e.target.value)} defaultValue={user.user.role}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <button onClick={() => buttonFunc(updateUserData)}>placeholder</button>
            </td>
          </tr>
        )
      }}
    </Mutation>

  )
}

export default UserTableRow

import React, { useState, useEffect, useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import { USERS_ADMIN_QUERY } from './AdminPanel'
import ActionButton from './styles/ActionButton'
import { UserContext } from '../userContext'

const ADMIN_UPDATE_USER_DATA = gql`
  mutation ADMIN_UPDATE_USER_DATA($userId: ID!, $role: Role, $name: String, $email: String) {
    adminUpdateUserData(userId: $userId, role: $role, name: $name, email: $email) {
      id
      name
      email
      role
    }
  }
`

const UserTableRow = user => {
  const [editFields, toggleEditFields] = useState({
    name: false,
    email: false,
  })
  const [role, setRole] = useState(user.user.role)
  const [name, changeName] = useState(user.user.name)
  const [email, changeEmail] = useState(user.user.email)
  const { userId } = useContext(UserContext)
  const [inputsTouched, changeInputsTouched] = useState(false)
  
  const [updateUserData, { loading }] = useMutation(ADMIN_UPDATE_USER_DATA, {
    variables: {
      userId: user.user.id, role, name, email, 
    },
    update: (cache, { data: { adminUpdateUserData } }) => {
      const { users } = cache.readQuery({ query: USERS_ADMIN_QUERY })    
      changeInputsTouched(false)   
      cache.writeQuery({
        query: USERS_ADMIN_QUERY,
        data: {
          users: users.map(item => {
            if (item.id !== adminUpdateUserData.id) return item
            return {
              ...item, 
              ...adminUpdateUserData,
            }
          }),
        },
      })
    },
  })

  useEffect(() => {
    if (role !== user.user.role || name !== user.user.name || email !== user.user.email) {
      changeInputsTouched(true)
    }
    // eslint-disable-next-line
  }, [role, name, email])

  const buttonFunc = async (mutation) => {
    await mutation()
    toggleEditFields({ name: false, email: false })
  }

  return (
    <tr>
      <td>{user.user.id}</td>
      <td className="editable">{editFields.name 
        ? (
          <input
            type="text" 
            defaultValue={name}
            onChange={e => changeName(e.target.value)}
          />
        ) 
        : <span>{name}</span>
        }
        <button type="button" onClick={() => toggleEditFields(prev => ({ ...prev, name: !prev.name }))}>X</button>

      </td>
      <td className="editable">
        {editFields.email 
          ? (
            <input
              type="email" 
              defaultValue={email}
              onChange={e => changeEmail(e.target.value)}
            />
          ) 
          : <span>{email}</span>
        }
        <button type="button" onClick={() => toggleEditFields(prev => ({ ...prev, email: !prev.email }))}>X</button>
      </td>
      <td>
        <select name="role" id={'role' + user.id} onChange={e => setRole(e.target.value)} disabled={user.user.id === userId} defaultValue={user.user.role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td>
        <ActionButton type="button" onClick={() => buttonFunc(updateUserData)} disabled={!inputsTouched || loading}>Update</ActionButton>
      </td>
    </tr>
  )

}

export default UserTableRow

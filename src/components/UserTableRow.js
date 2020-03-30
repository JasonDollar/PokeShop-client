import React, {
  useState, useEffect, useContext, memo, 
} from 'react'
import { useMutation, gql } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { USERS_ADMIN_QUERY } from './AdminPanel'
import ActionButton from './styles/ActionButton'
import { UserContext } from '../userContext'
import { EditButton } from './styles/UsersTable'

const ADMIN_UPDATE_USER_DATA = gql`
  mutation ADMIN_UPDATE_USER_DATA($userId: ID!, $role: Role, $name: String, $email: String, $wallet: Int) {
    adminUpdateUserData(userId: $userId, role: $role, name: $name, email: $email, wallet: $wallet) {
      id
      name
      email
      role
      wallet {
        balance
      }
    }
  }
`


const UserTableRow = user => {
  const [editFields, toggleEditFields] = useState({
    name: false,
    email: false,
  })
  console.log(user)
  const [role, setRole] = useState(user.user.role)
  const [name, changeName] = useState(user.user.name)
  const [email, changeEmail] = useState(user.user.email)
  const [walletBalance, changeWalletBallance] = useState(user.user.wallet.balance)
  const { userId } = useContext(UserContext)
  const [inputsTouched, changeInputsTouched] = useState(false)
  
  const [updateUserData, { loading }] = useMutation(ADMIN_UPDATE_USER_DATA, {
    variables: {
      userId: user.user.id, role, name, email, wallet: walletBalance,
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
    if (role !== user.user.role || name !== user.user.name || email !== user.user.email || walletBalance !== user.user.wallet.balance) {
      changeInputsTouched(true)
    }
    // eslint-disable-next-line
  }, [role, name, email, walletBalance])

  const buttonFunc = async (mutation) => {
    await mutation()
    toggleEditFields({ name: false, email: false })
  }

  const handleBalanceInput = e => {
    const { value } = e.target
    if (value > 2147483647) {
      return
    }
    changeWalletBallance(Number(e.target.value))
  }

  return (
    <tr>
      <td>{user.user.id}</td>
      <td>
        <div className="editable">

          {editFields.name 
            ? (
              <input
                type="text" 
                defaultValue={name}
                onChange={e => changeName(e.target.value)}
              />
            ) 
            : <span>{name}</span>
        }
          <EditButton type="button" onClick={() => toggleEditFields(prev => ({ ...prev, name: !prev.name }))}>
            <FontAwesomeIcon icon="pencil-alt" />
          </EditButton>
        </div>

      </td>
      <td>
        <div className="editable">

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
          <EditButton type="button" onClick={() => toggleEditFields(prev => ({ ...prev, email: !prev.email }))}>
            <FontAwesomeIcon icon="pencil-alt" />
          </EditButton>
        </div>
      </td>
      <td>
        <select name="role" id={'role' + user.id} onChange={e => setRole(e.target.value)} disabled={user.user.id === userId} defaultValue={user.user.role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td>
        <input type="number" value={walletBalance} onChange={e => handleBalanceInput(e)} />  
      </td>
      <td>
        <ActionButton type="button" onClick={() => buttonFunc(updateUserData)} disabled={!inputsTouched || loading}>Update</ActionButton>
      </td>
    </tr>
  )

}

export default memo(UserTableRow)

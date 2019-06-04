import React, { useState, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    const userId = localStorage.getItem('userId')
    if (!userId) return ''
    return userId
  })
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  )
}
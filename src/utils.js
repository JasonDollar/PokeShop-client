import jwtDecode from 'jwt-decode'

export const checkTokenValidity = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.setItem('userId', '')
    return null
  }
  const decoded = jwtDecode(localStorage.token)
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
    return null
  } 
  localStorage.setItem('userId', decoded.userId)
  return token
  
}
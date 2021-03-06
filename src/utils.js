import jwtDecode from 'jwt-decode'

export const checkTokenValidity = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.removeItem('userId')
    return null
  }
  const decoded = jwtDecode(localStorage.token)
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return null
  } 
  localStorage.setItem('userId', decoded.userId)
  return token
  
}

export const formatBigNumber = number => Intl.NumberFormat('de-DE').format(number)
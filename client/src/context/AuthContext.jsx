import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'))
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const login = ({ accessToken, user: userData }) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(accessToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

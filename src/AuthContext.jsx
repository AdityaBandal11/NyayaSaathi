import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const LOGGED_IN_KEY = 'nyayaSaathiLoggedIn'
const GUEST_KEY = 'nyayaSaathiGuest'

function readFlag(key) {
  try {
    return localStorage.getItem(key) === 'true'
  } catch {
    return false
  }
}

function writeFlag(key, value) {
  try {
    if (value) {
      localStorage.setItem(key, 'true')
    } else {
      localStorage.removeItem(key)
    }
  } catch {
    // localStorage unavailable — auth state still works for this session
  }
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => readFlag(LOGGED_IN_KEY))
  const [isGuest, setIsGuest] = useState(() => readFlag(GUEST_KEY))

  useEffect(() => {
    writeFlag(LOGGED_IN_KEY, isLoggedIn)
  }, [isLoggedIn])

  useEffect(() => {
    writeFlag(GUEST_KEY, isGuest)
  }, [isGuest])

  const login = () => {
    setIsGuest(false)
    setIsLoggedIn(true)
  }

  const loginAsGuest = () => {
    setIsLoggedIn(false)
    setIsGuest(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setIsGuest(false)
  }

  const isAuthenticated = isLoggedIn || isGuest

  return (
    <AuthContext.Provider value={{ isLoggedIn, isGuest, isAuthenticated, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

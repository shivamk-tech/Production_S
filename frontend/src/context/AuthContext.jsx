import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = () => {
    axios.get("http://localhost:3003/api/auth/logout", { withCredentials: true })
      .then(() => {
        setUser(null)
      })
      .catch((err) => console.error("Logout failed", err))
  }

  useEffect(() => {
    axios.get("http://localhost:3003/api/auth/me", { withCredentials: true })
      .then(res => {
        console.log("API Response from /me:", res.data);
        setUser(res.data.user || res.data)
      })
      .catch(() => {
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
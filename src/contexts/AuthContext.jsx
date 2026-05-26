import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase'
import axios from 'axios'
const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider())
  const logout = () => signOut(auth)
  const updateUserProfile = (name, photo) => updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          const res = await axios.post(`${API}/jwt`, { email: currentUser.email })
          localStorage.setItem('token', res.data.token)
        } catch {}
      } else {
        localStorage.removeItem('token')
      }
      setLoading(false)
    })
    return unsub
  }, [])
  return (
    <AuthContext.Provider value={{ user, loading, register, login, googleLogin, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

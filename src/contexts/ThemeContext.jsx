import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext()
export const useTheme = () => useContext(ThemeContext)
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') { root.classList.add('dark'); root.setAttribute('data-theme', 'dark') }
    else { root.classList.remove('dark'); root.setAttribute('data-theme', 'light') }
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

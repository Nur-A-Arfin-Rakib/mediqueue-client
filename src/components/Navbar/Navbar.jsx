import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully!')
    navigate('/')
  }

  const navLink = ({ isActive }) =>
    `font-display font-medium text-sm transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary ${isActive ? 'text-primary after:w-full' : 'text-[var(--color-muted)]'}`

  const links = (
    <>
      <NavLink to="/" className={navLink} onClick={() => setMenuOpen(false)}>Home</NavLink>
      <NavLink to="/tutors" className={navLink} onClick={() => setMenuOpen(false)}>Tutors</NavLink>
      {user && <>
        <NavLink to="/add-tutor" className={navLink} onClick={() => setMenuOpen(false)}>Add Tutor</NavLink>
        <NavLink to="/my-tutors" className={navLink} onClick={() => setMenuOpen(false)}>My Tutors</NavLink>
        <NavLink to="/my-bookings" className={navLink} onClick={() => setMenuOpen(false)}>My Bookings</NavLink>
      </>}
    </>
  )

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-[var(--color-border)]" style={{background:'color-mix(in srgb, var(--color-bg) 85%, transparent)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">E</span>
            </div>
            <span className="font-display font-bold text-lg" style={{color:'var(--color-text)'}}>
              Medi<span className="text-primary">Queue</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">{links}</div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-all" style={{color:'var(--color-muted)'}}>
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary cursor-pointer hover:border-accent transition-all">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=6C47FF&color=fff`} alt="profile" className="w-full h-full object-cover" />
                </div>
                <ul tabIndex={0} className="dropdown-content menu rounded-xl w-52 mt-2 p-2 shadow-xl z-50 card-surface">
                  <li className="px-3 py-2 border-b border-[var(--color-border)] mb-1">
                    <p className="font-display font-semibold text-sm truncate" style={{color:'var(--color-text)'}}>{user.displayName}</p>
                    <p className="text-xs truncate" style={{color:'var(--color-muted)'}}>{user.email}</p>
                  </li>
                  <li><Link to="/my-tutors" className="rounded-lg text-sm" style={{color:'var(--color-text)'}}>My Tutors</Link></li>
                  <li><Link to="/my-bookings" className="rounded-lg text-sm" style={{color:'var(--color-text)'}}>My Bookings</Link></li>
                  <li><button onClick={handleLogout} className="rounded-lg text-sm text-left w-full px-4 py-2 text-red-500 hover:bg-red-500/10 transition-all">Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-4">Login</Link>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(o => !o)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-all" style={{color:'var(--color-muted)'}}>
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-border)] flex flex-col gap-4">
            {links}
            {!user && <Link to="/register" className="btn-outline-primary text-center text-sm">Register</Link>}
          </div>
        )}
      </div>
    </nav>
  )
}

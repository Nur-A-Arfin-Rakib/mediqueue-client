import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'
import useTitle from '../../utils/useTitle'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
  useTitle('Login')
  const { login, googleLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message.includes('invalid') ? 'Invalid email or password.' : 'Login failed. Try again.')
    } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    try {
      await googleLogin()
      toast.success('Logged in with Google!')
      navigate(from, { replace: true })
    } catch { toast.error('Google login failed.') }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="card-surface p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-display font-bold text-2xl">E</span>
            </div>
            <h1 className="font-display font-bold text-3xl mb-2" style={{color:'var(--color-text)'}}>Welcome back</h1>
            <p className="text-sm" style={{color:'var(--color-muted)'}}>Sign in to continue your learning journey</p>
          </div>

          <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[var(--color-border)] hover:border-primary/50 hover:bg-primary/5 transition-all font-body font-medium text-sm mb-6" style={{color:'var(--color-text)'}}>
            <FcGoogle size={20} /> Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
            <span className="text-xs" style={{color:'var(--color-muted)'}}>or</span>
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{color:'var(--color-muted)'}}>Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                <input name="email" type="email" required placeholder="you@example.com" className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{color:'var(--color-muted)'}}>Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                <input name="password" type={showPass ? 'text' : 'password'} required placeholder="••••••••" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{color:'var(--color-muted)'}}>
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              <div className="text-right mt-1">
                <span className="text-xs text-primary cursor-pointer hover:underline">Forgot password?</span>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{color:'var(--color-muted)'}}>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'
import useTitle from '../../utils/useTitle'
import { FiUser, FiMail, FiLock, FiImage, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

const validate = (pass) => ({
  upper: /[A-Z]/.test(pass),
  lower: /[a-z]/.test(pass),
  length: pass.length >= 6
})

export default function Register() {
  useTitle('Register')
  const { register, googleLogin, updateUserProfile } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const v = validate(password)

  const handleRegister = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const photo = form.photo.value
    if (!v.upper || !v.lower || !v.length) {
      toast.error('Password does not meet requirements.')
      return
    }
    setLoading(true)
    try {
      await register(email, password)
      await updateUserProfile(name, photo)
      toast.success('Account created! Please log in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.message.includes('email-already') ? 'Email already registered.' : 'Registration failed.')
    } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    try {
      await googleLogin()
      toast.success('Registered with Google!')
      navigate('/')
    } catch { toast.error('Google registration failed.') }
  }

  const Rule = ({ ok, label }) => (
    <div className={`flex items-center gap-1.5 text-xs ${ok ? 'text-green-500' : 'text-red-400'}`}>
      {ok ? <FiCheck size={12} /> : <FiX size={12} />} {label}
    </div>
  )

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="card-surface p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-display font-bold text-2xl">E</span>
            </div>
            <h1 className="font-display font-bold text-3xl mb-2" style={{color:'var(--color-text)'}}>Create account</h1>
            <p className="text-sm" style={{color:'var(--color-muted)'}}>Join thousands of learners on MediQueue</p>
          </div>

          <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[var(--color-border)] hover:border-primary/50 hover:bg-primary/5 transition-all font-body font-medium text-sm mb-6" style={{color:'var(--color-text)'}}>
            <FcGoogle size={20} /> Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
            <span className="text-xs" style={{color:'var(--color-muted)'}}>or</span>
            <div className="flex-1 h-px bg-[var(--color-border)]"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {[
              { name:'name', type:'text', icon:<FiUser/>, placeholder:'Full Name', label:'Full Name' },
              { name:'email', type:'email', icon:<FiMail/>, placeholder:'you@example.com', label:'Email Address' },
              { name:'photo', type:'url', icon:<FiImage/>, placeholder:'https://...', label:'Photo URL' },
            ].map(f => (
              <div key={f.name}>
                <label className="text-xs font-semibold mb-1.5 block" style={{color:'var(--color-muted)'}}>{f.label}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary text-base">{f.icon}</span>
                  <input name={f.name} type={f.type} required placeholder={f.placeholder} className="input-field pl-10" />
                </div>
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{color:'var(--color-muted)'}}>Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={16} />
                <input name="password" type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input-field pl-10 pr-10" />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{color:'var(--color-muted)'}}>
                  {showPass ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                </button>
              </div>
              {password && (
                <div className="mt-2 space-y-1 p-3 rounded-lg" style={{background:'var(--color-bg)'}}>
                  <Rule ok={v.upper} label="Has uppercase letter" />
                  <Rule ok={v.lower} label="Has lowercase letter" />
                  <Rule ok={v.length} label="At least 6 characters" />
                </div>
              )}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full mt-2 disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{color:'var(--color-muted)'}}>
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

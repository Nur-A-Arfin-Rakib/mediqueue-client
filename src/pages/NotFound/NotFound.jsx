import { Link } from 'react-router-dom'
import useTitle from '../../utils/useTitle'
export default function NotFound() {
  useTitle('404 Not Found')
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{background:'var(--color-bg)'}}>
      <div className="relative mb-8">
        <div className="font-display font-bold text-[12rem] leading-none text-primary/10">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl animate-float">🎓</div>
        </div>
      </div>
      <h1 className="font-display font-bold text-4xl mb-4" style={{color:'var(--color-text)'}}>Page Not Found</h1>
      <p className="text-lg mb-8 max-w-md" style={{color:'var(--color-muted)'}}>The page you're looking for doesn't exist or has been moved. Let's get you back on track!</p>
      <Link to="/" className="btn-primary px-8 py-4">Go Home →</Link>
    </div>
  )
}

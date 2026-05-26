import { Link } from 'react-router-dom'
import { FiTwitter, FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">E</span>
            </div>
            <span className="font-display font-bold text-lg" style={{color:'var(--color-text)'}}>Medi<span className="text-primary">Queue</span></span>
          </div>
          <p className="text-sm leading-relaxed" style={{color:'var(--color-muted)'}}>Connecting passionate learners with expert tutors for transformative educational experiences.</p>
          <div className="flex gap-3 mt-5">
            {[
              { icon: <FiTwitter />, href: '#' },
              { icon: <FiFacebook />, href: '#' },
              { icon: <FiInstagram />, href: '#' },
              { icon: <FiLinkedin />, href: '#' },
            ].map((s, i) => (
              <a key={i} href={s.href} className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--color-border)] hover:border-primary hover:text-primary hover:bg-primary/10 transition-all" style={{color:'var(--color-muted)'}}>{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Learning Services */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-4" style={{color:'var(--color-text)'}}>Learning Services</h4>
          <ul className="space-y-2">
            {['Browse Tutors', 'Add Your Tutor', 'My Bookings', 'Online Classes', 'Offline Sessions', 'Group Tuitions'].map(s => (
              <li key={s}><Link to="/tutors" className="text-sm hover:text-primary transition-colors" style={{color:'var(--color-muted)'}}>{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Subjects */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-4" style={{color:'var(--color-text)'}}>Popular Subjects</h4>
          <ul className="space-y-2">
            {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Programming'].map(s => (
              <li key={s}><Link to="/tutors" className="text-sm hover:text-primary transition-colors" style={{color:'var(--color-muted)'}}>{s}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-sm mb-4" style={{color:'var(--color-text)'}}>Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm" style={{color:'var(--color-muted)'}}><FiMail className="text-primary shrink-0" /><span>hello@mediqueue.io</span></li>
            <li className="flex items-center gap-2 text-sm" style={{color:'var(--color-muted)'}}><FiPhone className="text-primary shrink-0" /><span>+880 1700-000000</span></li>
            <li className="flex items-center gap-2 text-sm" style={{color:'var(--color-muted)'}}><FiMapPin className="text-primary shrink-0" /><span>Dhaka, Bangladesh</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-5 text-center">
        <p className="text-xs" style={{color:'var(--color-muted)'}}>© {new Date().getFullYear()} MediQueue. All rights reserved. Built with ❤️ for learners.</p>
      </div>
    </footer>
  )
}

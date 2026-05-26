import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Banner from '../../components/Banner/Banner'
import TutorCard from '../../components/Shared/TutorCard'
import Spinner from '../../components/Shared/Spinner'
import useTitle from '../../utils/useTitle'
import { FiAward, FiUsers, FiBookOpen, FiTrendingUp, FiCheckCircle, FiArrowRight } from 'react-icons/fi'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const stats = [
  { icon: <FiUsers className="text-2xl" />, value: '500+', label: 'Expert Tutors' },
  { icon: <FiBookOpen className="text-2xl" />, value: '20+', label: 'Subjects' },
  { icon: <FiAward className="text-2xl" />, value: '10k+', label: 'Happy Students' },
  { icon: <FiTrendingUp className="text-2xl" />, value: '98%', label: 'Success Rate' },
]

const subjects = ['Mathematics','Physics','Chemistry','Biology','English','Programming','History','Economics']

const howItWorks = [
  { step: '01', title: 'Browse Tutors', desc: 'Explore our verified tutor profiles filtered by subject, location, and availability.' },
  { step: '02', title: 'Book a Session', desc: 'Select your preferred tutor and book a session that fits your schedule perfectly.' },
  { step: '03', title: 'Start Learning', desc: 'Join your session and unlock your full academic potential with expert guidance.' },
]

export default function Home() {
  useTitle('Home')
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/tutors?limit=6`).then(res => {
      setTutors(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div>
      <Banner />

      {/* Stats Section */}
      <section className="py-12 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">{s.icon}</div>
                <p className="font-display font-bold text-3xl" style={{color:'var(--color-text)'}}>{s.value}</p>
                <p className="text-sm mt-1" style={{color:'var(--color-muted)'}}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Tutors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-subject mb-3 inline-block">Top Educators</span>
            <h2 className="section-title mb-4">Available Tutors</h2>
            <p className="max-w-xl mx-auto text-base" style={{color:'var(--color-muted)'}}>Hand-picked experts ready to guide your learning journey</p>
          </div>
          {loading ? <Spinner /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map(t => <TutorCard key={t._id} tutor={t} />)}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/tutors" className="btn-outline-primary inline-flex items-center gap-2">
              View All Tutors <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{background:'var(--color-card)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-subject mb-3 inline-block">Simple Process</span>
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="max-w-xl mx-auto" style={{color:'var(--color-muted)'}}>Getting started is easy. Three simple steps to transform your learning.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative p-8 rounded-2xl border border-[var(--color-border)] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
                <div className="font-display font-bold text-6xl text-primary/10 group-hover:text-primary/20 transition-all mb-4">{item.step}</div>
                <h3 className="font-display font-bold text-xl mb-3" style={{color:'var(--color-text)'}}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{color:'var(--color-muted)'}}>{item.desc}</p>
                <div className="mt-4">
                  <FiCheckCircle className="text-primary text-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Subjects */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-subject mb-3 inline-block">Explore</span>
            <h2 className="section-title mb-4">Popular Subjects</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {subjects.map(s => (
              <Link key={s} to="/tutors" className="px-6 py-3 rounded-xl border border-[var(--color-border)] font-display font-semibold text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200" style={{color:'var(--color-text)'}}>
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

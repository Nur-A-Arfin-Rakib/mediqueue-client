import { useEffect, useState } from 'react'
import axios from 'axios'
import TutorCard from '../../components/Shared/TutorCard'
import Spinner from '../../components/Shared/Spinner'
import useTitle from '../../utils/useTitle'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Tutors() {
  useTitle('Browse Tutors')
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const fetchTutors = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (startDate) params.startDate = startDate.toISOString()
      if (endDate) params.endDate = endDate.toISOString()
      const res = await axios.get(`${API}/tutors`, { params })
      setTutors(res.data)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchTutors() }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchTutors()
  }

  const handleClear = () => {
    setSearch(''); setStartDate(null); setEndDate(null)
    setTimeout(fetchTutors, 100)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <span className="badge-subject mb-3 inline-block">All Educators</span>
        <h1 className="section-title mb-4">Browse All Tutors</h1>
        <p style={{color:'var(--color-muted)'}}>Discover expert tutors tailored to your learning needs</p>
      </div>

      {/* Search & Filter */}
      <div className="card-surface p-6 mb-10">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" size={18} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tutor by name..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <DatePicker selected={startDate} onChange={setStartDate} placeholderText="Session Start" className="input-field" dateFormat="MMM d, yyyy" />
            <DatePicker selected={endDate} onChange={setEndDate} placeholderText="Session End" className="input-field" dateFormat="MMM d, yyyy" minDate={startDate} />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex items-center gap-2"><FiFilter />Filter</button>
            {(search || startDate || endDate) && (
              <button type="button" onClick={handleClear} className="btn-outline-primary flex items-center gap-1"><FiX />Clear</button>
            )}
          </div>
        </form>
      </div>

      {loading ? <Spinner /> : tutors.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-display font-bold text-xl mb-2" style={{color:'var(--color-text)'}}>No tutors found</h3>
          <p style={{color:'var(--color-muted)'}}>Try adjusting your search or filters</p>
        </div>
      ) : (
        <>
          <p className="text-sm mb-6" style={{color:'var(--color-muted)'}}>{tutors.length} tutor{tutors.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map(t => <TutorCard key={t._id} tutor={t} />)}
          </div>
        </>
      )}
    </div>
  )
}

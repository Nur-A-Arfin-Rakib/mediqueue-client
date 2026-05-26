import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import axiosSecure from '../../utils/axiosSecure'
import { useAuth } from '../../contexts/AuthContext'
import Spinner from '../../components/Shared/Spinner'
import useTitle from '../../utils/useTitle'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FiMapPin, FiBook, FiClock, FiStar, FiDollarSign, FiUsers, FiCalendar, FiX } from 'react-icons/fi'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function TutorDetails() {
  useTitle('Tutor Details')
  const { id } = useParams()
  const { user } = useAuth()
  const [tutor, setTutor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    axios.get(`${API}/tutors/${id}`).then(res => { setTutor(res.data); setLoading(false) }).catch(() => setLoading(false))
  }, [id])

  const canBook = () => {
    if (!tutor) return { ok: false, msg: '' }
    if (tutor.totalSlot <= 0) return { ok: false, msg: 'No available slots left.' }
    const now = new Date()
    const sessionDate = new Date(tutor.sessionStartDate)
    if (now < sessionDate) return { ok: false, msg: `Booking is not available yet for this tutor. Opens on ${sessionDate.toLocaleDateString()}` }
    return { ok: true, msg: '' }
  }

  const handleBook = async (e) => {
    e.preventDefault()
    const form = e.target
    const { ok, msg } = canBook()
    if (!ok) { toast.error(msg); return }
    setBooking(true)
    try {
      await axiosSecure.post('/bookings', {
        tutorId: tutor._id,
        tutorName: tutor.name,
        studentName: form.studentName.value,
        studentEmail: user.email,
        phone: form.phone.value,
        status: 'confirmed'
      })
      await axiosSecure.patch(`/tutors/${tutor._id}/decrease-slot`)
      setTutor(t => ({ ...t, totalSlot: t.totalSlot - 1 }))
      setShowModal(false)
      Swal.fire({ title: 'Booked!', text: 'Your session has been booked successfully.', icon: 'success', background: 'var(--color-card)', color: 'var(--color-text)' })
    } catch { toast.error('Booking failed. Try again.') }
    setBooking(false)
  }

  if (loading) return <Spinner />
  if (!tutor) return <div className="text-center py-20"><p style={{color:'var(--color-muted)'}}>Tutor not found.</p></div>

  const { ok: canBookNow, msg: blockMsg } = canBook()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <div className="rounded-2xl overflow-hidden mb-6 aspect-[4/3]">
            <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" />
          </div>
          <div className="card-surface p-6 space-y-3">
            <h2 className="font-display font-bold text-xl" style={{color:'var(--color-text)'}}>Session Info</h2>
            {[
              { icon: <FiCalendar/>, label:'Start Date', val: new Date(tutor.sessionStartDate).toLocaleDateString() },
              { icon: <FiClock/>, label:'Available', val: tutor.availableDays },
              { icon: <FiUsers/>, label:'Slots Left', val: tutor.totalSlot },
              { icon: <FiStar/>, label:'Mode', val: tutor.teachingMode },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-3 text-sm">
                <span className="text-primary">{r.icon}</span>
                <span style={{color:'var(--color-muted)'}}>{r.label}:</span>
                <span className="font-semibold" style={{color:'var(--color-text)'}}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <span className="badge-subject mb-3 inline-block">{tutor.subject}</span>
          <h1 className="font-display font-bold text-4xl mb-2" style={{color:'var(--color-text)'}}>{tutor.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display font-bold text-3xl text-primary">${tutor.hourlyFee}<span className="text-base font-normal text-[var(--color-muted)]">/hr</span></span>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { icon:<FiMapPin/>, val: tutor.location },
              { icon:<FiBook/>, val: `${tutor.experience} years experience` },
              { icon:<FiDollarSign/>, val: tutor.institution },
            ].map((r,i) => (
              <div key={i} className="flex items-center gap-2 text-sm" style={{color:'var(--color-muted)'}}>
                <span className="text-primary">{r.icon}</span> {r.val}
              </div>
            ))}
          </div>

          {!canBookNow && blockMsg && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">{blockMsg}</p>
            </div>
          )}

          <button
            onClick={() => canBookNow ? setShowModal(true) : toast.error(blockMsg)}
            className={`btn-primary w-full text-center ${!canBookNow ? 'opacity-60' : ''}`}
          >
            {tutor.totalSlot <= 0 ? 'This session is fully booked. You can\'t join at the moment.' : 'Book Session'}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="card-surface w-full max-w-md p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4" style={{color:'var(--color-muted)'}}><FiX size={20}/></button>
            <h2 className="font-display font-bold text-2xl mb-6" style={{color:'var(--color-text)'}}>Book Session</h2>
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>Student Name</label>
                <input name="studentName" required defaultValue={user.displayName} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>Phone Number</label>
                <input name="phone" required placeholder="+880..." className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>Tutor</label>
                <input readOnly value={tutor.name} className="input-field opacity-60 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>Your Email</label>
                <input readOnly value={user.email} className="input-field opacity-60 cursor-not-allowed" />
              </div>
              <button type="submit" disabled={booking} className="btn-primary w-full mt-2 disabled:opacity-60">
                {booking ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

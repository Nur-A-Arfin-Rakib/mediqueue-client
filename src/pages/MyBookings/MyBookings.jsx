import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axiosSecure from '../../utils/axiosSecure'
import useTitle from '../../utils/useTitle'
import Spinner from '../../components/Shared/Spinner'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FiXCircle } from 'react-icons/fi'

const statusColors = {
  confirmed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-red-500/20 text-red-400',
  pending: 'bg-yellow-500/20 text-yellow-400'
}

export default function MyBookings() {
  useTitle('My Bookings')
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axiosSecure.get(`/my-bookings?email=${user.email}`).then(res => { setBookings(res.data); setLoading(false) }).catch(() => setLoading(false))
  }, [user.email])

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Cancel this booking?',
      text: 'This will mark your booking as cancelled.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6C47FF',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'Keep it',
      background: 'var(--color-card)',
      color: 'var(--color-text)'
    }).then(async result => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/bookings/${id}/cancel`)
        setBookings(b => b.map(x => x._id === id ? { ...x, status: 'cancelled' } : x))
        toast.success('Booking cancelled.')
      }
    })
  }

  if (loading) return <Spinner />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="badge-subject mb-3 inline-block">Private</span>
        <h1 className="section-title mb-2">My Booked Sessions</h1>
        <p style={{color:'var(--color-muted)'}}>Manage all your learning session bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 card-surface rounded-2xl">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="font-display font-bold text-xl mb-2" style={{color:'var(--color-text)'}}>No bookings yet</h3>
          <p style={{color:'var(--color-muted)'}}>You haven't booked any sessions. Browse tutors to get started!</p>
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {['Tutor','Student Name','Email','Status','Action'].map(h => (
                    <th key={h} className="px-5 py-4 text-left font-display font-semibold text-xs uppercase tracking-wide" style={{color:'var(--color-muted)'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b._id} className="border-b border-[var(--color-border)] hover:bg-primary/5 transition-colors">
                    <td className="px-5 py-4 font-semibold" style={{color:'var(--color-text)'}}>{b.tutorName}</td>
                    <td className="px-5 py-4" style={{color:'var(--color-text)'}}>{b.studentName}</td>
                    <td className="px-5 py-4" style={{color:'var(--color-muted)'}}>{b.studentEmail}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColors[b.status] || statusColors.pending}`}>{b.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      {b.status !== 'cancelled' ? (
                        <button onClick={() => handleCancel(b._id)} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-all">
                          <FiXCircle size={14} /> Cancel
                        </button>
                      ) : (
                        <span className="text-xs" style={{color:'var(--color-muted)'}}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

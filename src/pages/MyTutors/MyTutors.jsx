import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axiosSecure from '../../utils/axiosSecure'
import useTitle from '../../utils/useTitle'
import Spinner from '../../components/Shared/Spinner'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi'

const subjects = ['Mathematics','Physics','Chemistry','Biology','English','Programming','History','Economics','Geography','Bangla','Arabic','Computer Science']
const modes = ['Online','Offline','Both']

export default function MyTutors() {
  useTitle('My Tutors')
  const { user } = useAuth()
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [editTutor, setEditTutor] = useState(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    axiosSecure.get(`/my-tutors?email=${user.email}`).then(res => { setTutors(res.data); setLoading(false) }).catch(() => setLoading(false))
  }, [user.email])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete this tutor?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6C47FF',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete',
      background: 'var(--color-card)',
      color: 'var(--color-text)'
    }).then(async result => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/tutors/${id}`)
        setTutors(t => t.filter(x => x._id !== id))
        toast.success('Tutor deleted.')
      }
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)
    const form = e.target
    const data = {
      name: form.name.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availableDays: form.availableDays.value,
      hourlyFee: Number(form.hourlyFee.value),
      totalSlot: Number(form.totalSlot.value),
      institution: form.institution.value,
      experience: Number(form.experience.value),
      location: form.location.value,
      teachingMode: form.teachingMode.value,
    }
    try {
      await axiosSecure.put(`/tutors/${editTutor._id}`, data)
      setTutors(t => t.map(x => x._id === editTutor._id ? { ...x, ...data } : x))
      toast.success('Tutor updated successfully!')
      setEditTutor(null)
    } catch { toast.error('Update failed.') }
    setUpdating(false)
  }

  if (loading) return <Spinner />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="badge-subject mb-3 inline-block">Private</span>
        <h1 className="section-title mb-2">My Tutors</h1>
        <p style={{color:'var(--color-muted)'}}>Manage all tutors you have created</p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-20 card-surface rounded-2xl">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="font-display font-bold text-xl mb-2" style={{color:'var(--color-text)'}}>No tutors yet</h3>
          <p style={{color:'var(--color-muted)'}}>You haven't added any tutors. Click "Add Tutor" to get started!</p>
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {['Tutor','Subject','Fee/hr','Slots','Mode','Location','Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left font-display font-semibold text-xs uppercase tracking-wide" style={{color:'var(--color-muted)'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tutors.map((t, i) => (
                  <tr key={t._id} className={`border-b border-[var(--color-border)] hover:bg-primary/5 transition-colors ${i % 2 === 0 ? '' : ''}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={t.photo} alt={t.name} className="w-9 h-9 rounded-full object-cover border-2 border-primary/30" />
                        <span className="font-semibold" style={{color:'var(--color-text)'}}>{t.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="badge-subject">{t.subject}</span></td>
                    <td className="px-5 py-4 font-display font-bold text-primary">${t.hourlyFee}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.totalSlot > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>{t.totalSlot}</span>
                    </td>
                    <td className="px-5 py-4" style={{color:'var(--color-muted)'}}>{t.teachingMode}</td>
                    <td className="px-5 py-4" style={{color:'var(--color-muted)'}}>{t.location}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditTutor(t)} className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FiEdit size={14}/></button>
                        <button onClick={() => handleDelete(t._id)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><FiTrash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {editTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="card-surface w-full max-w-2xl p-8 relative my-8">
            <button onClick={() => setEditTutor(null)} className="absolute top-4 right-4" style={{color:'var(--color-muted)'}}><FiX size={20}/></button>
            <h2 className="font-display font-bold text-2xl mb-6" style={{color:'var(--color-text)'}}>Update Tutor</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {name:'name', label:'Name', defaultValue:editTutor.name},
                {name:'photo', label:'Photo URL', defaultValue:editTutor.photo},
                {name:'availableDays', label:'Available Days', defaultValue:editTutor.availableDays},
                {name:'institution', label:'Institution', defaultValue:editTutor.institution},
                {name:'location', label:'Location', defaultValue:editTutor.location},
              ].map(f => (
                <div key={f.name}>
                  <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>{f.label}</label>
                  <input name={f.name} required defaultValue={f.defaultValue} className="input-field" />
                </div>
              ))}
              {[
                {name:'hourlyFee', label:'Hourly Fee', defaultValue:editTutor.hourlyFee, type:'number'},
                {name:'totalSlot', label:'Total Slots', defaultValue:editTutor.totalSlot, type:'number'},
                {name:'experience', label:'Experience (yrs)', defaultValue:editTutor.experience, type:'number'},
              ].map(f => (
                <div key={f.name}>
                  <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>{f.label}</label>
                  <input name={f.name} type={f.type} required defaultValue={f.defaultValue} min="0" className="input-field" />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>Subject</label>
                <select name="subject" required defaultValue={editTutor.subject} className="input-field">
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block" style={{color:'var(--color-muted)'}}>Teaching Mode</label>
                <select name="teachingMode" required defaultValue={editTutor.teachingMode} className="input-field">
                  {modes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={updating} className="btn-primary w-full disabled:opacity-60">
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

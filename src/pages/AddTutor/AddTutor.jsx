import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axiosSecure from '../../utils/axiosSecure'
import useTitle from '../../utils/useTitle'
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const subjects = ['Mathematics','Physics','Chemistry','Biology','English','Programming','History','Economics','Geography','Bangla','Arabic','Computer Science']
const modes = ['Online','Offline','Both']

export default function AddTutor() {
  useTitle('Add Tutor')
  const { user } = useAuth()
  const [sessionStartDate, setSessionStartDate] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!sessionStartDate) { toast.error('Please select a session start date.'); return }
    const form = e.target
    const data = {
      name: form.name.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availableDays: form.availableDays.value,
      hourlyFee: Number(form.hourlyFee.value),
      totalSlot: Number(form.totalSlot.value),
      sessionStartDate,
      institution: form.institution.value,
      experience: Number(form.experience.value),
      location: form.location.value,
      teachingMode: form.teachingMode.value,
      creatorEmail: user.email,
      creatorName: user.displayName,
    }
    setLoading(true)
    try {
      await axiosSecure.post('/tutors', data)
      toast.success('Tutor added successfully!')
      e.target.reset(); setSessionStartDate(null)
    } catch { toast.error('Failed to add tutor. Try again.') }
    setLoading(false)
  }

  const Field = ({ label, children }) => (
    <div>
      <label className="text-xs font-semibold mb-1.5 block" style={{color:'var(--color-muted)'}}>{label}</label>
      {children}
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="badge-subject mb-3 inline-block">Private</span>
        <h1 className="section-title mb-4">Add New Tutor</h1>
        <p style={{color:'var(--color-muted)'}}>Fill in the details to create a new tutor profile</p>
      </div>

      <div className="card-surface p-8 md:p-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Tutor Name">
            <input name="name" required placeholder="Full name" className="input-field" />
          </Field>
          <Field label="Photo URL (imgbb/postimage)">
            <input name="photo" required placeholder="https://..." className="input-field" />
          </Field>
          <Field label="Subject / Category">
            <select name="subject" required className="input-field">
              <option value="">Select subject...</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Teaching Mode">
            <select name="teachingMode" required className="input-field">
              <option value="">Select mode...</option>
              {modes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Available Days & Time">
            <input name="availableDays" required placeholder="Sun–Thu 5:00 PM–8:00 PM" className="input-field" />
          </Field>
          <Field label="Session Start Date">
            <DatePicker
              selected={sessionStartDate}
              onChange={setSessionStartDate}
              placeholderText="Pick a date..."
              className="input-field w-full"
              dateFormat="MMM d, yyyy"
              minDate={new Date()}
            />
          </Field>
          <Field label="Hourly Fee ($)">
            <input name="hourlyFee" type="number" required min="1" placeholder="25" className="input-field" />
          </Field>
          <Field label="Total Slots">
            <input name="totalSlot" type="number" required min="1" placeholder="10" className="input-field" />
          </Field>
          <Field label="Institution">
            <input name="institution" required placeholder="University / School name" className="input-field" />
          </Field>
          <Field label="Experience (years)">
            <input name="experience" type="number" required min="0" placeholder="5" className="input-field" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Location (Area / City)">
              <input name="location" required placeholder="Dhaka, Gulshan" className="input-field" />
            </Field>
          </div>
          <div className="sm:col-span-2 mt-2">
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Adding Tutor...' : 'Add Tutor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

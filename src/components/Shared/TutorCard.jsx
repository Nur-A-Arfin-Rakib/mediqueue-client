import { Link } from 'react-router-dom'
import { FiMapPin, FiClock, FiStar, FiBook } from 'react-icons/fi'

export default function TutorCard({ tutor }) {
  const { _id, name, photo, subject, hourlyFee, location, teachingMode, experience, availableDays, totalSlot } = tutor
  return (
    <div className="card-surface overflow-hidden group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={photo} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="badge-subject">{subject}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${totalSlot > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {totalSlot > 0 ? `${totalSlot} slots` : 'Full'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-display font-bold text-white text-lg truncate">{name}</p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-xs" style={{color:'var(--color-muted)'}}>
            <FiMapPin className="text-primary shrink-0" /><span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{color:'var(--color-muted)'}}>
            <FiBook className="text-primary shrink-0" /><span className="truncate">{experience} yrs exp</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{color:'var(--color-muted)'}}>
            <FiClock className="text-primary shrink-0" /><span className="truncate">{availableDays}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{color:'var(--color-muted)'}}>
            <FiStar className="text-accent shrink-0" /><span>{teachingMode}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <div>
            <span className="font-display font-bold text-xl text-primary">${hourlyFee}</span>
            <span className="text-xs ml-1" style={{color:'var(--color-muted)'}}>/hour</span>
          </div>
          <Link to={`/tutors/${_id}`} className="btn-primary text-sm py-2 px-4">Book Session</Link>
        </div>
      </div>
    </div>
  )
}

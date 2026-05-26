import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const slides = [
  {
    title: "Find Your Perfect Tutor Today",
    subtitle: "Connect with expert educators across 20+ subjects. Learn at your own pace, on your schedule.",
    gradient: "from-purple-900/90 via-primary/70 to-transparent",
    img: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1400&q=80",
    badge: "🎓 500+ Verified Tutors"
  },
  {
    title: "Learn Smarter, Not Harder",
    subtitle: "Book one-on-one sessions with top tutors. Online or offline — your choice, your comfort.",
    gradient: "from-indigo-900/90 via-purple-700/70 to-transparent",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80",
    badge: "📚 Online & Offline Classes"
  },
  {
    title: "Your Success Story Starts Here",
    subtitle: "Track your progress, manage bookings, and achieve academic excellence with MediQueue.",
    gradient: "from-violet-900/90 via-fuchsia-700/60 to-transparent",
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400&q=80",
    badge: "⚡ Instant Session Booking"
  }
]

export default function Banner() {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-[85vh] min-h-[500px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl animate-slide-up">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-body mb-5 border border-white/20">
                      {slide.badge}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-5 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-white/80 font-body mb-8 leading-relaxed">{slide.subtitle}</p>
                    <Link to="/tutors" className="btn-primary text-base px-8 py-4 inline-block">
                      Explore Tutors →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

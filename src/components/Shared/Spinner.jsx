export default function Spinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-accent animate-spin animation-delay-150" style={{animationDirection:'reverse'}}></div>
      </div>
    </div>
  )
}

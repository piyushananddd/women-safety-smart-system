import { motion } from 'framer-motion'

const accentBar = {
  pink: 'from-[#E8D84A] to-[#d4c943]',
  sky: 'from-[#D4D4D4] to-[#A8A8A8]',
  emerald: 'from-[#E8D84A] via-[#d4c943] to-[#c4b838]',
  amber: 'from-[#A8A8A8] to-[#6B6B6B]',
  violet: 'from-[#E8D84A] to-[#D4D4D4]',
  rose: 'from-[#6B6B6B] to-[#1A1A1A]',
}

function Card({ title, subtitle, accent = 'pink', className = '', children }) {
  const showBar = accent && accent !== 'none' && accentBar[accent]

  return (
    <motion.section
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem] border border-pale-gray bg-surface p-6 shadow-md shadow-primary/5 md:p-7 ${className}`}
    >
      {showBar && (
        <div
          className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accentBar[accent]}`}
          aria-hidden
        />
      )}
      {(title || subtitle) && (
        <header className="mb-5 shrink-0 border-b border-pale-gray pb-4 pt-0.5">
          {title && (
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-primary">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1.5 min-h-[2.5rem] text-sm leading-snug text-mid-gray line-clamp-2">{subtitle}</p>
          )}
        </header>
      )}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.section>
  )
}

export default Card
